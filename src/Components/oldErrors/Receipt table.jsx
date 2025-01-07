import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const Receipt = () => {
  const location = useLocation();
  const { items, subtotal, discount, tax, total, formData } = location.state;
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('invoice.pdf');
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4" ref={pdfRef}>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold">Receipt</h2>
          <div className="flex justify-between">
            <div className="mt-4">
              <h3 className="font-semibold">Bill To:</h3>
              <p>{formData.billToName}</p>
              <p>{formData.billToEmail}</p>
              <p>{formData.billToAddress}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Bill From:</h3>
              <p>{formData.billFromName}</p>
              <p>{formData.billFromEmail}</p>
              <p>{formData.billFromAddress}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-semibold">Invoice Number: {formData.invoiceNumber}</p>
            <p className="font-semibold">Due Date: {formData.dueDate}</p>
          </div>

          <table className="min-w-full mt-4 border-2">
            <thead className="">
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="text-center ">
                  <td>{item.item}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <p className="flex gap-20 justify-between">Subtotal: <span> ₹{subtotal.toFixed(2)}</span></p>
            <p className="flex gap-20 justify-between">Discount: <span> ₹{discount.toFixed(2)}</span></p>
            <p className="flex gap-20 justify-between">Tax: <span> ₹{tax.toFixed(2)}</span></p>
            <hr />
            <p className="font-semibold flex justify-between ">Total: <span> ₹{total.toFixed(2)}</span></p>
          </div>
        </div>
      </div>
      <div className="row text-center mt-5">
        <button className="btn bg-blue-600 rounded-lg p-2 text-white" onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default Receipt;
