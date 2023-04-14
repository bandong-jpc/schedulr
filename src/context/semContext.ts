import { initSemester } from "@/api/constants";
import { Semester, SemesterActions } from "@/api/interfaces";
import { Dispatch, createContext } from "react";

export const SemesterContext = createContext<{
  state: Semester;
  dispatch: Dispatch<SemesterActions>;
}>({
  state: initSemester,
  dispatch: () => null,
});
