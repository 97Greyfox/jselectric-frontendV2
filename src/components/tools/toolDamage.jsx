"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import "./tools.scss";
import { Skeleton } from "@/components/ui/skeleton";
import ToolDamagedDrawer from "../drawers/toolDamagedDrawer";
import ToolDamagedTable from "../tables/toolDamageTable";
import useStore from "@/utils/store/store";

const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function ToolDamagedComp() {
  const user = useStore((state) => state.user);

  const [search, setSearch] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [allToolDamaged, setAllToolDamaged] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAllToolDamaged();
  }, []);
  const getAllToolDamaged = () => {
    setLoader(true);
    axios
      .get(`${apiPath.prodPath}/api/toolDamage/`)
      .then((res) => {
        setAllToolDamaged(res.data.alltoolDamages);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
  };
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addToolDamaged = (data) => {
    console.log(data);
  };
  return (
    <section className="employee-wrap">
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Tool Damaged
        </h2>
        <button
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
          onClick={handleCloseDrawer}
        >
          Add Tool Damaged
        </button>
      </div>
      {/* <div className="search-wrap">
        <form onSubmit={handleSearch}>
          <input
            className={`${poppins.className}`}
            type="text"
            required={true}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            className={`${poppins.className}`}
            type="submit"
            value={"Search"}
          />
        </form>
      </div> */}
      {loader ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[300px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : allToolDamaged.length > 0 ? (
        <ToolDamagedTable
          user={user}
          allToolDamaged={allToolDamaged}
          refreshData={getAllToolDamaged}
        />
      ) : (
        <p className={poppins.className}>No Tool Damaged data found</p>
      )}
      <ToolDamagedDrawer
        open={drawer}
        user={user}
        onClose={handleCloseDrawer}
        refreshData={getAllToolDamaged}
        edit={false}
      />
    </section>
  );
}

export default ToolDamagedComp;
