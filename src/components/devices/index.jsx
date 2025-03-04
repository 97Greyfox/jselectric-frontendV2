"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import DeviceDrawer from "../drawers/deviceDrawer";
import DeviceTable from "../tables/deviceTable";
import { Skeleton } from "@/components/ui/skeleton";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Devices() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allDevices, setAllDevices] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/devices/`)
      .then((res) => {
        setAllDevices(res.data.devices);
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
  const addDevice = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/devices/addDevice`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/devices/`)
      .then((res) => {
        setAllDevices(res.data.devices);
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
          Devices
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Add Devices
        </button>
      </div>
      <div className="table-wrap">
        {loading ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-[500px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <DeviceTable
            loading={loading}
            allDevices={allDevices}
            refreshData={refreshData}
          />
        )}
      </div>
      <DeviceDrawer
        addDevice={addDevice}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default Devices;
