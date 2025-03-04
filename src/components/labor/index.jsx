"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";

import ManpowerTable from "../tables/manpowerTable";
import ManpowerAssignTable from "../tables/manpowerAssignTable";
import ManpowerEmpTable from "../tables/manpowerEmpTable";
import ForemanTable from "../tables/foremanTable";
import HeadsUpTable from "../tables/headsUpTable";
import HeadsUpEmpTable from "../tables/headsUpEmpTable";
import ManpowerDrawer from "../drawers/manpowerDrawer";
import { Skeleton } from "@/components/ui/skeleton";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function ManpowerComp({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allManpower, setAllManpower] = useState([]);
  const [activeTab, setActiveTab] = useState("Jobs");
  const [allUsers, setAllUsers] = useState([]);
  const [superVal, setSuperVal] = useState("LSU");
  useEffect(() => {
    // if (user && user.userType == "superintendent") {
    //   setActiveTab("To Be Assigned");
    // }
    if (user !== null && user.userType !== null && user.userType == "foreman") {
      setActiveTab("Daily Jobs");
    }
    if (
      user !== null &&
      user.userType !== null &&
      user.userType == "heads up"
    ) {
      setActiveTab("Heads Up Jobs");
      const el = document.querySelectorAll(".links-wrap");
      const anEl = document.querySelectorAll(".labor-wrap");
      if (el[0] !== undefined) {
        el[0].style.width = "0px";
        el[0].style.minWidth = "0px";
      }
      if (anEl[0] !== undefined) {
        anEl[0].style.width = "100%";
        // anEl[0].style.minWidth = "0px";
      }
    }
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/manpower/`)
      .then((res) => {
        setAllManpower(res.data.manpowers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    if (
      user !== null &&
      user.userType !== null &&
      user.userType == "heads up"
    ) {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/users/`)
        .then((res) => {
          const userArr = res.data.allUsers.map((i) => {
            return {
              fullname: i.fullname,
              userLabor: i.userLabor,
              userType: i.userType,
            };
          });
          setAllUsers(userArr);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    const headsupInterval = setInterval(() => {
      if (
        user !== null &&
        user.userType !== null &&
        user.userType == "heads up"
      ) {
        dataRefreshInterval();
        manpowerDataRefresh();
      }
    }, 60000);
    return () => {
      clearInterval(headsupInterval);
      if (
        user !== null &&
        user.userType !== null &&
        user.userType == "heads up"
      ) {
        const el = document.querySelectorAll(".links-wrap");
        const anEl = document.querySelectorAll(".labor-wrap");
        if (el[0] !== undefined) {
          el[0].style.width = "15%";
          el[0].style.minWidth = "250px";
        }
        if (anEl[0] !== undefined) {
          anEl[0].style.width = "85%";
          // anEl[0].style.minWidth = "0px";
        }
      }
    };
  }, []);
  const dataRefreshInterval = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const userArr = res.data.allUsers.map((i) => {
          return {
            fullname: i.fullname,
            userLabor: i.userLabor,
            userType: i.userType,
          };
        });
        setAllUsers(userArr);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const manpowerDataRefresh = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/manpower/`)
      .then((res) => {
        setAllManpower(res.data.manpowers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addManpower = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/manpower/addManpower`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/manpower/`)
      .then((res) => {
        setAllManpower(res.data.manpowers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (user !== null &&
    user.userType !== null &&
    user.userType == "superintendent") ||
    (user !== null && user.userType !== null && user.userType == "admin") ? (
    <section className={`${poppins.className} labor-wrap`}>
      <div className="flex flex-row gap-4 pb-2 pt-2">
        <span
          onClick={() => {
            setSuperVal("LSU");
            setActiveTab("Jobs");
          }}
          className={
            superVal == "LSU"
              ? "text-orange-400 font-semibold hover:cursor-pointer"
              : "simpleTab hover:cursor-pointer"
          }
        >
          Labor - SuperUser
        </span>
        <span
          onClick={() => {
            setSuperVal("LS");
            setActiveTab("To Be Assigned");
          }}
          className={
            superVal == "LS"
              ? "text-orange-400 font-semibold hover:cursor-pointer"
              : "simpleTab hover:cursor-pointer"
          }
        >
          Labor-Superintendent
        </span>
        <span
          onClick={() => {
            setSuperVal("LF");
            setActiveTab("Daily Jobs");
          }}
          className={
            superVal == "LF"
              ? "text-orange-400 font-semibold hover:cursor-pointer"
              : "simpleTab hover:cursor-pointer"
          }
        >
          Labor-Foreman
        </span>
      </div>
      <div className="flex flex-row justify-between pt-2 pb-2">
        {superVal == "LSU" ? (
          <h2 className={`${poppins.className} text-2xl font-bold`}>
            Labor - SuperUser
          </h2>
        ) : null}
        {superVal == "LS" ? (
          <h2 className={`${poppins.className} text-2xl font-bold`}>
            Labor-Superintendent
          </h2>
        ) : null}
        {superVal == "LF" ? (
          <h2 className={`${poppins.className} text-2xl font-bold`}>
            Labor-Foreman
          </h2>
        ) : null}
        {superVal == "LSU" ? (
          <button
            onClick={() => setDrawer(true)}
            className={`${poppins.className} p-2 bg-orange-400 text-white font-semibold rounded-xl`}
          >
            + Request Employees
          </button>
        ) : null}
      </div>
      <div className="flex flex-row gap-4 pt-2 pb-2">
        {superVal == "LS" ? (
          <span
            onClick={() => {
              setActiveTab("To Be Assigned");
            }}
            className={
              activeTab == "To Be Assigned"
                ? "text-orange-400 font-semibold hover:cursor-pointer"
                : "simpleTab hover:cursor-pointer"
            }
          >
            To Be Assigned
          </span>
        ) : null}
        {superVal == "LSU" ? (
          <>
            <span
              onClick={() => {
                setActiveTab("Jobs");
              }}
              className={
                activeTab == "Jobs"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "simpleTab hover:cursor-pointer"
              }
            >
              Jobs
            </span>
            <span
              onClick={() => {
                setActiveTab("Employees");
              }}
              className={
                activeTab == "Employees"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "simpleTab hover:cursor-pointer"
              }
            >
              Employees
            </span>
          </>
        ) : null}
        {superVal == "LS" ? (
          <span
            onClick={() => {
              setActiveTab("Employees");
            }}
            className={
              activeTab == "Employees"
                ? "text-orange-400 font-semibold hover:cursor-pointer"
                : "simpleTab hover:cursor-pointer"
            }
          >
            Employees
          </span>
        ) : null}
        {superVal == "LF" ? (
          <span
            onClick={() => {
              setActiveTab("Daily Jobs");
            }}
            className={
              activeTab == "Daily Jobs"
                ? "text-orange-400 font-semibold hover:cursor-pointer"
                : "simpleTab hover:cursor-pointer"
            }
          >
            Daily Jobs
          </span>
        ) : null}
      </div>
      {activeTab == "To Be Assigned" ? (
        loading ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-[500px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <div className="table-wrap">
            <ManpowerAssignTable
              loading={loading}
              allManpower={allManpower}
              refreshData={refreshData}
            />
          </div>
        )
      ) : null}
      {activeTab == "Jobs" && superVal == "LSU" ? (
        loading ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-[500px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <div className="table-wrap">
            <ManpowerTable
              loading={loading}
              allManpower={allManpower}
              refreshData={refreshData}
            />
          </div>
        )
      ) : null}
      {superVal == "LF" && activeTab == "Daily Jobs" ? (
        <ForemanTable
          loading={loading}
          allManpower={allManpower}
          refreshData={refreshData}
        />
      ) : null}
      {activeTab == "Employees" ? <ManpowerEmpTable /> : null}
      <ManpowerDrawer
        addManpower={addManpower}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  ) : (
    <section className={`${poppins.className} labor-wrap`}>
      <div className="flex flex-row justify-between">
        {(user !== null && user.userType == "admin") ||
        (user !== null && user.userType == "project manager") ? (
          <h2 className={`${poppins.className} text-2xl font-bold`}>
            Labor - SuperUser
          </h2>
        ) : null}
        {/* {user && user.userType == "superintendent" ? (
          <h2 className={poppins.className}>Labor-Superintendent</h2>
        ) : null} */}
        {user !== null && user.userType == "foreman" ? (
          <h2 className={`${poppins.className} text-2xl font-bold`}>
            Labor-Foreman
          </h2>
        ) : null}
        {activeTab == "Heads Up Jobs" &&
        user !== null &&
        user.userType == "heads up" &&
        loading == false ? (
          <>
            <h1 className={`${poppins.className} text-2xl font-bold`}>
              Labor-HUD-Jobs
            </h1>
          </>
        ) : null}
        {activeTab == "Heads Up Employees" &&
        user !== null &&
        user.userType == "heads up" ? (
          <>
            <h1 className={`${poppins.className} text-2xl font-bold`}>
              Labor-HUD-Employees
            </h1>
          </>
        ) : null}
        {(user !== null && user.userType == "admin") ||
        (user !== null && user.userType == "project manager") ? (
          <button
            onClick={() => setDrawer(true)}
            className={`${poppins.className} p-2 bg-orange-400 text-white font-semibold rounded-xl`}
          >
            + Request Employees
          </button>
        ) : null}
      </div>
      <div className="flex flex-row gap-4 pt-2 pb-2">
        {/* {user && user.userType == "superintendent" ? (
          <span
            onClick={() => {
              setActiveTab("To Be Assigned");
            }}
            className={
              activeTab == "To Be Assigned" ? "text-orange-400 font-semibold hover:cursor-pointer"
                : "simpleTab hover:cursor-pointer"
            }
          >
            To Be Assigned
          </span>
        ) : null} */}
        {(user !== null && user.userType == "admin") ||
        (user !== null && user.userType == "project manager") ? (
          <>
            <span
              onClick={() => {
                setActiveTab("Jobs");
              }}
              className={
                activeTab == "Jobs"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "simpleTab hover:cursor-pointer"
              }
            >
              Jobs
            </span>
            <span
              onClick={() => {
                setActiveTab("Employees");
              }}
              className={
                activeTab == "Employees"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "simpleTab hover:cursor-pointer"
              }
            >
              Employees
            </span>
          </>
        ) : null}
        {user !== null && user.userType == "heads up" ? (
          <>
            <span
              onClick={() => {
                setActiveTab("Heads Up Jobs");
              }}
              className={
                activeTab == "Heads Up Jobs"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "simpleTab hover:cursor-pointer"
              }
            >
              Jobs
            </span>
            <span
              onClick={() => {
                setActiveTab("Heads Up Employees");
              }}
              className={
                activeTab == "Heads Up Employees"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "simpleTab hover:cursor-pointer"
              }
            >
              Employees
            </span>
          </>
        ) : null}
        {/* {user && user.userType == "superintendent" ? (
          <span
            onClick={() => {
              setActiveTab("Employees");
            }}
            className={activeTab == "Employees" ? "text-orange-400 font-semibold hover:cursor-pointer"
                : "simpleTab hover:cursor-pointer"}
          >
            Employees
          </span>
        ) : null} */}
        {user !== null && user.userType == "foreman" ? (
          <span
            onClick={() => {
              setActiveTab("Daily Jobs");
            }}
            className={
              activeTab == "Daily Jobs"
                ? "text-orange-400 font-semibold hover:cursor-pointer"
                : "simpleTab hover:cursor-pointer"
            }
          >
            Daily Jobs
          </span>
        ) : null}
      </div>
      {activeTab == "To Be Assigned" ? (
        loading ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-[500px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <div className="table-wrap">
            <ManpowerAssignTable
              loading={loading}
              allManpower={allManpower}
              refreshData={refreshData}
            />
          </div>
        )
      ) : null}
      {(activeTab == "Jobs" && user !== null && user.userType == "admin") ||
      (user !== null && user.userType == "project manager") ? (
        loading ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-[500px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <div className="table-wrap">
            <ManpowerTable
              loading={loading}
              allManpower={allManpower}
              refreshData={refreshData}
            />
          </div>
        )
      ) : null}
      {user !== null &&
      user.userType == "foreman" &&
      activeTab == "Daily Jobs" ? (
        <ForemanTable
          loading={loading}
          allManpower={allManpower}
          refreshData={refreshData}
        />
      ) : null}
      {activeTab == "Employees" ? <ManpowerEmpTable /> : null}
      {activeTab == "Heads Up Jobs" &&
      user !== null &&
      user.userType == "heads up" &&
      loading == false &&
      allUsers.length ? (
        <>
          <HeadsUpTable allManpower={allManpower} allUsers={allUsers} />
        </>
      ) : null}
      {activeTab == "Heads Up Employees" &&
      user !== null &&
      user.userType == "heads up" ? (
        <>
          <HeadsUpEmpTable allManpower={allManpower} allUsers={allUsers} />
        </>
      ) : null}
      <ManpowerDrawer
        addManpower={addManpower}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default ManpowerComp;
