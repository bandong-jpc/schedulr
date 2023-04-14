import { Semester } from "@/api/interfaces";
import { Dispatch, SetStateAction, createContext } from "react";

export const SemListContext = createContext<{
  list: Semester[];
  setList: Dispatch<SetStateAction<Semester[]>>;
}>({
  list: [],
  setList: () => null,
});
