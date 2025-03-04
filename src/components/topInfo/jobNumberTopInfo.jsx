import moment from "moment";

function JobNumberTopInfo({ item }) {
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="flex flex-row gap-20">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Job Number</label>
          <p className="text-end">{item.jobNumber}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Job Name</label>
          <p className="text-end">{item.jobName}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Initials</label>
          <p className="text-end">{item.initials}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            General Contractor
          </label>
          <p className="text-end">{item.generalContractor}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Contact / TM</label>
          <p className="text-end">{item.contractTM}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Amount</label>
          <p className="text-end">${numberWithCommas(item.amount)}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">PO</label>
          <p className="text-end">{item.PO}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Date Created</label>
          <p className="text-end">
            {item.dateCreated == ""
              ? "none"
              : moment(item.dateCreated).format("MM/DD/YYYY")}
          </p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">dateBilled</label>
          <p className="text-end">
            {item.dateBilled == ""
              ? "none"
              : moment(item.dateBilled).format("MM/DD/YYYY")}
          </p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Job PM</label>
          <p className="text-end">{item.jobPM}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Change Order</label>
          <p className="text-end">{item.CO}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Percentage Billed
          </label>
          <p className="text-end">{item.percentageBilled}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Notes</label>
          <p className="text-end">{item.notes}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Project Checklist
          </label>
          <p className="text-end">{item.projectChecklist}</p>
        </div>
      </div>
    </div>
  );
}

export default JobNumberTopInfo;
