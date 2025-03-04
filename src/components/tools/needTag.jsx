"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
import { Skeleton } from "@/components/ui/skeleton";
import NeedTagDrawer from "../drawers/needTagDrawer";
import NeedTagTable from "../tables/needTagTable";

function NeedTagComp({ userInfo }) {
  const [search, setSearch] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [allNeedTag, setAllNeedTag] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAllNeedTag();
  }, []);
  const getAllNeedTag = () => {
    setLoader(true);
    axios
      .get(`${apiPath.prodPath}/api/needTag/`)
      .then((res) => {
        setAllNeedTag(res.data.allNeedTags);
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

  return (
    <section className="employee-wrap">
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Need Tag
        </h2>
        <button
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
          onClick={handleCloseDrawer}
        >
          Add Need Tag
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
      ) : allNeedTag.length > 0 ? (
        <NeedTagTable
          userInfo={userInfo}
          allNeedTag={allNeedTag}
          refreshData={getAllNeedTag}
        />
      ) : (
        <p className={poppins.className}>No Need Tag data found</p>
      )}
      <NeedTagDrawer
        open={drawer}
        user={userInfo}
        onClose={handleCloseDrawer}
        refreshData={getAllNeedTag}
        edit={false}
      />
    </section>
  );
}

export default NeedTagComp;
