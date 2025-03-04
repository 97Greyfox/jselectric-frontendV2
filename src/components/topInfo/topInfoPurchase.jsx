import moment from "moment";

function TopInfoPurchaseOrder({ item }) {
  return (
    <div className="flex flex-row gap-20">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">POId</label>
          <p className="text-end">{item.POId}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Job Number</label>
          <p className="text-end">{item.jobNumber}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Job Name</label>
          <p className="text-end">{item.jobName}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Project Manager
          </label>
          <p className="text-end">{item.projectManager}</p>
        </div>

        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Purchase Order
          </label>
          <p className="text-end">{item.purchaseOrder}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Supplier</label>
          <p className="text-end">{item.supplier}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Sales Rep</label>
          <p className="text-end">{item.salesRep}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Sales Contact</label>
          <p className="text-end">{item.salesContact}</p>
        </div>
      </div>
    </div>
  );
}

export default TopInfoPurchaseOrder;
