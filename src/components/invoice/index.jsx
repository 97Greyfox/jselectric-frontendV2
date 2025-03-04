import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Select } from "react-select";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import InvoicesTableModal from "../modals/invoiceModal";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function InvoiceComp({ allClients }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [clientName, setClientName] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [clientId, setClientId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  useEffect(() => {
    setFilteredData(allClients);
  }, []);
  const handleClose = () => {
    setOpen(!open);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleData = (dataArr, id) => {
    setData(dataArr);
    setClientId(id);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (clientName == "") {
      return false;
    } else {
      axios
        .get(`${apiPath.prodPath}/api/clients/${clientName}`)
        .then((res) => {
          setFilteredData(res.data.clients);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleClear = () => {
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setFilteredData(res.data.clients);
        setClientName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="main-table-wrap">
      <div className="flex flex-col">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Invoices
        </h2>
      </div>
      <div className="mt-2 pb-5 w-3/4">
        <form className="w-full flex flex-row gap-4" onSubmit={handleSearch}>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Customer Name"
            className={`${poppins.className} w-2/3 p-2 border-gray-300 border-2 rounded-xl`}
          />
          <input
            className={`${poppins.className} bg-orange-400 text-white p-2 rounded-xl`}
            type="submit"
            value={"Search"}
          />
          {clientName == "" ? null : (
            <p
              className={`${poppins.className} bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer`}
              onClick={handleClear}
            >
              Clear
            </p>
          )}
        </form>
      </div>
      <Paper
        className={poppins.className}
        sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
      >
        <TableContainer sx={{ height: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Customer Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Invoices</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Data Found</p>
                </TableRow>
              ) : (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.customerName}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.invoices.length ? (
                            <button
                              className={`${poppins.className} bg-orange-400 text-white p-2 rounded-xl`}
                              onClick={() => {
                                handleData(i.invoices, i.id);
                                handleClose();
                              }}
                            >
                              View
                            </button>
                          ) : (
                            "none"
                          )}
                        </TableCell>
                        {open && clientId == i.id ? (
                          <InvoicesTableModal
                            handleClose={handleClose}
                            openFlag={open}
                            clientId={clientId}
                          />
                        ) : null}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 30, 40, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </section>
  );
}

export default InvoiceComp;
