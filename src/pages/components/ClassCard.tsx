import { Dispatch, SetStateAction, useState } from "react";
import { SubjectClass, timeslots } from "../api/constants";

const ClassCard = ({
  sub,
  index,
  setClassList,
}: {
  sub: SubjectClass;
  index: number;
  setClassList: Dispatch<SetStateAction<SubjectClass[]>>;
}) => {
  const [time, setTime] = useState({
    room: "ITB101",
    day: "Mo",
    start: "0800",
    end: "0830",
  });

  const [error, setError] = useState(false);

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

    setClassList((prevList) => {
      let newList = [...prevList];

      let toUpdate = newList[index];

      toUpdate.counter = newCount;
      toUpdate.timeslots.push({
        day: time.day,
        start: time.start,
        end: time.end,
      });

      newList[index] = toUpdate;

      return newList;
    });
  };

  return (
    <div className="m-2 p-2 rounded-md border-2 border-red-600 flex flex-col">
      <h5 className="font-semibold">{sub.code}</h5>
      <div>Duration: {sub.duration} HRS</div>
      <div>
        Time:{" "}
        {sub.timeslots.map((t, i) => {
          return `${t.day} ${t.start}-${t.end}${
            i < sub.timeslots.length - 1 ? "; " : ""
          }`;
        })}
      </div>
      {parseFloat(sub.duration) > sub.counter ? (
        <div className="flex flex-col">
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

            <button
              onClick={onAdd}
              className="w-2/6 mx-1 border-2 text-sm rounded-md text-white bg-red-600"
            >
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
                className={
                  error
                    ? "form-control h-full rounded-md py-0 pl-2 pr-7 text-gray-950 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm  border-red-700 bg-red-300"
                    : "form-control h-full rounded-md py-0 pl-2 pr-7 text-gray-950 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm  border-slate-300 bg-slate-300"
                }
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
                className={
                  error
                    ? "form-control h-full rounded-md py-0 pl-2 pr-7 text-gray-950 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm  border-red-700 bg-red-300"
                    : "form-control h-full rounded-md py-0 pl-2 pr-7 text-gray-950 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm  border-slate-300 bg-slate-300"
                }
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
