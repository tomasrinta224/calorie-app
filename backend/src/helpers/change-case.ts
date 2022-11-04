import { camelCase } from "change-case";

export const toCamel = (o: any) => {
  const newObj: any = {};

  for (let origKey in o) {
    if (o.hasOwnProperty(origKey)) {
      let newKey = camelCase(origKey);
      let value = o[origKey];
      newObj[newKey] = value;
    }
  }
  return newObj;
};
