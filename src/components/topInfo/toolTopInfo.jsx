import moment from "moment";
function ToolTopInfo({ item }) {
  return (
    <div className="flex flex-row gap-20">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Tool#</label>
          <p className="text-end">{item.toolNumber}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Sub Category</label>
          <p className="text-end">{item.subCategory}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Description</label>
          <p className="text-end">{item.description}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Employee</label>
          <p className="text-end">{item.employee}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Last Purchase Price
          </label>
          <p className="text-end">{item.lastPurchasePrice}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Tech Assigned To
          </label>
          <p className="text-end">{item.techAssigned}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Brand</label>
          <p className="text-end">{item.brand}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Category</label>
          <p className="text-end">{item.category}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Location</label>
          <p className="text-end">{item.location}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Project</label>
          <p className="text-end">{item.project}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Purchase Date</label>
          <p className="text-end">
            {item.purchaseDate == "" || item.purchaseDate == undefined
              ? "N/A"
              : moment(item.purchaseDate).format("MM/DD/YYYY")}
          </p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Warranty Date</label>
          <p className="text-end">
            {item.warrantyExpDate == "" || item.warrantyExpDate == undefined
              ? "N/A"
              : moment(item.warrantyExpDate).format("MM/DD/YYYY")}
          </p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Serial #</label>
          <p className="text-end">{item.serial}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        {item.picture && item.picture.fileUrl ? (
          <img
            className="w-full h-full"
            src={item.picture && item.picture.fileUrl}
            alt="Tool Picture"
          />
        ) : (
          "No Image"
        )}
      </div>
    </div>
  );
}

export default ToolTopInfo;
