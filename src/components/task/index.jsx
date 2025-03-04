"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
import { useRouter } from "next/navigation";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment";
import TaskDrawer from "../drawers/taskDrawer";
import TaskTable from "../tables/taskTable";

function Task({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("Task Assigned");
  const [taskCategoryOpt, setTaskCategoryOpt] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false);
  const [searchForm, setSearchForm] = useState({
    taskCategory: "",
    currentDate: "",
    description: "",
  });
  const [usersOpt, setUserOpt] = useState([]);
  const [userFilter, setUserFilter] = useState(false);
  const [userValue, setUserValue] = useState("");
  const [assignToValue, setAssignToValue] = useState("");
  const assignToOpt = [
    { label: "Assigned To", value: "Assigned To" },
    { label: "Assigned By", value: "Assigned By" },
  ];
  const [superComp, setSuperComp] = useState("all");
  const router = useRouter();
  useEffect(() => {
    if (user == undefined || user == null) {
      router.push("/login");
    } else {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/task/`)
        .then((res) => {
          if (
            user.fullname == "Kevin Baumhover" ||
            user.fullname == "Jamie Schmidt" ||
            user.fullname == "Ralph Macias	"
          ) {
            setAllTasks(res.data.allTasks);
          } else {
            var tasks = [];
            res.data.allTasks.forEach((element) => {
              element.assignedTo.forEach((innerEl) => {
                if (innerEl.fullname == user.fullname) {
                  tasks = [element, ...tasks];
                  return tasks;
                }
              });
            });
            const taskWithoutComp = tasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(taskWithoutComp);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      const intervalRefresh = setInterval(() => {
        dataRefreshInterval();
      }, 300000);
      axios
        .get(`${apiPath.prodPath}/api/users/`)
        .then((res) => {
          setUserOpt(
            res.data.allUsers.map((i) => {
              return { label: i.fullname, value: i.fullname };
            })
          );
        })
        .catch((err) => console.log(err));
      axios
        .get(`${apiPath.prodPath}/api/taskCategory/`)
        .then((res) => {
          setTaskCategoryOpt(
            res.data.taskCategory.map((i) => {
              return { label: i.name, value: i.name };
            })
          );
        })
        .catch((err) => console.log(err));
      return () => clearInterval(intervalRefresh);
    }
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const dataRefreshInterval = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        if (
          user.fullname == "Kevin Baumhover" ||
          user.fullname == "Jamie Schmidt" ||
          user.fullname == "Ralph Macias	"
        ) {
          setAllTasks(res.data.allTasks);
        } else {
          var tasks = [];
          res.data.allTasks.forEach((element) => {
            element.assignedTo.forEach((innerEl) => {
              if (innerEl.fullname == user.fullname) {
                tasks = [element, ...tasks];
                return tasks;
              }
            });
          });
          const taskWithoutComp = tasks.filter(
            (i) => i.taskStatus !== "Completed"
          );
          setAllTasks(taskWithoutComp);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        if (
          user !== null &&
          user !== undefined &&
          (user.fullname == "Kevin Baumhover" ||
            user.fullname == "Jamie Schmidt" ||
            user.fullname == "Ralph Macias")
        ) {
          if (superComp == "all") {
            setAllTasks(res.data.allTasks);
          }
          if (superComp == "completed") {
            const filteredTasksComp = res.data.allTasks.filter(
              (i) => i.taskStatus == "Completed"
            );
            setAllTasks(filteredTasksComp);
          }
          if (superComp == "inprogress") {
            const filteredTasksComp = res.data.allTasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(filteredTasksComp);
          }
          setLoading(false);
        } else {
          if (activeTab == "Task Assigned") {
            var tasks = [];
            res.data.allTasks.forEach((element) => {
              element.assignedTo.forEach((innerEl) => {
                if (innerEl.fullname == user.fullname) {
                  tasks = [element, ...tasks];
                  return tasks;
                }
              });
            });
            const taskWithoutComp = tasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(taskWithoutComp);
            setLoading(false);
          } else if (activeTab == "Task Created") {
            const filteredTasks = res.data.allTasks.filter(
              (inner) => inner.user == user.fullname
            );
            const taskCreatedWithoutComp = filteredTasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(taskCreatedWithoutComp);
            setLoading(false);
          } else {
            const filteredTasks = res.data.allTasks
              .filter((inner) => inner.taskStatus == "Completed")
              .filter((inner) => inner.user == user.fullname);
            setAllTasks(filteredTasks);
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleAddTask = (data, id, userEmails) => {
    axios.post(`${apiPath.prodPath}/api/task/addTask`, data).then((res) => {
      if (res.data.error) {
        Swal.fire({
          icon: "error",
          text: "Error Adding Task try again",
        });
      } else {
        Swal.fire({
          icon: "success",
          text: "Added Successfully",
        });
        refreshData();
        setDrawer(false);
        sendEmails(data, [...userEmails]);
      }
    });
  };
  const sendEmails = (data, emails) => {
    if (window && window !== undefined) {
      fetch(`${window.location.origin}/api/newTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emails, taskData: data }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  const handleTaskAssigned = () => {
    setActiveTab("Task Assigned");
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        var tasks = [];
        res.data.allTasks.forEach((element) => {
          element.assignedTo.forEach((innerEl) => {
            if (innerEl.fullname == user.fullname) {
              tasks = [element, ...tasks];
              return tasks;
            }
          });
        });
        const taskWithoutComp = tasks.filter(
          (i) => i.taskStatus !== "Completed"
        );
        setAllTasks(taskWithoutComp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleTaskCreated = () => {
    setActiveTab("Task Created");
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        const filteredTasks = res.data.allTasks.filter(
          (inner) => inner.user == user.fullname
        );
        const taskCreatedWithoutComp = filteredTasks.filter(
          (i) => i.taskStatus !== "Completed"
        );
        setAllTasks(taskCreatedWithoutComp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleTaskCategory = (value) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        taskCategory: value,
      };
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `${apiPath.prodPath}/api/task/?taskCategory=${
          searchForm.taskCategory.value == undefined
            ? ""
            : searchForm.taskCategory.value
        }&currentDate=${
          searchForm.currentDate == ""
            ? ""
            : moment(searchForm.currentDate).format("YYYY-MM-DD")
        }&description=${searchForm.description}`
      )
      .then((res) => {
        if (
          user !== null &&
          user !== undefined &&
          (user.fullname == "Kevin Baumhover" ||
            user.fullname == "Jamie Schmidt" ||
            user.fullname == "Ralph Macias")
        ) {
          setAllTasks(res.data.allTasks);
          setLoading(false);
        } else {
          if (activeTab == "Task Assigned") {
            var tasks = [];
            res.data.allTasks.forEach((element) => {
              element.assignedTo.forEach((innerEl) => {
                if (innerEl.fullname == user.fullname) {
                  tasks = [element, ...tasks];
                  return tasks;
                }
              });
            });
            const taskWithoutComp = tasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(taskWithoutComp);
            setLoading(false);
          } else if (activeTab == "Task Created") {
            const filteredTasks = res.data.allTasks.filter(
              (inner) => inner.user == user.fullname
            );
            const taskCreatedWithoutComp = filteredTasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(taskCreatedWithoutComp);
            setLoading(false);
          } else {
            const filteredTasks = res.data.allTasks
              .filter((inner) => inner.taskStatus == "Completed")
              .filter((inner) => inner.user == user.fullname);
            setAllTasks(filteredTasks);
            setLoading(false);
          }
        }
      })
      .catch((err) => console.log(err));
  };
  const handleDate = (value) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        currentDate: value,
      };
    });
  };
  const handleDesc = (e) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };
  const handleClear = () => {
    setSearchForm({
      taskCategory: "",
      currentDate: "",
      description: "",
    });
    refreshData();
  };
  const handleUserClear = () => {
    setUserValue("");
    setAssignToValue("");
    refreshData();
  };
  const handleTaskCompleted = () => {
    setActiveTab("Task Completed");
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/task/`)
      .then((res) => {
        const filteredTasks = res.data.allTasks
          .filter((inner) => inner.taskStatus == "Completed")
          .filter((inner) => inner.user == user.fullname);
        setAllTasks(filteredTasks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleUserFilter = (e) => {
    e.preventDefault();
    if (
      userValue.value !== "" &&
      userValue.value !== undefined &&
      assignToValue.value !== undefined &&
      assignToValue.value !== ""
    ) {
      if (assignToValue.value == "Assigned By") {
        setLoading(true);
        axios
          .get(`${apiPath.prodPath}/api/task/`)
          .then((res) => {
            var filteredUserTask;
            const filteredUser = res.data.allTasks.filter(
              (i) => i.user == userValue.value
            );
            if (superComp == "all") {
              setAllTasks(filteredUser);
            }
            if (superComp == "completed") {
              filteredUserTask = filteredUser.filter(
                (i) => i.taskStatus == "Completed"
              );
              setAllTasks(filteredUserTask);
            }
            if (superComp == "inprogress") {
              filteredUserTask = filteredUser.filter(
                (i) => i.taskStatus !== "Completed"
              );
              setAllTasks(filteredUserTask);
            }
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
      if (assignToValue.value == "Assigned To") {
        console.log("here", userValue.value);
        setLoading(true);
        axios
          .get(`${apiPath.prodPath}/api/task/`)
          .then((res) => {
            var tasks = [];
            res.data.allTasks.forEach((el) => {
              el.assignedTo.forEach((inner) => {
                if (inner.fullname == userValue.value) {
                  tasks = [el, ...tasks];
                }
              });
            });
            setAllTasks(tasks);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Select both the values to get results",
      });
    }
  };
  const handleSuperCompTask = () => {
    setSuperComp("completed");
    console.log("here in completed");
    setLoading(true);
    if (
      assignToValue.value !== "" &&
      assignToValue.value !== undefined &&
      userValue.value !== "" &&
      userValue.value !== undefined
    ) {
      if (assignToValue.value == "Assigned By") {
        console.log("####here in assign by");
        axios
          .get(
            `${apiPath.prodPath}/api/task/?taskCategory=${
              searchForm.taskCategory.value == undefined
                ? ""
                : searchForm.taskCategory.value
            }&currentDate=${
              searchForm.currentDate == ""
                ? ""
                : moment(searchForm.currentDate).format("YYYY-MM-DD")
            }&description=${searchForm.description}`
          )
          .then((res) => {
            console.log(res.data.allTasks);
            const filteredUser = res.data.allTasks
              .filter((i) => i.user == userValue.value)
              .filter((item) => item.taskStatus == "Completed");
            console.log("@@@@@", filteredUser);
            setAllTasks(filteredUser);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
      if (assignToValue.value == "Assigned To") {
        console.log("here", userValue.value);
        setLoading(true);
        axios
          .get(
            `${apiPath.prodPath}/api/task/?taskCategory=${
              searchForm.taskCategory.value == undefined
                ? ""
                : searchForm.taskCategory.value
            }&currentDate=${
              searchForm.currentDate == ""
                ? ""
                : moment(searchForm.currentDate).format("YYYY-MM-DD")
            }&description=${searchForm.description}`
          )
          .then((res) => {
            var tasks = [];
            res.data.allTasks.forEach((el) => {
              el.assignedTo.forEach((inner) => {
                if (inner.fullname == userValue.value) {
                  tasks = [el, ...tasks];
                }
              });
            });
            var furtherFiltered = tasks.filter(
              (i) => i.taskStatus == "Completed"
            );
            setAllTasks(furtherFiltered);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
    } else {
      axios
        .get(
          `${apiPath.prodPath}/api/task/?taskCategory=${
            searchForm.taskCategory.value == undefined
              ? ""
              : searchForm.taskCategory.value
          }&currentDate=${
            searchForm.currentDate == ""
              ? ""
              : moment(searchForm.currentDate).format("YYYY-MM-DD")
          }&description=${searchForm.description}`
        )
        .then((res) => {
          const filteredTasks = res.data.allTasks.filter(
            (inner) => inner.taskStatus == "Completed"
          );
          setAllTasks(filteredTasks);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const handleSuperAllTask = () => {
    setSuperComp("all");
    setLoading(true);
    if (
      assignToValue.value !== "" &&
      assignToValue.value !== undefined &&
      userValue.value !== "" &&
      userValue.value !== undefined
    ) {
      if (assignToValue.value == "Assigned By") {
        axios
          .get(
            `${apiPath.prodPath}/api/task/?taskCategory=${
              searchForm.taskCategory.value == undefined
                ? ""
                : searchForm.taskCategory.value
            }&currentDate=${
              searchForm.currentDate == ""
                ? ""
                : moment(searchForm.currentDate).format("YYYY-MM-DD")
            }&description=${searchForm.description}`
          )
          .then((res) => {
            const filteredUser = res.data.allTasks.filter(
              (i) => i.user == userValue.value
            );
            setAllTasks(filteredUser);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
      if (assignToValue.value == "Assigned To") {
        console.log("here", userValue.value);
        setLoading(true);
        axios
          .get(
            `${apiPath.prodPath}/api/task/?taskCategory=${
              searchForm.taskCategory.value == undefined
                ? ""
                : searchForm.taskCategory.value
            }&currentDate=${
              searchForm.currentDate == ""
                ? ""
                : moment(searchForm.currentDate).format("YYYY-MM-DD")
            }&description=${searchForm.description}`
          )
          .then((res) => {
            var tasks = [];
            res.data.allTasks.forEach((el) => {
              el.assignedTo.forEach((inner) => {
                if (inner.fullname == userValue.value) {
                  tasks = [el, ...tasks];
                }
              });
            });

            setAllTasks(tasks);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
    } else {
      axios
        .get(
          `${apiPath.prodPath}/api/task/?taskCategory=${
            searchForm.taskCategory.value == undefined
              ? ""
              : searchForm.taskCategory.value
          }&currentDate=${
            searchForm.currentDate == ""
              ? ""
              : moment(searchForm.currentDate).format("YYYY-MM-DD")
          }&description=${searchForm.description}`
        )
        .then((res) => {
          setAllTasks(res.data.allTasks);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const handleSuperInpTask = () => {
    setSuperComp("inprogress");
    setLoading(true);
    if (
      assignToValue.value !== "" &&
      assignToValue.value !== undefined &&
      userValue.value !== "" &&
      userValue.value !== undefined
    ) {
      if (assignToValue.value == "Assigned By") {
        axios
          .get(
            `${apiPath.prodPath}/api/task/?taskCategory=${
              searchForm.taskCategory.value == undefined
                ? ""
                : searchForm.taskCategory.value
            }&currentDate=${
              searchForm.currentDate == ""
                ? ""
                : moment(searchForm.currentDate).format("YYYY-MM-DD")
            }&description=${searchForm.description}`
          )
          .then((res) => {
            const filteredUser = res.data.allTasks
              .filter((i) => i.user == userValue.value)
              .filter((item) => item.taskStatus !== "Completed");
            setAllTasks(filteredUser);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
      if (assignToValue.value == "Assigned To") {
        console.log("here", userValue.value);
        setLoading(true);
        axios
          .get(
            `${apiPath.prodPath}/api/task/?taskCategory=${
              searchForm.taskCategory.value == undefined
                ? ""
                : searchForm.taskCategory.value
            }&currentDate=${
              searchForm.currentDate == ""
                ? ""
                : moment(searchForm.currentDate).format("YYYY-MM-DD")
            }&description=${searchForm.description}`
          )
          .then((res) => {
            var tasks = [];
            res.data.allTasks.forEach((el) => {
              el.assignedTo.forEach((inner) => {
                if (inner.fullname == userValue.value) {
                  tasks = [el, ...tasks];
                }
              });
            });
            var furtherFiltered = tasks.filter(
              (i) => i.taskStatus !== "Completed"
            );
            setAllTasks(furtherFiltered);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
    } else {
      axios
        .get(
          `${apiPath.prodPath}/api/task/?taskCategory=${
            searchForm.taskCategory.value == undefined
              ? ""
              : searchForm.taskCategory.value
          }&currentDate=${
            searchForm.currentDate == ""
              ? ""
              : moment(searchForm.currentDate).format("YYYY-MM-DD")
          }&description=${searchForm.description}`
        )
        .then((res) => {
          const filteredTasks = res.data.allTasks.filter(
            (inner) => inner.taskStatus !== "Completed"
          );
          setAllTasks(filteredTasks);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <section className={`${poppins.className} pt-10`}>
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Tasks
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Add Task
        </button>
      </div>
      {userFilter ? (
        <div className="p-4 flex flex-col w-full gap-4 bg-white shadow-md rounded-xl mb-5">
          <div className="w-full flex flex-row justify-end pb-3">
            <p
              className="close-icon hover:cursor-pointer"
              onClick={() => {
                setUserFilter(false);
                handleUserClear();
              }}
              style={{ textAlign: "right", marginBottom: "10px" }}
            >
              &#10005;
            </p>
          </div>
          <form
            onSubmit={handleUserFilter}
            className="w-full flex flex-row gap-4"
          >
            <Select
              className={`${poppins.className} w-2/5 employee-names`}
              options={usersOpt}
              placeholder="User"
              onChange={(value) => setUserValue(value)}
              value={userValue}
            />
            <Select
              className={`${poppins.className} w-2/5 employee-names`}
              options={assignToOpt}
              placeholder="Assigned"
              onChange={(value) => setAssignToValue(value)}
              value={assignToValue}
            />
            <input
              type="submit"
              className={`${poppins.className} bg-orange-400 p-2 text-white rounded-xl w-1/5`}
              value={"Search"}
            />
          </form>
          {assignToValue !== "" || userValue !== "" ? (
            <p
              onClick={handleUserClear}
              className={`${poppins.className} filter-btn`}
            >
              Clear Filter
            </p>
          ) : null}
          <p></p>
        </div>
      ) : null}
      {user !== null &&
      user !== undefined &&
      (user.fullname == "Kevin Baumhover" ||
        user.fullname == "Jamie Schmidt" ||
        user.fullname == "Ralph Macias") ? null : (
        <div className="flex flex-row gap-4">
          <span
            onClick={handleTaskAssigned}
            className={
              activeTab == "Task Assigned"
                ? `${poppins.className} text-orange-400 font-semibold hover:cursor-pointer`
                : `${poppins.className} hover:cursor-pointer`
            }
          >
            Tasks assigned to user
          </span>
          <span
            onClick={handleTaskCreated}
            className={
              activeTab == "Task Created"
                ? `${poppins.className} text-orange-400 font-semibold hover:cursor-pointer`
                : `${poppins.className} hover:cursor-pointer`
            }
          >
            Tasks created by user
          </span>
          <span
            onClick={handleTaskCompleted}
            className={
              activeTab == "Task Completed"
                ? `${poppins.className} text-orange-400 font-semibold hover:cursor-pointer`
                : `${poppins.className} hover:cursor-pointer`
            }
          >
            Tasks Completed
          </span>
        </div>
      )}
      <div className="flex flex-row gap-4 mt-2 mb-2">
        {filterFlag ? null : (
          <span
            className={`${poppins.className} bg-orange-400 text-white font-semibold p-2 rounded-xl hover:cursor-pointer`}
            onClick={() => {
              setFilterFlag(true);
              setUserFilter(false);
              handleUserClear();
            }}
          >
            Filter By Task
          </span>
        )}
        {userFilter ? null : user !== null &&
          user !== undefined &&
          (user.fullname == "Kevin Baumhover" ||
            user.fullname == "Jamie Schmidt" ||
            user.fullname == "Ralph Macias") ? (
          <span
            style={{ marginLeft: "10px" }}
            className={`${poppins.className} bg-orange-400 text-white font-semibold p-2 rounded-xl hover:cursor-pointer`}
            onClick={() => {
              setUserFilter(true);
              setFilterFlag(false);
              handleClear();
            }}
          >
            Filter By User
          </span>
        ) : null}
      </div>
      {filterFlag ? (
        <div className="p-4 flex flex-col w-full gap-4 bg-white shadow-md rounded-xl mb-5">
          <div className="w-full flex flex-row justify-end">
            <p
              className="close-icon hover:cursor-pointer"
              onClick={() => {
                setFilterFlag(false);
                handleClear();
              }}
              style={{ textAlign: "right", marginBottom: "10px" }}
            >
              &#10005;
            </p>
          </div>
          <form onSubmit={handleSearch} className="w-full flex flex-row gap-4">
            <Select
              className={`${poppins.className} w-1/5 employee-names`}
              options={taskCategoryOpt}
              placeholder="Task Category"
              onChange={handleTaskCategory}
              value={searchForm.taskCategory}
            />
            <div className="w-1/5">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    onClick={() => console.log("clicked")}
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !searchForm.currentDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {searchForm.currentDate ? (
                      moment(searchForm.currentDate).format("MM-DD-YYYY")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 cus-calendar">
                  <Calendar
                    mode="single"
                    selected={searchForm.currentDate}
                    onSelect={(date) => handleDate(date)}
                  />
                </PopoverContent>
              </Popover>
              {/* <DatePicker
                className={poppins.className}
                id="datePicker-1"
                placeholderText={"Select a date"}
                selected={searchForm.currentDate}
                onChange={handleDate}
                locale={"en-US"}
              /> */}
            </div>
            <textarea
              className={`${poppins.className} w-1/3 border-2 border-gray-200 rounded-xl`}
              rows={2}
              cols={55}
              style={{ padding: "10px" }}
              placeholder="Description"
              value={searchForm.description}
              onChange={handleDesc}
            />
            <input
              type="submit"
              className={`${poppins.className} w-1/6 p-2 bg-orange-400 self-start text-white rounded-xl`}
              value={"Search"}
            />
            {searchForm.currentDate !== "" ||
            searchForm.description !== "" ||
            searchForm.taskCategory !== "" ? (
              <p
                onClick={handleClear}
                className={`${poppins.className} w-1/6 p-2 text-center bg-orange-400 text-white self-start rounded-xl hover:cursor-pointer`}
              >
                Clear Filter
              </p>
            ) : null}
          </form>
        </div>
      ) : null}
      <div className="table-wrap">
        {user !== null &&
        user !== undefined &&
        (user.fullname == "Kevin Baumhover" ||
          user.fullname == "Jamie Schmidt" ||
          user.fullname == "Ralph Macias") ? (
          <div className="flex flex-row gap-4 pt-4 pb-4">
            <span
              className={
                superComp == "all"
                  ? `${poppins.className} text-orange-400 font-semibold hover:cursor-pointer`
                  : `${poppins.className} hover:cursor-pointer`
              }
              onClick={handleSuperAllTask}
            >
              All
            </span>
            <span
              className={
                superComp == "completed"
                  ? `${poppins.className} text-orange-400 font-semibold hover:cursor-pointer`
                  : `${poppins.className} hover:cursor-pointer`
              }
              onClick={handleSuperCompTask}
            >
              Completed
            </span>
            <span
              className={
                superComp == "inprogress"
                  ? `${poppins.className} text-orange-400 font-semibold hover:cursor-pointer`
                  : `${poppins.className} hover:cursor-pointer`
              }
              onClick={handleSuperInpTask}
            >
              Inprogress
            </span>
          </div>
        ) : null}
        <TaskTable
          allTasks={allTasks}
          loading={loading}
          refreshData={refreshData}
          loggedInUser={user !== null && user}
        />
      </div>
      <TaskDrawer
        loggedInUser={user !== null && user}
        open={drawer}
        onClose={handleCloseDrawer}
        addTask={handleAddTask}
        edit={false}
      />
    </section>
  );
}

export default Task;
