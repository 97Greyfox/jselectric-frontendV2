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
import axios, { all } from "axios";
import { apiPath } from "@/utils/routes";
import moment from "moment";
import "./cus-styles.scss";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function HeadsUpTable({ allManpower, allUsers }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [manpowerSorted, setManpowerSorted] = useState([]);
  const [workingEmpArr, setWorkingEmpArr] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/`)
      .then((res) => {
        var cusArrUserLabor = [];
        res.data.jobNumbers.forEach((element) => {
          allUsers.forEach((item) => {
            item.userLabor.forEach((inner) => {
              if (
                element.jobNumber == inner.job &&
                moment(new Date()).format("MM-DD-YYYY") >=
                  moment(inner.startDate).format("MM-DD-YYYY") &&
                moment(new Date()).format("MM-DD-YYYY") <=
                  moment(inner.endDate).format("MM-DD-YYYY")
              ) {
                console.log("inner", inner);
                console.log("timeEn", inner.timeEntries);

                inner.timeEntries.forEach((innEl) => {
                  console.log(innEl);
                  if (innEl.dayFlag) {
                    innEl.working = true;
                  } else {
                    console.log("here in false");

                    innEl.working = false;
                  }
                });
                const timeSlotArr = inner.timeEntries.map((i) => {
                  return {
                    job: inner.job,
                    assignedType: inner.foreman
                      ? "foreman"
                      : inner.journeyman
                      ? "journeyman"
                      : inner.apprentice
                      ? "apprentice"
                      : "construction",
                    ...i,
                  };
                });
                cusArrUserLabor = [...timeSlotArr, ...cusArrUserLabor];
              }
            });
          });
        });
        setWorkingEmpArr(cusArrUserLabor);
        var cusArr = [];
        res.data.jobNumbers.forEach((element) => {
          allManpower.forEach((inner) => {
            if (element.jobNumber == inner.job) {
              cusArr = [{ jobName: element.jobName, ...inner }, ...cusArr];
            }
          });
        });
        setLoading(false);
        const uniqueArray = Array.from(
          new Set(cusArr.map((o) => JSON.stringify(o)))
        ).map((str) => JSON.parse(str));
        console.log("this uniq", uniqueArray);
        var date = new Date(moment().format());
        date.setDate(date.getDate());
        var todaySec = date.getTime() / 1000;
        // console.log("@@@@", inner.startDate);
        // var jobStartSec = new Date(inner.startDate).getTime() / 1000;
        // var jobEndSec = new Date(inner.endDate).getTime() / 1000;

        const newSortedArr = uniqueArray
          .filter((i) => todaySec > new Date(i.startDate).getTime() / 1000)
          .filter((i) => todaySec < new Date(i.endDate).getTime() / 1000);
        console.log("@##@#@#", newSortedArr);

        setManpowerSorted(newSortedArr);
        // const sortedJobNumbers = res.data.jobNumbers
        //   .map((i) => {
        //     return {
        //       label: i.jobNumber,
        //       value: i.jobNumber,
        //     };
        //   })
        //   .sort((a, b) => a.label.localeCompare(b.label));
        // setJobOpt(sortedJobNumbers)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [allManpower]);
  console.log("#########", workingEmpArr);
  return (
    <section>
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <section className="heads-up-job">
          {manpowerSorted.length ? (
            manpowerSorted.map((i) => {
              return (
                <div key={i._id} className="card-wrap">
                  <div className="mini-card">
                    <div className="mini-sec">
                      <h1>R</h1>
                      <p>{i.requiredEmp.foreman.noOfEmp}</p>
                    </div>
                    <div className={"mini-sec"}>
                      <h1>A</h1>
                      <p>{i.assignedEmp.foreman.noOfEmp}</p>
                    </div>
                    <div
                      className={
                        workingEmpArr
                          .filter((inner) => inner.jobName == i.job)
                          .filter((inner) => inner.assignedType == "foreman")
                          .filter(
                            (inner) =>
                              moment(inner.date).format("MM-DD-YYYY") ==
                              moment(new Date()).format("MM-DD-YYYY")
                          )
                          .filter((inner) => inner[0].working == true).length >
                        i.requiredEmp.construction.noOfEmp
                          ? "mini-sec red-bg"
                          : "mini-sec"
                      }
                    >
                      <h1>W</h1>
                      <p>
                        {
                          workingEmpArr
                            .filter((inner) => inner.job == i.job)
                            .filter((inner) => inner.assignedType == "foreman")
                            .filter(
                              (inner) =>
                                moment(inner.date).format("MM-DD-YYYY") ==
                                moment(new Date()).format("MM-DD-YYYY")
                            )
                            .filter((inner) => inner.working == true).length
                        }
                      </p>
                    </div>
                    <div className="type-mini">
                      <h1>F</h1>
                    </div>
                  </div>
                  <div className="mini-card">
                    <div className="mini-sec">
                      <h1>R</h1>
                      <p>{i.requiredEmp.journeyman.noOfEmp}</p>
                    </div>
                    <div className="mini-sec">
                      <h1>A</h1>
                      <p>{i.assignedEmp.journeyman.noOfEmp}</p>
                    </div>
                    <div
                      className={
                        workingEmpArr
                          .filter((inner) => inner.jobName == i.job)
                          .filter((inner) => inner.same == "journeyman")
                          .filter((inner) => inner.working == true).length >
                        i.requiredEmp.construction.noOfEmp
                          ? "mini-sec red-bg"
                          : "mini-sec"
                      }
                    >
                      <h1>W</h1>
                      <p>
                        {
                          workingEmpArr
                            .filter((inner) => inner.job == i.job)
                            .filter(
                              (inner) => inner.assignedType == "journeyman"
                            )
                            .filter(
                              (inner) =>
                                moment(inner.date).format("MM-DD-YYYY") ==
                                moment(new Date()).format("MM-DD-YYYY")
                            )
                            .filter((inner) => inner.working == true).length
                        }
                      </p>
                    </div>
                    <div className="type-mini">
                      <h1>J</h1>
                    </div>
                  </div>
                  <div className="middle">
                    <h1>{i.job}</h1>
                    <p>{i.jobName}</p>
                  </div>
                  <div className="mini-card">
                    <div className="mini-sec">
                      <h1>R</h1>
                      <p>{i.requiredEmp.apprentice.noOfEmp}</p>
                    </div>
                    <div className="mini-sec">
                      <h1>A</h1>
                      <p>{i.assignedEmp.apprentice.noOfEmp}</p>
                    </div>
                    <div
                      className={
                        workingEmpArr
                          .filter((inner) => inner.jobName == i.job)
                          .filter((inner) => inner.same == "apprentice")
                          .filter((inner) => inner.working == true).length >
                        i.requiredEmp.construction.noOfEmp
                          ? "mini-sec red-bg"
                          : "mini-sec"
                      }
                    >
                      <h1>W</h1>
                      <p>
                        {
                          workingEmpArr
                            .filter((inner) => inner.job == i.job)
                            .filter(
                              (inner) => inner.assignedType == "apprentice"
                            )
                            .filter(
                              (inner) =>
                                moment(inner.date).format("MM-DD-YYYY") ==
                                moment(new Date()).format("MM-DD-YYYY")
                            )
                            .filter((inner) => inner.working == true).length
                        }
                      </p>
                    </div>
                    <div className="type-mini">
                      <h1>A</h1>
                    </div>
                  </div>
                  <div className="mini-card">
                    <div className="mini-sec">
                      <h1>R</h1>
                      <p>{i.requiredEmp.construction.noOfEmp}</p>
                    </div>
                    <div className="mini-sec">
                      <h1>A</h1>
                      <p>{i.assignedEmp.construction.noOfEmp}</p>
                    </div>
                    <div
                      className={
                        workingEmpArr
                          .filter((inner) => inner.jobName == i.job)
                          .filter((inner) => inner.same == "construction")
                          .filter((inner) => inner.working == true).length >
                        i.requiredEmp.construction.noOfEmp
                          ? "mini-sec red-bg"
                          : "mini-sec"
                      }
                    >
                      <h1>W</h1>
                      <p>
                        {
                          workingEmpArr
                            .filter((inner) => inner.job == i.job)
                            .filter(
                              (inner) => inner.assignedType == "construction"
                            )
                            .filter(
                              (inner) =>
                                moment(inner.date).format("MM-DD-YYYY") ==
                                moment(new Date()).format("MM-DD-YYYY")
                            )
                            .filter((inner) => inner.working == true).length
                        }
                      </p>
                    </div>
                    <div className="type-mini">
                      <h1>C</h1>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Data Found</p>
          )}
        </section>
      )}
    </section>
  );
}
