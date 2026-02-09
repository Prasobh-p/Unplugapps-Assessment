import { useSelector } from "react-redux";
import axios from "axios";
import HeaderForm from "../components/HeaderForm";
import DetailTable from "../components/DetailTable";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import VoucherPrint from "../components/VoucherPrint";

function SalesEntry() {
  const { header, details } = useSelector((state) => state.sales);

  const printRef = useRef(null);

  const handleSubmit = async () => {
    if (!header.vr_no || !header.ac_name) {
      alert("Fill required fields");
      return;
    }

    const payload = {
      header_table: {
        vr_no: Number(header.vr_no),
        vr_date: header.vr_date,
        ac_name: header.ac_name,
        ac_amt: Number(header.ac_amt),
        status: header.status || "A",
      },

      detail_table: details.map((d, index) => ({
        vr_no: Number(header.vr_no),
        sr_no: index + 1,
        item_code: d.item_code,
        item_name: d.item_name,
        description: d.description || "",
        qty: Number(d.qty),
        rate: Number(d.rate),
      })),
    };

    try {
      await axios.post(
        "http://84.46.255.88:3999/header/multiple",
        payload
      );

      alert("Saved successfully");
    } catch (err) {
      console.log(err.response?.data);
      alert("Error saving. Use a new voucher number.");
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef
  });

return (
  <div className="container">
    <div className="top-title">Sales Entry</div>

    <HeaderForm />
    <DetailTable />

    <button onClick={handleSubmit}>Save</button>
    <button onClick={handlePrint} style={{ marginLeft: 10 }}>
      Print Voucher
    </button>

    <div style={{ position: "absolute", left: "-9999px" }}>
      <VoucherPrint ref={printRef} header={header} details={details} />
    </div>
  </div>
);

}

export default SalesEntry;
