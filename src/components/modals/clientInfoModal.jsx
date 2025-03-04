import { Modal } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopInfoClients from "../topInfo/topInfoClients";
import Invoices from "../clients/invoices";
import ClientAttachmentForm from "../clients/picFileAttachments";

// import "./style.scss";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ClientInfo({ open, onClose, item, refreshData }) {
  const [activeTab, setActiveTab] = useState("Invoices");
  const tabHandler = (e) => {
    setActiveTab(e.target.innerText);
  };
  console.log("####", item);

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
        <div className={`${poppins.className} info-modal`}>
          <TopInfoClients item={item} />
        </div>
        <Tabs defaultValue="Invoices" className="w-full">
          <TabsList className="cus-tab-wrap">
            <TabsTrigger value="Invoices">Invoices</TabsTrigger>
            <TabsTrigger value="pics">Pics/Files</TabsTrigger>
          </TabsList>
          <TabsContent value="Invoices">
            <Invoices allData={item} />
          </TabsContent>
          <TabsContent value="pics">
            <ClientAttachmentForm
              clientId={item.id}
              attachments={item.attachments}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ClientInfo;
