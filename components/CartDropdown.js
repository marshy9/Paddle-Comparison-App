import { Fragment, useState, useContext } from 'react';
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { Store } from '../utils/Store';
import { useSearchSubmit } from '../utils/utils';
import { toast } from 'react-toastify';

export default function CartDropdown({
  cartItems,
  cartOpen,
  setCartOpen,
  addToCartHandler,
}) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { handleSearchSubmit } = useSearchSubmit();

  return (
    <Fragment>
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 w-80 bg-white bg-opacity-60 z-30 shadow-lg"
            style={{ top: '3rem' }}
            initial={{ opacity: 0, translateX: '100%' }}
            animate={{ opacity: 1, translateX: '0%' }}
            exit={{ opacity: 0, translateX: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-20 z-30 flex justify-center items-center">
              <div className="flex justify-end pt-4 pr-4 absolute top-0 right-0">
                <button
                  type="button"
                  className="text-gray-700 hover:text-gray-500"
                  onClick={() => setCartOpen(false)}
                >
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex justify-center items-center h-screen">
                <div className="bg-white shadow-xl w-full max-w-md overflow-hidden">
                  <div className="px-4 py-6 sm:px-6">
                    <h2 className="text-lg font-medium text-gray-900">
                      Paddle Cart
                    </h2>
                  </div>
                  <div className="px-4 py-6 sm:px-6">
                    <ul
                      role="list"
                      className="divide-y divide-gray-200 overflow-y-auto max-h-96" // max-height of scrollbar
                    >
                      {cartItems.length === 0 ? (
                        <li className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <ShoppingCartIcon className="h-full w-full text-gray-500" />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>Empty Cart</h3>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                Add paddles by clicking 'Add to Comparison'
                                Button or Search.
                              </p>
                            </div>
                          </div>
                        </li>
                      ) : (
                        cartItems.map((product) => (
                          <li key={product.slug} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.image}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={`/paddle/${product.slug}`}>
                                      {product.name}
                                    </a>
                                  </h3>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  {' '}
                                  {product.price}
                                </p>
                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => addToCartHandler(product)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div className="px-4 py-6 sm:px-6 border-t border-gray-200">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Paddle Comparison</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Detailed product comparison and charts.
                    </p>
                    <div className="mt-6">
                      <a
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        onClick={() => handleSearchSubmit(cartItems)}
                      >
                        Compare
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setCartOpen(false)}
                        >
                          Continue Browsing &rarr;
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
}
