import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import moment from "moment";
import Swal from "sweetalert2";
import { Modal } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
function LaborAssignModal({ open, onClose, item, refreshData }) {
  const [type, setType] = useState("");
  const [userOpt, setUserOpt] = useState("");
  const [loadingUser, setLoadingUser] = useState(false);
  const [foreman, setForeman] = useState("");
  const [oldForeman, setOldForeman] = useState("");
  const [journeyman, setJourneyman] = useState("");
  const [odlJourneyman, setOldJourneyman] = useState("");
  const [apprentice, setApprentice] = useState("");
  const [oldApprentice, setOldApprentice] = useState("");
  const [construction, setConstruction] = useState("");
  const [oldConstruction, setOldConstruction] = useState("");
  useEffect(() => {
    console.log("this is item", item);
    setLoadingUser(true);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const sortedUser = res.data.allUsers
          .filter((i) => i.userStatus == "Active")
          .map((i) => {
            return {
              label: i.fullname,
              value: i.fullname,
              userType: i.userType,
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label));
        setLoadingUser(false);
        setUserOpt(sortedUser);
      })
      .catch((err) => {
        console.log(err);
        setLoadingUser(false);
      });
    if (
      item.assignedEmp.foreman.employees &&
      item.assignedEmp.foreman.employees.length
    ) {
      const foremanArrSort = item.assignedEmp.foreman.employees.map((i) => {
        return { label: i.fullname, value: i.fullname };
      });
      setForeman(foremanArrSort);
      setOldForeman(foremanArrSort);
    }
    if (
      item.assignedEmp.journeyman.employees &&
      item.assignedEmp.journeyman.employees.length
    ) {
      const journeymanArrSort = item.assignedEmp.journeyman.employees.map(
        (i) => {
          return { label: i.fullname, value: i.fullname };
        }
      );
      setJourneyman(journeymanArrSort);
      setOldJourneyman(journeymanArrSort);
    }
    if (
      item.assignedEmp.apprentice.employees &&
      item.assignedEmp.apprentice.employees.length
    ) {
      const apprenticeArrSort = item.assignedEmp.apprentice.employees.map(
        (i) => {
          return { label: i.fullname, value: i.fullname };
        }
      );
      setApprentice(apprenticeArrSort);
      setOldApprentice(apprenticeArrSort);
    }
    if (
      item.assignedEmp.construction.employees &&
      item.assignedEmp.construction.employees.length
    ) {
      const constructionArrSort = item.assignedEmp.construction.employees.map(
        (i) => {
          return { label: i.fullname, value: i.fullname };
        }
      );
      setConstruction(constructionArrSort);
      setOldConstruction(constructionArrSort);
    }
  }, [open]);
  const getDates = (start, end) => {
    const arr = [];
    for (
      const dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };
  const handleAssignEmp = (e) => {
    e.preventDefault();
    // if (foreman.length > item.requiredEmp.foreman.noOfEmp) {
    //   Swal.fire({
    //     icon: "error",
    //     text: "Foreman Required Exceeded",
    //   });
    // } else if (journeyman.length > item.requiredEmp.journeyman.noOfEmp) {
    //   Swal.fire({
    //     icon: "error",
    //     text: "Journeyman Required Exceeded",
    //   });
    // } else if (apprentice.length > item.requiredEmp.apprentice.noOfEmp) {
    //   Swal.fire({
    //     icon: "error",
    //     text: "Apprentice Required Exceeded",
    //   });
    // } else if (construction.length > item.requiredEmp.construction.noOfEmp) {
    //   Swal.fire({
    //     icon: "error",
    //     text: "construction Required Exceeded",
    //   });
    // }
    // else {
    const dateArr = getDates(item.startDate, item.endDate);
    const sortedDateArr = dateArr.map((i) => {
      return {
        date: i,
        checkedIn: "",
        checkedOut: "",
        lunchTimeStart: "",
        lunchTimeEnd: "",
        checkedOut: "",
        dayFlag: false,
        dayName: i.toLocaleString("en-us", { weekday: "long" }),
        reimbursal: [],
        notes: "",
      };
    });
    const foremanArr = foreman.length
      ? foreman.map((i) => {
          return { fullname: i.label };
        })
      : [];
    const journeymanArr = journeyman.length
      ? journeyman.map((i) => {
          return { fullname: i.label };
        })
      : [];
    const apprenticeArr = apprentice.length
      ? apprentice.map((i) => {
          return { fullname: i.label };
        })
      : [];
    const constructionArr = construction.length
      ? construction.map((i) => {
          return { fullname: i.label };
        })
      : [];
    const assignedEmp = {
      foreman: {
        employees: foremanArr,
      },
      journeyman: {
        employees: journeymanArr,
      },
      apprentice: {
        employees: apprenticeArr,
      },
      construction: {
        employees: constructionArr,
      },
    };
    const userForemanObj = {
      job: item.job,
      startDate: item.startDate,
      endDate: item.endDate,
      foreman: foremanArr,
      shiftStartTime: item.shiftStartTime,
      shiftEndTime: item.shiftEndTime,
      manpowerId: item._id,
      timeEntries: sortedDateArr,
    };
    const userJourneymanObj = {
      job: item.job,
      startDate: item.startDate,
      endDate: item.endDate,
      journeyman: journeymanArr,
      shiftStartTime: item.shiftStartTime,
      shiftEndTime: item.shiftEndTime,
      manpowerId: item._id,
      timeEntries: sortedDateArr,
    };
    const userApprenticeObj = {
      job: item.job,
      startDate: item.startDate,
      endDate: item.endDate,
      apprentice: apprenticeArr,
      shiftStartTime: item.shiftStartTime,
      shiftEndTime: item.shiftEndTime,
      manpowerId: item._id,
      timeEntries: sortedDateArr,
    };
    const userConstructionObj = {
      job: item.job,
      startDate: item.startDate,
      endDate: item.endDate,
      construction: constructionArr,
      shiftStartTime: item.shiftStartTime,
      shiftEndTime: item.shiftEndTime,
      manpowerId: item._id,
      timeEntries: sortedDateArr,
    };
    // const userLaborObj = {
    //   job: item.job,
    //   startDate: item.startDate,
    //   endDate: item.endDate,
    //   foreman: foremanArr,
    //   journeyman: journeymanArr,
    //   apprentice: apprenticeArr,
    //   construction: constructionArr,
    // };
    axios
      .patch(
        `${apiPath.prodPath}/api/manpower/assignEmployee/${item.id}`,
        assignedEmp
      )
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Error occurred while assigning employee",
          });
        } else {
          const dataObjFor = {
            oldForeman: oldForeman.length
              ? oldForeman.map((i) => {
                  return { fullname: i.label, manpowerId: item._id };
                })
              : [],
            userForemanObj,
          };
          axios
            .put(`${apiPath.prodPath}/api/users/assignForeman/`, dataObjFor)
            .then((res) => {
              if (res.data.error) {
                Swal.fire({
                  icon: "error",
                  text: "Error occurred while assigning employee",
                });
              } else {
                refreshData();
              }
            })
            .catch((err) => console.log(err));

          const dataObjJou = {
            oldJourneyman: odlJourneyman.length
              ? odlJourneyman.map((i) => {
                  return { fullname: i.label, manpowerId: item._id };
                })
              : [],
            userJourneymanObj,
          };
          axios
            .put(`${apiPath.prodPath}/api/users/assignJourneyman/`, dataObjJou)
            .then((res) => {
              if (res.data.error) {
                Swal.fire({
                  icon: "error",
                  text: "Error occurred while assigning employee",
                });
              } else {
                refreshData();
              }
            })
            .catch((err) => console.log(err));
        }

        const dataObjApp = {
          oldApprentice: oldApprentice.length
            ? oldApprentice.map((i) => {
                return { fullname: i.label, manpowerId: item._id };
              })
            : [],
          userApprenticeObj,
        };
        axios
          .put(`${apiPath.prodPath}/api/users/assignApprentice/`, dataObjApp)
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Error occurred while assigning employee",
              });
            } else {
              refreshData();
            }
          })
          .catch((err) => console.log(err));

        const dataObjCon = {
          oldConstruction: oldConstruction.length
            ? oldConstruction.map((i) => {
                return { fullname: i.label, manpowerId: item._id };
              })
            : [],
          userConstructionObj,
        };
        axios
          .put(`${apiPath.prodPath}/api/users/assignConstruction/`, dataObjCon)
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Error occurred while assigning employee",
              });
            } else {
              refreshData();
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // }
  };
  const typeOpt = [
    { label: "foreman", value: "foreman" },
    { label: "journeyman", value: "journeyman" },
    { label: "apprentice", value: "apprentice" },
    { label: "construction", value: "construction" },
  ];
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div className="bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll">
        <div className="mb-10">
          <Button
            onClick={() => onClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Assign Employee</h1>
          </Button>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h1>{item.notes == "" ? "No Notes available" : item.notes}</h1>
        </div>
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold text-md">Job Name</label>
            <p>{item.job}</p>
          </div>
          {/* <div className="flex flex-col w-1/4 gap-2">
            <label>Job Type</label>
            <p>{item.requiredEmp.foreman.noOfEmp == 0 ? null : "Foreman"}</p>
            <p>
              {item.requiredEmp.journeyman.noOfEmp == 0 ? null : "Journeyman"}
            </p>
            <p>
              {item.requiredEmp.apprentice.noOfEmp == 0 ? null : "Apprentice"}
            </p>
            <p>
              {item.requiredEmp.construction.noOfEmp == 0
                ? null
                : "Construction"}
            </p>
          </div> */}
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold text-md">Requested Dates</label>
            <p className="date-format-wrap">
              <span>{moment(item.startDate).format("MM/DD/YYYY")}</span> -
              <span>{moment(item.endDate).format("MM/DD/YYYY")}</span>
            </p>
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold text-md">Requested Employees</label>
            <p>{item.requiredEmp.foreman.noOfEmp} - Foreman</p>
            <p>{item.requiredEmp.journeyman.noOfEmp} - Journeyman</p>
            <p>{item.requiredEmp.apprentice.noOfEmp} - Apprentice</p>
            <p>{item.requiredEmp.construction.noOfEmp} - Construction</p>
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold text-md">Assigned Employees</label>
            <p>{item.assignedEmp.foreman.noOfEmp} - Foreman</p>
            <p>{item.assignedEmp.journeyman.noOfEmp} - Journeyman</p>
            <p>{item.assignedEmp.apprentice.noOfEmp} - Apprentice</p>
            <p>{item.assignedEmp.construction.noOfEmp} - Construction</p>
          </div>
        </div>
        <div className="form-wrap-assign">
          {!loadingUser ? (
            <form onSubmit={handleAssignEmp}>
              <div className="flex flex-col gap-2 pb-2">
                <label className="font-semibold text-md">
                  Employees For Foreman
                </label>
                <Select
                  isMulti={true}
                  // options={
                  //   userOpt && userOpt.filter((i) => i.userType == "foreman")
                  // }
                  options={userOpt}
                  value={foreman}
                  onChange={(v) => setForeman(v)}
                  className="employee-names"
                />
              </div>
              <div className="flex flex-col gap-2 pb-2">
                <label className="font-semibold text-md">
                  Employees For Journeyman
                </label>
                <Select
                  isMulti={true}
                  // options={
                  //   userOpt && userOpt.filter((i) => i.userType == "journeyman")
                  // }
                  options={userOpt}
                  value={journeyman}
                  onChange={(v) => setJourneyman(v)}
                  className="employee-names"
                />
              </div>
              <div className="flex flex-col gap-2 pb-2">
                <label className="font-semibold text-md">
                  Employees For Apprentice
                </label>
                <Select
                  isMulti={true}
                  // options={
                  //   userOpt && userOpt.filter((i) => i.userType == "Apprentice")
                  // }
                  options={userOpt}
                  value={apprentice}
                  onChange={(v) => setApprentice(v)}
                  className="employee-names"
                />
              </div>
              <div className="flex flex-col gap-2 pb-2">
                <label className="font-semibold text-md">
                  Employees For Construction
                </label>
                <Select
                  isMulti={true}
                  // options={
                  //   userOpt &&
                  //   userOpt.filter((i) => i.userType == "construction")
                  // }
                  options={userOpt}
                  value={construction}
                  onChange={(v) => setConstruction(v)}
                  className="employee-names"
                />
              </div>
              <div className="flex flex-row justify-end pt-10">
                <input
                  className="p-2 text-lg font-semibold bg-orange-400 text-white rounded-xl"
                  type="submit"
                  value={"Assign Employees"}
                />
              </div>
            </form>
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default LaborAssignModal;
