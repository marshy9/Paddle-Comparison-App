import React from 'react';

export default function CartDropdown({ paddles, products, featuredProducts }) {
  const CartDropdown = ({ cartItems }) => {
    return (
      <div className="relative">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          Cart ({cartItems.length})
        </button>
        <div className="absolute bg-white border border-gray-200 mt-2 py-2 px-4 rounded w-48 max-h-48 overflow-y-auto z-10">
          {cartItems.map((item) => (
            <div key={item.id} className="mb-2">
              {/* Display your cart item details here */}
              <p>{item.name}</p>
              <p>${item.price}</p>
              {/* ... */}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return 'EXAMMPLLEW';
}
