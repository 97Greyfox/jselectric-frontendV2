import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
import { Skeleton } from "@/components/ui/skeleton";
import OverstockDrawer from "../drawers/overstockDrawer";
import OverstockTable from "../tables/overstockTable";

function Overstock() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [overstocks, setOverstocks] = useState([]);
  const [overstockCategory, setOverstockCategory] = useState("");
  const [categoryOpt, setCategoryOpt] = useState([]);
  const [itemDesc, setItemDesc] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/overstock/`)
      .then((res) => {
        console.log("####", res.data.overstocks);
        setOverstocks(res.data.overstocks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    axios.get(`${apiPath.prodPath}/api/overstockCategories`).then((res) => {
      const data = res.data.overstockCats.map((i) => {
        return { label: i.name, value: i.name };
      });
      setCategoryOpt(data);
    });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addOverstock = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/overstock/addOverstock`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/overstock/`)
      .then((res) => {
        setOverstocks(res.data.overstocks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const clearFilter = () => {
    setOverstockCategory("");
    setItemDesc("");
    setSearchFlag(false);
    refreshData();
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchFlag(true);
    setLoading(true);
    axios
      .get(
        `${apiPath.prodPath}/api/overstock/?overstockCategory=${
          overstockCategory !== "" ? overstockCategory.value : ""
        }&&itemDesc=${itemDesc}`
      )
      .then((res) => {
        setOverstocks(res.data.overstocks);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className="main-table-wrap">
      <div className="flex flex-row justify-between pb-5">
        <h2 className={`${poppins.className} font-semibold text-2xl pt-2 pb-2`}>
          Overstock
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Add Overstock
        </button>
      </div>
      <div>
        <form
          className="flex flex-row gap-2 w-1/2 pb-2"
          onSubmit={handleSearch}
        >
          <div className={`${poppins.className} w-full`}>
            <Select
              options={categoryOpt}
              onChange={(v) => setOverstockCategory(v)}
              value={overstockCategory}
              className="employee-names"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
              className={`${poppins.className} p-2 cus-tool-form`}
              placeholder="Description"
            />
          </div>
          <div className="w-full">
            <input
              className={`${poppins.className} p-2 bg-orange-400 text-white font-semibold rounded-xl`}
              type="submit"
              value={"Search"}
            />
          </div>
          {searchFlag ? (
            <div className="sub-btn-wrap">
              <p
                onClick={clearFilter}
                className={`${poppins.className} clear-filter`}
              >
                Clear
              </p>
            </div>
          ) : null}
        </form>
      </div>
      <div className="table-wrap">
        {loading == true ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-[500px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : overstocks.length ? (
          <OverstockTable
            loading={loading}
            overstock={overstocks}
            refreshData={refreshData}
          />
        ) : (
          <p>No Overstock Data Found</p>
        )}
      </div>
      <OverstockDrawer
        addOverstock={addOverstock}
        open={drawer}
        onClose={handleCloseDrawer}
        edit={false}
      />
    </section>
  );
}

export default Overstock;
