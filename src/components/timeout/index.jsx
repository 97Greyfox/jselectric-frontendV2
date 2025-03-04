"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Skeleton } from "@/components/ui/skeleton";
import { apiPath } from "@/utils/routes";
import TimeoutDrawer from "../drawers/timeoutDrawer";
import TimeoutTable from "../tables/timeoutTable";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function TimeOutComp({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeouts, settimeouts] = useState([]);
  const [superComp, setSuperComp] = useState("Approved");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/timeout/`)
      .then((res) => {
        settimeouts(res.data.timeouts.filter((i) => i.status == superComp));
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
      .get(`${apiPath.prodPath}/api/timeout/`)
      .then((res) => {
        settimeouts(res.data.timeouts.filter((i) => i.status == superComp));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleApproved = () => {
    setSuperComp("Approved");
    axios
      .get(`${apiPath.prodPath}/api/timeout/`)
      .then((res) => {
        settimeouts(res.data.timeouts.filter((i) => i.status == "Approved"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handlePending = () => {
    setSuperComp("Pending");
    axios
      .get(`${apiPath.prodPath}/api/timeout/`)
      .then((res) => {
        settimeouts(res.data.timeouts.filter((i) => i.status == "Pending"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleRejected = () => {
    setSuperComp("Rejected");
    axios
      .get(`${apiPath.prodPath}/api/timeout/`)
      .then((res) => {
        settimeouts(res.data.timeouts.filter((i) => i.status == "Rejected"));
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
          Time Off Request
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Add Time Off Request
        </button>
      </div>
      <div className="flex flex-row gap-4 pt-4 pb-4">
        <span
          className={
            superComp == "Approved"
              ? `${poppins.className} text-orange-400 font-semibold hover:cursor-pointer`
              : `${poppins.className} hover:cursor-pointer`
          }
          onClick={handleApproved}
        >
          Approved
        </span>
        <span
          className={
            superComp == "Pending"
              ? `${poppins.className} text-orange-400 font-semibold hover:cursor-pointer`
              : `${poppins.className} hover:cursor-pointer`
          }
          onClick={handlePending}
        >
          Pending
        </span>
        <span
          className={
            superComp == "Rejected"
              ? `${poppins.className} text-orange-400 font-semibold hover:cursor-pointer`
              : `${poppins.className} hover:cursor-pointer`
          }
          onClick={handleRejected}
        >
          Rejected
        </span>
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
        <TimeoutTable
          loading={loading}
          refreshData={refreshData}
          data={timeouts}
        />
      )}
      <TimeoutDrawer
        refreshData={refreshData}
        open={drawer}
        onClose={handleCloseDrawer}
        editFlag={false}
        user={user}
      />
    </section>
  );
}

export default TimeOutComp;
