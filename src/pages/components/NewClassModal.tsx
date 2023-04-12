import React, { Dispatch, SetStateAction, useState } from "react";
import { SubjectClass } from "../api/constants";

const NewClassModal = ({
  show,
  setShow,
  classList,
  setClassList,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  classList: SubjectClass[];
  setClassList: Dispatch<SetStateAction<SubjectClass[]>>;
}) => {
  const [subject, setSubject] = useState<SubjectClass>({
    code: "",
    duration: "",
    counter: 0,
    timeslots: [],
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
    if (
      subject.code.length !== 6 ||
      isNaN(parseInt(subject.duration)) ||
      parseInt(subject.duration) > 10 ||
      classList.some((e: SubjectClass) => e.code === subject.code)
    ) {
      setError(true);
      return;
    }

    setClassList((prevSemList) => [...prevSemList, subject]);
    setSubject({
      code: "",
      duration: "",
      counter: 0,
      timeslots: [],
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

export default NewClassModal;
