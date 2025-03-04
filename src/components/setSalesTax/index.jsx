import axios from "axios";
import { apiPath } from "@/utils/routes";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Skeleton } from "../ui/skeleton";

function SalesTaxComp() {
  const [taxValue, setTaxValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setLoader(true);
    axios.get(`${apiPath.prodPath}/api/globalTax`).then((res) => {
      setTaxValue(res.data.globalTaxs);
      setNumber(res.data.globalTaxs[0].taxValue);
      setLoader(false);
    });
  }, []);

  const handleTaxForm = (e) => {
    e.preventDefault();
    const dataObj = {
      taxValue: number,
    };
    axios
      .patch(`${apiPath.prodPath}/api/globalTax/${taxValue[0].id}`, dataObj)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({ icon: "error", text: "Unable to add the Sales Text" });
        } else {
          axios.get(`${apiPath.prodPath}/api/globalTax`).then((res) => {
            setTaxValue(res.data.globalTaxs);
            setNumber(res.data.globalTaxs[0].taxValue);
            onClose();
          });
        }
      });
  };
  return (
    <section className="pt-5">
      {loader ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[300px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <h3 className="text-3xl font-semibold">Sales Tax</h3>
          <p className="pt-5 pb-4">
            Current Sales Tax is {taxValue.length ? taxValue[0].taxValue : 0}%
          </p>
          <form
            onSubmit={handleTaxForm}
            className="flex flex-row flex-wrap w-full gap-4"
          >
            <div className="flex flex-col gap-4 w-1/2">
              <label className="text-gray-300">Set Sales Tax</label>
              <input
                step="any"
                type="number"
                value={number}
                className="p-2 rounded-xl border-2 border-gray-200"
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-end">
              <input
                type="submit"
                value="Set Tax"
                className="self-end bg-orange-400 text-white p-2 rounded-xl"
              />
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

export default SalesTaxComp;
