import { useLocation } from "react-router-dom";

const Receipt = () => {
  const location = useLocation();
  const { items, subtotal, discount, tax, total, formData } = location.state;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold">Receipt</h2>
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

          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.item}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Discount: ₹{discount.toFixed(2)}</p>
            <p>Tax: ₹{tax.toFixed(2)}</p>
            <hr />
            <p className="font-semibold">Total: ₹{total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
