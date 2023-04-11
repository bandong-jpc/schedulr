import React, { Dispatch, SetStateAction, useState } from "react";

const SemSelector = ({
  setShow,
  semList,
  semester,
  setSemester,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
  semList: string[];
  semester: string;
  setSemester: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex my-auto">
      <select
        name="semester_list"
        id="semester_list"
        className="mx-3 form-control h-full rounded-md border-0 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-inset focus:bg-white focus:ring-indigo-600 sm:text-sm"
      >
        {semList.map((sem, idx) => {
          return <div key={idx}></div>;
        })}
      </select>
      <button
        onClick={() => {
          setShow(true);
        }}
        className="mx-3 border-2 border-white py-1 px-2.5 rounded-md"
      >
        Add Semester
      </button>
    </div>
  );
};

export default SemSelector;
