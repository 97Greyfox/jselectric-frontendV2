import { Scheduler } from "@aldabil/react-scheduler";
import moment from "moment";

function ScheduleTab({ schedules }) {
  let alteredSch =
    schedules &&
    schedules.map((i) => {
      return {
        event_id: i._id,
        title: `${i.title} - From ${i.startTime} to ${i.endTime}`,
        start: new Date(
          `${moment(i.date).format("YYYY/MM/DD")} ${i.startTime}`
        ),
        end: new Date(`${moment(i.date).format("YYYY/MM/DD")} ${i.endTime}`),
        color:
          i.title == "Scheduled"
            ? "#000000"
            : i.title == "Day Off"
            ? "#89CFF0"
            : i.title == "Sick"
            ? "#FF5733"
            : i.title == "Leave Of Absence"
            ? "#990f02"
            : i.title == "Bereavement Leave"
            ? "#BC544B"
            : "#0000FF",
      };
    });
  return (
    <div>
      <Scheduler
        view="month"
        events={alteredSch}
        editable={false}
        deletable={false}
      />
    </div>
  );
}

export default ScheduleTab;
