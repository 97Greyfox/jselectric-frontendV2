"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";

import axios from "axios";
import Select from "react-select";
import { apiPath } from "@/utils/routes";
import WriteUpDrawer from "../drawers/writeup";
import WriteUpTable from "../tables/writeUpTable";
import { Skeleton } from "@/components/ui/skeleton";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function WriteUpComp({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [writeUps, setwriteUps] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/writeUp/`)
      .then((res) => {
        setwriteUps(res.data.writeUp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/writeUp/`)
      .then((res) => {
        setwriteUps(res.data.writeUp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  console.log("yeah data", writeUps);
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Write Up
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Add Write Up
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[300px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <WriteUpTable
          loading={loading}
          refreshData={refreshData}
          data={writeUps}
        />
      )}
      <WriteUpDrawer
        refreshData={refreshData}
        open={drawer}
        onClose={handleCloseDrawer}
        editFlag={false}
        user={user}
      />
    </section>
  );
}

export default WriteUpComp;
