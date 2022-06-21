import { useEffect, useState } from "react";
import DioInputBar from "./components/DioInputBar.jsx";

function App() {
  const [form, setForm] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");
  const [error0001, setError0001] = useState(false);

  useEffect(() => {
    console.log(`jalannnnnn`);
    if (!error0001) {
      setTimeout(() => {
        setError0001(false);
      }, 3000);
    }
  }, [error0001]);

  const handleAddNewRow = () => {
    setForm([
      ...form,
      {
        productName: "",
        productPrice: "",
        quantity: "1",
        total: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    let newForm = [...form].filter((_, i) => i !== index);
    setForm((previousForm) => newForm);
  };

  const handleOnChange = (event, index) => {
    const { value, name } = event.target;
    const newForm = [...form];

    console.log(newForm);

    // validate if there is 0 on quantity
    newForm.forEach((e) => {
      console.log(parseInt(e.quantity));
      if (parseInt(e.quantity) == "0") {
        return setError0001((value) => (value = true));
      }
    });

    newForm[index][name] = value;
    newForm[index]["total"] =
      newForm[index]["productPrice"] * newForm[index]["quantity"];

    const sumTotal = (acc, e) => {
      return acc + e.total;
    };
    const newGrandTotal = newForm.reduce(sumTotal, 0);

    setForm(newForm);
    setGrandTotal(
      (previousGrandTotal) => (previousGrandTotal = newGrandTotal)
    );
  };
  return (
    <div className="App">
      <button
        onClick={() => {
          handleAddNewRow();
        }}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        New
      </button>

      {error0001 && <div>GA BOLEH KUANTITASNYA 0 YA!</div>}

      {form.map((element, index) => (
        <div className="grid grid-cols-5" key={index}>
          <DioInputBar
            dioOnChange={handleOnChange}
            dioValue={form[index].productName}
            dioName={"productName"}
            dioIndex={index}
            dioLabel="Product name"
            dioType={"text"}
            dioClassName={"bg-slate-100 border-gray-600 max-w-20 rounded-lg"}
          />
          <DioInputBar
            dioOnChange={handleOnChange}
            dioValue={form[index].productPrice}
            dioName={"productPrice"}
            dioIndex={index}
            dioLabel="Product price"
            dioType={"number"}
            dioClassName={"bg-slate-100 border-gray-600 max-w-20 rounded-lg"}
          />
          <DioInputBar
            dioOnChange={handleOnChange}
            dioValue={form[index].quantity}
            dioName={"quantity"}
            dioIndex={index}
            dioLabel="Qty"
            dioType={"number"}
            dioClassName={"bg-slate-100 border-gray-600 max-w-20 rounded-lg"}
          />
          <DioInputBar
            dioOnChange={handleOnChange}
            dioValue={form[index].total}
            dioName={"total"}
            dioIndex={index}
            dioLabel="Total"
            dioType={"number"}
            dioClassName={
              "disabled bg-slate-100 border-gray-600 max-w-20 rounded-lg"
            }
          />
          {index !== 0 && (
            <button
              onClick={() => {
                handleDeleteRow(index);
              }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
      <div className="grid grid-cols-5">
        <DioInputBar
          // dioOnChange={handleGrandTotalOnChange}
          dioValue={grandTotal}
          dioName={"grandTotal"}
          dioLabel="Grand total"
          dioType={"number"}
          dioClassName={
            "col-span-5 bg-slate-100 border-gray-600 max-w-20 rounded-lg"
          }
        />
      </div>
    </div>
  );
}

export default App;
