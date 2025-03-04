"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
import { Skeleton } from "@/components/ui/skeleton";
import ServiceDrawer from "../drawers/serviceTicketDrawer";
import ServiceTable from "../tables/serviceTicketTable";
import useStore from "@/utils/store/store";

function ServicesComp() {
  const currentUser = useStore((state) => state.user);
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [salesTaxValue, setSalesTaxValue] = useState();
  const [activeLinks, setActiveLinks] = useState("Open Ticket");
  const [loaderOuter, setLoaderOuter] = useState(false);
  const [employeeOpt, setEmployeeOpt] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);
  useEffect(() => {
    console.log("called");
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/service/`)
      .then((res) => {
        setAllServices(res.data.services);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    axios.get(`${apiPath.prodPath}/api/globalTax/`).then((res) => {
      setSalesTaxValue(res.data.globalTaxs[0].taxValue);
      setLoading(false);
    });
    axios.get(`${apiPath.prodPath}/api/users/`).then((res) => {
      const empArr = res.data.allUsers.map((i) => {
        return { label: i.fullname, value: i.fullname };
      });
      setEmployeeOpt(empArr);
      setLoading(false);
    });
  }, []);
  const handleCloseDrawer = () => {
    console.log("clicked");
    setDrawer(!drawer);
  };
  const addServices = (data) => {
    setLoaderOuter(true);
    axios
      .post(`${apiPath.prodPath}/api/service/addService`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
        setLoaderOuter(false);
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/service/`)
      .then((res) => {
        setAllServices(res.data.services);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSearch = (e) => {
    setSearchFlag(true);
    e.preventDefault();
    const filteredResults = allServices.filter(
      (i) => i.createdBy == employee.value
    );
    setAllServices(filteredResults);
  };
  const handleClear = () => {
    setEmployee("");
    setSearchFlag(false);
    refreshData();
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Service Tickets
        </h2>
      </div>
      <div className="flex flex-row w-fuu">
        <form
          onSubmit={handleSearch}
          className="flex flex-col w-1/2 justify-start"
        >
          <Select
            placeholder="Search Employee"
            value={employee}
            options={employeeOpt}
            onChange={(v) => setEmployee(v)}
            id="search-service-ticket"
            className="employee-names"
          />
          <div className="flex flex-row gap-3">
            {searchFlag ? (
              <button
                className="self-start bg-orange-400 text-white p-2 mt-3 rounded-xl"
                onClick={handleClear}
              >
                Clear
              </button>
            ) : null}
            <input
              type="submit"
              className="self-start bg-orange-400 text-white p-2 mt-3 rounded-xl"
              value={"Search"}
            />
          </div>
        </form>
        <div className="flex flex-row justify-end w-1/2">
          <button
            onClick={() => setDrawer(true)}
            className="self-end p-2 font-medium bg-orange-400 rounded-xl text-white"
          >
            + Add Service Ticket
          </button>
        </div>
      </div>
      <Tabs defaultValue="open" className="w-full">
        <TabsList className="bg-transparent">
          <TabsTrigger value="open" className="bg-transparent">
            Open Ticket
          </TabsTrigger>
          <TabsTrigger value="unbilled" className="bg-transparent">
            Unbilled
          </TabsTrigger>
          <TabsTrigger value="billed" className="bg-transparent">
            Billed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="open">
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[300px] w-[500px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <ServiceTable
              loading={loading}
              allServices={allServices.filter(
                (i) => i.ticketStatus == "Open Ticket"
              )}
              refreshData={refreshData}
              currentUser={currentUser}
              salesTaxValue={salesTaxValue}
            />
          )}
        </TabsContent>
        <TabsContent value="unbilled">
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[300px] w-[500px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <ServiceTable
              loading={loading}
              allServices={allServices.filter(
                (i) => i.ticketStatus == "Unbilled"
              )}
              refreshData={refreshData}
              currentUser={currentUser}
              salesTaxValue={salesTaxValue}
            />
          )}
        </TabsContent>
        <TabsContent value="billed">
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[300px] w-[500px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <ServiceTable
              loading={loading}
              allServices={allServices.filter(
                (i) => i.ticketStatus == "Billed"
              )}
              refreshData={refreshData}
              currentUser={currentUser}
              salesTaxValue={salesTaxValue}
            />
          )}
        </TabsContent>
      </Tabs>
      {loading ? null : drawer ? (
        <ServiceDrawer
          addServices={addServices}
          open={drawer}
          onClose={handleCloseDrawer}
          edit={false}
          allServices={allServices}
          currentUser={currentUser}
          salesTaxValue={salesTaxValue}
          loaderOuter={loaderOuter}
        />
      ) : null}
    </section>
  );
}

export default ServicesComp;
