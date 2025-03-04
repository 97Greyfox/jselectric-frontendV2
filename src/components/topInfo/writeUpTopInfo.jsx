import moment from "moment";
function TopWriteUpInfo({ item }) {
  return (
    <div className="flex flex-row gap-20 pb-5">
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Date Created</label>
          <p className="text-end">{item.dateCreated}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Created By</label>
          <p className="text-end">{item.createdBy}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Employee Name</label>
          <p className="text-end">{item.employeeName}</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Date Added</label>
          <p className="text-end">{item.dateAdded}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Warning</label>
          <p className="text-end">{item.typeOfWarning}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Offences</label>
          <p className="text-end">
            {item.typeOfOffences.length
              ? item.typeOfOffences.map((inner, ind) => {
                  if (ind == item.typeOfOffences.length - 1) {
                    return `${inner}`;
                  } else {
                    return `${inner}, `;
                  }
                })
              : "N/A"}
          </p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-5">
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Other Offence</label>
          <p className="text-end">{item.otherOffence}</p>
        </div>
        <div className="w-100 flex flex-row justify-between">
          <label className="font-semibold text-orange-400">Description</label>
          <p className="text-end">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TopWriteUpInfo;
