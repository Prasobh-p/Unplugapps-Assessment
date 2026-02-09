import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: {
    vr_no: "",
    vr_date: "",
    ac_name: "",
    status: "A",
    ac_amt: 0,
  },
  details: [
    {
      sr_no: 1,
      item_code: "",
      item_name: "",
      description: "",
      qty: 0,
      rate: 0,
    },
  ],
  items: [],
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setHeader(state, action) {
      state.header = { ...state.header, ...action.payload };
    },

    setItems(state, action) {
      state.items = action.payload;
    },

    addRow(state) {
      state.details.push({
        sr_no: state.details.length + 1,
        item_code: "",
        item_name: "",
        description: "",
        qty: 0,
        rate: 0,
      });
    },

    removeRow(state, action) {
      state.details.splice(action.payload, 1);
    },

    updateRow(state, action) {
      const { index, field, value } = action.payload;
      state.details[index][field] = value;
    },

    calculateTotal(state) {
      let total = 0;
      state.details.forEach((row) => {
        total += Number(row.qty) * Number(row.rate);
      });
      state.header.ac_amt = total;
    },
  },
});

export const {
  setHeader,
  setItems,
  addRow,
  removeRow,
  updateRow,
  calculateTotal,
} = salesSlice.actions;

export default salesSlice.reducer;
