import {
  initAssignment,
  initSchedule,
  initSemester,
  initSubject,
  roomIds,
} from "@/api/constants";
import {
  Room,
  Schedule,
  Semester,
  SemesterActions,
  Subject,
  Timeslot,
} from "@/api/interfaces";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

const updateClass = async (classes: Subject[], id: string) => {
  try {
    await updateDoc(doc(db, "semesters", id), {
      classes: classes,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRooms = async (rooms: Room[], id: string) => {
  try {
    await updateDoc(doc(db, "semesters", id), {
      rooms: rooms,
    });
  } catch (error) {
    console.log(error);
  }
};

const semReducer = (sem: Semester, action: SemesterActions) => {
  switch (action.type) {
    case "set": {
      return action.payload?.semester ?? initSemester;
    }

    case "added_class": {
      const toUpdate = {
        ...sem,
        classes: [...sem.classes, action.payload?.subject ?? initSubject],
      };

      updateClass(toUpdate.classes, toUpdate.semesterId);

      return toUpdate;
    }

    case "deleted_class": {
      let rooms = sem.rooms;

      action.payload?.subject?.assignments.forEach((e) => {
        rooms.map((room) => {
          if (e.room === room.roomId) {
            for (const key in room.schedules[e.day as keyof Schedule]) {
              if (
                Object.prototype.hasOwnProperty.call(
                  room.schedules[e.day as keyof Schedule],
                  key
                )
              ) {
                const start = parseInt(e.start ?? "0");
                const end = parseInt(e.end ?? "0");
                if (parseInt(key) >= start && parseInt(key) < end)
                  room.schedules[e.day as keyof Schedule][
                    key as keyof Timeslot
                  ] = "";
              }
            }
          }
        });
      });

      const toUpdate = {
        ...sem,
        classes: sem.classes.filter((element) => {
          return element.code !== action.payload?.subject?.code;
        }),
      };

      updateClass(toUpdate.classes, toUpdate.semesterId);
      updateRooms(rooms, toUpdate.semesterId);
      return toUpdate;
    }

    case "added_assignment": {
      const idx = action.payload?.subjectIndex ?? -1;

      if (idx === -1) throw new Error("Cannot find class");

      let updatedClasses = sem.classes;

      updatedClasses[idx] = action.payload?.subject ?? initSubject;

      updateClass(updatedClasses, sem.semesterId);

      let roomToUpdate: Room = {
        roomId: "",
        schedules: initSchedule,
      };
      let roomIdx: number = 0;

      sem.rooms.forEach((e, i) => {
        if (e.roomId === action.payload?.assignment?.room) {
          roomToUpdate = e;
          roomIdx = i;
        }
      });

      const start = parseInt(action.payload?.assignment?.start ?? "0");
      const end = parseInt(action.payload?.assignment?.end ?? "0");

      for (const key in roomToUpdate.schedules[
        action.payload?.assignment?.day as keyof Schedule
      ]) {
        if (
          Object.prototype.hasOwnProperty.call(
            roomToUpdate.schedules[
              action.payload?.assignment?.day as keyof Schedule
            ],
            key
          )
        ) {
          try {
            if (parseInt(key) >= start && parseInt(key) < end)
              roomToUpdate.schedules[
                action.payload?.assignment?.day as keyof Schedule
              ][key as keyof Timeslot] = action.payload?.subject?.code ?? "";
          } catch (error) {
            console.log(error);
          }
        }
      }

      let newRoomList = sem.rooms;

      newRoomList[roomIdx] = roomToUpdate;

      updateRooms(newRoomList, sem.semesterId);

      return {
        ...sem,
        classes: updatedClasses,
        rooms: newRoomList,
      };
    }

    case "deleted_assignment": {
      let toUpdate = {
        ...sem,
      };

      try {
        let updatedAssignments =
          toUpdate.classes[action.payload?.subjectIndex ?? 0].assignments;
        updatedAssignments = updatedAssignments.splice(
          action.payload?.assignmentIndex ?? -1,
          1
        );

        let updatedTime =
          sem.rooms[action.payload?.roomIndex ?? 0].schedules[
            action.payload?.assignment?.day as keyof Schedule
          ];

        const start = parseInt(action.payload?.assignment?.start ?? "0");
        const end = parseInt(action.payload?.assignment?.end ?? "0");

        for (const key in updatedTime) {
          if (Object.prototype.hasOwnProperty.call(updatedTime, key)) {
            if (parseInt(key) >= start && parseInt(key) < end)
              updatedTime[key as keyof Timeslot] = "";
          }
        }

        let updatedSem = {
          ...sem,
        };

        updatedSem.classes[action.payload?.subjectIndex ?? 0].assignments =
          updatedAssignments;
        updatedSem.rooms[
          roomIds.indexOf(action.payload?.assignment?.room ?? "")
        ].schedules[action.payload?.assignment?.day as keyof Schedule] =
          updatedTime;
      } catch (error) {
        console.log(error);
      }
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export default semReducer;
