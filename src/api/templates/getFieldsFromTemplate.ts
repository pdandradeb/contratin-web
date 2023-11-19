import { getFieldType } from "./getFieldType";
import { State } from "./getInitialStateFromTemplate";
import { getPropertiesFromTemplate } from "./getPropertiesFromTemplate";
import set from "lodash/set";

export type Field = {
  state: string;
  type: string;
};

export type Fields = {
  [k: string]: Fields | Field;
};

export const getFieldsFromState = (state: State) => {
  const properties = Object.keys(state);
  return properties.reduce((r, property) => {
    const path = property.split(".");
    return set({ ...r }, property, {
      state: property,
      type: getFieldType(path[path.length - 1]),
    } as Field);
  }, {} as Fields);
};
