import {
  colors,
  initTimeslots,
  invertedColors,
  roomIds,
} from "@/api/constants";
import { Schedule, Subject, Timeslot } from "@/api/interfaces";
import { SemesterContext } from "@/context/semContext";
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";

const ClassCard = ({ sub, index }: { sub: Subject; index: number }) => {
  const [time, setTime] = useState({
    room: "ITB101",
    day: "Mo",
    start: "0800",
    end: "0830",
  });

  const { state, dispatch } = useContext(SemesterContext);

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

      case "roomSelect":
        setTime({ ...time, room: e.target.value });
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

  const onAddAssignment = () => {
    const start = parseFloat(time.start);
    const end = parseFloat(time.end);
    if (start >= end || end - start <= 70) {
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

    let updatedSub = {
      ...sub,
    };

    updatedSub.assignments.push(time);
    updatedSub.counter = newCount;

    dispatch({
      type: "added_assignment",
      payload: {
        semester: state,
        subject: updatedSub,
        subjectIndex: index,
        assignment: time,
      },
    });
  };

  const onDelete = () => {
    dispatch({
      type: "deleted_class",
      payload: {
        subject: sub,
      },
    });
  };

  const onDeleteAssignment = (e: React.MouseEvent<HTMLButtonElement>) => {
    const idx = e.currentTarget.value;
  };

  return (
    <div
      className={`my-2 p-2 rounded-md flex flex-col text-xs ${colors[index]}`}
    >
      <div className="flex justify-between">
        <h5 className="font-semibold">{sub.code}</h5>
        <button onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div>Duration: {sub.duration} HRS</div>
      <div>
        Time:{" "}
        {sub.assignments.map((t, i) => {
          return (
            <div key={i} className="flex">
              <div>{`${t.room} ${t.day} ${t.start}-${t.end}`}</div>
              <button
                className="align-middle ml-2"
                value={i}
                onClick={onDeleteAssignment}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
          );
        })}
      </div>
      {parseFloat(sub.duration) > sub.counter ? (
        <div className="flex flex-col mt-1">
          <div className="flex justify-between">
            <select
              value={time.day}
              id="daySelect"
              onChange={onTimeChange}
              className={`w-3/6 mr-2 px-3 form-control rounded-md text-sm ${invertedColors[index]} font-semibold`}
            >
              <option value="Mo">Monday</option>
              <option value="Tu">Tuesday</option>
              <option value="We">Wednesday</option>
              <option value="Th">Thursday</option>
              <option value="Fr">Friday</option>
              <option value="Sa">Saturday</option>
            </select>

            <select
              value={time.room}
              id="roomSelect"
              onChange={onTimeChange}
              className={`w-3/6 ml-2 px-3 form-control rounded-md text-sm ${invertedColors[index]} font-semibold`}
            >
              <option value="ITB101">ITB101</option>
              <option value="ITB102">ITB102</option>
              <option value="ITB103">ITB103</option>
              <option value="ITB201">ITB201</option>
              <option value="ITB202">ITB202</option>
              <option value="ITB203">ITB203</option>
              <option value="ITB301">ITB301</option>
              <option value="ITB302">ITB302</option>
              <option value="ITB303">ITB303</option>
            </select>
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
                  if (
                    state.rooms[roomIds.findIndex((e) => e === time.room)]
                      .schedules[time.day as keyof Schedule][
                      t as keyof Timeslot
                    ] === ""
                  )
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
                  if (
                    state.rooms[roomIds.findIndex((e) => e === time.room)]
                      .schedules[time.day as keyof Schedule][
                      t as keyof Timeslot
                    ] === ""
                  )
                    return (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    );
                })}
                {state.rooms[roomIds.findIndex((e) => e === time.room)]
                  .schedules[time.day as keyof Schedule]["1830"] === "" ? (
                  <option key="1900" value="1900">
                    1900
                  </option>
                ) : (
                  <></>
                )}
              </select>
            </div>
          </div>
          <button
            onClick={onAddAssignment}
            className={` text-sm rounded-md border-white border ${invertedColors[index]} hover:${colors[index]} hover:text-white font-semibold `}
          >
            SET
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ClassCard;
