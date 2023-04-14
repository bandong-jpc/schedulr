import { SemesterContext } from "@/context/semContext";
import { SemListContext } from "@/context/semListContext";
import React, { useContext, useState } from "react";
import NewSemester from "../modals/NewSemester";

const SemesterSection = () => {
  const { list } = useContext(SemListContext);
  const { state, dispatch } = useContext(SemesterContext);
  const [show, setShow] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const changeTo = list.find((sem) => {
      return e.target.value === sem.semesterId;
    });

    dispatch({
      type: "set",
      payload: {
        semester: changeTo,
      },
    });
  };

  return (
    <div className="flex h-2/3 my-auto">
      <select
        value={state.semesterId}
        onChange={onChange}
        name="semester_list"
        id="semester_list"
        className="mx-3 form-control rounded-md border-0 bg-slate-300 py-0 pl-2 pr-2 text-gray-950 focus:ring-inset focus:bg-white focus:ring-indigo-600 sm:text-sm"
      >
        {list.map((sem, idx) => {
          return (
            <option key={idx} value={sem.semesterId}>
              {sem.semesterId}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          setShow(true);
        }}
        className="border-x border-y py-0 px-3 border-white rounded-md text-white text-sm hover:bg-white hover:text-red-600"
      >
        ADD SEMESTER
      </button>

      <NewSemester show={show} setShow={setShow} />
    </div>
  );
};

export default SemesterSection;
