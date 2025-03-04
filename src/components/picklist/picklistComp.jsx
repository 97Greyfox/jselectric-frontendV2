"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
import PicklistDrawer from "../drawers/picklistDrawer";
import PicklistTable from "../tables/picklistTable";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function PicklistComp({ picklistName }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [picklistData, setPicklistData] = useState([]);
  const [parentOpt, setParentOpt] = useState([]);
  const [parent, setParent] = useState("");
  useEffect(() => {
    let apiUrl;
    if (picklistName == "User Type") {
      apiUrl = `${apiPath.prodPath}/api/userType/`;
    }
    if (picklistName == "Brand") {
      apiUrl = `${apiPath.prodPath}/api/brand/`;
    }
    if (picklistName == "Service Ticket Terms") {
      apiUrl = `${apiPath.prodPath}/api/term/`;
    }
    if (picklistName == "Checked Out") {
      apiUrl = `${apiPath.prodPath}/api/checkedOut/`;
    }
    if (picklistName == "Position") {
      apiUrl = `${apiPath.prodPath}/api/position/`;
    }
    if (picklistName == "Timeout Reason") {
      apiUrl = `${apiPath.prodPath}/api/timeoutReason/`;
    }
    if (picklistName == "Warnings") {
      apiUrl = `${apiPath.prodPath}/api/warning/`;
    }
    if (picklistName == "Offences") {
      apiUrl = `${apiPath.prodPath}/api/offence/`;
    }
    if (picklistName == "Building") {
      apiUrl = `${apiPath.prodPath}/api/building/`;
    }
    if (picklistName == "Tool Category") {
      apiUrl = `${apiPath.prodPath}/api/toolCategory/`;
    }
    if (picklistName == "Storage Id") {
      apiUrl = `${apiPath.prodPath}/api/storageId/`;
    }
    if (picklistName == "Tool Sub-Category") {
      apiUrl = `${apiPath.prodPath}/api/subtoolCategory/`;
      // getSubTools();
    }
    if (picklistName == "Device Category") {
      apiUrl = `${apiPath.prodPath}/api/deviceCategory/`;
    }
    if (picklistName == "Task Category") {
      apiUrl = `${apiPath.prodPath}/api/taskCategory/`;
    }
    if (picklistName == "Task Status") {
      apiUrl = `${apiPath.prodPath}/api/taskStatus/`;
    }
    if (picklistName == "Task Priority") {
      apiUrl = `${apiPath.prodPath}/api/taskPriority/`;
    }
    if (picklistName == "Notes Status") {
      apiUrl = `${apiPath.prodPath}/api/notesStatus/`;
    }
    if (picklistName == "Notes Category") {
      apiUrl = `${apiPath.prodPath}/api/notesCategory/`;
    }
    if (picklistName == "Customer Type") {
      apiUrl = `${apiPath.prodPath}/api/customerType/`;
    }
    if (picklistName == "Customer Term") {
      apiUrl = `${apiPath.prodPath}/api/customerTerm/`;
    }
    if (picklistName == "Tax Code") {
      apiUrl = `${apiPath.prodPath}/api/taxCode/`;
    }
    if (picklistName == "Material Level") {
      apiUrl = `${apiPath.prodPath}/api/materialLevel/`;
    }
    if (picklistName == "Labor Level") {
      apiUrl = `${apiPath.prodPath}/api/laborLevel/`;
    }
    if (picklistName == "Salesperson Code") {
      apiUrl = `${apiPath.prodPath}/api/salesPersonCode/`;
    }
    if (picklistName == "Job Type") {
      apiUrl = `${apiPath.prodPath}/api/jobType/`;
    }
    if (picklistName == "Job Tag") {
      apiUrl = `${apiPath.prodPath}/api/jobTag/`;
    }
    if (picklistName == "Job PM") {
      apiUrl = `${apiPath.prodPath}/api/jobPM/`;
    }
    if (picklistName == "Job Status") {
      apiUrl = `${apiPath.prodPath}/api/jobStatus/`;
    }
    if (picklistName == "Job Sources") {
      apiUrl = `${apiPath.prodPath}/api/jobSources/`;
    }
    if (picklistName == "Job CTM") {
      apiUrl = `${apiPath.prodPath}/api/jobCTM/`;
    }
    if (picklistName == "PO Status") {
      apiUrl = `${apiPath.prodPath}/api/POStatus/`;
    }
    if (picklistName == "Training Category") {
      apiUrl = `${apiPath.prodPath}/api/trainingCategory/`;
    }
    if (picklistName == "Overstock Categories") {
      apiUrl = `${apiPath.prodPath}/api/overstockCategories/`;
    }
    if (picklistName == "Phase") {
      apiUrl = `${apiPath.prodPath}/api/phase/`;
    }
    if (picklistName == "Reimbursal Type") {
      apiUrl = `${apiPath.prodPath}/api/reimbursalType/`;
    }
    setLoading(true);
    axios
      .get(apiUrl)
      .then((res) => {
        if (picklistName == "User Type") {
          setPicklistData(res.data.userTypes);
        }
        if (picklistName == "Brand") {
          setPicklistData(res.data.brands);
        }
        if (picklistName == "Service Ticket Terms") {
          setPicklistData(res.data.terms);
        }
        if (picklistName == "Warnings") {
          setPicklistData(res.data.warnings);
        }
        if (picklistName == "Offences") {
          setPicklistData(res.data.offences);
        }
        if (picklistName == "Checked Out") {
          setPicklistData(res.data.checkedOut);
        }
        if (picklistName == "Position") {
          setPicklistData(res.data.positions);
        }
        if (picklistName == "Timeout Reason") {
          setPicklistData(res.data.timeoutReasons);
        }
        if (picklistName == "Building") {
          setPicklistData(res.data.buildings);
        }
        if (picklistName == "Tool Category") {
          setPicklistData(res.data.toolCategory);
        }
        if (picklistName == "Storage Id") {
          setPicklistData(res.data.storageIds);
        }
        if (picklistName == "Tool Sub-Category") {
          setPicklistData(res.data.subtoolCategorys);
          const sorted = res.data.subtoolCategorys
            .map((i) => {
              return { label: i.parentCategory, value: i.parentCategory };
            })
            .sort((a, b) => a.label.localeCompare(b.label));
          const sortedArr = sorted.filter(
            (obj1, i, arr) =>
              arr.findIndex((obj2) => obj2.label === obj1.label) === i
          );
          console.log("##$$$%#%#%#%", sortedArr);
          setParentOpt(sortedArr);
        }
        if (picklistName == "Device Category") {
          setPicklistData(res.data.deviceCategory);
        }
        if (picklistName == "Task Category") {
          setPicklistData(res.data.taskCategory);
        }
        if (picklistName == "Notes Category") {
          setPicklistData(res.data.notesCategory);
        }
        if (picklistName == "Task Status") {
          setPicklistData(res.data.taskStatus);
        }
        if (picklistName == "Task Priority") {
          setPicklistData(res.data.taskPriority);
        }
        if (picklistName == "Notes Status") {
          setPicklistData(res.data.notesStatus);
        }
        if (picklistName == "Customer Type") {
          setPicklistData(res.data.customerTypes);
        }
        if (picklistName == "Customer Term") {
          setPicklistData(res.data.customerTerms);
        }
        if (picklistName == "Tax Code") {
          setPicklistData(res.data.taxCodes);
        }
        if (picklistName == "Material Level") {
          setPicklistData(res.data.materialLevels);
        }
        if (picklistName == "Labor Level") {
          setPicklistData(res.data.laborLevels);
        }
        if (picklistName == "Salesperson Code") {
          setPicklistData(res.data.salesPersonCodes);
        }
        if (picklistName == "Job Type") {
          setPicklistData(res.data.jobTypes);
        }
        if (picklistName == "Job Tag") {
          setPicklistData(res.data.jobTags);
        }
        if (picklistName == "Job PM") {
          setPicklistData(res.data.jobPMs);
        }
        if (picklistName == "Job Status") {
          setPicklistData(res.data.jobStatus);
        }
        if (picklistName == "Job Sources") {
          setPicklistData(res.data.jobSources);
        }
        if (picklistName == "Job CTM") {
          setPicklistData(res.data.jobCTMs);
        }
        if (picklistName == "PO Status") {
          setPicklistData(res.data.POStatus);
        }
        if (picklistName == "Training Category") {
          setPicklistData(res.data.trainingCategorys);
        }
        if (picklistName == "Overstock Categories") {
          setPicklistData(res.data.overstockCats);
        }
        if (picklistName == "Phase") {
          setPicklistData(res.data.phases);
        }
        if (picklistName == "Reimbursal Type") {
          setPicklistData(res.data.reimbursalTypes);
        }
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
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const dataObjFiltered = picklistData.filter(
      (i) => i.parentCategory == parent.value
    );
    setPicklistData(dataObjFiltered);
  };
  const addPicklist = (data) => {
    let url;
    if (picklistName == "User Type") {
      url = `${apiPath.prodPath}/api/userType/addUserType`;
    }
    if (picklistName == "Brand") {
      url = `${apiPath.prodPath}/api/brand/addbrand`;
    }
    if (picklistName == "Service Ticket Terms") {
      url = `${apiPath.prodPath}/api/term/addTerms`;
    }
    if (picklistName == "Checked Out") {
      url = `${apiPath.prodPath}/api/checkedOut/addCheckedOut`;
    }
    if (picklistName == "Warnings") {
      url = `${apiPath.prodPath}/api/warning/addWarning`;
    }
    if (picklistName == "Offences") {
      url = `${apiPath.prodPath}/api/offence/addOffence`;
    }
    if (picklistName == "Position") {
      url = `${apiPath.prodPath}/api/position/addposition`;
    }
    if (picklistName == "Timeout Reason") {
      url = `${apiPath.prodPath}/api/timeoutReason/addTimeoutReason`;
    }
    if (picklistName == "PO Status") {
      url = `${apiPath.prodPath}/api/POStatus/addPOStatus`;
    }
    if (picklistName == "Building") {
      url = `${apiPath.prodPath}/api/building/addBuilding`;
    }
    if (picklistName == "Tool Category") {
      url = `${apiPath.prodPath}/api/toolCategory/addtoolCategory`;
    }
    if (picklistName == "Device Category") {
      url = `${apiPath.prodPath}/api/deviceCategory/adddeviceCategory`;
    }
    if (picklistName == "Task Category") {
      url = `${apiPath.prodPath}/api/taskCategory/addtaskCategory`;
    }
    if (picklistName == "Notes Category") {
      url = `${apiPath.prodPath}/api/notesCategory/addnotesCategory`;
    }
    if (picklistName == "Task Status") {
      url = `${apiPath.prodPath}/api/taskStatus/addtaskStatus`;
    }
    if (picklistName == "Task Priority") {
      url = `${apiPath.prodPath}/api/taskPriority/addtaskPriority`;
    }
    if (picklistName == "Notes Status") {
      url = `${apiPath.prodPath}/api/notesStatus/addnotesStatus`;
    }
    if (picklistName == "Storage Id") {
      url = `${apiPath.prodPath}/api/storageId/addStorageId`;
    }
    if (picklistName == "Tool Sub-Category") {
      url = `${apiPath.prodPath}/api/subtoolCategory/addsubtoolCategory`;
    }
    if (picklistName == "Customer Type") {
      url = `${apiPath.prodPath}/api/customerType/addCustomerType`;
    }
    if (picklistName == "Customer Term") {
      url = `${apiPath.prodPath}/api/customerTerm/addCustomerTerm`;
    }
    if (picklistName == "Tax Code") {
      url = `${apiPath.prodPath}/api/taxCode/addtaxCode`;
    }
    if (picklistName == "Material Level") {
      url = `${apiPath.prodPath}/api/materialLevel/addmaterialLevel`;
    }
    if (picklistName == "Labor Level") {
      url = `${apiPath.prodPath}/api/laborLevel/addlaborLevel`;
    }
    if (picklistName == "Salesperson Code") {
      url = `${apiPath.prodPath}/api/salesPersonCode/addsalesPersonCode`;
    }
    if (picklistName == "Job Type") {
      url = `${apiPath.prodPath}/api/jobType/addJobType`;
    }
    if (picklistName == "Job Tag") {
      url = `${apiPath.prodPath}/api/jobTag/addJobTag`;
    }
    if (picklistName == "Job PM") {
      url = `${apiPath.prodPath}/api/jobPM/addJobPM`;
    }
    if (picklistName == "Job Status") {
      url = `${apiPath.prodPath}/api/jobStatus/addJobStatus`;
    }
    if (picklistName == "Job Sources") {
      url = `${apiPath.prodPath}/api/jobSources/addJobSources`;
    }
    if (picklistName == "Job CTM") {
      url = `${apiPath.prodPath}/api/jobCTM/addJobCTM`;
    }
    if (picklistName == "Training Category") {
      url = `${apiPath.prodPath}/api/trainingCategory/addTrainingCategory`;
    }
    if (picklistName == "Overstock Categories") {
      url = `${apiPath.prodPath}/api/overstockCategories/addOverstockCat`;
    }
    if (picklistName == "Phase") {
      url = `${apiPath.prodPath}/api/phase/addphase`;
    }
    if (picklistName == "Reimbursal Type") {
      url = `${apiPath.prodPath}/api/reimbursalType/addReimbursalType`;
    }
    axios
      .post(url, data)
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error adding ${picklistName}`,
            timer: 1500,
          });
        }
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const getTooSubCategoryData = () => {
    let toolApiUrl = `${apiPath.prodPath}/api/subtoolCategory/`;
    axios
      .get(toolApiUrl)
      .then((res) => {
        setPicklistData(res.data.subtoolCategorys);
      })
      .catch((err) => console.log(err));
    setParent("");
  };
  const refreshData = () => {
    let url;
    if (picklistName == "User Type") {
      url = `${apiPath.prodPath}/api/userType/`;
    }
    if (picklistName == "Brand") {
      url = `${apiPath.prodPath}/api/brand/`;
    }
    if (picklistName == "Service Ticket Terms") {
      url = `${apiPath.prodPath}/api/term/`;
    }
    if (picklistName == "Checked Out") {
      url = `${apiPath.prodPath}/api/checkedOut/`;
    }
    if (picklistName == "Warnings") {
      url = `${apiPath.prodPath}/api/warning/`;
    }
    if (picklistName == "Timeout Reason") {
      url = `${apiPath.prodPath}/api/timeoutReason/`;
    }
    if (picklistName == "Offences") {
      url = `${apiPath.prodPath}/api/offence/`;
    }
    if (picklistName == "PO Status") {
      url = `${apiPath.prodPath}/api/POStatus/`;
    }
    if (picklistName == "Position") {
      url = `${apiPath.prodPath}/api/position/`;
    }
    if (picklistName == "Building") {
      url = `${apiPath.prodPath}/api/building/`;
    }
    if (picklistName == "Tool Category") {
      url = `${apiPath.prodPath}/api/toolCategory/`;
    }
    if (picklistName == "Device Category") {
      url = `${apiPath.prodPath}/api/deviceCategory/`;
    }
    if (picklistName == "Task Category") {
      url = `${apiPath.prodPath}/api/taskCategory/`;
    }
    if (picklistName == "Notes Category") {
      url = `${apiPath.prodPath}/api/notesCategory/`;
    }
    if (picklistName == "Task Status") {
      url = `${apiPath.prodPath}/api/taskStatus/`;
    }
    if (picklistName == "Task Priority") {
      url = `${apiPath.prodPath}/api/taskPriority/`;
    }
    if (picklistName == "Notes Status") {
      url = `${apiPath.prodPath}/api/notesStatus/`;
    }
    if (picklistName == "Storage Id") {
      url = `${apiPath.prodPath}/api/storageId/`;
    }
    if (picklistName == "Tool Sub-Category") {
      url = `${apiPath.prodPath}/api/subtoolCategory/`;
    }
    if (picklistName == "Customer Type") {
      url = `${apiPath.prodPath}/api/customerType/`;
    }
    if (picklistName == "Customer Term") {
      url = `${apiPath.prodPath}/api/customerTerm/`;
    }
    if (picklistName == "Tax Code") {
      url = `${apiPath.prodPath}/api/taxCode/`;
    }
    if (picklistName == "Material Level") {
      url = `${apiPath.prodPath}/api/materialLevel/`;
    }
    if (picklistName == "Labor Level") {
      url = `${apiPath.prodPath}/api/laborLevel/`;
    }
    if (picklistName == "Salesperson Code") {
      url = `${apiPath.prodPath}/api/salesPersonCode/`;
    }
    if (picklistName == "Job Type") {
      url = `${apiPath.prodPath}/api/jobType/`;
    }
    if (picklistName == "Job Tag") {
      url = `${apiPath.prodPath}/api/jobTag/`;
    }
    if (picklistName == "Job PM") {
      url = `${apiPath.prodPath}/api/jobPM/`;
    }
    if (picklistName == "Job Status") {
      url = `${apiPath.prodPath}/api/jobStatus/`;
    }
    if (picklistName == "Job Sources") {
      url = `${apiPath.prodPath}/api/jobSources/`;
    }
    if (picklistName == "Job CTM") {
      url = `${apiPath.prodPath}/api/jobCTM/`;
    }
    if (picklistName == "Training Category") {
      url = `${apiPath.prodPath}/api/trainingCategory/`;
    }
    if (picklistName == "Overstock Categories") {
      url = `${apiPath.prodPath}/api/overstockCategories/`;
    }
    if (picklistName == "Phase") {
      url = `${apiPath.prodPath}/api/phase/`;
    }
    if (picklistName == "Reimbursal Type") {
      url = `${apiPath.prodPath}/api/reimbursalType/`;
    }
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        if (picklistName == "User Type") {
          setPicklistData(res.data.userTypes);
        }
        if (picklistName == "Brand") {
          setPicklistData(res.data.brands);
        }
        if (picklistName == "Service Ticket Terms") {
          setPicklistData(res.data.terms);
        }
        if (picklistName == "Warnings") {
          setPicklistData(res.data.warnings);
        }
        if (picklistName == "Offences") {
          setPicklistData(res.data.offences);
        }
        if (picklistName == "Checked Out") {
          setPicklistData(res.data.checkedOut);
        }
        if (picklistName == "Timeout Reason") {
          setPicklistData(res.data.timeoutReasons);
        }
        if (picklistName == "PO Status") {
          setPicklistData(res.data.POStatus);
        }
        if (picklistName == "Position") {
          setPicklistData(res.data.positions);
        }
        if (picklistName == "Building") {
          setPicklistData(res.data.buildings);
        }
        if (picklistName == "Tool Category") {
          setPicklistData(res.data.toolCategory);
        }
        if (picklistName == "Device Category") {
          setPicklistData(res.data.deviceCategory);
        }
        if (picklistName == "Task Category") {
          setPicklistData(res.data.taskCategory);
        }
        if (picklistName == "Notes Category") {
          setPicklistData(res.data.notesCategory);
        }
        if (picklistName == "Task Status") {
          setPicklistData(res.data.taskStatus);
        }
        if (picklistName == "Task Priority") {
          setPicklistData(res.data.taskPriority);
        }
        if (picklistName == "Notes Status") {
          setPicklistData(res.data.notesStatus);
        }
        if (picklistName == "Storage Id") {
          setPicklistData(res.data.storageIds);
        }
        if (picklistName == "Tool Sub-Category") {
          setPicklistData(res.data.subtoolCategorys);
        }
        if (picklistName == "Customer Type") {
          setPicklistData(res.data.customerTypes);
        }
        if (picklistName == "Customer Term") {
          setPicklistData(res.data.customerTerms);
        }
        if (picklistName == "Tax Code") {
          setPicklistData(res.data.taxCodes);
        }
        if (picklistName == "Material Level") {
          setPicklistData(res.data.materialLevels);
        }
        if (picklistName == "Labor Level") {
          setPicklistData(res.data.laborLevels);
        }
        if (picklistName == "Salesperson Code") {
          setPicklistData(res.data.salesPersonCodes);
        }
        if (picklistName == "Job Type") {
          setPicklistData(res.data.jobTypes);
        }
        if (picklistName == "Job Tag") {
          setPicklistData(res.data.jobTags);
        }
        if (picklistName == "Job PM") {
          setPicklistData(res.data.jobPMs);
        }
        if (picklistName == "Job Status") {
          setPicklistData(res.data.jobStatus);
        }
        if (picklistName == "Job Sources") {
          setPicklistData(res.data.jobSources);
        }
        if (picklistName == "Job CTM") {
          setPicklistData(res.data.jobCTMs);
        }
        if (picklistName == "Training Category") {
          setPicklistData(res.data.trainingCategorys);
        }
        if (picklistName == "Overstock Categories") {
          setPicklistData(res.data.overstockCats);
        }
        if (picklistName == "Phase") {
          setPicklistData(res.data.phases);
        }
        if (picklistName == "Reimbursal Type") {
          setPicklistData(res.data.reimbursalTypes);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className}`}>
      <div className="flex flex-row justify-between pt-2 pb-2">
        <h2 className={`${poppins.className} text-2xl font-semibold`}>
          {picklistName}
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} bg-orange-400 text-white rounded-xl p-2 font-semibold`}
        >
          Add {picklistName}
        </button>
      </div>
      {picklistName == "Tool Sub-Category" ? (
        <>
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-row gap-2 pt-4 pb-4"
          >
            <div className="w-4/5">
              <Select
                options={parentOpt}
                value={parent}
                onChange={(v) => setParent(v)}
                className="employee-names"
              />
            </div>
            <div className="w-1/5">
              <input
                type="submit"
                value={"Search"}
                className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer"
              />
              {parent !== "" ? (
                <button
                  onClick={() => getTooSubCategoryData()}
                  className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </form>
        </>
      ) : null}
      <div className="table-wrap">
        <PicklistTable
          loading={loading}
          picklistData={picklistData}
          picklistName={picklistName}
          refreshData={refreshData}
        />
      </div>
      <PicklistDrawer
        addPicklist={addPicklist}
        open={drawer}
        onClose={handleCloseDrawer}
        picklistName={picklistName}
      />
    </section>
  );
}

export default PicklistComp;
