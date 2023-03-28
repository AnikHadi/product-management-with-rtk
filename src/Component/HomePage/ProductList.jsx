import { Button, Modal, Table } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterSelectedPd,
  filterSelectedPdAvailable,
} from "../../features/filter/filterSelector";
import { selectedCategory } from "../../features/filter/filterSlice";
import { selectAllProducts } from "../../features/products/productsSelector";
import Loading from "../ui/Loading";
import ProductInput from "./ProductInput";
import SingleProduct from "./SingleProduct";

const ProductList = () => {
  const allProductsCategory = [
    ...new Set(useSelector(selectAllProducts)?.map((pd) => pd.productCategory)),
  ];

  // filter select product
  const filterSelectedProduct = useSelector(filterSelectedPd);
  const isProductAvailable = useSelector(filterSelectedPdAvailable);

  const dispatch = useDispatch();

  const [select, setSelect] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  const selectCategory = (e) => {
    setSelect("");
    setIsLoading(true);
    setTimeout(() => {
      setSelect(e);
      dispatch(selectedCategory(e));
    }, 1000);
  };

  const handleClear = () => {
    setSelect("");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div className="justify-center items-center"></div>
      {select && (
        <label className="font-semibold mr-1" htmlFor="category">
          Item Category:
        </label>
      )}
      <select
        name="Category"
        className=" outline-none no-arrow"
        value={select}
        onChange={(e) => selectCategory(e.target.value)}
        required
      >
        <option hidden>Item Category</option>
        {allProductsCategory?.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {select && (
        <div className="mr-10">
          <div className="mt-3 rounded-md w-full">
            <div className="flex bg-purple-400 rounded-md flex-row py-3">
              <h1 className="basis-2/5 px-44 border-green-300">Items Name</h1>
              <div className="basis-3/5 px-5">
                <div className="flex justify-between">
                  <div>Required (QTY)</div>
                  <div>Remark</div>
                  <div className="">Delete</div>
                </div>
              </div>
            </div>

            {filterSelectedProduct?.map((pd, i) => (
              <SingleProduct product={pd} key={i} />
            ))}

            {isProductAvailable && <ProductInput />}
          </div>
        </div>
      )}
      {select && (
        <div>
          <Button
            disabled={filterSelectedProduct.length === 0}
            onClick={() => setShowModel(!showModel)}
            className="mt-16 w-48 rounded-md outline-purple-600 outline select-none outline-2  
            bg-white text-slate-500 outline-offset-2 border-solid p-2 px-4 hover:bg-green-500 hover:text-white create-recept-btn"
          >
            Create Requisition
          </Button>
          <Modal show={showModel} onClick={() => setShowModel(!showModel)}>
            <Modal.Header>Product Requisition</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Product name</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Unit</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {filterSelectedProduct?.map((pd, i) => {
                      const {
                        productName: pdProductName,
                        amount: pdAmount,
                        productCategory: pdProductCategory,
                        unit: pdUnit,
                      } = pd || {};
                      return (
                        <Table.Row
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                          key={i}
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {pdProductName}
                          </Table.Cell>
                          <Table.Cell>TK : {pdAmount}</Table.Cell>
                          <Table.Cell>{pdUnit}</Table.Cell>
                          <Table.Cell>{pdProductCategory}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="bg-purple-500"
                onClick={() => setShowModel(!showModel)}
              >
                Print It
              </Button>
              <Button color="gray" onClick={() => setShowModel(!showModel)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      <br />
      <button
        onClick={handleClear}
        className="mt-6 w-48 rounded-md select-none outline-purple-600 outline outline-2 text-slate-800 outline-offset-2 border-solid p-2 px-4 hover:bg-red-400 hover:text-white"
      >
        Clear Requisition
      </button>
    </div>
  );
};

export default ProductList;
