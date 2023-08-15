/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function SwiperItem({ paddle }) {
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
        {/* <button className="absolute top-0 right-0 mt-4 mr-4 py-2 bg-transparent border-none">
          <ArrowCircleUpIcon className="h-7 w-7" />
          <span className="absolute left-full -ml-1 opacity-0 transition-opacity duration-300 text-white text-xs">
            Compare
          </span>
        </button> */}
      </div>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/paddle/${paddle.slug}`}>
          <h2 className="text-lg">{paddle.name}</h2>
        </Link>
        <p className="mb-2">{paddle.brand}</p>
        <p>${paddle.price}</p>
        <button className="primary-button" type="button">
          Select
        </button>
      </div>
    </div>
  );
}
