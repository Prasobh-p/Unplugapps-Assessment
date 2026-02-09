import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addRow,
  removeRow,
  updateRow,
  calculateTotal,
  setItems,
} from "../redux/salesSlice";

function DetailTable() {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.sales.details);
  const items = useSelector((state) => state.sales.items);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://84.46.255.88:3999/item");
      dispatch(setItems(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (index, field, value) => {
    dispatch(updateRow({ index, field, value }));
    dispatch(calculateTotal());
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 10 }}>
      <h3>DETAIL SECTION</h3>

      <table width="100%" border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Sr</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {details.map((row, index) => (
            <tr key={index}>
              <td>{row.sr_no}</td>

              <td>
                <select
                  value={row.item_code}
                  onChange={(e) => {
                    const code = e.target.value;
                    const selected = items.find(
                      (i) => i.item_code === code
                    );

                    dispatch(
                      updateRow({
                        index,
                        field: "item_code",
                        value: code,
                      })
                    );

                    dispatch(
                      updateRow({
                        index,
                        field: "item_name",
                        value: selected?.item_name || "",
                      })
                    );

                    dispatch(calculateTotal());
                  }}
                >
                  <option value="">Select</option>
                  {items.map((item) => (
                    <option key={item.item_code} value={item.item_code}>
                      {item.item_name}
                    </option>
                  ))}
                </select>
              </td>

              <td>{row.item_name}</td>

              <td>
                <input
                  value={row.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={row.qty}
                  onChange={(e) =>
                    handleChange(index, "qty", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={row.rate}
                  onChange={(e) =>
                    handleChange(index, "rate", e.target.value)
                  }
                />
              </td>

              <td>{row.qty * row.rate}</td>

              <td>
                <button onClick={() => dispatch(removeRow(index))}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={() => dispatch(addRow())}>
        Add Row
      </button>
    </div>
  );
}

export default DetailTable;
