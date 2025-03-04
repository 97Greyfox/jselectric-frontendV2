"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
// import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import VehicleDrawer from "../drawers/vehicleDrawer";
import VehicleTable from "../tables/vehicleTable";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Vehicles() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allVehicles, setAllVehicles] = useState([]);
  const [activeLinks, setActiveLinks] = useState("Active");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vehicles/`)
      .then((res) => {
        const filteredStatus = res.data.vehicles.filter(
          (i) => i.status == activeLinks
        );
        setAllVehicles(filteredStatus);
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
  const addVehicle = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/vehicles/addVehicle`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vehicles/`)
      .then((res) => {
        const filteredStatus = res.data.vehicles.filter(
          (i) => i.status == activeLinks
        );
        setAllVehicles(filteredStatus);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleLinks = (link) => {
    setActiveLinks(link);
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vehicles/`)
      .then((res) => {
        const filteredStatus = res.data.vehicles.filter(
          (i) => i.status == link
        );
        setAllVehicles(filteredStatus);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className}`}>
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Vehicles
        </h2>
        <button
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
          onClick={() => setDrawer(true)}
        >
          Add Vehicle
        </button>
      </div>
      <div className="flex flex-row gap-3">
        <span
          className={
            activeLinks == "Active"
              ? `${poppins.className} text-orange-400 border-b-4 border-orange-400 font-semibold hover:cursor-pointer`
              : `${poppins.className} link hover:cursor-pointer`
          }
          onClick={() => handleLinks("Active")}
        >
          Active
        </span>
        <span
          className={
            activeLinks == "Inactive"
              ? `${poppins.className} text-orange-400 border-b-4 border-orange-400 font-semibold hover:cursor-pointer`
              : `${poppins.className} link hover:cursor-pointer`
          }
          onClick={() => handleLinks("Inactive")}
        >
          Inactive
        </span>
      </div>
      <div className="table-wrap">
        <VehicleTable
          loading={loading}
          allVehicles={allVehicles}
          refreshData={refreshData}
        />
      </div>
      <VehicleDrawer
        addVehicle={addVehicle}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default Vehicles;
