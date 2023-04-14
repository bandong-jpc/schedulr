import { Room, Timeslot } from "@/api/interfaces";
import React from "react";

const ScheduleTable = ({ room }: { room: Room }) => {
  return (
    <div className="flex flex-col px-4 py-4 overflow-hidden text-black">
      <h2>{room.roomId}</h2>
      <table className="min-w-full text-left text-xs font-dark table-fixed">
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
          {Object.keys(room.schedules.Mo)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map((timeslot, i, keyArr) => {
              return (
                <tr
                  key={i}
                  className="border-b
                "
                >
                  <td scope="col" className="py-1 text-center text-xs w-16">
                    {i < keyArr.length - 1
                      ? `${timeslot}-${keyArr[i + 1]}`
                      : `${timeslot}-1900`}
                  </td>

                  <td scope="col" className=" py-1 text-center text-xs w-16">
                    {room.schedules.Mo[timeslot as keyof Timeslot]}
                  </td>
                  <td scope="col" className=" py-1 text-center text-xs w-16">
                    {room.schedules.Tu[timeslot as keyof Timeslot]}
                  </td>
                  <td scope="col" className=" py-1 text-center text-xs w-16">
                    {room.schedules.We[timeslot as keyof Timeslot]}
                  </td>
                  <td scope="col" className=" py-1 text-center text-xs w-16">
                    {room.schedules.Th[timeslot as keyof Timeslot]}
                  </td>
                  <td scope="col" className=" py-1 text-center text-xs w-16">
                    {room.schedules.Fr[timeslot as keyof Timeslot]}
                  </td>
                  <td scope="col" className=" py-1 text-center text-xs w-16">
                    {room.schedules.Sa[timeslot as keyof Timeslot]}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
