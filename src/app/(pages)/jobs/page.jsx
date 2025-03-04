"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./style.scss";
import Tools from "@/components/tools";
import { pusherClient } from "@/utils/pusher";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store/store";
import { useRouter } from "next/navigation";
import PurchasingOrder from "@/components/purchasingOrder";
import StorageLocationComp from "@/components/storageLocation";
import VendorComp from "@/components/vendors";
import Overstock from "@/components/overstock";
import JobNumber from "@/components/jobNumber";
import Job from "@/components/jobComp";
import ServicesComp from "@/components/serviceTickets";

function List() {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const [activeInnerTab, setActiveInnerTab] = useState("purchasingOrder");
  useEffect(() => {
    console.log("user", user);
    if (user == null) {
      router.push("/login");
    }
    if (user !== undefined && user !== null && user.id !== undefined) {
      pusherClient.subscribe(user.id);
      const handleUpdatedChat = (updatedChat) => {
        console.log("updatedChat list", updatedChat);
        // setAllChats((allChats) =>
        //   allChats.map((chat) => {
        //     if (chat._id === updatedChat.id) {
        //       return { ...chat, messages: updatedChat.messages };
        //     } else {
        //       return chat;
        //     }
        //   })
        // );
      };
      pusherClient.bind("update-chat", handleUpdatedChat);
      return () => {
        if (user !== undefined && user !== null && user.id !== undefined) {
          pusherClient.unsubscribe(user.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    }
  }, [user, activeInnerTab]);
  console.log("this is inner active", activeInnerTab);
  return (
    <div>
      <Tabs defaultValue="serviceTickets" className="w-full">
        <TabsList className="cus-tab-wrap">
          <TabsTrigger value="serviceTickets">Service Tickets</TabsTrigger>
          <TabsTrigger value="jobNumber">Job Numbers</TabsTrigger>
          <TabsTrigger value="serviceNumbers">Service Numbers</TabsTrigger>
          <TabsTrigger value="jobs">Jobs +</TabsTrigger>
        </TabsList>
        <TabsContent value="serviceTickets">
          <ServicesComp />
        </TabsContent>
        <TabsContent value="jobNumber">
          <JobNumber />
        </TabsContent>
        <TabsContent value="serviceNumbers">
          <p>serviceNumbers</p>
        </TabsContent>
        <TabsContent value="jobs">
          <Job />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default List;
