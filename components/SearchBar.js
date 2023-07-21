import { SearchIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
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

  const handleSearchSubmit = (paddle) => {
    router.push(`/compare/${paddle.slug}`);
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
    <div className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchSubmit(selectedPaddle);
        }}
        className="relative w-full md:flex"
      >
        <div ref={searchRef} className="relative flex items-center">
          <SearchIcon className="absolute left-3 h-5 w-5 text-gray-400" />
          <input
            onChange={handleSearchInput}
            value={query}
            type="text"
            className="rounded-tr-none rounded-br-none pl-10 p-1 text-sm focus:ring-0"
            placeholder="Search Paddles"
          />
        </div>
        {/* Search suggestions */}
        {searchSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-8 max-h-58 overflow-y-auto bg-white rounded shadow-md">
            {searchSuggestions.map((paddle) => (
              <div
                key={paddle.id}
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSearchSubmit(paddle)}
              >
                <div>{paddle.name}</div>
                <button
                  className="text-green-500"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(paddle);
                  }}
                >
                  {isPaddleInCart(paddle) ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    <PlusCircleIcon className="h-5 w-5" />
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
