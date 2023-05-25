/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { ArrowRightIcon, PlusCircleIcon } from '@heroicons/react/outline';

export default function PaddleItem({ paddle, addToCartHandler }) {
  return (
    <div className="card">
      <div class="relative">
        <Link href={`/paddle/${paddle.slug}`}>
          <img
            src={paddle.image}
            alt={paddle.name}
            className="rounded shadow object-cover h-64 w-full"
          />
        </Link>
        {/* <button className="absolute top-0 right-0 mt-4 mr-4 py-2 bg-transparent border-none">
          <ArrowCircleUpIcon className="h-7 w-7" />
          <span className="absolute left-full -ml-1 opacity-0 transition-opacity duration-300 text-white text-xs">
            Compare
          </span>
        </button> */}
        <button className="absolute top-0 right-0 mt-4 mr-4 py-2 inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-none rounded-full group">
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
            <ArrowRightIcon className="h-7 w-7" />
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
            <PlusCircleIcon className="h-7 w-7" />
          </span>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/paddle/${paddle.slug}`}>
          <h2 className="text-lg">{paddle.name}</h2>
        </Link>
        <p className="mb-2">{paddle.brand}</p>
        <p>${paddle.price}</p>
        <button
          className="primary-button"
          type="button"
          //onClick={() => addToCartHandler(paddle)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
