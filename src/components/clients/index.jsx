import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { Skeleton } from "@/components/ui/skeleton";

const poppins = Poppins({
  weight: ["300", "400", "600", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
import { pusherClient } from "@/utils/pusher";
import useStore from "@/utils/store/store";
import ClientTable from "../tables/clientTable";
import ClientDrawer from "../drawers/clientDrawer";

function Clients() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allClients, setAllClients] = useState([]);
  const [search, setSearch] = useState("");
  const currentUser = useStore((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (
      currentUser !== undefined &&
      currentUser !== null &&
      currentUser.fullname !== undefined
    ) {
      pusherClient.subscribe(currentUser.id);
      const handleUpdatedChat = (updatedChat) => {
        console.log("updatedChat clients", updatedChat);
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
        if (currentUser !== undefined && currentUser !== null) {
          pusherClient.unsubscribe(currentUser.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    } else {
      router.push("/login");
    }
  }, [currentUser]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setAllClients(res.data.clients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    if (search == "") {
      return false;
    }
    axios
      .get(`${apiPath.prodPath}/api/clients/${search}`)
      .then((res) => {
        setAllClients(res.data.clients);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const addClient = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/clients/addClient`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setAllClients(res.data.clients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleClear = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setAllClients(res.data.clients);
        setLoading(false);
        setSearch("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className="client-wrap">
      <section className="inner-client">
        <div className="add-btn-wrap">
          <h2
            className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}
          >
            Clients
          </h2>
        </div>
        <div className="flex flex-row justify-between pb-3">
          <form onSubmit={handleSearch} className="w-3/5 flex flex-row">
            <input
              className="p-2 mt-3 w-2/3 cus-filter-inp"
              type="text"
              placeholder="Search by Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <input
              className="p-2 mt-3 ml-2 bg-orange-400 cus-search-btn"
              type="submit"
              value={"Search"}
            />
            {search == "" ? null : (
              <p
                onClick={handleClear}
                className={`${poppins.className} clear-btn`}
                style={{ color: "red" }}
              >
                Clear
              </p>
            )}
          </form>
          <button
            onClick={() => setDrawer(true)}
            className="p-2 font-medium bg-orange-400 rounded-xl text-white"
          >
            Add Client
          </button>
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
          <section className="table-wrap">
            <ClientTable
              refreshData={refreshData}
              allClients={allClients}
              loading={false}
            />
          </section>
        )}
      </section>
      <ClientDrawer
        addClient={addClient}
        open={drawer}
        onClose={handleCloseDrawer}
      />
    </section>
  );
}

export default Clients;
