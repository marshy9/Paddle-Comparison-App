import { useContext } from 'react';
import { addToCartHandler } from '../utils/utils';
import Layout from '../components/Layout';
import Product from '../models/Product';
import Paddle from '../models/Paddle';
import db from '../utils/db';
import { Store } from '../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import CategoryFilter from '../components/CategoryFilter';

export default function Home({ paddles, featuredProducts }) {
  //cart states
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const handleAddToCartHome = (paddle) => {
    addToCartHandler(dispatch, cart, paddle);
  };

  return (
    <Layout
      title="Compare Pickleball Paddles Home"
      paddles={paddles}
      addToCartHandler={handleAddToCartHome}
    >
      <Carousel showThumbs={false} autoPlay>
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <Link href={`/product/${product.slug}`} passHref className="flex">
              <img src={product.banner} alt={product.name} />
            </Link>
          </div>
        ))}
      </Carousel>

      <CategoryFilter
        paddles={paddles}
        addToCartHandler={handleAddToCartHome}
        cartItems={cart.cartItems}
      ></CategoryFilter>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  const paddles = await Paddle.find().lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      paddles: paddles.map(db.convertDocToObj),
    },
  };
}
