import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Paddle from '../../models/Paddle';
import Layout from '../../components/Layout';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
import { Carousel } from 'react-responsive-carousel';

export default function PaddleScreen({ paddle }) {
  const { state, dispatch } = useContext(Store);
  const cartPaddles = state.cart.cartItems.slice(); // get full cart array
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToCartHandler = async () => {
    // Rest of the code
  };

  if (!paddle) {
    return <Layout title="Paddle Not Found">Paddle Not Found</Layout>;
  }

  const handleNext = () => {
    if (currentIndex < cartPaddles.length - 2) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Add fixed width and height classes
  const boxStyles = 'w-64 h-64 flex';
  const paddleWidth = 'w-1/3';

  return (
    <Layout>
      <div className="flex items-center">
        {/* <button className="z-10" onClick={handlePrev}>
          &lt;
        </button> */}

        <Carousel showArrows={true}>
          {cartPaddles.map((paddle) => (
            <div key={paddle.id}>
              <Image
                src={paddle.image}
                alt={paddle.name}
                fill
                objectFit="contain"
              />
              test
            </div>
          ))}
        </Carousel>

        {/* <button className="z-10" onClick={handleNext}>
          &gt;
        </button> */}
      </div>
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
