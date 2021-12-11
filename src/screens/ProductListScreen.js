import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/Message/ErrorMessage";
import {
  createProduct,
  reset as resetCreate,
} from "../redux/product/productCreateSlice";
import { deleteProduct } from "../redux/product/productDeleteSlice";
import { fetchProductList } from "../redux/product/productListSlice";

const ProductListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.productList
  );

  const { userInfo } = useSelector((state) => state.user);

  const {
    success: deleteSuccess,
    error: deleteError,
    loading: deleteLoading,
  } = useSelector((state) => state.productDelete);

  const {
    success: createSuccess,
    error: createError,
    loading: createLoading,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);

  useEffect(() => {
    dispatch(resetCreate());
    if (!userInfo.isAdmin) {
      navigate("/login");
    } else {
      if (createSuccess) {
        navigate(`/admin/product/${createdProduct._id}/edit`);
      } else {
        dispatch(fetchProductList());
      }
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    deleteSuccess,
    createSuccess,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure want to delete?")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl mb-4">Products</h1>
        <button
          onClick={createProductHandler}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-md"
        >
          Create Product
        </button>
      </div>
      {(deleteLoading || createLoading) && <Loader />}
      {deleteError && <ErrorMessage>{deleteError}</ErrorMessage>}
      {createError && <ErrorMessage>{createError}</ErrorMessage>}

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div
                className="
                  shadow
                  overflow-hidden
                  border-b border-gray-200
                  sm:rounded-lg
                "
              >
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="
                          px-6
                          py-3
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="
                          px-6
                          py-3
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="
                          px-6
                          py-3
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="
                          px-6
                          py-3
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="
                          px-6
                          py-3
                          text-left text-xs
                          font-medium
                          text-gray-500
                          uppercase
                          tracking-wider
                        "
                      >
                        Brand
                      </th>

                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product._id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {product.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.brand}
                        </td>
                        <td
                          className="
                            px-6
                            py-4
                            whitespace-nowrap
                            text-right text-sm
                            font-medium
                          "
                        >
                          <Link
                            to={`/admin/product/${product._id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              deleteHandler(product._id);
                            }}
                            className="text-red-600 hover:text-red-900 ml-4"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;
