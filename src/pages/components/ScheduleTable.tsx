import React, { useEffect, useState } from "react";
import {
  Timeslot,
  initTimeslots,
  Schedule,
  initSchedule,
  Time,
  RoomSchedule,
} from "../api/constants";

const ScheduleTable = ({
  timeslots,
  room,
}: {
  timeslots: RoomSchedule;
  room: string;
}) => {
  const [keyArr, setKeyArr] = useState<string[]>([]);

  useEffect(() => {
    setKeyArr(
      Object.keys(timeslots.rooms[room as keyof Timeslot].Mo).sort((a, b) => {
        return parseInt(a) - parseInt(b);
      })
    );
  }, [timeslots]);

  return (
    <div className="flex flex-col px-4 py-4 overflow-hidden">
      <h2>{room}</h2>
      <table className="min-w-full text-left text-xs font-light table-fixed">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-4 py-1 text-center w-16">
              Time
            </th>
            <th scope="col" className="px-4 py-1 text-center w-15">
              Mo
            </th>
            <th scope="col" className="px-4 py-1 text-center w-15">
              Tu
            </th>
            <th scope="col" className="px-4 py-1 text-center w-15">
              We
            </th>
            <th scope="col" className="px-4 py-1 text-center w-15">
              Th
            </th>
            <th scope="col" className="px-4 py-1 text-center w-15">
              Fr
            </th>
            <th scope="col" className="px-4 py-1 text-center w-15">
              Sa
            </th>
          </tr>
        </thead>
        <tbody>
          {keyArr.map((keyName, i) => (
            <tr key={i} className="border-b dark:border-neutral-500">
              <td scope="col" className="px-1 py-1 text-center text-xs w-16">
                {i < keyArr.length - 1
                  ? `${keyName}-${keyArr[i + 1]}`
                  : `${keyName}-1900`}
              </td>

              <td scope="col" className="px-4 py-1 text-center text-xs w-15">
                {
                  timeslots.rooms[room as keyof Timeslot].Mo[
                    keyName as keyof Time
                  ]
                }
              </td>
              <td scope="col" className="px-4 py-1 text-center text-xs w-15">
                {
                  timeslots.rooms[room as keyof Timeslot].Tu[
                    keyName as keyof Time
                  ]
                }
              </td>
              <td scope="col" className="px-4 py-1 text-center text-xs w-15">
                {
                  timeslots.rooms[room as keyof Timeslot].We[
                    keyName as keyof Time
                  ]
                }
              </td>
              <td scope="col" className="px-4 py-1 text-center text-xs w-15">
                {
                  timeslots.rooms[room as keyof Timeslot].Th[
                    keyName as keyof Time
                  ]
                }
              </td>
              <td scope="col" className="px-4 py-1 text-center text-xs w-15">
                {
                  timeslots.rooms[room as keyof Timeslot].Fr[
                    keyName as keyof Time
                  ]
                }
              </td>
              <td scope="col" className="px-4 py-1 text-center text-xs w-15">
                {
                  timeslots.rooms[room as keyof Timeslot].Sa[
                    keyName as keyof Time
                  ]
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
