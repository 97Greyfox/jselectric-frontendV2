"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import JobNumberDrawer from "../drawers/jobNumberDrawer";
import JobNumberTable from "../tables/jobNumberTable";
import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function JobNumber() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allJobNumbers, setAllJobNumbers] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false);
  const [jobTagOpt, setJobTagOpt] = useState("");
  const [clientsOpt, setClientsOpt] = useState("");
  const [jobPMOpt, setJobPMOpt] = useState("");
  const [filterOpt, setFilterOpt] = useState({
    label: "Job Number",
    value: "Job Number",
  });
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [searchForm, setSearchForm] = useState({
    jobTag: "",
    jobPM: "",
    client: "",
    jobNumber: "",
  });
  const filterOptions = [
    { label: "Job Number", value: "Job Number" },
    { label: "Client", value: "Client" },
    { label: "Job PM", value: "Job PM" },
  ];
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${apiPath.prodPath}/api/jobNumber/?page=${page}&&perPage=${perPage}`
      )
      .then((res) => {
        console.log(res.data.jobNumbers);
        setTotalCount(res.data.totalCount);
        setAllJobNumbers(res.data.jobNumbers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setClientsOpt(
          res.data.clients.map((i) => ({
            label: i.customerName,
            value: i.customerName,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/jobTag`)
      .then((res) => {
        setJobTagOpt(
          res.data.jobTags.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        let arr = [];
        const mappedPM = res.data.allUsers.map((i) => ({
          label: i.fullname,
          value: i.fullname,
        }));
        arr = [{ label: "Not Assigned", value: "Not Assigned" }, ...mappedPM];
        setJobPMOpt(arr);
      })
      .catch((err) => console.log(err));
    const googleSheetInterval = setInterval(() => {
      handleSyncSheet();
    }, 60000);
    return () => {
      clearInterval(googleSheetInterval);
    };
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };

  const getJobNumberWithPage = (pageVal, perPageVal) => {
    var url = "";
    if (filterOpt.value == "Job Number") {
      url = `${apiPath.prodPath}/api/jobNumber/?jobNumber=${
        searchForm.jobNumber == "" ? "" : searchForm.jobNumber
      }&&page=${pageVal}&&perPage=${perPageVal}`;
    }
    if (filterOpt.value == "Client") {
      url = `${apiPath.prodPath}/api/jobNumber/?client=${
        searchForm.client == "" ? "" : searchForm.client.value
      }&&page=${pageVal}&&perPage=${perPageVal}`;
    }
    if (filterOpt.value == "Job PM") {
      url = `${apiPath.prodPath}/api/jobNumber/?jobPM=${
        searchForm.jobPM == "" ? "" : searchForm.jobPM.value
      }&&page=${pageVal}&&perPage=${perPageVal}`;
    }
    axios
      .get(url)
      .then((res) => {
        setAllJobNumbers(res.data.jobNumbers);
        setTotalCount(res.data.totalCount);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handlePagination = (perPageVal, pageVal) => {
    setPerPage(perPage);
    setPage(page);
    setLoading(true);
    if (
      searchForm.client == "" &&
      searchForm.jobPM == "" &&
      searchForm.jobNumber == ""
    ) {
      axios
        .get(
          `${apiPath.prodPath}/api/jobNumber/?page=${pageVal}&&perPage=${perPageVal}`
        )
        .then((res) => {
          console.log(res.data.jobNumbers);
          setTotalCount(res.data.totalCount);
          setAllJobNumbers(res.data.jobNumbers);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    if (
      searchForm.client !== "" ||
      searchForm.jobNumber !== "" ||
      searchForm.jobPM !== ""
    ) {
      getJobNumberWithPage(pageVal, perPageVal);
    }
  };
  const addJobNumber = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/jobNumber/addJobNumber`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
    axios
      .post(`${apiPath.prodPath}/api/sheetsData/addSingleJob`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    console.log("called refresh");
    setLoading(true);
    axios
      .get(
        `${apiPath.prodPath}/api/jobNumber/?page=${page}&&perPage=${perPage}`
      )
      .then((res) => {
        setTotalCount(res.data.totalCount);
        setAllJobNumbers(res.data.jobNumbers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleJobTag = (value) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        jobTag: value,
      };
    });
  };
  const handleJobPM = (value) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        jobPM: value,
      };
    });
  };
  const handleClient = (value) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        client: value,
      };
    });
  };
  const handleJobNumber = (e) => {
    setSearchForm((prev) => {
      return {
        ...prev,
        jobNumber: e.target.value,
      };
    });
  };
  const handleSearch = (e) => {
    var url = "";
    e.preventDefault();
    if (filterOpt.value == "Job Number") {
      url = `${apiPath.prodPath}/api/jobNumber/?jobNumber=${
        searchForm.jobNumber == "" ? "" : searchForm.jobNumber
      }&&page=0&&perPage=20`;
    }
    if (filterOpt.value == "Client") {
      url = `${apiPath.prodPath}/api/jobNumber/?client=${
        searchForm.client == "" ? "" : searchForm.client.value
      }&&page=0&&perPage=20`;
    }
    if (filterOpt.value == "Job PM") {
      url = `${apiPath.prodPath}/api/jobNumber/?jobPM=${
        searchForm.jobPM == "" ? "" : searchForm.jobPM.value
      }&&page=0&&perPage=20`;
    }
    axios
      .get(url)
      .then((res) => {
        setAllJobNumbers(res.data.jobNumbers);
        setTotalCount(res.data.totalCount);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleClear = () => {
    setSearchForm({
      jobTag: "",
      jobPM: "",
      client: "",
      jobNumber: "",
    });
    refreshData();
  };
  const handleSync = () => {
    axios.get(`${apiPath.prodPath}/api/sheetsData/`).then((res) => {
      if (res.data.error) {
        Swal.fire({
          icon: "error",
          text: `${res.data.message}`,
        });
      } else {
        Swal.fire({
          icon: "success",
          text: `${res.data.message}`,
        });
        refreshData();
      }
    });
  };
  const handleSyncSheet = () => {
    axios.get(`${apiPath.prodPath}/api/sheetsData/`).then((res) => {
      if (res.data.error) {
        Swal.fire({
          icon: "error",
          text: `${res.data.message}`,
        });
      } else {
        refreshData();
      }
    });
  };
  const handleSyncTo = () => {
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/?page=0&&perPage=0`)
      .then((res) => {
        console.log(res.data.jobNumbers);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    // axios
    //   .post(`${apiPath.prodPath}/api/sheetsData/addDataToSheet/`, {
    //     data: allJobNumbers,
    //   })
    //   .then((res) => {
    //     if (res.data.error) {
    //       Swal.fire({
    //         icon: "error",
    //         text: `${res.data.message}`,
    //       });
    //     } else {
    //       Swal.fire({
    //         icon: "success",
    //         text: `${res.data.message}`,
    //       });
    //       refreshData();
    //     }
    //   });
  };
  return (
    <section className={`${poppins.className} w-full`}>
      <h2 className="font-semibold text-2xl pt-2 pb-2">Job Numbers</h2>
      <div className="w-full flex flex-row justify-between">
        <div className="w-1/2 flex flex-col mt-2 mb-2 gap-2">
          <form className="flex flex-row flex-wrap" onSubmit={handleSearch}>
            {/* <Select
              className={`${poppins.className} taskOpt-cus`}
              options={jobTagOpt}
              placeholder="Job Tag"
              onChange={handleJobTag}
              value={searchForm.jobTag}
            /> */}

            <Select
              className={`${poppins.className} w-3/4 mb-2`}
              options={filterOptions}
              placeholder="Filter Options"
              onChange={(v) => setFilterOpt(v)}
              value={filterOpt}
              id="job-no-filters-1"
            />
            {filterOpt.value == "Job PM" ? (
              <Select
                className={`${poppins.className} w-2/4 mb-2`}
                options={jobPMOpt}
                placeholder="Job PM"
                onChange={handleJobPM}
                value={searchForm.jobPM}
                id="job-no-filters-2"
              />
            ) : null}
            {filterOpt.value == "Job Number" ? (
              <input
                type="text"
                value={searchForm.jobNumber}
                className={`${poppins.className} w-2/4 p-2 border-2 border-gray-300 rounded-md`}
                onChange={handleJobNumber}
                placeholder="Search By Job Number"
              />
            ) : null}
            {filterOpt.value == "Client" ? (
              <CreatableSelect
                isClearable={true}
                className={`${poppins.className} w-2/4 mb-2`}
                options={clientsOpt}
                placeholder="Client"
                onChange={handleClient}
                value={searchForm.client}
                id="job-no-filters-3"
              />
            ) : null}

            <input
              type="submit"
              className={`${poppins.className} p-1 self-center bg-orange-400 text-white ml-2 rounded-md`}
              value={"Search"}
            />
          </form>
          {searchForm.jobTag !== "" ||
          searchForm.jobPM !== "" ||
          searchForm.client !== "" ||
          searchForm.jobNumber !== "" ? (
            <p
              onClick={handleClear}
              className={`${poppins.className} filter-btn`}
            >
              Clear Filter
            </p>
          ) : null}
        </div>
        <div className="w-1/2 flex flex-col items-end ">
          <button
            onClick={() => setDrawer(true)}
            className="p-2 font-medium bg-orange-400 rounded-xl text-white"
          >
            + Add Job Number
          </button>
          <div className="flex flex-row gap-3 mt-2 mb-2">
            <button
              onClick={handleSyncTo}
              className="p-2 font-medium bg-white rounded-xl border-2 text-orange-400 border-orange-400"
            >
              <ArrowUpwardIcon color="orange" /> Sync To Google Sheet
            </button>
            <button
              onClick={handleSync}
              className="p-2 font-medium bg-white rounded-xl border-2 text-orange-400 border-orange-400"
            >
              <ArrowDownwardIcon color="orange" /> Sync From Google Sheet
            </button>
          </div>
        </div>
      </div>
      <div className="table-wrap">
        <JobNumberTable
          loading={loading}
          allJobNumbers={allJobNumbers}
          refreshData={refreshData}
          handlePagination={(perPage, page) => handlePagination(perPage, page)}
          totalCount={totalCount}
        />
      </div>
      <JobNumberDrawer
        addJobNumber={addJobNumber}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default JobNumber;
