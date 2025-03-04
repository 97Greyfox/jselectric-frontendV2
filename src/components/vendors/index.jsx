"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
import VendorDrawer from "../drawers/vendorDrawer";
import VendorTable from "../tables/vendorTable";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function VendorComp() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allVendors, setAllVendors] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vendor/`)
      .then((res) => {
        setAllVendors(res.data.vendors);
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
  const addVendor = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/vendor/addVendor`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vendor/`)
      .then((res) => {
        setAllVendors(res.data.vendors);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  console.log("###", allVendors);
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Vendors
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Add Vendors
        </button>
      </div>
      <div className="table-wrap">
        <VendorTable
          loading={loading}
          allVendors={allVendors}
          refreshData={refreshData}
        />
      </div>
      {loading ? null : (
        <VendorDrawer
          addVendor={addVendor}
          open={drawer}
          onClose={handleCloseDrawer}
          edit={false}
          allVendors={allVendors}
        />
      )}
    </section>
  );
}

export default VendorComp;
