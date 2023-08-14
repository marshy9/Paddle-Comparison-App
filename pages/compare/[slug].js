import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Paddle from '../../models/Paddle';
import Layout from '../../components/Layout';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

export default function PaddleScreen({ paddle }) {
  const { state, dispatch } = useContext(Store);
  const cartPaddles = state.cart.cartItems.slice(); // get full cart array

  // Add fixed width and height classes
  const boxStyles = 'w-64 h-64 flex';
  const paddleWidth = 'w-1/3';

  return (
    <Layout>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {cartPaddles.map((paddle) => (
          <SwiperSlide key={paddle.id}>
            <div className={boxStyles}>
              <Image src={paddle.image} width={500} height={500} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const paddle = await Paddle.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      paddle: paddle ? db.convertDocToObj(paddle) : null,
    },
  };
}
