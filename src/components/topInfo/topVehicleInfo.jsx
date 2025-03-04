import moment from "moment";

function TopInfoVehicle({ item }) {
  return (
    <div className="flex flex-row gap-20 pb-5">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Vehicle #</label>
          <p className="text-end">{item.vehicleNo}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Driver/Wex Pin
          </label>
          <p className="text-end">{item.driverWEXPin}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Inspection ID</label>
          <p className="text-end">{item.inspectionId}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Vin#</label>
          <p className="text-end">{item.vinNo}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Status</label>
          <p className="text-end">{item.status}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Tag Experation
          </label>
          <p className="text-end">{item.tagExperation}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">License Plate</label>
          <p className="text-end">{item.licensePlate}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Make/Model</label>
          <p className="text-end">{item.makeModel}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Color</label>
          <p className="text-end">{item.color}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Year</label>
          <p className="text-end">{item.year}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">TX Tag</label>
          <p className="text-end">{item.txTag}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Gas Card</label>
          <p className="text-end">{item.gasCard}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Gas Card Last</label>
          <p className="text-end">{item.gasCardLast}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Card #</label>
          <p className="text-end">{item.cardNo}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Tracking Installed
          </label>
          <p className="text-end">{item.trackingInstalled}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Geo Tab</label>
          <p className="text-end">{item.geoTab}</p>
        </div>
      </div>
    </div>
  );
}

export default TopInfoVehicle;
