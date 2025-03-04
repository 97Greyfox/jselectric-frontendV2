import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import moment from "moment";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function HeadsUpEmpTable({ allManpower, allUsers }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [manpowerSorted, setManpowerSorted] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/`)
      .then((res) => {
        var cusArr = [];
        res.data.jobNumbers.forEach((element) => {
          allUsers.forEach((item) => {
            item.userLabor.forEach((inner) => {
              if (element.jobNumber == inner.job) {
                console.log("userType", item);
                cusArr = [
                  {
                    jobName: element.jobName,
                    fullname: item.fullname,
                    userType: item.userType,
                    same: inner.foreman
                      ? "foreman"
                      : inner.journeyman
                      ? "journeyman"
                      : inner.apprentice
                      ? "apprentice"
                      : "construction",
                    ...inner,
                  },
                  ...cusArr,
                ];
              }
            });
          });
        });
        setLoading(false);
        const uniqueArray = Array.from(
          new Set(cusArr.map((o) => JSON.stringify(o)))
        ).map((str) => JSON.parse(str));
        console.log("!!! uniq", uniqueArray);
        var date = new Date(moment().format());
        date.setDate(date.getDate());
        var todaySec = date.getTime() / 1000;
        // console.log("@@@@", inner.startDate);
        // var jobStartSec = new Date(inner.startDate).getTime() / 1000;
        // var jobEndSec = new Date(inner.endDate).getTime() / 1000;

        const newSortedArr = uniqueArray
          .filter((i) => todaySec > new Date(i.startDate).getTime() / 1000)
          .filter((i) => todaySec < new Date(i.endDate).getTime() / 1000);
        if (activeTab == "All") {
          setManpowerSorted(newSortedArr);
        }
        if (activeTab == "Foreman") {
          setManpowerSorted(newSortedArr.filter((i) => i.foreman == true));
        }
        if (activeTab == "Journeyman") {
          setManpowerSorted(newSortedArr.filter((i) => i.journeyman == true));
        }
        if (activeTab == "Apprentice") {
          setManpowerSorted(newSortedArr.filter((i) => i.apprentice == true));
        }
        if (activeTab == "Construction") {
          setManpowerSorted(newSortedArr.filter((i) => i.construction == true));
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [allManpower, allUsers]);
  const handleActiveTabs = (tab) => {
    setActiveTab(
      tab == "all"
        ? "All"
        : tab == "foreman"
        ? "Foreman"
        : tab == "journeyman"
        ? "Journeyman"
        : tab == "apprentice"
        ? "Apprentice"
        : "Construction"
    );
    if (tab == "foreman") {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/jobNumber/`)
        .then((res) => {
          var cusArr = [];
          res.data.jobNumbers.forEach((element) => {
            allUsers.forEach((item) => {
              item.userLabor.forEach((inner) => {
                if (element.jobNumber == inner.job) {
                  cusArr = [
                    {
                      jobName: element.jobName,
                      fullname: item.fullname,
                      userType: item.userType,
                      same: inner.foreman
                        ? "foreman"
                        : inner.journeyman
                        ? "journeyman"
                        : inner.apprentice
                        ? "apprentice"
                        : "construction",

                      ...inner,
                    },
                    ...cusArr,
                  ];
                }
              });
            });
          });
          setLoading(false);
          const uniqueArray = Array.from(
            new Set(cusArr.map((o) => JSON.stringify(o)))
          ).map((str) => JSON.parse(str));
          var date = new Date(moment().format());
          date.setDate(date.getDate() - 1);
          var todaySec = date.getTime() / 1000;
          const newSortedArr = uniqueArray
            .filter((i) => todaySec > new Date(i.startDate).getTime() / 1000)
            .filter((i) => todaySec < new Date(i.endDate).getTime() / 1000);
          setManpowerSorted(newSortedArr.filter((i) => i.foreman == true));
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    if (tab == "journeyman") {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/jobNumber/`)
        .then((res) => {
          var cusArr = [];
          res.data.jobNumbers.forEach((element) => {
            allUsers.forEach((item) => {
              item.userLabor.forEach((inner) => {
                if (element.jobNumber == inner.job) {
                  cusArr = [
                    {
                      jobName: element.jobName,
                      fullname: item.fullname,
                      userType: item.userType,
                      same: inner.foreman
                        ? "foreman"
                        : inner.journeyman
                        ? "journeyman"
                        : inner.apprentice
                        ? "apprentice"
                        : "construction",

                      ...inner,
                    },
                    ...cusArr,
                  ];
                }
              });
            });
          });
          setLoading(false);
          const uniqueArray = Array.from(
            new Set(cusArr.map((o) => JSON.stringify(o)))
          ).map((str) => JSON.parse(str));
          var date = new Date(moment().format());
          date.setDate(date.getDate() - 1);
          var todaySec = date.getTime() / 1000;
          const newSortedArr = uniqueArray
            .filter((i) => todaySec > new Date(i.startDate).getTime() / 1000)
            .filter((i) => todaySec < new Date(i.endDate).getTime() / 1000);
          setManpowerSorted(newSortedArr.filter((i) => i.journeyman == true));
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    if (tab == "apprentice") {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/jobNumber/`)
        .then((res) => {
          var cusArr = [];
          res.data.jobNumbers.forEach((element) => {
            allUsers.forEach((item) => {
              item.userLabor.forEach((inner) => {
                if (element.jobNumber == inner.job) {
                  cusArr = [
                    {
                      jobName: element.jobName,
                      fullname: item.fullname,
                      userType: item.userType,
                      same: inner.foreman
                        ? "foreman"
                        : inner.journeyman
                        ? "journeyman"
                        : inner.apprentice
                        ? "apprentice"
                        : "construction",

                      ...inner,
                    },
                    ...cusArr,
                  ];
                }
              });
            });
          });
          setLoading(false);
          const uniqueArray = Array.from(
            new Set(cusArr.map((o) => JSON.stringify(o)))
          ).map((str) => JSON.parse(str));
          var date = new Date(moment().format());
          date.setDate(date.getDate() - 1);
          var todaySec = date.getTime() / 1000;
          const newSortedArr = uniqueArray
            .filter((i) => todaySec > new Date(i.startDate).getTime() / 1000)
            .filter((i) => todaySec < new Date(i.endDate).getTime() / 1000);
          setManpowerSorted(newSortedArr.filter((i) => i.apprentice == true));
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    if (tab == "construction") {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/jobNumber/`)
        .then((res) => {
          var cusArr = [];
          res.data.jobNumbers.forEach((element) => {
            allUsers.forEach((item) => {
              item.userLabor.forEach((inner) => {
                if (element.jobNumber == inner.job) {
                  cusArr = [
                    {
                      jobName: element.jobName,
                      fullname: item.fullname,
                      userType: item.userType,
                      same: inner.foreman
                        ? "foreman"
                        : inner.journeyman
                        ? "journeyman"
                        : inner.apprentice
                        ? "apprentice"
                        : "construction",

                      ...inner,
                    },
                    ...cusArr,
                  ];
                }
              });
            });
          });
          setLoading(false);
          const uniqueArray = Array.from(
            new Set(cusArr.map((o) => JSON.stringify(o)))
          ).map((str) => JSON.parse(str));
          var date = new Date(moment().format());
          date.setDate(date.getDate() - 1);
          var todaySec = date.getTime() / 1000;
          const newSortedArr = uniqueArray
            .filter((i) => todaySec > new Date(i.startDate).getTime() / 1000)
            .filter((i) => todaySec < new Date(i.endDate).getTime() / 1000);
          setManpowerSorted(newSortedArr.filter((i) => i.construction == true));
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    if (tab == "all") {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/jobNumber/`)
        .then((res) => {
          var cusArr = [];
          res.data.jobNumbers.forEach((element) => {
            allUsers.forEach((item) => {
              item.userLabor.forEach((inner) => {
                if (element.jobNumber == inner.job) {
                  cusArr = [
                    {
                      jobName: element.jobName,
                      fullname: item.fullname,
                      userType: item.userType,
                      same: inner.foreman
                        ? "foreman"
                        : inner.journeyman
                        ? "journeyman"
                        : inner.apprentice
                        ? "apprentice"
                        : "construction",

                      ...inner,
                    },
                    ...cusArr,
                  ];
                }
              });
            });
          });
          setLoading(false);
          const uniqueArray = Array.from(
            new Set(cusArr.map((o) => JSON.stringify(o)))
          ).map((str) => JSON.parse(str));
          var date = new Date(moment().format());
          date.setDate(date.getDate() - 1);
          var todaySec = date.getTime() / 1000;
          const newSortedArr = uniqueArray
            .filter((i) => todaySec > new Date(i.startDate).getTime() / 1000)
            .filter((i) => todaySec < new Date(i.endDate).getTime() / 1000);
          setManpowerSorted(newSortedArr);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  return (
    <>
      <div className="top-heads-up-tab">
        <span
          onClick={() => handleActiveTabs("all")}
          className={activeTab == "All" ? "activeLink" : "simpleLink"}
        >
          All
        </span>
        <span
          onClick={() => handleActiveTabs("foreman")}
          className={activeTab == "Foreman" ? "activeLink" : "simpleLink"}
        >
          Foreman
        </span>
        <span
          onClick={() => handleActiveTabs("journeyman")}
          className={activeTab == "Journeyman" ? "activeLink" : "simpleLink"}
        >
          Journeyman
        </span>
        <span
          onClick={() => handleActiveTabs("apprentice")}
          className={activeTab == "Apprentice" ? "activeLink" : "simpleLink"}
        >
          Apprentice
        </span>
        <span
          onClick={() => handleActiveTabs("construction")}
          className={activeTab == "Construction" ? "activeLink" : "simpleLink"}
        >
          Construction
        </span>
      </div>

      <section className="heads-up-job">
        <div className="heads-up-emp-wrap">
          {loading ? (
            <p>Loading</p>
          ) : manpowerSorted.length ? (
            manpowerSorted.map((i) => {
              return (
                <div
                  className={
                    i.userType == i.same ? "emp-cards" : "emp-cards border-red"
                  }
                  key={`${i._id}-${i.manpowerId}`}
                >
                  <p className="top-colored">{i.job}</p>
                  <h1>{i.fullname}</h1>
                  <h2>
                    <strong>User Type: </strong>
                    {i.userType}
                  </h2>
                  <h2>
                    <strong>Job Type: </strong>
                    {i.foreman
                      ? "Foreman"
                      : i.journeyman
                      ? "Journeyman"
                      : i.apprentice
                      ? "Apprentice"
                      : "Construction"}
                  </h2>
                  <h2>{moment(i.startDate).format("MM-DD-YYYY")}</h2>
                  <h2>{i.jobName}</h2>
                </div>
              );
            })
          ) : (
            <p>No Data found</p>
          )}
        </div>
      </section>
    </>
  );
}
