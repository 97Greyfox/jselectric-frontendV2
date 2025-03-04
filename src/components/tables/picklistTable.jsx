import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
import Swal from "sweetalert2";
import PicklistDrawer from "../drawers/picklistDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function PicklistTable({
  picklistData,
  picklistName,
  loading,
  refreshData,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [picklistId, setpicklistId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  useEffect(() => {
    setPage(0);
  }, [loading]);

  const openEmpModal = (data) => {
    setpicklistId(data.id);
    setEditData(data);
    setOpenModal(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const editEmp = (data, id) => {
    let apiUrl;
    if (picklistName == "User Type") {
      apiUrl = `${apiPath.prodPath}/api/userType/${id}`;
    }
    if (picklistName == "Brand") {
      apiUrl = `${apiPath.prodPath}/api/brand/${id}`;
    }
    if (picklistName == "Service Ticket Terms") {
      apiUrl = `${apiPath.prodPath}/api/term/${id}`;
    }
    if (picklistName == "Checked Out") {
      apiUrl = `${apiPath.prodPath}/api/checkedOut/${id}`;
    }
    if (picklistName == "Warnings") {
      apiUrl = `${apiPath.prodPath}/api/warning/${id}`;
    }
    if (picklistName == "Timeout Reason") {
      apiUrl = `${apiPath.prodPath}/api/timeoutReason/${id}`;
    }
    if (picklistName == "Offences") {
      apiUrl = `${apiPath.prodPath}/api/offence/${id}`;
    }
    if (picklistName == "Position") {
      apiUrl = `${apiPath.prodPath}/api/position/${id}`;
    }
    if (picklistName == "PO Status") {
      apiUrl = `${apiPath.prodPath}/api/POStatus/${id}`;
    }
    if (picklistName == "Building") {
      apiUrl = `${apiPath.prodPath}/api/building/${id}`;
    }
    if (picklistName == "Tool Category") {
      apiUrl = `${apiPath.prodPath}/api/toolCategory/${id}`;
    }
    if (picklistName == "Device Category") {
      apiUrl = `${apiPath.prodPath}/api/deviceCategory/${id}`;
    }
    if (picklistName == "Task Category") {
      apiUrl = `${apiPath.prodPath}/api/taskCategory/${id}`;
    }
    if (picklistName == "Notes Category") {
      apiUrl = `${apiPath.prodPath}/api/notesCategory/${id}`;
    }
    if (picklistName == "Notes Status") {
      apiUrl = `${apiPath.prodPath}/api/notesStatus/${id}`;
    }
    if (picklistName == "Task Status") {
      apiUrl = `${apiPath.prodPath}/api/taskStatus/${id}`;
    }
    if (picklistName == "Task Priority") {
      apiUrl = `${apiPath.prodPath}/api/taskPriority/${id}`;
    }
    if (picklistName == "Storage Id") {
      apiUrl = `${apiPath.prodPath}/api/storageId/${id}`;
    }
    if (picklistName == "Tool Sub-Category") {
      apiUrl = `${apiPath.prodPath}/api/subtoolCategory/${id}`;
    }
    if (picklistName == "Customer Type") {
      apiUrl = `${apiPath.prodPath}/api/customerType/${id}`;
    }
    if (picklistName == "Customer Term") {
      apiUrl = `${apiPath.prodPath}/api/customerTerm/${id}`;
    }
    if (picklistName == "Tax Code") {
      apiUrl = `${apiPath.prodPath}/api/taxCode/${id}`;
    }
    if (picklistName == "Material Level") {
      apiUrl = `${apiPath.prodPath}/api/materialLevel/${id}`;
    }
    if (picklistName == "Labor Level") {
      apiUrl = `${apiPath.prodPath}/api/laborLevel/${id}`;
    }
    if (picklistName == "Salesperson Code") {
      apiUrl = `${apiPath.prodPath}/api/salesPersonCode/${id}`;
    }
    if (picklistName == "Job Type") {
      apiUrl = `${apiPath.prodPath}/api/jobType/${id}`;
    }
    if (picklistName == "Job Tag") {
      apiUrl = `${apiPath.prodPath}/api/jobTag/${id}`;
    }
    if (picklistName == "Job PM") {
      apiUrl = `${apiPath.prodPath}/api/jobPM/${id}`;
    }
    if (picklistName == "Job Status") {
      apiUrl = `${apiPath.prodPath}/api/jobStatus/${id}`;
    }
    if (picklistName == "Job Sources") {
      apiUrl = `${apiPath.prodPath}/api/jobSources/${id}`;
    }
    if (picklistName == "Job CTM") {
      apiUrl = `${apiPath.prodPath}/api/jobCTM/${id}`;
    }
    if (picklistName == "Training Category") {
      apiUrl = `${apiPath.prodPath}/api/trainingCategory/${id}`;
    }
    if (picklistName == "Overstock Categories") {
      apiUrl = `${apiPath.prodPath}/api/overstockCategories/${id}`;
    }
    if (picklistName == "Phase") {
      apiUrl = `${apiPath.prodPath}/api/phase/${id}`;
    }
    if (picklistName == "Reimbursal Type") {
      apiUrl = `${apiPath.prodPath}/api/reimbursalType/${id}`;
    }
    axios
      .patch(apiUrl, data)
      .then((res) => {
        setOpenModal(false);
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const deleteEmp = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the employee data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        let apiUrl;
        if (picklistName == "User Type") {
          apiUrl = `${apiPath.prodPath}/api/userType/${id}`;
        }
        if (picklistName == "Brand") {
          apiUrl = `${apiPath.prodPath}/api/brand/${id}`;
        }
        if (picklistName == "Service Ticket Terms") {
          apiUrl = `${apiPath.prodPath}/api/term/${id}`;
        }
        if (picklistName == "Checked Out") {
          apiUrl = `${apiPath.prodPath}/api/checkedOut/${id}`;
        }
        if (picklistName == "Warnings") {
          apiUrl = `${apiPath.prodPath}/api/warning/${id}`;
        }
        if (picklistName == "Offences") {
          apiUrl = `${apiPath.prodPath}/api/offence/${id}`;
        }
        if (picklistName == "Timeout Reason") {
          apiUrl = `${apiPath.prodPath}/api/timeoutReason/${id}`;
        }
        if (picklistName == "PO Status") {
          apiUrl = `${apiPath.prodPath}/api/POStatus/${id}`;
        }
        if (picklistName == "Position") {
          apiUrl = `${apiPath.prodPath}/api/position/${id}`;
        }
        if (picklistName == "Building") {
          apiUrl = `${apiPath.prodPath}/api/building/${id}`;
        }
        if (picklistName == "Tool Category") {
          apiUrl = `${apiPath.prodPath}/api/toolCategory/${id}`;
        }
        if (picklistName == "Device Category") {
          apiUrl = `${apiPath.prodPath}/api/deviceCategory/${id}`;
        }
        if (picklistName == "Task Category") {
          apiUrl = `${apiPath.prodPath}/api/taskCategory/${id}`;
        }
        if (picklistName == "Notes Category") {
          apiUrl = `${apiPath.prodPath}/api/notesCategory/${id}`;
        }
        if (picklistName == "Task Status") {
          apiUrl = `${apiPath.prodPath}/api/taskStatus/${id}`;
        }
        if (picklistName == "Task Priority") {
          apiUrl = `${apiPath.prodPath}/api/taskPriority/${id}`;
        }
        if (picklistName == "Notes Status") {
          apiUrl = `${apiPath.prodPath}/api/notesStatus/${id}`;
        }
        if (picklistName == "Storage Id") {
          apiUrl = `${apiPath.prodPath}/api/storageId/${id}`;
        }
        if (picklistName == "Tool Sub-Category") {
          apiUrl = `${apiPath.prodPath}/api/subtoolCategory/${id}`;
        }
        if (picklistName == "Customer Type") {
          apiUrl = `${apiPath.prodPath}/api/customerType/${id}`;
        }
        if (picklistName == "Customer Term") {
          apiUrl = `${apiPath.prodPath}/api/customerTerm/${id}`;
        }
        if (picklistName == "Tax Code") {
          apiUrl = `${apiPath.prodPath}/api/taxCode/${id}`;
        }
        if (picklistName == "Material Level") {
          apiUrl = `${apiPath.prodPath}/api/materialLevel/${id}`;
        }
        if (picklistName == "Labor Level") {
          apiUrl = `${apiPath.prodPath}/api/laborLevel/${id}`;
        }
        if (picklistName == "Salesperson Code") {
          apiUrl = `${apiPath.prodPath}/api/salesPersonCode/${id}`;
        }
        if (picklistName == "Job Type") {
          apiUrl = `${apiPath.prodPath}/api/jobType/${id}`;
        }
        if (picklistName == "Job Tag") {
          apiUrl = `${apiPath.prodPath}/api/jobTag/${id}`;
        }
        if (picklistName == "Job PM") {
          apiUrl = `${apiPath.prodPath}/api/jobPM/${id}`;
        }
        if (picklistName == "Job Status") {
          apiUrl = `${apiPath.prodPath}/api/jobStatus/${id}`;
        }
        if (picklistName == "Job Sources") {
          apiUrl = `${apiPath.prodPath}/api/jobSources/${id}`;
        }
        if (picklistName == "Job CTM") {
          apiUrl = `${apiPath.prodPath}/api/jobCTM/${id}`;
        }
        if (picklistName == "Training Category") {
          apiUrl = `${apiPath.prodPath}/api/trainingCategory/${id}`;
        }
        if (picklistName == "Overstock Categories") {
          apiUrl = `${apiPath.prodPath}/api/overstockCategories/${id}`;
        }
        if (picklistName == "Phase") {
          apiUrl = `${apiPath.prodPath}/api/phase/${id}`;
        }
        if (picklistName == "Phase") {
          apiUrl = `${apiPath.prodPath}/api/phase/${id}`;
        }
        if (picklistName == "Reimbursal Type") {
          apiUrl = `${apiPath.prodPath}/api/reimbursalType/${id}`;
        }
        axios
          .delete(apiUrl)
          .then((res) => {
            refreshData();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  function bubbleSort(array) {
    var done = false;
    while (!done) {
      done = true;
      for (var i = 1; i < array.length; i += 1) {
        if (array[i - 1] > array[i]) {
          done = false;
          var tmp = array[i - 1];
          array[i - 1] = array[i];
          array[i] = tmp;
        }
      }
    }

    return array;
  }
  const sortedArr =
    picklistName == "Customer Type"
      ? picklistData.sort((a, b) =>
          a.customerType.localeCompare(b.customerType)
        )
      : picklistName == "Material Level"
      ? picklistData.sort((a, b) =>
          a.materialLevel.localeCompare(b.materialLevel)
        )
      : picklistName == "Labor Level"
      ? picklistData.sort((a, b) => a.laborLevel.localeCompare(b.laborLevel))
      : picklistName == "Salesperson Code"
      ? picklistData.sort((a, b) =>
          a.salesPersonCode.localeCompare(b.salesPersonCode)
        )
      : picklistName == "Customer Term"
      ? picklistData.sort((a, b) => a.days.localeCompare(b.days))
      : picklistName == "Checked Out"
      ? bubbleSort(picklistData)
      : picklistData.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      {loading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[300px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {picklistName == "Customer Term" ? (
                <TableRow>
                  <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                  <TableCell>Days</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              ) : picklistName == "Customer Type" ||
                picklistName == "Material Level" ||
                picklistName == "Labor Level" ||
                picklistName == "Salesperson Code" ? (
                <TableRow>
                  <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                  <TableCell>{picklistName}</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Name</TableCell>
                  {picklistName == "Tool Sub-Category" ||
                  picklistName == "Storage Id" ? (
                    <TableCell style={{ minWidth: 150 }}>
                      Parent Category
                    </TableCell>
                  ) : (
                    <TableCell style={{ minWidth: 150 }}>Shortcode</TableCell>
                  )}
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {sortedArr.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No {picklistName} Found</p>
                </TableRow>
              ) : (
                sortedArr
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return picklistName == "Customer Term" ? (
                      <TableRow key={i.id}>
                        <TableCell style={{ position: "relative" }}>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Image
                                src={"/menu.png"}
                                width={24}
                                height={25}
                                alt="menu"
                                onClick={() => setItem(i)}
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => openEmpModal(i)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteEmp(i.id)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>{i.days}</TableCell>
                        <TableCell>{i.description}</TableCell>
                      </TableRow>
                    ) : picklistName == "Customer Type" ||
                      picklistName == "Material Level" ||
                      picklistName == "Labor Level" ||
                      picklistName == "Salesperson Code" ? (
                      <TableRow key={i.id}>
                        <TableCell style={{ position: "relative" }}>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Image
                                src={"/menu.png"}
                                width={24}
                                height={25}
                                alt="menu"
                                onClick={() => setItem(i)}
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => openEmpModal(i)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteEmp(i.id)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>
                          {picklistName == "Customer Type"
                            ? i.customerType
                            : picklistName == "Material Level"
                            ? i.materialLevel
                            : picklistName == "Labor Level"
                            ? i.laborLevel
                            : picklistName == "Salesperson Code"
                            ? i.salesPersonCode
                            : null}
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={i.id}>
                        <TableCell style={{ position: "relative" }}>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Image
                                src={"/menu.png"}
                                width={24}
                                height={25}
                                alt="menu"
                                onClick={() => setItem(i)}
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => openEmpModal(i)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteEmp(i.id)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>{i.name}</TableCell>
                        {picklistName == "Tool Sub-Category" ||
                        picklistName == "Storage Id" ? (
                          <TableCell>{i.parentCategory}</TableCell>
                        ) : (
                          <TableCell>{i.shortCode}</TableCell>
                        )}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
            {openModal && editData ? (
              <PicklistDrawer
                edit={true}
                open={openModal}
                onClose={() => setOpenModal(false)}
                id={picklistId}
                data={editData}
                picklistName={picklistName}
                editPicklist={editEmp}
              />
            ) : null}
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50]}
        component="div"
        count={sortedArr.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
