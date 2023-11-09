export const getFieldType = (name: string) => {
  if (name === "nome") return "name";
  if (name === "cidade") return "city";
  if (name === "rua") return "address";
  if (name === "mensalidade") return "currency";
};
