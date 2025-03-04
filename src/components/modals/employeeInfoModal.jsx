import { Modal } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TopEmployeeInfo from "../topInfo/topEmpInfo";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BadgeTab from "../employees/badge";
import Notes from "../employees/notes";
import PicFile from "../employees/picFiles";
import ScheduleTab from "../employees/scheduleTab";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function EmployeeInfo({ open, onClose, item, refreshData }) {
  const [activeTab, setActiveTab] = useState("Badges");
  const tabHandler = (e) => {
    setActiveTab(e.target.innerText);
  };
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
      open={open}
      onClose={onClose}
    >
      <div
        className={`${poppins.className} bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll`}
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
        <TopEmployeeInfo item={item} />
        <Tabs defaultValue="badges" className="w-full pt-2 pb-2">
          <TabsList className="cus-tab-wrap">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="pics">Pic/Files</TabsTrigger>
            <TabsTrigger value="schedules">Schedules</TabsTrigger>
          </TabsList>
          <TabsContent value="badges">
            <BadgeTab
              item={item}
              closeModal={onClose}
              refreshData={refreshData}
            />
          </TabsContent>
          <TabsContent value="notes">
            <Notes userId={item.id} />
          </TabsContent>
          <TabsContent value="pics">
            <PicFile userId={item.id} attachments={item.attachments} />
          </TabsContent>
          <TabsContent value="schedules">
            <ScheduleTab schedules={item.schedules} />
          </TabsContent>
        </Tabs>
        {/* <div className={`${poppins.className} innerTabsWrap`}>
        {activeTab == "Badges" ? (
          <BadgeTab
            item={item}
            closeModal={onClose}
            refreshData={refreshData}
          />
        ) : null}
        {activeTab == "Notes" ? <Notes userId={item.id} /> : null}
        {activeTab == "Pic/Files" ? (
          <PicFile userId={item.id} attachments={item.attachments} />
        ) : null}
        {activeTab == "Schedules" ? (
          <ScheduleTab schedules={item.schedules} />
        ) : null}
      </div> */}
      </div>
    </Modal>
  );
}

export default EmployeeInfo;
