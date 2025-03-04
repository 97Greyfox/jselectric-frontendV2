"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppSidebar } from "@/components/sidebar/index";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { pusherClient } from "@/utils/pusher";
import useStore from "@/utils/store/store";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  style: ["normal"],
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export default function Home() {
  const user = useStore((state) => state.user);
  const storeUser = useStore((state) => state.storeUser);
  const router = useRouter();
  useEffect(() => {
    console.log(user);
    if (user == null) {
      router.push("/login");
    }
  }, []);
  useEffect(() => {
    if (user !== undefined && user !== null && user.id !== undefined) {
      pusherClient.subscribe(user.id);
      const handleUpdatedChat = (updatedChat) => {
        console.log("updatedChat within dashboard", updatedChat);
      };
      pusherClient.bind("update-chat", handleUpdatedChat);
      return () => {
        if (user !== undefined && user !== null && user.id !== undefined) {
          pusherClient.unsubscribe(user.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    }
  }, [user]);
  const handleLogout = () => {
    storeUser(null);
    router.push("/login");
  };
  return (
    <main className={`${poppins.className} flex flex-row flex-nowrap`}>
      <section className="w-1/6">
        <SidebarProvider>
          <AppSidebar>
            <SidebarTrigger />
          </AppSidebar>
        </SidebarProvider>
      </section>
      <section className="w-full pr-20 pl-20 pt-1 pb-1 overflow-hidden">
        <nav className="flex flex-row justify-end w-full rounded-full p-3 mt-3 mb-3 shadow-md gap-x-10 cus-nav">
          <Link href={"/task"}>
            <Image src={"/task.png"} width={32} height={32} alt="Tasks" />
          </Link>
          <Link href={"/chat"}>
            <Image src={"/chat.png"} width={32} height={32} alt="Chat" />
          </Link>
          <Link href={"/notifications"}>
            <Image
              src={"/bell.png"}
              width={32}
              height={32}
              alt="Notification"
            />
          </Link>
          <Link href={"/settings"}>
            <Image
              src={"/settings.png"}
              width={32}
              height={32}
              alt="Settings"
            />
          </Link>
          <Avatar>
            <DropdownMenu className={`${poppins.className}`}>
              <DropdownMenuTrigger>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {user && user !== null && user.fullname !== undefined
                    ? user.fullname
                        .split(" ")
                        .map((n) => n[0])
                        .join(".")
                    : "U"}
                </AvatarFallback>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Avatar>
        </nav>
        <h1 className="text-center font-bold text-2xl mt-20">
          Dashboard Coming Soon!
        </h1>
      </section>
    </main>
  );
}
