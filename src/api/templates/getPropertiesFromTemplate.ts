const regex = /\$([^\s]+)/giu;

export const getPropertiesFromTemplate = (template: string) => {
  return Array.from(template.matchAll(regex)).map((match) => match[1]);
};
