import React from "react";
import { Timeslot } from "../api/constants";

const ScheduleTable = ({
  timeslots,
  sem,
}: {
  timeslots: Timeslot;
  sem: string;
}) => {
  return (
    <div className="flex flex-col px-6 py-4 overflow-hidden">
      <h2>{sem}</h2>
      <table className="min-w-full text-left text-sm font-light table-auto">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Time
            </th>
            <th scope="col" className="px-6 py-4">
              Mo
            </th>
            <th scope="col" className="px-6 py-4">
              Tu
            </th>
            <th scope="col" className="px-6 py-4">
              We
            </th>
            <th scope="col" className="px-6 py-4">
              Th
            </th>
            <th scope="col" className="px-6 py-4">
              Fr
            </th>
            <th scope="col" className="px-6 py-4">
              Sa
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b dark:border-neutral-500">
            {Object.keys(timeslots[sem]).map((keyName, i) => (
              <td key={i} className="whitespace-nowrap px-6 py-4">
                {}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
