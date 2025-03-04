import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import { Skeleton } from "@/components/ui/skeleton";
import PurchaseOrdersDrawer from "../drawers/purchaseOrderDrawer";
import PurchaseOrderTable from "../tables/purchaseTable";

const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function PurchasingOrder() {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [overstockCategory, setOverstockCategory] = useState("");
  const [pmOpt, setPmOpt] = useState([]);
  const [projectManager, setProjectManager] = useState("");
  const [jobNoOpt, setJobNoOpt] = useState([]);
  const [jobNo, setJobNo] = useState("");
  const [supplierOpt, setSupplierOpt] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);
  const [optLoader, setOptLoader] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/purchaseOrder`)
      .then((res) => {
        console.log("####", res.data.purchaseOrders);
        setPurchaseOrders(res.data.purchaseOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    setOptLoader(true);
    axios.get(`${apiPath.prodPath}/api/jobNumber`).then((res) => {
      const data = res.data.jobNumbers.map((i) => {
        return { label: i.jobNumber, value: i.jobNumber };
      });
      setJobNoOpt(data.sort((a, b) => a.label.localeCompare(b.label)));
      setOptLoader(false);
    });
    setOptLoader(true);
    axios.get(`${apiPath.prodPath}/api/users`).then((res) => {
      const data = res.data.allUsers.map((i) => {
        return { label: i.fullname, value: i.fullname };
      });
      setPmOpt(data.sort((a, b) => a.label.localeCompare(b.label)));
      setOptLoader(false);
    });
    setOptLoader(true);
    axios.get(`${apiPath.prodPath}/api/vendor`).then((res) => {
      const data = res.data.vendors.map((i) => {
        return { label: i.name, value: i.name };
      });
      setSupplierOpt(data.sort((a, b) => a.label.localeCompare(b.label)));
      setOptLoader(false);
    });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addPurchasingOrder = (data) => {
    axios
      .post(`${apiPath.prodPath}/api/purchaseOrder/addPurchaseOrder`, data)
      .then((res) => {
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/purchaseOrder/`)
      .then((res) => {
        setPurchaseOrders(res.data.purchaseOrders);
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
        setPurchaseOrders(res.data.purchaseOrders);
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
          Purchase Order
        </h2>
        <button
          onClick={() => setDrawer(true)}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          + Create Purchase Order
        </button>
      </div>
      <div>
        <form
          className="flex flex-row flex-wrap w-1/2 gap-2 mb-4"
          onSubmit={handleSearch}
        >
          <div className={`${poppins.className} w-full`}>
            <Select
              options={pmOpt}
              onChange={(v) => setProjectManager(v)}
              value={projectManager}
              placeholder="Project Manager"
              className="employee-names"
            />
          </div>
          <div className="w-2/5">
            <Select
              options={jobNoOpt}
              onChange={(v) => setJobNo(v)}
              value={jobNo}
              placeholder="Job Number"
              className="employee-names"
            />
          </div>
          <div className="w-2/5">
            <Select
              options={supplierOpt}
              onChange={(v) => setSupplier(v)}
              value={supplier}
              placeholder="Supplier"
              className="employee-names"
            />
          </div>
          <div className="flex flex-row justify-end align-middle w-1/6">
            <input
              className={`${poppins.className} p-1 w-full bg-orange-400 text-white font-semibold rounded-xl`}
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
        ) : purchaseOrders.length ? (
          <PurchaseOrderTable
            loading={loading}
            purchaseOrders={purchaseOrders}
            refreshData={refreshData}
          />
        ) : (
          <p>No Purchase Order Data Found</p>
        )}
      </div>
      {loading || drawer ? (
        <PurchaseOrdersDrawer
          addPurchaseOrders={addPurchasingOrder}
          open={drawer}
          onClose={handleCloseDrawer}
          edit={false}
          allPurchasing={purchaseOrders}
        />
      ) : null}
    </section>
  );
}

export default PurchasingOrder;
