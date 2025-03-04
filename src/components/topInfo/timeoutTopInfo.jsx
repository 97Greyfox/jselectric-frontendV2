import moment from "moment";
function TopTimeoutInfo({ item }) {
  return (
    <div className="flex flex-row gap-20">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Date Added</label>
          <p className="text-end">{item.dateAdded}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">User</label>
          <p className="text-end">{item.user}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Status</label>
          <p className="text-end">{item.status}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Start Date</label>
          <p className="text-end">{item.startDate}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">End Date</label>
          <p className="text-end">{item.endDate}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Reason</label>
          <p className="text-end">{item.reason}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Submitted To Jamie
          </label>
          <p className="text-end">{item.jamieFlag ? "Yes" : "No"}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Submitted To Management
          </label>
          <p className="text-end">{item.managementFlag ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
}

export default TopTimeoutInfo;
