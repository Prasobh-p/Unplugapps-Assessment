import React, { forwardRef } from "react";

const VoucherPrint = forwardRef(({ header, details }, ref) => {
  return (
    <div ref={ref} style={{ padding: 20 }}>
      <h2>Sales Voucher</h2>

      <p><b>Voucher No:</b> {header.vr_no}</p>
      <p><b>Date:</b> {header.vr_date}</p>
      <p><b>Account:</b> {header.ac_name}</p>
      <p><b>Status:</b> {header.status}</p>

      <table border="1" width="100%" cellPadding="6">
        <thead>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {details.map((d, i) => (
            <tr key={i}>
              <td>{d.item_name}</td>
              <td>{d.description}</td>
              <td>{d.qty}</td>
              <td>{d.rate}</td>
              <td>{d.qty * d.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: {header.ac_amt}</h3>
    </div>
  );
});

export default VoucherPrint;
