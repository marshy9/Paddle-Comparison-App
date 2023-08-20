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
import TabsBar from '../../components/TabsBar';
import SwiperItem from '../../components/SwiperItem';
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const data = [
  { subject: 'Math', A: 120, B: 110, fullMark: 150 },
  { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
  { subject: 'English', A: 86, B: 130, fullMark: 150 },
  { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
  { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
  { subject: 'History', A: 65, B: 85, fullMark: 150 },
];

const items = [
  {
    title: 'Radar Chart',
    content: (
      <RadarChart
        cx={300}
        cy={250}
        outerRadius={150}
        width={500}
        height={500}
        data={data}
      >
        <PolarGrid gridType="circle" />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="Lily"
          dataKey="B"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    ),
  },
  {
    title: 'Tab 2',
    content: (
      <div className="border-2 border-blue-400 rounded-lg p-4">
        <h1 className="text-3xl text-blue-600">Title Test 2</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          aperiam asperiores dolo iti harum! Totam, mollitia quos voluptatem
          deleniti provident obcaecati rerum.
        </p>
      </div>
    ),
  },
];

export default function PaddleScreen({ paddle }) {
  const { state, dispatch } = useContext(Store);
  const cartPaddles = state.cart.cartItems.slice(); // get full cart array

  // Add fixed width and height classes
  const boxStyles = 'w-64 h-64 ';
  const paddleWidth = 'w-1/3';

  return (
    <Layout>
      <Swiper
        autoHeight={false}
        slidesPerView={3.5}
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
            <SwiperItem paddle={paddle} key={paddle.slug}></SwiperItem>
          </SwiperSlide>
        ))}
      </Swiper>
      <TabsBar items={items} />
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
