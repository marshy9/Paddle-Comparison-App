import { useContext } from 'react';
import { toast } from 'react-toastify';
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

  const addToCartHandler = async (paddle) => {
    //console.log('Handle paddle' + paddle);
    const existItem = cart.cartItems.find((x) => x.slug === paddle.slug);
    if (existItem) {
      const updatedCartItems = cart.cartItems.filter(
        (item) => item.slug !== paddle.slug
      );
      dispatch({ type: 'CART_REMOVE_ITEM', payload: updatedCartItems });
      console.log('remove');
      toast.success('Paddle removed from the cart', {
        toastId: 'remove-from-cart',
      });
    } else {
      // Add the paddle to the cart
      dispatch({ type: 'CART_ADD_ITEM', payload: { ...paddle } });
      toast.success('Paddle added to the cart', { toastId: 'add-to-cart' });
    }
  };

  return (
    <Layout
      title="Pickleball Paddle Comparison"
      paddles={paddles}
      addToCartHandler={addToCartHandler}
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
        addToCartHandler={addToCartHandler}
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
