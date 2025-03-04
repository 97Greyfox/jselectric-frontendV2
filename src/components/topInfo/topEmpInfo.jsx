function TopEmployeeInfo({ item }) {
  return (
    <div className="flex flex-row gap-20">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Unit Type</label>
          <p className="text-end">{item.userType}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Fullname</label>
          <p className="text-end">{item.fullname}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Email</label>
          <p className="text-end">{item.email}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">
            Personal Phone
          </label>
          <p className="text-end">{item.personalPhone}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Company Phone</label>
          <p className="text-end">{item.companyPhone}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">City</label>
          <p className="text-end">{item.city}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Vehicle</label>
          <p className="text-end">{item.vehicle}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Tablet</label>
          <p className="text-end">{item.tablet}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Username</label>
          <p className="text-end">{item.username}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Position</label>
          <p className="text-end">{item.position}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Credit Card</label>
          <p className="text-end">{item.creditCard}</p>
        </div>
      </div>
    </div>
  );
}

export default TopEmployeeInfo;
