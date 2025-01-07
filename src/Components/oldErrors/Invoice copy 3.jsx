import  {useEffect, useState } from "react";
import { FaRupeeSign, FaTrash } from "react-icons/fa";
import { useForm, Controller, } from "react-hook-form";


const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

// Part1 Component
const Part1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <div>
          <p className="text-gray-600">
          Current Date: <span className="font-semibold">{formattedDate}</span>
          </p>
          <label className="text-gray-600 block mt-2">
            Due Date:{" "}
            <input
              type="date"
              {...register("dueDate", { required: "Due date is required" })}
              className="border rounded p-1 w-full md:w-auto"
              defaultValue="2025-04-01"
            />
          </label>
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-gray-600 block">
            Invoice Number:{" "}
            <input
              type="number"
              {...register("invoiceNumber", {
                required: "Invoice number is required",
                min: {
                  value: 0,
                  message: "Invoice number must be 0 or greater",
                },
              })}
              className="border rounded p-1 w-full md:w-auto"
              defaultValue="0"
              onInput={(e) => {
                if (e.target.value < 0) e.target.value = 0;
              }}
            />
          </label>
          {errors.invoiceNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.invoiceNumber.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-semibold mb-2">Bill to:</p>
          <input
            type="text"
            {...register("billToName", { required: "Name is required" })}
            className="border rounded w-full p-2 mb-2"
            placeholder="Who is the invoice to?"
          />
          {errors.billToName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.billToName.message}
            </p>
          )}
          <input
            type="email"
            {...register("billToEmail", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="border rounded w-full p-2 mb-2"
            placeholder="Email address"
          />
          {errors.billToEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.billToEmail.message}
            </p>
          )}
          <input
            type="text"
            {...register("billToAddress", { required: "Address is required" })}
            className="border rounded w-full p-2"
            placeholder="Billing address"
          />
          {errors.billToAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.billToAddress.message}
            </p>
          )}
        </div>
        <div>
          <p className="font-semibold mb-2">Bill from:</p>
          <input
            type="text"
            {...register("billFromName", { required: "Name is required" })}
            className="border rounded w-full p-2 mb-2"
            placeholder="Who is the invoice from?"
          />
          {errors.billFromName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.billFromName.message}
            </p>
          )}
          <input
            type="email"
            {...register("billFromEmail", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="border rounded w-full p-2 mb-2"
            placeholder="Email address"
          />
          {errors.billFromEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.billFromEmail.message}
            </p>
          )}
          <input
            type="text"
            {...register("billFromAddress", { required: "Address is required" })}
            className="border rounded w-full p-2"
            placeholder="Billing address"
          />
          {errors.billFromAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.billFromAddress.message}
            </p>
          )}
        </div>
      </div>
      
    </form>
  );
};



const Part2 = () => {
  const { control, handleSubmit, setValue, register, formState: { errors } } = useForm();
  const [items, setItems] = useState([{ item: "", quantity: 1, price: 1 }]);
  const [subtotal, setSubtotal] = useState(0);
  const [discountRate, setDiscountRate] = useState(55); // Default discount rate
  const [taxRate, setTaxRate] = useState(44); // Default tax rate
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const onSubmit = (data) => console.log(data);

  const addItem = () => setItems([...items, { item: "", quantity: 1, price: 1 }]);

  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const updateItem = (index, key, value) => {
    const updatedItems = [...items];
    updatedItems[index][key] = value;
    setItems(updatedItems);
  };

  const calculateSubtotal = () => items.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const calculatedSubtotal = calculateSubtotal();
    setSubtotal(calculatedSubtotal);

    const calculatedDiscount = (calculatedSubtotal * discountRate) / 100;
    const calculatedTax = (calculatedSubtotal * taxRate) / 100;
    const calculatedTotal = calculatedSubtotal - calculatedDiscount + calculatedTax;

    setDiscount(calculatedDiscount);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
  }, [items, discountRate, taxRate]);

  return (
    <div className="bg-white p-6 rounded-lg max-w-7xl mx-auto shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 content-center items-center">
              <div className="col-span-2">
                <label className="font-semibold">ITEM</label>
                <Controller
                  name={`items[${index}].item`}
                  control={control}
                  defaultValue={item.item}
                  rules={{ required: "Item is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="border rounded w-full p-2"
                      onChange={(e) => updateItem(index, "item", e.target.value)}
                    />
                  )}
                />
                {errors.items?.[index]?.item && <p className="text-red-500 text-sm">{errors.items[index].item.message}</p>}
              </div>

              <div className="col-span-1">
                <label className="block text-gray-600">Quantity</label>
                <input
                  type="number"
                  className="border rounded w-full p-2"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", Math.max(1, e.target.value))}
                />
              </div>

              <div className="col-span-1">
                <label className="block text-gray-600">Price</label>
                <div className="flex items-center">
                  <FaRupeeSign className="text-gray-500 mr-2" />
                  <input
                    type="number"
                    className="border rounded w-full p-2"
                    value={item.price}
                    onChange={(e) => updateItem(index, "price", Math.max(1, e.target.value))}
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="flex items-center text-sm bg-red-500 p-2 sm:mt-6 rounded-lg text-white"
                  onClick={() => removeItem(index)}
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Item
        </button>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600">Discount Rate (%)</label>
            <input
              type="number"
              className="border rounded w-full p-2"
              value={discountRate}
              onChange={(e) => setDiscountRate(Math.min(100, Math.max(0, e.target.value)))}
            />
          </div>

          <div>
            <label className="block text-gray-600">Tax Rate (%)</label>
            <input
              type="number"
              className="border rounded w-full p-2"
              value={taxRate}
              onChange={(e) => setTaxRate(Math.min(100, Math.max(0, e.target.value)))}
            />
          </div>
        </div>

        <div className="flex justify-between flex-col items-end">
          <p className="text-gray-600">Subtotal: ₹{subtotal}</p>
          <p className="text-gray-600">Discount ({discountRate}%): ₹{discount.toFixed(2)}</p>
          <p className="text-gray-600">Tax ({taxRate}%): ₹{tax.toFixed(2)}</p>
          <hr />
          <p className="text-black font-semibold text-xl">Total: ₹{total.toFixed(2)}</p>
        </div>

        <textarea className="border rounded w-full p-2" rows="3" {...register("notes")} placeholder="Add notes" />
        <button className="bg-blue-500 text-white p-2 rounded w-full" disabled={items.length === 0}>
          Review Invoice
        </button>
      </form>
    </div>
  );
};



// Main Invoice Component
const Invoice = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <Part1 />
        <Part2 />
        
      </div>
    </div>
  );
};

export default Invoice;
