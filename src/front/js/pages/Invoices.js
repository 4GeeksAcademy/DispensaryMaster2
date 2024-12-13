import React, { useState, useEffect } from "react";
import axios from "axios";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/invoices")
      .then((response) => {
        setInvoices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
        setLoading(false);
      });
  }, []);

  const downloadInvoice = (id) => {
    axios
      .get(`/api/invoices/${id}/pdf`, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Invoice_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.error("Error downloading invoice:", error));
  };

  if (loading) return <p>Loading invoices...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Invoices</h2>
      {invoices.length === 0 ? (
        <p>No invoices available</p>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Invoice ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="border px-4 py-2">{invoice.id}</td>
                <td className="border px-4 py-2">{invoice.customer_id}</td>
                <td className="border px-4 py-2">${invoice.total_amount.toFixed(2)}</td>
                <td className="border px-4 py-2">{invoice.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => downloadInvoice(invoice.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Invoices;
