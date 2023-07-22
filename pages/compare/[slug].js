import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Paddle from '../../models/Paddle';
import Layout from '../../components/Layout';
import db from '../../utils/db';
import { Store } from '../../utils/Store';

// Custom carousel hook
function useCarousel(items) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return {
    currentIndex,
    handleNext,
    handlePrev,
  };
}

export default function PaddleScreen({ paddle }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const cartPaddles = state.cart.cartItems.slice(0, 2);

  // Use the custom carousel hook
  const { currentIndex, handleNext, handlePrev } = useCarousel(cartPaddles);

  const addToCartHandler = async () => {
    // Rest of the code
  };

  // Fix code to display the carousel

  return (
    <Layout title={paddle.name}>
      <div className="py-2">
        <Link href="/">back to paddles</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="card p-5">
          {/* Carousel for the first two paddles in the cart */}
          {cartPaddles.length > 0 && (
            <div className="carousel">
              <button className="carousel-prev" onClick={handlePrev}>
                &lt;
              </button>
              <div className="carousel-images">
                {cartPaddles.map((item, index) => (
                  <div
                    key={item.slug}
                    className={`carousel-item ${
                      index === currentIndex ? 'active' : ''
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={320}
                      height={320}
                      layout="responsive"
                    />
                  </div>
                ))}
              </div>
              <button className="carousel-next" onClick={handleNext}>
                &gt;
              </button>
            </div>
          )}
        </div>
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
