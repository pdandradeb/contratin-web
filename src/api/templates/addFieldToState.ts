import { State } from "./getInitialStateFromTemplate";

export const addFieldToState = (state: State, field: string) => {
  console.log("addFieldToState", state, field);
  return Object.keys(state).reduce((r, a) => {
    const regex = new RegExp(`${field}\\[([0-9]+)\\]`).exec(a);
    if (!regex) return { ...r };
    const index = parseInt(regex[1], 10);
    return { ...r, [a.replace(`[${index}]`, `[${index + 1}]`)]: "" };
  }, state);
};
