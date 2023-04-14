import React, { useContext, useState } from "react";
import NewClass from "../modals/NewClass";
import { SemesterContext } from "@/context/semContext";
import ClassCard from "../cards/ClassCard";

const ClassSection = () => {
  const { state } = useContext(SemesterContext);
  const [show, setShow] = useState(false);

  return (
    <div className="p-4 flex flex-col w-1/4 h-full">
      <button
        onClick={() => {
          setShow(true);
        }}
        className="border py-1 rounded-md text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
      >
        Add Class
      </button>

      <NewClass show={show} setShow={setShow} />

      <div className="py-4 overflow-y-auto">
        {state.classes.map((c, i) => {
          return <ClassCard index={i} key={i} sub={c} />;
        })}
      </div>
    </div>
  );
};

export default ClassSection;
