import { SemesterContext } from "@/context/semContext";
import React, { useContext } from "react";
import ScheduleTable from "../tables/ScheduleTable";

const SchedulesSection = () => {
  const { state } = useContext(SemesterContext);

  return (
    <div className="w-3/4 overflow-y-scroll">
      {state.rooms.map((room, i) => (
        <ScheduleTable key={i} room={room} />
      ))}
    </div>
  );
};

export default SchedulesSection;
