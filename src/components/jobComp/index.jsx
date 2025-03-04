"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import JobDrawer from "../drawers/jobDrawer";
import JobTable from "../tables/jobTable";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Job() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/job/`)
      .then((res) => {
        setAllJobs(res.data.jobs);
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
  const addJob = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/job/addJob`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/job/`)
      .then((res) => {
        setAllJobs(res.data.jobs);
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
          Jobs
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Add Job
        </button>
      </div>

      <div className="table-wrap">
        <JobTable
          loading={loading}
          allJobs={allJobs}
          refreshData={refreshData}
        />
      </div>
      <JobDrawer addJob={addJob} open={drawer} onClose={handleCloseDrawer} />
    </section>
  );
}

export default Job;
