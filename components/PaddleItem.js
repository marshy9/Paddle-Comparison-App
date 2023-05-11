/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function PaddleItem({ paddle, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/paddle/${paddle.slug}`}>
        <img
          src={paddle.image}
          alt={paddle.name}
          className="rounded shadow object-cover h-64 w-full"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/paddle/${paddle.slug}`}>
          <h2 className="text-lg">{paddle.name}</h2>
        </Link>
        <p className="mb-2">{paddle.brand}</p>
        <p>${paddle.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(paddle)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
