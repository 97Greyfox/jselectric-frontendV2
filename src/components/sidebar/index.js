"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import "./sidebar.scss";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SellIcon from "@mui/icons-material/Sell";
import WorkIcon from "@mui/icons-material/Work";
import PaidIcon from "@mui/icons-material/Paid";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import PeopleIcon from "@mui/icons-material/People";
import PhotoIcon from "@mui/icons-material/Photo";
import { usePathname } from "next/navigation";
export function AppSidebar() {
  const pathname = usePathname();
  console.log(pathname);
  const items = [
    {
      title: "Home",
      url: "/",
      icon: function () {
        return <DashboardIcon />;
      },
    },
    {
      title: "List",
      url: "/list",
      icon: function () {
        return <FormatListBulletedIcon />;
      },
    },
    {
      title: "Purchasing",
      url: "/purchasing",
      icon: function () {
        return <SellIcon />;
      },
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: function () {
        return <WorkIcon />;
      },
    },
    {
      title: "Finance",
      url: "/finance",
      icon: function () {
        return <PaidIcon />;
      },
    },
    {
      title: "Reports",
      url: "/reports",
      icon: function () {
        return <AssignmentIcon />;
      },
    },
    {
      title: "HR",
      url: "/hr",
      icon: function () {
        return <ModeStandbyIcon />;
      },
    },
    {
      title: "Employees",
      url: "/employees",
      icon: function () {
        return <PeopleIcon />;
      },
    },
    {
      title: "Files / Pictures",
      url: "/files",
      icon: function () {
        return <PhotoIcon />;
      },
    },
  ];
  return (
    <Sidebar className="cus-sidebar-style">
      <SidebarContent>
        <div className="pl-10 pr-10 pt-5">
          <Image
            src={"/logo.png"}
            width={100}
            height={50}
            alt="JS Electric Application"
          />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className={
                        pathname == `${item.url}`
                          ? "sidebar-cus-link active-side-link"
                          : "sidebar-cus-link"
                      }
                      href={item.url}
                    >
                      {/* <Image
                        src={item.icon}
                        width={27}
                        height={22}
                        alt="icon"
                      /> */}
                      <span>{item.icon()}</span>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
