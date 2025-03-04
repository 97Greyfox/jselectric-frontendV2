"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./style.scss";
import { pusherClient } from "@/utils/pusher";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store/store";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import EmployeesComp from "@/components/employees";
import TimeTrack from "@/components/timeTrack";
function Employees() {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const [activeInnerTab, setActiveInnerTab] = useState("purchasingOrder");
  const [clients, setClients] = useState("");
  const [loading, setLoading] = useState(false);
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
  return (
    <div>
      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="cus-tab-wrap">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="timeTrack">Time Track</TabsTrigger>
        </TabsList>
        <TabsContent value="employees">
          <EmployeesComp />
        </TabsContent>
        <TabsContent value="timeTrack">
          <TimeTrack />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Employees;
