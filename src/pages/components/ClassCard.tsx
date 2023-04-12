import { useState } from "react";
import { SubjectClass, timeslots } from "../api/constants";

const ClassCard = ({ sub }: { sub: SubjectClass }) => {
  const [time, setTime] = useState({
    day: "Mo",
    start: "0800",
    end: "0830",
  });

  const startTimes = Object.keys(timeslots).sort((a, b) => {
    return a.localeCompare(b);
  });

  const endTimes =
    Object.keys(timeslots)
      .concat("1900")
      .sort((a, b) => {
        return a.localeCompare(b);
      })
      .splice(1) || [];

  const onTimeChange = () => (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("inchange");
    switch (e.target.id) {
      case "daySelect":
        setTime({ ...time, day: e.target.value });
        break;

      case "startSelect":
        setTime({ ...time, start: e.target.value });
        break;

      case "endSelect":
        setTime({ ...time, end: e.target.value });
        break;

      default:
        break;
    }
    //
  };

  return (
    <div className="m-2 p-2 rounded-md border-2 border-red-600 flex flex-col">
      <h5 className="font-semibold">{sub.code}</h5>
      <div>Duration: {sub.duration} HRS</div>
      <div>Time: </div>
      <div className="flex justify-between">
        <select
          value={time.day}
          id="daySelect"
          onChange={onTimeChange}
          className="w-4/6 my-1 mx-1 form-control h-full rounded-md border-0 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        >
          <option value="Mo">Monday</option>
          <option value="Tu">Tuesday</option>
          <option value="We">Wednesday</option>
          <option value="Th">Thursday</option>
          <option value="Fr">Friday</option>
          <option value="Sa">Saturday</option>
        </select>

        <button className="w-2/6 mx-1 border-2 text-sm rounded-md text-white bg-red-600">
          Add Time
        </button>
      </div>

      <div className="flex my-1 justify-around">
        <div className="w-1/2">
          <label className="my-1 mx-3 text-sm" htmlFor="semSelector">
            START
          </label>
          <select
            value={time.start}
            id="startSelect"
            onChange={onTimeChange}
            className="form-control h-full rounded-md border-0 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            {startTimes.map((t) => {
              return (
                <option key={t} value={t}>
                  {t}
                </option>
              );
            })}
          </select>
        </div>

        <div className="w-1/2 ">
          <label className="my-1 mx-3 text-sm" htmlFor="semSelector">
            END
          </label>
          <select
            value={time.end}
            id="endSelect"
            onChange={onTimeChange}
            className="form-control h-full rounded-md border-0 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            {endTimes.map((t) => {
              return (
                <option key={t} value={t}>
                  {t}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
