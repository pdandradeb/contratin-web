import { getPropertiesFromTemplate } from "./getPropertiesFromTemplate";

export interface State {
  [k: string]: string;
}

export const getInitialStateFromTemplate = (template: string): State => {
  const properties = getPropertiesFromTemplate(template);
  return properties.reduce(
    (result, property) => ({ ...result, [property]: "" }),
    {}
  );
};
