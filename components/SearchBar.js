import { SearchIcon } from '@heroicons/react/outline';

import { useEffect, useRef, useState } from 'react';

export default function SearchBar({ onSubmit, paddles }) {
  const [query, setQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const searchRef = useRef(null);

  const handleSearchInput = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const suggestions = paddles.filter((paddle) =>
      paddle.name.toLowerCase().includes(searchQuery)
    );
    setSearchSuggestions(suggestions);
    setQuery(searchQuery);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  const handleSearchSuggestionClick = (paddle) => {
    setQuery(paddle.name);
    onSubmit(paddle.name);
    setSearchSuggestions([]);
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

  return (
    <form onSubmit={handleSearchSubmit} className="mx-auto w-full md:flex">
      <div ref={searchRef}>
        <input
          onChange={handleSearchInput}
          value={query}
          type="text"
          className="rounded-tr-none rounded-br-none p-1 text-sm focus:ring-0"
          placeholder="Search products"
        />
        <button
          className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
          type="submit"
          id="button-addon2"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
        {/* Search suggestions */}
        {searchSuggestions.length > 0 && (
          <div className="absolute mt-1 w-full bg-white rounded shadow-md">
            {searchSuggestions.map((paddle) => (
              <div
                key={paddle.id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSearchSuggestionClick(paddle)}
              >
                {paddle.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
