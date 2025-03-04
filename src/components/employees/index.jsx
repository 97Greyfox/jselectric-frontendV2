"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";

import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
import EmployeeDrawer from "../drawers/employeeDrawer";
import EmployeeTable from "../tables/employeeTable";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function EmployeesComp() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [userStatusLink, setUserStatusLink] = useState("Active");
  const [searchSelect, setSearchSelect] = useState({
    label: "Name",
    value: "name",
  });
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const usersFiltered = res.data.allUsers.filter(
          (i) => i.userStatus == "Active"
        );
        setAllUsers(usersFiltered);
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
  const addEmp = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/users/addUser`, data)
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error adding employee. The email used is already associated with another employee",
            timer: 1500,
          });
        }
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const usersFiltered = res.data.allUsers.filter(
          (i) => i.userStatus == "Active"
        );
        setAllUsers(usersFiltered);
        setUserStatusLink("Active");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    var url = "";
    if (search == "") {
      return false;
    } else if (searchSelect.value == "name") {
      url = `${apiPath.prodPath}/api/users/${search}`;
    } else {
      url = `${apiPath.prodPath}/api/users/search/${search}`;
    }
    axios
      .get(url)
      .then((res) => {
        var usersFiltered = res.data.allUsers.filter(
          (i) => i.userStatus == userStatusLink
        );
        setAllUsers(usersFiltered);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleClear = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        var usersFiltered = res.data.allUsers.filter(
          (i) => i.userStatus == userStatusLink
        );
        setAllUsers(usersFiltered);
        setLoading(false);
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleActiveUsers = (e) => {
    getUsersAccToStatus(e.target.innerText);
    setUserStatusLink(e.target.innerText);
  };
  const getUsersAccToStatus = (statusText) => {
    console.log("here", statusText);
    setLoading(true);
    if (search !== "") {
      console.log("in this search");
      var url = "";
      if (searchSelect.value == "name") {
        url = `${apiPath.prodPath}/api/users/${search}`;
      } else {
        url = `${apiPath.prodPath}/api/users/search/${search}`;
      }
      console.log("url", url);
      axios
        .get(url)
        .then((res) => {
          console.log(res);
          var usersFiltered = res.data.allUsers.filter(
            (i) => i.userStatus == statusText
          );
          setAllUsers(usersFiltered);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      axios
        .get(`${apiPath.prodPath}/api/users/`)
        .then((res) => {
          var usersFiltered = res.data.allUsers.filter(
            (i) => i.userStatus == statusText
          );
          var userFilteredOnSearch = [];
          if (search !== "") {
            userFilteredOnSearch = usersFiltered.filter(
              (i) => i.fullname == search
            );
            setAllUsers(userFilteredOnSearch);
            setLoading(false);
          } else {
            setAllUsers(usersFiltered);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <section className={`${poppins.className} employee-wrap cus-emp-wrap`}>
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Employees
        </h2>
      </div>
      <div className="w-full flex flex-row flex-wrap">
        <div className="w-2/5 flex flex-col gap-4">
          <div>
            <Select
              options={[
                { label: "Name", value: "name" },
                { label: "Position", value: "position" },
              ]}
              value={searchSelect}
              onChange={(v) => setSearchSelect(v)}
            />
          </div>
          <form onSubmit={handleSearch} className="flex flex-row gap-2 pb-4">
            <div className="w-3/4">
              <input
                className={`${poppins.className} p-2 border-2 border-gray-300 w-full rounded-lg`}
                type="text"
                placeholder={
                  searchSelect.value == "name"
                    ? "Search by Name"
                    : "Search By Position"
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-1/4 flex flex-col">
              <input
                className={`${poppins.className} bg-orange-400 text-white p-2 rounded-xl font-semibold`}
                type="submit"
                value={"Search"}
              />
            </div>
            {search == "" ? null : (
              <p
                onClick={handleClear}
                className={`${poppins.className} clear-btn`}
                style={{ color: "red" }}
              >
                Clear
              </p>
            )}
          </form>
        </div>
        <div className="w-3/5 flex flex-row justify-end">
          <button
            onClick={() => setDrawer(true)}
            className={`${poppins.className} bg-orange-400 text-white font-semibold p-2 self-end rounded-xl`}
          >
            + Add Employee
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-start pb-3">
        <span
          className={
            userStatusLink == "Active"
              ? `${poppins.className} text-orange-400 font-semibold hover:cursor-pointer`
              : `${poppins.className} simpleSuper hover:cursor-pointer`
          }
          onClick={handleActiveUsers}
        >
          Active
        </span>
        <span
          className={
            userStatusLink == "Inactive"
              ? `${poppins.className} text-orange-400 font-semibold hover:cursor-pointer`
              : `${poppins.className} simpleSuper hover:cursor-pointer`
          }
          onClick={handleActiveUsers}
        >
          Inactive
        </span>
      </div>
      <div className="table-wrap">
        <EmployeeTable
          loading={loading}
          allUsers={allUsers}
          refreshData={refreshData}
        />
      </div>
      <EmployeeDrawer
        addEmp={addEmp}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default EmployeesComp;
