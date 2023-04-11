import React, { Dispatch, SetStateAction, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { initTimeslots } from "../api/constants";

const NewSemModal = ({
  show,
  setShow,
  setSemList,
  semList,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setSemList: Dispatch<SetStateAction<string[]>>;
  semList: string[];
}) => {
  let [error, setError] = useState(false);
  let [semester, setSemester] = useState({
    startYear: "",
    endYear: "",
    sem: "1ST",
  });

  const semOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    switch (e.target.id) {
      case "semSelector":
        setSemester({ ...semester, sem: e.target.value });
        break;

      case "startYearInput":
        setSemester({ ...semester, startYear: e.target.value.toUpperCase() });
        break;

      case "endYearInput":
        setSemester({ ...semester, endYear: e.target.value.toUpperCase() });
        break;

      default:
        break;
    }
    //
  };

  const onAdd = () => {
    const sem = semester.startYear + semester.endYear + semester.sem;

    if (
      semester.startYear.length !== 2 ||
      semester.endYear.length !== 2 ||
      isNaN(parseInt(semester.startYear)) ||
      isNaN(parseInt(semester.endYear)) ||
      parseInt(semester.startYear) >= parseInt(semester.endYear) ||
      semList.indexOf(sem) !== -1
    ) {
      setError(true);
      return;
    }

    setSemList((prevSemList) => [...prevSemList, sem]);
    setSemester({
      startYear: "",
      endYear: "",
      sem: "1ST",
    });
    setShow(false);
    setError(false);
    saveToDB(sem);
  };

  const saveToDB = async (docId: string) => {
    try {
      await setDoc(doc(db, "semesters", docId), initTimeslots);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={show ? "modal display-block" : "modal display-hidden"}>
      <section className="modal-main">
        <div className="flex flex-col">
          <h2 className="my-2 mx-auto">New Semester</h2>
          <div className="input-group h-20 my-4 mx-8">
            <div className="flex flex-col">
              <label className="my-1" htmlFor="semSelector">
                SEM
              </label>
              <select
                value={semester.sem}
                id="semSelector"
                onChange={semOnChange}
                className="form-control h-full rounded-md border-0 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option value="1ST">1st</option>
                <option value="2ND">2nd</option>
                <option value="SUM">Summer</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="my-1" htmlFor="startYearInput">
                START YEAR
              </label>
              <input
                value={semester.startYear}
                id="startYearInput"
                type="text"
                onChange={semOnChange}
                maxLength={2}
                minLength={2}
                className={
                  error
                    ? "form-control h-full rounded-md border-2 border-red-700 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-inset focus:bg-white focus:ring-indigo-600 sm:text-sm"
                    : "form-control h-full rounded-md border-0  bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-inset focus:bg-white focus:ring-indigo-600 sm:text-sm"
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="my-1" htmlFor="endYearInput">
                END YEAR
              </label>
              <input
                value={semester.endYear}
                id="endYearInput"
                type="text"
                onChange={semOnChange}
                maxLength={2}
                minLength={2}
                className={
                  error
                    ? "form-control h-full rounded-md border-2 border-red-700 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-inset focus:bg-white focus:ring-indigo-600 sm:text-sm"
                    : "form-control h-full rounded-md border-0 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-inset focus:bg-white focus:ring-indigo-600 sm:text-sm"
                }
              />
            </div>
          </div>
          <div className="input-group-append mb-4 px-10">
            <button
              className="w-1/2 mx-5 h-8 bg-red-700 rounded-md font-semibold"
              onClick={() => setShow(false)}
            >
              CANCEL
            </button>
            <button
              className="w-1/2 mx-5 h-8 bg-emerald-700 rounded-lg font-semibold"
              onClick={onAdd}
            >
              ADD
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewSemModal;
