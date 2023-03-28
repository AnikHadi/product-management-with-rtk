import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  filterCategoryPd,
  filterSelectedPd,
} from "../../features/filter/filterSelector";
import {
  isProductAvailable,
  selectedName,
  selectedProduct,
} from "../../features/filter/filterSlice";
import { selectAllProducts } from "../../features/products/productsSelector";

const ProductInput = () => {
  // all local state
  const [inputProductName, setInputProductName] = useState("");
  const [amount, setAmount] = useState("");

  // get all filter data from store
  const filterByCategory = useSelector(filterCategoryPd);
  const filterSelectedProductNameArray = useSelector(filterSelectedPd)?.map(
    (pd) => pd.productName
  );
  const allFilterProducts = useSelector(selectAllProducts)?.filter(
    (pd) => pd.productCategory === filterByCategory
  );

  // get all filter data for selected product
  const productNameList = allFilterProducts?.map((pd) => pd.productName);
  const filterByUnselectProductName = productNameList?.filter((pd) => {
    if (
      filterSelectedProductNameArray?.length > 0 &&
      filterSelectedProductNameArray.includes(pd)
    ) {
      return "";
    } else {
      return pd;
    }
  });

  //   utils
  const unit = allFilterProducts?.find(
    (pd) => pd.productName === inputProductName
  )?.unit;

  const dispatch = useDispatch();
  if (filterByUnselectProductName?.length === 0) {
    dispatch(isProductAvailable(false));
  } else {
    dispatch(isProductAvailable(true));
  }

  //   reset form
  const resetForm = () => {
    setInputProductName("");
    setAmount("");
  };

  //   handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(amount) !== 0 && Number(amount) > 0) {
      if (productNameList.includes(inputProductName)) {
        if (filterByUnselectProductName.includes(inputProductName)) {
          dispatch(selectedName(inputProductName));
          dispatch(
            selectedProduct({
              productName: inputProductName,
              amount,
              unit,
              productCategory: filterByCategory,
            })
          );
          resetForm();
          toast("Successfully selected this product.✅");
        } else {
          toast("This Product Name already selected!");
        }
      } else {
        toast("Enter valid Product Name!");
      }
    } else {
      toast("Positive amount is required!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex rounded-md flex-row py-3 bg-gray-200">
        <div className="basis-2/5  mt-2 ml-4">
          <div className="relative">
            <input
              type="text"
              autoComplete="off"
              id="floating_outlined_input_pdName"
              className="form-select block text-sm w-80  border-2 border-gray-100 rounded-md py-2 px-3 leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 peer"
              list="pdName_list"
              placeholder=" "
              value={inputProductName}
              onChange={(e) => setInputProductName(e.target.value)}
              required
            />
            <datalist
              id="pdName_list"
              className="mt-3 bg-gray-400 appearance-none"
            >
              {filterByUnselectProductName?.map((pdName, i) => (
                <option
                  className="p-2 border-b cursor-pointer border-gray-200 hover:bg-gray-100"
                  key={i}
                  value={pdName}
                />
              ))}
            </datalist>
            <label
              htmlFor="floating_outlined_input_pdName"
              className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-purple-400 peer-focus:dark:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Product Name
            </label>
          </div>
        </div>
        <div className="basis-3/5  mt-2 ml-4">
          <div className="flex justify-between px-7 pr-10">
            <div className="flex">
              <div className="relative">
                <input
                  id="floating_outlined_input_number"
                  className="form-input block text-sm   w-28  border-2 border-gray-100 rounded-md py-2 px-3 leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400  peer"
                  type="number"
                  name=""
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder=" "
                  //   required   this two is validate this input field
                  //   min={1}
                />{" "}
                <label
                  htmlFor="floating_outlined_input_number"
                  className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-purple-400 peer-focus:dark:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Amount
                </label>
              </div>
              <div className="py-1 px-1 text-xl"> {unit}</div>
            </div>
            <div className="py-2 mr-14 text-xl">Remark</div>
            <button className="delete-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 hover:text-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>{" "}
            </button>
          </div>
        </div>
      </div>
      <button
        className="float-right mt-4 mr-5 rounded-full  bg-purple-400  p-3"
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 font-black text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </form>
  );
};

export default ProductInput;
