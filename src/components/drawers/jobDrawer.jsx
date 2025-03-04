import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import Image from "next/image";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function JobDrawer({ open, onClose, addJob, editJob, id, edit, data }) {
  const [jobType, setJobType] = useState("");
  const [jobTypeOpt, setJobTypeOpt] = useState("");
  const [clientsOpt, setClientsOpt] = useState("");
  const [client, setClient] = useState("");
  const [jobId, setJobId] = useState("");
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/jobType`)
      .then((res) => {
        setJobTypeOpt(
          res.data.jobTypes.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
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
    if (edit) {
      setClient({ label: data.client, value: data.client });
      setJobId(data.jobId);
      setJobType({ label: data.jobType, value: data.jobType });
    }
  }, []);

  const handleaddJob = (e) => {
    e.preventDefault();
    const dataObj = {
      jobType: jobType.value,
      jobId,
      client: client.value,
    };
    if (edit) {
      editJob(dataObj, id);
    } else {
      addJob(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setJobType("");
    setClient("");
    setJobId("");
  };
  const jobTypeHandler = (e) => setJobType(e);
  const clientHandler = (e) => setClient(e);
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="tools-drawer"
    >
      <div className={`${poppins.className} w-full flex flex-col p-10`}>
        <h1 className="flex flex-row gap-x-3 font-bold text-2xl">
          <span
            onClick={() => onClose()}
            className="flex flex-col justify-center align-middle"
          >
            <Image src={"/back.png"} width={12} height={21} alt="Back" />
          </span>{" "}
          {edit ? "Edit Job" : "Add Job"}
        </h1>
        <form
          onSubmit={handleaddJob}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Job Type</label>
            <Select
              options={jobTypeOpt}
              onChange={jobTypeHandler}
              id="example-select-1"
              value={jobType}
              className={poppins.className}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Job ID</label>
            <input
              type="text"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Client</label>
            <Select
              options={clientsOpt}
              onChange={clientHandler}
              id="example-select-2"
              value={client}
              className={poppins.className}
            />
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Edit Job" : "Add Job"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default JobDrawer;
