import React, { Dispatch, SetStateAction, useState } from "react";
import { SubjectClass, Time, timeslots } from "../api/constants";
import ClassCard from "./ClassCard";

const ClassSection = ({
  setShow,
  classList,
  setClassList,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
  classList: SubjectClass[];
  setClassList: Dispatch<SetStateAction<SubjectClass[]>>;
}) => {
  return (
    <div className="p-4 flex flex-col w-1/4 h-full">
      <button
        onClick={() => {
          setShow(true);
        }}
        className="mx-3 border-2  py-1 px-2.5 rounded-md text-white bg-red-600"
      >
        Add Class
      </button>
      <div className="py-4 overflow-y-auto">
        {classList.map((c, i) => (
          <ClassCard
            key={c.code}
            sub={c}
            index={i}
            setClassList={setClassList}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassSection;
