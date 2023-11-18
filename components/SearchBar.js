import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar({ paddles, addToCartHandler, cartItems }) {
  const [query, setQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const searchRef = useRef(null);
  const router = useRouter();
  const [selectedPaddle, setSelectedPaddle] = useState(null);

  const handleSearchInput = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const suggestions = paddles.filter((paddle) =>
      paddle.name.toLowerCase().includes(searchQuery)
    );
    setSearchSuggestions(suggestions);
    setQuery(searchQuery);
  };

  const handleSearchSubmit = (cart) => {
    const paddleSlugs = cart.map((paddle) => paddle.slug);
    const compareUrl = `/compare/${paddleSlugs.join('-to-')}`;
    router.push(compareUrl);
  };

  const handleAddToCart = (paddle) => {
    setSelectedPaddle(paddle);
    addToCartHandler(paddle);
  };

  const removeFromCart = (paddle) => {
    // Logic to remove the paddle from the cart
    // Implement your own cart removal logic here
    console.log('Remove from cart:', paddle);
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedPaddle(null);
  }, [searchSuggestions]);

  const isPaddleInCart = (paddle) => {
    console.log('cartItems', cartItems);
    return cartItems.some((item) => item.slug === paddle.slug);
  };

  return (
    <div className="relative w-1/2 lg:w-1/3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchSubmit(cartItems);
        }}
        className="relative w-full md:flex"
      >
        <div ref={searchRef} className="relative flex items-center w-full">
          <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-600" />
          <input
            onChange={handleSearchInput}
            value={query}
            type="text"
            className="w-full pl-10 p-1 text-sm focus:ring-0"
            placeholder="Search Paddles"
          />
        </div>
        {/* Search suggestions */}
        {searchSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 md:mt-8 max-h-58 overflow-y-auto bg-white rounded shadow-md">
            {searchSuggestions.map((paddle) => (
              <div
                key={paddle.id}
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSearchSubmit(cartItems)}
              >
                <div>{paddle.name}</div>
                <button
                  className="flex items-center bg-blue-100 px-2 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(paddle);
                  }}
                >
                  {isPaddleInCart(paddle) ? (
                    <>
                      <div>Remove</div>
                      <CheckCircleIcon className="h-5 w-5 text-gray-800 ml-1" />
                    </>
                  ) : (
                    <>
                      <div>Compare</div>
                      <PlusCircleIcon className="h-5 w-5 text-gray-800 ml-1" />
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
