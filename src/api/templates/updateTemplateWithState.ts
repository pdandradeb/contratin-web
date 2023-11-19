import { State } from "./getInitialStateFromTemplate";
import { getPropertiesFromTemplate } from "./getPropertiesFromTemplate";

const regex = /(?<=ct:repeat:begin)(.*?)(?=ct:repeat:end)/gms;

export const updateTemplateWithState = (template: string, state: State) => {
  let updatedText = template;
  getPropertiesFromTemplate(template).forEach((property) => {
    console.log(property);
    const regex = new RegExp(`[a-z]+\\[([0-9]+)\\]`).exec(property);
    updatedText = updatedText.replaceAll(`$${property}`, state[property] ?? "");
  });
  return updatedText;
};
