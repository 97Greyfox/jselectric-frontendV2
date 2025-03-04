"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import GeneralContractDrawer from "../drawers/generalContractDrawer";
import GeneralContractTable from "../tables/generalContractTable";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});

function GeneralContract({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allGeneralContracts, setAllGeneralContracts] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/generalContract/`)
      .then((res) => {
        const sortedGenCon = res.data.generalContracts.sort((a, b) =>
          a.companyName.localeCompare(b.companyName)
        );
        setAllGeneralContracts(sortedGenCon);
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
      .get(`${apiPath.prodPath}/api/generalContract/`)
      .then((res) => {
        const sortedGenCon = res.data.generalContracts.sort((a, b) =>
          a.companyName.localeCompare(b.companyName)
        );
        setAllGeneralContracts(sortedGenCon);
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
          General Contractors
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Add General Contractors
        </button>
      </div>
      <div className="table-wrap">
        <GeneralContractTable
          loading={loading}
          allGeneralContracts={allGeneralContracts}
          refreshData={refreshData}
        />
      </div>
      <GeneralContractDrawer
        open={drawer}
        onClose={handleCloseDrawer}
        loggedInUser={user}
        refreshData={refreshData}
      />
    </section>
  );
}

export default GeneralContract;
