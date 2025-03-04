import { Modal } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import TopInfoService from "../topInfo/serviceTicketTopInfo";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PicFileService from "../serviceTickets/picFile";
import { Skeleton } from "@/components/ui/skeleton";
import Payments from "../serviceTickets/payments";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ServiceInfoDrawer({ open, onClose, id, refreshData }) {
  const [activeTab, setActiveTab] = useState("Pics / Files");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, [open]);
  const tabHandler = (e) => {
    setActiveTab(e.target.innerText);
  };
  const getData = () => {
    console.log("Called", id);
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/service/`)
      .then((res) => {
        const filteredData = res.data.services.find((i) => i.id == id);
        console.log("this is filteredData", filteredData);
        setData(filteredData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  console.log("this is data", data);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div
        className="bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll"
        style={{ alignSelf: "center" }}
      >
        <div className="mb-10">
          <Button
            onClick={() => onClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Open</h1>
          </Button>
        </div>
        {loading ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-[500px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <TopInfoService item={data} />
        )}
        <Tabs defaultValue="pics" className="w-full pt-5">
          <TabsList className="cus-tab-wrap">
            <TabsTrigger value="pics">Pics/Files</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="pics">
            {loading ? (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[300px] w-[500px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <PicFileService
                serviceId={data.id}
                attachments={data.attachments}
              />
            )}
          </TabsContent>
          <TabsContent value="payments">
            {loading ? (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[300px] w-[500px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <Payments
                remaining={data.remaining}
                allPayments={data.payments}
                total={data.total}
                refreshData={getData}
                serviceId={data.id}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ServiceInfoDrawer;
