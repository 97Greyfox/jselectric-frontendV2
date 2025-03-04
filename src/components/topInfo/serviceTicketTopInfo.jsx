import moment from "moment";

function TopInfoService({ item }) {
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="flex flex-row gap-20">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">To</label>
          <p className="text-end">{item.to}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Date Of Order</label>
          <p className="text-end">{item.dateOfOrder}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Contact Name</label>
          <p className="text-end">{item.contactName}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Tel#</label>
          <p className="text-end">{item.tel}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Created By</label>
          <p className="text-end">{item.createdBy}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Remaining</label>
          <p className="text-end">
            $
            {item.remaining == null ? "none" : numberWithCommas(item.remaining)}
          </p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Assigned To</label>
          <p className="text-end">{item.assignedTo}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Customer Order No
          </label>
          <p className="text-end">{item.customerOrderNo}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Start Date</label>
          <p className="text-end">{item.startDate}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Job Name</label>
          <p className="text-end">{item.jobName}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Job Location</label>
          <p className="text-end">{item.jobLocation}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Invoice Date</label>
          <p className="text-end">{item.invoiceDate}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Terms</label>
          <p className="text-end">{item.terms}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Total Labor</label>
          <p className="text-end">
            $
            {item.totalLabor == null
              ? "none"
              : numberWithCommas(item.totalLabor)}
          </p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Total Material
          </label>
          <p className="text-end">
            $
            {item.totalMaterail == null
              ? "none"
              : numberWithCommas(item.totalMaterail)}
          </p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Total</label>
          <p className="text-end">
            ${item.total == null ? "none" : numberWithCommas(item.total)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopInfoService;
