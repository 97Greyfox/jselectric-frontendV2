"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { apiPath } from "@/utils/routes";
import TrainingDrawer from "../drawers/trainingDrawer";
import TrainingTable from "../tables/trainingTable";

const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function TrainingComp({ user }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [activeTab, setActiveTab] = useState("Slides");
  const [trainingCategoryOpt, setTrainingCategoryOpt] = useState();
  const [trainingCategory, setTrainingCategory] = useState();
  const [searchData, setSearchData] = useState();
  const [searchFlag, setSearchFlag] = useState(false);
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/trainingCategory/`)
      .then((res) => {
        const optionArr = res.data.trainingCategorys.map((i) => {
          return { label: i.name, value: i.name };
        });
        setTrainingCategoryOpt(optionArr);
      })
      .catch((error) => console.log(error));
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/training/`)
      .then((res) => {
        setTrainings(res.data.trainings);
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
  const getFilteredData = (category) => {
    if (searchFlag) {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/training/`)
        .then((res) => {
          setTrainings(res.data.trainings);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios
        .get(`${apiPath.prodPath}/api/training/`)
        .then((res) => {
          setTrainings(res.data.trainings);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/training/`)
      .then((res) => {
        setTrainings(res.data.trainings);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleClear = () => {
    refreshData();
    setSearchFlag(false);
    setTrainingCategory("");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`${apiPath.prodPath}/api/training/`)
      .then((res) => {
        setTrainings(res.data.trainings);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Training
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Add Training
        </button>
      </div>
      <form
        onSubmit={handleSearch}
        className={`${poppins.className} w-1/2 flex flex-col justify-start gap-3 pb-2`}
      >
        <Select
          className="employee-names"
          options={trainingCategoryOpt}
          value={trainingCategory}
          onChange={(v) => {
            setTrainingCategory(v);
            setSearchFlag(true);
          }}
        />
        <div className="flex flex-row justify-start gap-2">
          <input
            className="bg-orange-400 text-white p-2 rounded-xl"
            type="submit"
            value="Search"
          />
          {searchFlag ? (
            <p
              className="bg-orange-400 text-white p-2 rounded-xl"
              onClick={handleClear}
            >
              Clear
            </p>
          ) : null}
        </div>
      </form>
      {/* <div className="tabs">
        <span
          onClick={() => {
            setActiveTab("Slides");
            handleFilterTabs("Picture");
          }}
          className={activeTab == "Slides" ? "activeTab" : "simpleTab"}
        >
          Slides
        </span>
        <span
          onClick={() => {
            setActiveTab("Videos");
            handleFilterTabs("Video");
          }}
          className={activeTab == "Videos" ? "activeTab" : "simpleTab"}
        >
          Videos
        </span>
      </div> */}
      <Tabs defaultValue="slides" className="w-full">
        <TabsList className="cus-tab-wrap">
          <TabsTrigger value="slides">Slides</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="slides">
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[300px] w-[500px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <TrainingTable
              loading={loading}
              refreshData={refreshData}
              data={trainings.filter((i) => i.trainingType == "Picture")}
              user={user}
            />
          )}
        </TabsContent>
        <TabsContent value="videos">
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[300px] w-[500px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <TrainingTable
              loading={loading}
              refreshData={refreshData}
              data={trainings.filter((i) => i.trainingType == "Video")}
              user={user}
            />
          )}
        </TabsContent>
      </Tabs>
      <TrainingDrawer
        refreshData={refreshData}
        open={drawer}
        onClose={handleCloseDrawer}
        editFlag={false}
        user={user}
      />
    </section>
  );
}

export default TrainingComp;
