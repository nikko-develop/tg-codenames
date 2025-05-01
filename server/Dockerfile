##
# Стадия компиляции приложения

FROM registry.x5food.tech/images/docker/node:20-dev as builder
WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./

RUN pnpm install
COPY . .
RUN pnpm run build

##
# Стадия подготовки зависимостей без devDependencies
FROM registry.x5food.tech/images/docker/node:20-dev as cleaner
WORKDIR /app
ENV NODE_ENV='production'

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --prod

COPY --from=builder /app/dist ./dist

RUN pnpm dlx modclean --no-progress --run

##
# Стадия подготовки образа для рантайма
#
#  ВНИМАНИЕ! Здесь нужно задавать образ для прода
FROM registry.x5food.tech/images/docker/node:20
WORKDIR /app

COPY --from=cleaner /app/dist ./dist

COPY --from=cleaner /app/node_modules ./node_modules

EXPOSE 2241
CMD ["node", "./dist/main.js"]