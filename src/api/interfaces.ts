//interface for room assignments
interface Assignment {
  room: string;
  day: string;
  start: string;
  end: string;
}

interface Subject {
  code: string;
  duration: string;
  counter: number;
  assignments: Assignment[];
}

interface Timeslot {
  "0800": string;
  "0830": string;
  "0900": string;
  "0930": string;
  "1000": string;
  "1030": string;
  "1100": string;
  "1130": string;
  "1200": string;
  "1230": string;
  "1300": string;
  "1330": string;
  "1400": string;
  "1430": string;
  "1500": string;
  "1530": string;
  "1600": string;
  "1630": string;
  "1700": string;
  "1730": string;
  "1800": string;
  "1830": string;
}

interface Schedule {
  Mo: Timeslot;
  Tu: Timeslot;
  We: Timeslot;
  Th: Timeslot;
  Fr: Timeslot;
  Sa: Timeslot;
}

interface Room {
  roomId: string;
  schedules: Schedule;
}

interface Semester {
  semesterId: string;
  rooms: Room[];
  classes: Subject[];
}

interface RawData {
  rooms: Room[];
  classes: Subject[];
}

interface SemesterActions {
  type: string;
  payload?: {
    semester?: Semester;
    subject?: Subject;
    /* semester?: RoomSchedule;
    subject?: SubjectClass;
    classTime?: ClassTime;
    subjectId?: string; */
  };
}

export type {
  Assignment,
  Subject,
  Timeslot,
  Schedule,
  Room,
  Semester,
  RawData,
  SemesterActions,
};
