import { colors, initTimeslots, invertedColors } from "@/api/constants";
import { Subject } from "@/api/interfaces";
import React, { useState } from "react";

const ClassCard = ({ sub, index }: { sub: Subject; index: number }) => {
  const [time, setTime] = useState({
    room: "ITB101",
    day: "Mo",
    start: "0800",
    end: "0830",
  });

  const [error, setError] = useState(false);

  const startTimes = Object.keys(initTimeslots).sort((a, b) => {
    return a.localeCompare(b);
  });

  const endTimes =
    Object.keys(initTimeslots)
      .concat("1900")
      .sort((a, b) => {
        return a.localeCompare(b);
      })
      .splice(1) || [];

  const onTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  function getHours(start: number, end: number): number {
    const duration = end - start;
    return Math.floor(duration / 100) + (duration % 100) / 60;
  }

  const onAdd = () => {
    const start = parseFloat(time.start);
    const end = parseFloat(time.end);

    if (start >= end) {
      setError(true);
      return;
    }

    setError(false);

    const duration = getHours(start, end);

    let newCount = sub.counter + duration;

    if (newCount > parseFloat(sub.duration)) {
      setError(true);
      return;
    }
  };

  return (
    <div
      className={`my-2 p-2 rounded-md flex flex-col text-xs ${colors[index]}`}
    >
      <h5 className="font-semibold">{sub.code}</h5>
      <div>Duration: {sub.duration} HRS</div>
      <div>
        Time:{" "}
        {sub.assignments.map((t, i) => {
          return `${t.day} ${t.start}-${t.end}${
            i < sub.assignments.length - 1 ? "; " : ""
          }`;
        })}
      </div>
      {parseFloat(sub.duration) > sub.counter ? (
        <div className="flex flex-col mt-1">
          <div className="flex justify-between">
            <select
              value={time.day}
              id="daySelect"
              onChange={onTimeChange}
              className={`w-3/6 px-3 form-control rounded-md text-sm ${invertedColors[index]} font-semibold`}
            >
              <option value="Mo">Monday</option>
              <option value="Tu">Tuesday</option>
              <option value="We">Wednesday</option>
              <option value="Th">Thursday</option>
              <option value="Fr">Friday</option>
              <option value="Sa">Saturday</option>
            </select>

            <button
              onClick={onAdd}
              className={`w-2/6 mx-1 text-sm rounded-md border-white border ${invertedColors[index]} hover:${colors[index]} hover:text-white font-semibold `}
            >
              SET
            </button>
          </div>

          <div className="flex my-1 justify-between">
            <div className="w-1/2 flex justify-around">
              <label className="my-1 mx-1 text-sm" htmlFor="semSelector">
                START
              </label>
              <select
                value={time.start}
                id="startSelect"
                onChange={onTimeChange}
                className={`form-control h-full px-2 rounded-md text-sm ${
                  invertedColors[index]
                }  font-semibold ${error ? "border-2 border-red-600" : ""}`}
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

            <div className="w-1/2 flex justify-around">
              <label className="my-1 mx-1 text-sm" htmlFor="semSelector">
                END
              </label>
              <select
                value={time.end}
                id="endSelect"
                onChange={onTimeChange}
                className={`form-control h-full px-2 rounded-md text-sm ${
                  invertedColors[index]
                }  font-semibold ${error ? "border-2 border-red-600" : ""}`}
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ClassCard;
