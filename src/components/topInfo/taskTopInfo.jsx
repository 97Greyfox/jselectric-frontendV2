import moment from "moment";

function TaskTopInfo({ item }) {
  console.log("this is item", item);
  return (
    <div className="flex flex-row gap-20 pb-5">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Current Date</label>
          <p className="text-end">
            {moment(item.currentDate).format("MM/DD/YYYY")}
          </p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">User</label>
          <p className="text-end">{item.user}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Task Priority</label>
          <p className="text-end">{item.taskPriority}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Task Category</label>
          <p className="text-end">{item.taskCategory}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Task Status</label>
          <p className="text-end">{item.taskStatus}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Due Date</label>
          <p className="text-end">
            {moment(item.dueDate).format("MM/DD/YYYY")}
          </p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Modules</label>
          <p className="text-end">
            {item.selectedModule !== null &&
              item.selectedModule &&
              item.selectedModule.map((inner, ind) => {
                return item.selectedModule.length - 1 == ind
                  ? `${inner}`
                  : `${inner}, `;
              })}
          </p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Assigned To</label>
          <p className="text-end">
            {item.assignedTo &&
              item.assignedTo.map((inner, ind) => {
                return item.assignedTo.length - 1 == ind
                  ? `${inner.fullname}`
                  : `${inner.fullname}, `;
              })}
          </p>
        </div>
        {item.moduleArr.map((i, index) => {
          return i == null ? null : (
            <div
              key={`${index}`}
              className="w-100 flex flex-row justify-between"
            >
              <label className="font-semibold text-orange-400">
                {i.selectedModule}
              </label>
              <p className="text-end">{i.selectedModule}</p>
            </div>
          );
        })}
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Description</label>
          <p className="text-end">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskTopInfo;
