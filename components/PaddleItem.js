/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { ArrowRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

export default function PaddleItem({ paddle, addToCartHandler }) {
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
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/paddle/${paddle.slug}`}>
          <h2 className="text-lg">{paddle.name}</h2>
        </Link>
        <p className="mb-2">{paddle.brand}</p>
        <button
          class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
          type="button"
          onClick={() => addToCartHandler(paddle)}
        >
          <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
            Compare
          </span>
        </button>
      </div>
    </div>
  );
}
