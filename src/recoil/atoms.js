import { atom } from "recoil";

const notesState = atom({
  key: "notesState",
  default: [],
});

export { notesState };
