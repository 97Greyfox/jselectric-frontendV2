"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import TagoutTable from "../tables/tagoutTable";
import useStore from "@/utils/store/store";
import TagoutDrawer from "../drawers/tagoutDrawer";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});

function Tagout() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTagouts, setAllTagouts] = useState([]);
  const user = useStore((state) => state.user);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tagout/`)
      .then((res) => {
        setAllTagouts(res.data.tagouts);
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
  const addTagout = (data, cb = null) => {
    axios
      .post(`${apiPath.prodPath}/api/tagout/addTagout`, data)
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            text: `${res.data.message}`,
          });
        } else {
          handleCloseDrawer();
          refreshData();
          cb();
        }
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tagout/`)
      .then((res) => {
        setAllTagouts(res.data.tagouts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Tagout
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Add Tagout
        </button>
      </div>
      <div className="table-wrap">
        <TagoutTable
          loading={loading}
          allTagouts={allTagouts}
          refreshData={refreshData}
          user={user}
        />
      </div>
      <TagoutDrawer
        addTagout={addTagout}
        open={drawer}
        onClose={handleCloseDrawer}
        loggedInUser={user}
      />
    </section>
  );
}

export default Tagout;
