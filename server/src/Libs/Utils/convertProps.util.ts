import { ValueObject } from '@Libs/ddd/ValueObject.base';

export function convertPropsToObject(props: any): any {
  const propsCopy = { ...props };

  for (const prop in propsCopy) {
    if (Array.isArray(propsCopy[`${prop}`])) {
      propsCopy[`${prop}`] = (propsCopy[`${prop}`] as Array<unknown>).map((item) => {
        return convertToPlainObject(item);
      });
    }
    propsCopy[`${prop}`] = convertToPlainObject(propsCopy[`${prop}`]);
  }

  return propsCopy;
}

function convertToPlainObject(item: any): unknown {
  if (ValueObject.isValueObject(item)) {
    return item.unpack();
  }

  return item;
}
