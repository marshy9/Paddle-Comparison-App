/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { ArrowRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

export default function PaddleItem({ paddle, addToCartHandler, cartItems }) {
  const isPaddleInCart = (paddle) => {
    return cartItems.some((item) => item.slug === paddle.slug);
  };

  return (
    <div className="card">
      <div className="relative">
        <Link href={`/paddle/${paddle.slug}`}>
          <img
            src={paddle.image}
            alt={paddle.name}
            className="rounded shadow object-cover h-64 w-full"
          />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center p-2">
        <Link href={`/paddle/${paddle.slug}`}>
          <h2 className="text-lg">{paddle.name}</h2>
        </Link>
        <p className="mb-2">{paddle.brand}</p>
        <button
          className={`relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all rounded group ${
            isPaddleInCart(paddle)
              ? 'text-black bg-yellow-500'
              : 'text-white bg-black'
          }`}
          type="button"
          onClick={() => addToCartHandler(paddle)}
        >
          {isPaddleInCart(paddle) ? 'Remove from Cart' : 'Add to Comparison'}
        </button>
      </div>
    </div>
  );
}
