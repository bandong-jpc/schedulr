import React from "react";
import { Timeslot } from "../api/constants";
import ScheduleTable from "./ScheduleTable";

const Scheduler = ({ timeslots }: { timeslots: Timeslot }) => {
  return (
    <div className="w-full">
      {Object.keys(timeslots).map((key, i) => (
        <ScheduleTable key={i} sem={key} timeslots={timeslots} />
      ))}
    </div>
  );
};

export default Scheduler;
