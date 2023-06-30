import axios from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import Paddle from '../models/Paddle';
import db from '../utils/db';
import { Store } from '../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import PaddleItem from '../components/PaddleItem';
import CartDropdown from '../components/CartDropdown';

export default function Home({ paddles, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartOpen, setCartOpen] = useState(false);

  const addToCartHandler = async (paddle) => {
    console.log(paddle);
    console.log(cart.cartItems);
    const existItem = cart.cartItems.find((x) => x.slug === paddle.slug);
    console.log('exist:', existItem);
    if (existItem) {
      // If the paddle already exists in the cart
      return toast.info('Product already exists in the cart');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...paddle } });
    toast.success('Product added to the cart');
  };

  return (
    <Layout title="Home Page">
      <CartDropdown
        cartItems={cart.cartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />
      <Carousel showThumbs={false} autoPlay>
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <Link href={`/product/${product.slug}`} passHref className="flex">
              <img src={product.banner} alt={product.name} />
            </Link>
          </div>
        ))}
      </Carousel>
      <button type="button" onClick={() => setCartOpen(!cartOpen)}>
        Open Cart
      </button>
      <h2 className="h2 my-4">Latest Paddles</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {paddles.map((paddle) => (
          <PaddleItem
            paddle={paddle}
            key={paddle.slug}
            addToCartHandler={addToCartHandler}
          ></PaddleItem>
        ))}
      </div>
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
