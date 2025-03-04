import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
function ToolPartForm({ part, addParts, editFlag }) {
  const [partNo, setPartNo] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (editFlag) {
      setPartNo(part.partNo);
      setDescription(part.description);
    }
  }, [editFlag]);
  const handleParts = (e) => {
    e.preventDefault();
    const dataObj = {
      partNo,
      description,
    };
    addParts(dataObj);
    clearValues();
  };
  const clearValues = () => {
    setPartNo("");
    setDescription("");
  };
  return (
    <div>
      <form className="flex flex-row w-full gap-10" onSubmit={handleParts}>
        <div className="flex flex-col gap-2 w-1/3">
          <label className="font-semibold text-xl">Part No</label>
          <input
            className={`${poppins.className} p-2 border-2 border-grey rounded-xl`}
            onChange={(e) => setPartNo(e.target.value)}
            value={partNo}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <label className="font-semibold text-xl">Description</label>
          <input
            className={`${poppins.className} p-2 border-2 border-grey rounded-xl`}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="flex flex-col justify-end gap-2 w-1/3">
          <input
            className={`${poppins.className} p-2 bg-orange-400 text-white`}
            type="submit"
            value={editFlag ? "Edit" : "Add"}
          />
        </div>
      </form>
    </div>
  );
}

export default ToolPartForm;
