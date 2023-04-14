import { initSemester, initSubject } from "@/api/constants";
import { Semester, SemesterActions, Subject } from "@/api/interfaces";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

const addClass = async (classes: Subject[], id: string) => {
  try {
    await updateDoc(doc(db, "semesters", id), {
      classes: classes,
    });
  } catch (error) {
    console.log(error);
  }
};

const semReducer = (sem: Semester, action: SemesterActions) => {
  switch (action.type) {
    case "set": {
      return action.payload?.semester ?? initSemester;
    }

    case "added_class": {
      const toUpdate = {
        ...sem,
        classes: [...sem.classes, action.payload?.subject ?? initSubject],
      };

      addClass(toUpdate.classes, toUpdate.semesterId);

      return toUpdate;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export default semReducer;
