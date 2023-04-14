import { initSubject } from "@/api/constants";
import { Subject } from "@/api/interfaces";
import { SemesterContext } from "@/context/semContext";
import { SemListContext } from "@/context/semListContext";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";

const NewClass = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const { state, dispatch } = useContext(SemesterContext);
  const { list, setList } = useContext(SemListContext);
  const [subject, setSubject] = useState<Subject>({
    code: "",
    duration: "",
    counter: 0,
    assignments: [],
  });

  let [error, setError] = useState(false);

  const subjectOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "code":
        setSubject({ ...subject, code: e.target.value.toUpperCase() });
        break;

      case "duration":
        setSubject({ ...subject, duration: e.target.value.toUpperCase() });
        break;

      default:
        break;
    }
    //
  };

  const onAdd = () => {
    const idx = list.findIndex((e) => {
      return e.semesterId === state.semesterId;
    });

    if (
      subject.code.length !== 6 ||
      isNaN(parseInt(subject.duration)) ||
      parseInt(subject.duration) > 10 ||
      state.classes.some((e) => {
        return e.code === subject.code;
      })
    ) {
      setError(true);
      return;
    }

    dispatch({
      type: "added_class",
      payload: {
        subject: subject,
      },
    });

    const semToUpdate = {
      ...state,
      classes: [...state.classes, subject ?? initSubject],
    };

    let toUpdate = list;
    toUpdate[idx] = semToUpdate;

    setList(toUpdate);

    setSubject({
      code: "",
      duration: "",
      counter: 0,
      assignments: [],
    });
    setShow(false);
    setError(false);
  };

  return (
    <div className={show ? "modal display-block" : "modal display-hidden"}>
      <section className="modal-main">
        <div className="flex flex-col">
          <h2 className="my-2 mx-auto">New Class</h2>
          <div className="input-group h-20 my-4 mx-8">
            <div className="flex flex-col">
              <label className="my-1" htmlFor="semSelector">
                CLASS CODE
              </label>
              <input
                value={subject.code}
                id="code"
                type="text"
                onChange={subjectOnChange}
                maxLength={6}
                minLength={6}
                className={
                  error
                    ? "form-control h-full rounded-md border-2 border-red-700 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-inset focus:bg-white focus:ring-indigo-600 sm:text-sm"
                    : "form-control h-full rounded-md border-0  bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-inset focus:bg-white focus:ring-indigo-600 sm:text-sm"
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="my-1" htmlFor="startYearInput">
                DURATION
              </label>
              <input
                value={subject.duration}
                id="duration"
                type="text"
                onChange={subjectOnChange}
                maxLength={6}
                minLength={6}
                className={
                  error
                    ? "form-control h-full rounded-md border-2 border-red-700 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-inset focus:bg-white focus:ring-indigo-600 sm:text-sm"
                    : "form-control h-full rounded-md border-0  bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-inset focus:bg-white focus:ring-indigo-600 sm:text-sm"
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

export default NewClass;
