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

const initTimeslots = {
  ITB101: {
    Mo: timeslots,
    Tu: timeslots,
    We: timeslots,
    Th: timeslots,
    Fr: timeslots,
    Sa: timeslots,
  },
  ITB102: {
    Mo: timeslots,
    Tu: timeslots,
    We: timeslots,
    Th: timeslots,
    Fr: timeslots,
    Sa: timeslots,
  },
  ITB103: {
    Mo: timeslots,
    Tu: timeslots,
    We: timeslots,
    Th: timeslots,
    Fr: timeslots,
    Sa: timeslots,
  },
  ITB201: {
    Mo: timeslots,
    Tu: timeslots,
    We: timeslots,
    Th: timeslots,
    Fr: timeslots,
    Sa: timeslots,
  },
  ITB202: {
    Mo: timeslots,
    Tu: timeslots,
    We: timeslots,
    Th: timeslots,
    Fr: timeslots,
    Sa: timeslots,
  },
  ITB203: {
    Mo: timeslots,
    Tu: timeslots,
    We: timeslots,
    Th: timeslots,
    Fr: timeslots,
    Sa: timeslots,
  },
  ITB301: {
    Mo: timeslots,
    Tu: timeslots,
    We: timeslots,
    Th: timeslots,
    Fr: timeslots,
    Sa: timeslots,
  },
  ITB302: {
    Mo: timeslots,
    Tu: timeslots,
    We: timeslots,
    Th: timeslots,
    Fr: timeslots,
    Sa: timeslots,
  },
  ITB303: {
    Mo: timeslots,
    Tu: timeslots,
    We: timeslots,
    Th: timeslots,
    Fr: timeslots,
    Sa: timeslots,
  },
};

interface Timeslot {
  ITB101: Object;
  ITB102: Object;
  ITB103: Object;
  ITB201: Object;
  ITB202: Object;
  ITB203: Object;
  ITB301: Object;
  ITB302: Object;
  ITB303: Object;
}

export { timeslots, initTimeslots };
export type { Timeslot };
