import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';
import { useRouter } from 'next/router';
import CartDropdown from '../components/CartDropdown';
import SearchBar from '../components/SearchBar';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

export default function Layout({ title, children, paddles, addToCartHandler }) {
  const { status, data: session } = useSession();
  const [cartOpen, setCartOpen] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title ? title + ' - Paddle Pickers' : 'Paddle Pickers'}</title>
        <meta name="description" content="Paddle Comparison Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header className="fixed z-40 w-full bg-gray-900">
          <nav className="flex h-12 items-center px-2 lg:px-4 justify-between shadow-md">
            <Link
              href="/"
              className="text-2xl font-bold  tracking-tighter sm:text-4xl text-white"
            >
              PADDLE PICKS
            </Link>

            <SearchBar
              paddles={paddles}
              addToCartHandler={addToCartHandler}
              cartItems={cart.cartItems}
            />

            <div>
              {/* <Link href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link> */}
              <button
                className="text-white flex items-center lg:text-xl"
                onClick={() => setCartOpen(!cartOpen)}
              >
                <ShoppingCartIcon className="h-6 w-6 mr-1" />{' '}
                <span class="hidden md:inline">Cart</span>
                {cart.cartItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-white px-2 py-1 text-xs font-bold text-black">
                    {cart.cartItems.length}
                  </span>
                )}
              </button>
              <CartDropdown
                cartItems={cart.cartItems}
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                addToCartHandler={addToCartHandler}
              />
              {/* 
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logouts
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )} */}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 pt-10">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2023 Amazona</p>
        </footer>
      </div>
    </>
  );
}
