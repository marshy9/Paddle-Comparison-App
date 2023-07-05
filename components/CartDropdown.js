import { Fragment, useState, useContext } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';

export default function CartDropdown({ cartItems, cartOpen, setCartOpen }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const removeFromCartHandler = (slug) => {
    const updatedCartItems = cart.cartItems.filter(
      (item) => item.slug !== slug
    );
    dispatch({ type: 'CART_REMOVE_ITEM', payload: updatedCartItems });
    toast.success('Paddle removed from the cart', {
      toastId: 'remove-from-cart',
    });
  };

  return (
    <Fragment>
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center"
            initial={{ opacity: 0, translateY: '-100%' }}
            animate={{ opacity: 1, translateY: '0%' }}
            exit={{ opacity: 0, translateY: '-100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
              <div className="flex justify-end pt-4 pr-4 absolute top-0 right-0">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setCartOpen(false)}
                >
                  <span className="sr-only">Close panel</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
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
                      {cartItems.map((product) => (
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
                              <p className="text-gray-500"> {product.price}</p>
                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={() =>
                                    removeFromCartHandler(product.slug)
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
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
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
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
