import moment from "moment";

function TopInfoVendorInfo({ item }) {
  return (
    <div className="flex flex-row gap-20 pb-5">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Name</label>
          <p className="text-end">{item.name}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Company Name</label>
          <p className="text-end">{item.companyName}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Address</label>
          <p className="text-end">{item.address}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">City</label>
          <p className="text-end">{item.city}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">State</label>
          <p className="text-end">{item.state}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Zipcode</label>
          <p className="text-end">{item.zipCode}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Primary Contact
          </label>
          <p className="text-end">{item.zipCode}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Phone</label>
          <p className="text-end">{item.phone}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Email</label>
          <p className="text-end">{item.email}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Website</label>
          <p className="text-end">{item.website}</p>
        </div>
      </div>
    </div>
  );
}

export default TopInfoVendorInfo;
