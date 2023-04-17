import {
  Assignment,
  Room,
  Schedule,
  Semester,
  Subject,
  Timeslot,
} from "./interfaces";

const initTimeslots: Timeslot = {
  "0800": "",
  "0830": "",
  "0900": "",
  "0930": "",
  "1000": "",
  "1030": "",
  "1100": "",
  "1130": "",
  "1200": "",
  "1230": "",
  "1300": "",
  "1330": "",
  "1400": "",
  "1430": "",
  "1500": "",
  "1530": "",
  "1600": "",
  "1630": "",
  "1700": "",
  "1730": "",
  "1800": "",
  "1830": "",
};

const initSchedule: Schedule = {
  Mo: initTimeslots,
  Tu: initTimeslots,
  We: initTimeslots,
  Th: initTimeslots,
  Fr: initTimeslots,
  Sa: initTimeslots,
};

const initRooms: Room[] = [
  {
    roomId: "ITB101",
    schedules: initSchedule,
  },
  {
    roomId: "ITB102",
    schedules: initSchedule,
  },
  {
    roomId: "ITB103",
    schedules: initSchedule,
  },
  {
    roomId: "ITB201",
    schedules: initSchedule,
  },
  {
    roomId: "ITB202",
    schedules: initSchedule,
  },
  {
    roomId: "ITB203",
    schedules: initSchedule,
  },
  {
    roomId: "ITB301",
    schedules: initSchedule,
  },
  {
    roomId: "ITB302",
    schedules: initSchedule,
  },
  {
    roomId: "ITB303",
    schedules: initSchedule,
  },
];

const roomIds = [
  "ITB101",
  "ITB102",
  "ITB103",
  "ITB201",
  "ITB202",
  "ITB203",
  "ITB301",
  "ITB302",
  "ITB303",
];

const initSemester: Semester = {
  semesterId: "",
  rooms: initRooms,
  classes: [],
};

const initSubject: Subject = {
  code: "",
  duration: "",
  counter: 0,
  assignments: [],
};

const initAssignment: Assignment = {
  day: "",
  end: "",
  start: "",
  room: "",
};

const colors = [
  "bg-red-400 text-black", //redLight
  "bg-yellow-400 text-black", //yellowLight
  "bg-lime-400 text-black", //limeLight
  "bg-teal-400 text-black", //tealLight
  "bg-violet-400 text-black", //violetLight
  "bg-pink-400 text-black", //pinkLight
  "bg-green-400 text-black", //greenLight
  "bg-green-700 text-white", //greenDark
  "bg-pink-700 text-white", //pinkDark
  "bg-violet-700 text-white", //violetDark
  "bg-teal-600 text-white", //tealDark
  "bg-lime-600 text-white", //limeDark
  "bg-yellow-600 text-white", //yellowDark
];

const invertedColors = [
  "text-red-400 bg-white", //redLight
  "text-yellow-400 bg-white", //yellowLight
  "text-lime-400 bg-white", //limeLight
  "text-teal-400 bg-white", //tealLight
  "text-violet-400 bg-white", //violetLight
  "text-pink-400 bg-white", //pinkLight
  "text-green-400 bg-white", //greenLight
  "text-green-800 bg-white", //greenDark
  "text-pink-800 bg-white", //pinkDark
  "text-violet-800 bg-white", //violetDark
  "text-teal-800 bg-white", //tealDark
  "text-lime-800 bg-white", //limeDark
  "text-yellow-800 bg-white", //yellowDark
];

export {
  initTimeslots,
  initSchedule,
  initRooms,
  initSemester,
  initSubject,
  initAssignment,
  roomIds,
  colors,
  invertedColors,
};
