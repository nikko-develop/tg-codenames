const authRoot = 'auth';
const userRoot = 'users';
const teamRoot = 'teams';
const gameRoot = 'games';

export const routesV1 = {
  version: 'v1',
  auth: {
    root: authRoot,
    tag: 'Auth Routes',
    signin: `${authRoot}/sign-in`,
    signout: `${authRoot}/sign-out`,
    refresh: `${authRoot}/refresh`,
  },
  user: {
    root: userRoot,
    tag: 'User Routes',
    findOne: `${userRoot}/find-one`,
    findMany: `${userRoot}/find-many`,
  },
  team: {
    root: teamRoot,
    tag: 'Team Routes',
  },
  game: {
    root: gameRoot,
    tag: 'Game Routes',
  },
};
