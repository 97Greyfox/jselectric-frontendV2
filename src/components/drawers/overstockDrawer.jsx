import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import Select from "react-select";
import Image from "next/image";
function OverstockDrawer({
  open,
  onClose,
  addOverstock,
  edit,
  editData,
  id,
  refreshData,
}) {
  const [overstockCategory, setOverstockCategory] = useState("");
  const [categoryOpt, setCategoryOpt] = useState([]);
  const [itemDesc, setItemDesc] = useState("");
  const [estAvail, setEstAvail] = useState(0);

  useEffect(() => {
    axios.get(`${apiPath.prodPath}/api/overstockCategories`).then((res) => {
      const data = res.data.overstockCats.map((i) => {
        return { label: i.name, value: i.name };
      });
      setCategoryOpt(data);
    });
    if (edit) {
      setOverstockCategory({
        label: editData.overstockCategory,
        value: editData.overstockCategory,
      });
      setItemDesc(editData.itemDesc);
      setEstAvail(editData.estAvail);
    }
  }, [open]);
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = {
      overstockCategory: overstockCategory.value,
      estAvail,
      itemDesc,
    };
    if (edit) {
      axios
        .patch(`${apiPath.prodPath}/api/overstock/${id}`, formData)
        .then((res) => {
          refreshData();
          dataEntryRefresh();
        })
        .catch((error) => console.log(error));
    } else {
      addOverstock(formData);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setOverstockCategory("");
    setItemDesc("");
    setEstAvail(0);
  };

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="tools-drawer"
    >
      <div className={`${poppins.className} w-full flex flex-col p-10`}>
        <h1 className="flex flex-row gap-x-3 font-bold text-2xl">
          <span
            onClick={() => onClose()}
            className="flex flex-col justify-center align-middle"
          >
            <Image src={"/back.png"} width={12} height={21} alt="Back" />
          </span>
          {edit ? "Edit" : "Add Overstock"}
        </h1>
        <form
          onSubmit={handleAdd}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Overstock Category</label>
            <Select
              options={categoryOpt}
              onChange={(v) => setOverstockCategory(v)}
              value={overstockCategory}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Item Description</label>
            <input
              type="text"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">EST Avail</label>
            <input
              type="number"
              value={estAvail}
              onChange={(e) => setEstAvail(e.target.value)}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Edit" : "Add Overstock"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default OverstockDrawer;
