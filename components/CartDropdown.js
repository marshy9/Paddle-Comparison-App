import React from 'react';

export default function CartDropdown({ cartItems }) {
  return (
    <div className="relative">
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
}
