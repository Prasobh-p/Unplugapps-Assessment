import { useDispatch, useSelector } from "react-redux";
import { setHeader } from "../redux/salesSlice";

function HeaderForm() {
  const dispatch = useDispatch();
  const header = useSelector((state) => state.sales.header);

  const handleChange = (e) => {
    dispatch(setHeader({ [e.target.name]: e.target.value }));
  };

return (
  <div className="card">
    <div className="top-title">Header</div>

    <div className="row">
      <input
        name="vr_no"
        placeholder="Voucher No"
        value={header.vr_no}
        onChange={handleChange}
      />

      <input
        type="date"
        name="vr_date"
        value={header.vr_date}
        onChange={handleChange}
      />
    </div>

    <div className="row">
      <input
        name="ac_name"
        placeholder="Account Name"
        value={header.ac_name}
        onChange={handleChange}
      />

      <select name="status" value={header.status} onChange={handleChange}>
        <option value="A">Active</option>
        <option value="I">Inactive</option>
      </select>
    </div>

    <div className="row">
      <input value={header.ac_amt} readOnly placeholder="Total Amount" />
    </div>
  </div>
);

}

export default HeaderForm;
