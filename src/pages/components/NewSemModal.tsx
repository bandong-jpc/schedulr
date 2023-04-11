import React, { Dispatch, SetStateAction } from "react";

const NewSemModal = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className={show ? "modal display-block" : "modal display-hidden"}>
      <section className="modal-main">
        <div className="flex flex-col">
          <h2 className="my-2 mx-auto">New Semester</h2>
          <div className="input-group h-12 my-4 mx-8">
            <select className="form-control h-full rounded-md border-0 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
              <option value="1ST">1st</option>
              <option value="2ND">2nd</option>
              <option value="S">Summer</option>
            </select>
            <input
              type="text"
              maxLength={4}
              minLength={4}
              className="form-control h-full rounded-md border-0 bg-slate-300 py-0 pl-2 pr-7 text-gray-950 focus:ring-inset focus:bg-white focus:ring-indigo-600 sm:text-sm"
            />
            <input
              type="text"
              maxLength={4}
              minLength={4}
              className="form-control h-full rounded-md border-0 bg-slate-300 py-0 pl-2 pr-7 text-gray-950  focus:bg-white focus:ring-indigo-600 sm:text-sm"
            />
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
              onClick={() => setShow(false)}
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
