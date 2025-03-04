"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";

import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
import VehicleInspectionTable from "../tables/inspectionTable";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function Inspection() {
  const [loading, setLoading] = useState(false);
  const [allVehicleInspection, setAllVehicleInspection] = useState([]);
  const [usersOpt, setUsersOpt] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vehicleInspection/`)
      .then((res) => {
        setAllVehicleInspection(res.data.vehicleInspections);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    getEmployees();
  }, []);
  const getEmployees = async () => {
    await axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        const mappedUsers = res.data.allUsers.map((i) => {
          return { label: i.fullname, value: i.fullname };
        });
        setUsersOpt(mappedUsers);
      })
      .catch((error) => {
        console.log(error);
        setUsersOpt([]);
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchFlag(true);
    const filterdInspection = allVehicleInspection.filter(
      (i) => i.employee == searchUser.value
    );
    setAllVehicleInspection(filterdInspection);
  };
  const clearSearch = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vehicleInspection/`)
      .then((res) => {
        setAllVehicleInspection(res.data.vehicleInspections);
        setLoading(false);
        setSearchFlag(false);
        setSearchUser("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="add-btn-wrap">
        <h2 className="font-semibold text-2xl pt-2 pb-2">
          Vehicle Inspections
        </h2>
      </div>
      <div className="flex flex-col gap-3 w-1/2 pb-2">
        <form onSubmit={handleSearch} className="w-full flex flex-row gap-3">
          <Select
            isDisabled={searchFlag}
            options={usersOpt}
            onChange={(v) => setSearchUser(v)}
            value={searchUser}
            className="w-4/5"
            id="cus-inspection-sel"
          />
          <input
            type="submit"
            value={"search"}
            className={`${poppins.className} bg-orange-400 text-white rounded-lg p-2 font-semibold`}
          />
        </form>
      </div>
      {searchFlag ? (
        <p className={`${poppins.className} clear-cus`} onClick={clearSearch}>
          Clear
        </p>
      ) : null}
      <div className="table-wrap">
        <VehicleInspectionTable
          loading={loading}
          allVehicleInspection={allVehicleInspection}
        />
      </div>
    </section>
  );
}

export default Inspection;
