import axios from "axios";
import React, { useState, useEffect } from "react";
import { apiPath } from "../../utils/routes";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Swal from "sweetalert2";
import { Poppins } from "next/font/google";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Skeleton } from "../ui/skeleton";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function Locations({ vendorId }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [data, setData] = useState([]);
  const [actionFlag, setActionFlag] = useState(false);
  const [vendorLocationId, setVendorLocationId] = useState("");
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [primaryContact, setPrimaryContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vendor/`)
      .then((res) => {
        console.log(res.data.vendors);
        const filteredVendor = res.data.vendors.find((i) => i.id == vendorId);
        setLocations(filteredVendor.locations);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleActions = (id, objData) => {
    setVendorLocationId(id);
    setData(objData);
    setActionFlag(!actionFlag);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleAdd = (dataObj) => {
    axios
      .put(
        `${apiPath.prodPath}/api/vendor/addVendorLocation/${vendorId}`,
        dataObj
      )
      .then((res) => {
        if (res.data.error) {
          Swal.fire({ icon: "error", text: "Error Adding Location" });
        } else {
          Swal.fire({
            icon: "success",
            text: "Added Successfully",
          });
          refreshData();
        }
      });
  };
  const handleEdit = (dataObj) => {
    console.log(vendorLocationId);
    axios
      .patch(
        `${apiPath.prodPath}/api/vendor/editVendorLocation/${vendorId}&&${vendorLocationId}`,
        dataObj
      )
      .then((res) => {
        if (res.data.error) {
          Swal.fire({ icon: "error", text: "Enable to edit location" });
        } else {
          refreshData();
        }
      });
  };
  const openEdit = (data) => {
    setEditFlag(true);
    setActionFlag(false);
    setLocationName(data.locationName);
    setAddress(data.address);
    setCity(data.city);
    setState(data.state);
    setZipCode(data.zipCode);
    setPrimaryContact(data.primaryContact);
    setPhone(data.phone);
    setEmail(data.email);
    setVendorLocationId(data.id);
  };
  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete the location",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${apiPath.prodPath}/api/vendor/deleteVendorLocation/${vendorId}&&${id}`
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                title: "Error Occured while deleting location",
              });
            } else {
              refreshData();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const resetValues = () => {
    setLocationName("");
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setPrimaryContact("");
    setPhone("");
    setEmail("");
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/vendor/`)
      .then((res) => {
        const filteredVendor = res.data.vendors.find((i) => i.id == vendorId);
        setLocations(filteredVendor.locations);
        setLoading(false);
        setEditFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const handleForm = (e) => {
    e.preventDefault();
    const dataObj = {
      locationName,
      address,
      city,
      state,
      zipCode,
      primaryContact,
      phone,
      email,
    };
    if (editFlag) {
      handleEdit(dataObj);
      resetValues();
    } else {
      handleAdd(dataObj);
      resetValues();
    }
  };
  return loading ? (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-[500px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ) : (
    <div className="ven-locations-wrap">
      <form
        className="flex flex-row gap-5 flex-wrap w-full mt-9 mb-2"
        onSubmit={handleForm}
      >
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Location Name</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className={`${poppins.className} p-2 cus-tool-form`}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`${poppins.className} p-2 cus-tool-form`}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`${poppins.className} p-2 cus-tool-form`}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={`${poppins.className} p-2 cus-tool-form`}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Zipcode</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className={`${poppins.className} p-2 cus-tool-form`}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Primary Contact</label>
          <input
            type="text"
            value={primaryContact}
            onChange={(e) => setPrimaryContact(e.target.value)}
            className={`${poppins.className} p-2 cus-tool-form`}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${poppins.className} p-2 cus-tool-form`}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${poppins.className} p-2 cus-tool-form`}
          />
        </div>
        <div className="sub-btn-wrap">
          <input
            className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
            type="submit"
            value={editFlag ? "Edit Vendor" : "Add Vendor"}
          />
        </div>
      </form>
      {locations && locations.length ? (
        <Paper
          className={poppins.className}
          sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
        >
          <TableContainer sx={{ height: 300 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Location Name</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Address</TableCell>
                  <TableCell style={{ minWidth: 150 }}>City</TableCell>
                  <TableCell style={{ minWidth: 150 }}>State</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Zipcode</TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    Primary Contact
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>Phone</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell style={{ position: "relative" }}>
                          <div className="flex flex-row gap-2">
                            <EditIcon
                              className="text-blue-400"
                              onClick={() => {
                                openEdit(i);
                                setActionFlag(false);
                              }}
                            />
                            <DeleteIcon
                              className="text-red-500"
                              onClick={() => {
                                handleDelete(i.id);
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.locationName}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.address}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.city}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.state}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.zipCode}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.primaryContact}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.phone}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.email}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3]}
            component="div"
            count={locations.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <p>No Locations data found</p>
      )}
    </div>
  );
}

export default Locations;
