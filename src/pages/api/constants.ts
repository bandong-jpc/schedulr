const timeslots = {
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

const initSchedule = {
  Mo: timeslots,
  Tu: timeslots,
  We: timeslots,
  Th: timeslots,
  Fr: timeslots,
  Sa: timeslots,
};

const initTimeslots = {
  ITB101: initSchedule,
  ITB102: initSchedule,
  ITB103: initSchedule,
  ITB201: initSchedule,
  ITB202: initSchedule,
  ITB203: initSchedule,
  ITB301: initSchedule,
  ITB302: initSchedule,
  ITB303: initSchedule,
};

interface Time {
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
  Mo: Time;
  Tu: Time;
  We: Time;
  Th: Time;
  Fr: Time;
  Sa: Time;
}

interface Timeslot {
  ITB101: Schedule;
  ITB102: Schedule;
  ITB103: Schedule;
  ITB201: Schedule;
  ITB202: Schedule;
  ITB203: Schedule;
  ITB301: Schedule;
  ITB302: Schedule;
  ITB303: Schedule;
}

interface SubjectClass {
  code: string;
  duration: string;
  counter: number;
  timeslots?:
    | [
        {
          day: string;
          start: string;
          end: string;
        }
      ]
    | [];
}

export { timeslots, initTimeslots, initSchedule };
export type { Timeslot, Schedule, Time, SubjectClass };
