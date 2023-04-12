import React, { useEffect, useState } from "react";
import { SubjectClass, Timeslot } from "../api/constants";
import ScheduleTable from "./ScheduleTable";
import ClassSection from "./ClassSection";
import NewClassModal from "./NewClassModal";

const Scheduler = ({ timeslots }: { timeslots: Timeslot }) => {
  const [keyArr, setKeyArr] = useState<string[]>([]);
  const [classes, setClasses] = useState<SubjectClass[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setKeyArr(
      Object.keys(timeslots).sort((a, b) => {
        return a.localeCompare(b);
      })
    );
  }, [timeslots]);

  return (
    <div className="flex h-full">
      {
        <div className="w-3/4 h-full overflow-y-scroll">
          {keyArr.map((key, i) => (
            <ScheduleTable key={i} room={key} timeslots={timeslots} />
          ))}
        </div>
      }

      <NewClassModal
        show={show}
        setShow={setShow}
        classList={classes}
        setClassList={setClasses}
      />

      <ClassSection setShow={setShow} classList={classes} />
    </div>
  );
};

export default Scheduler;
