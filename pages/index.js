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
import CategoryFilter from '../components/CategoryFilter';

export default function Home({ paddles, featuredProducts }) {
  //cart states
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  //filter states
  const [filters, setFilters] = useState({});
  const [filteredPaddles, setFilteredPaddles] = useState(paddles);


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

  const filterPaddles = useCallback(() => {
    // filter paddles based on filters object
    const filtered = paddles.filter(...) 
    setFilteredPaddles(filtered);
  }, [filters, paddles])

  useEffect(() => {
    filterPaddles();
  }, [filters, filterPaddles])

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

      <CategoryFilter onFilter={setFilters}>
        <div className="col-span-3 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredPaddles.map((paddle) => (
            <PaddleItem
              paddle={paddle}
              key={paddle.slug}
              addToCartHandler={addToCartHandler}
            ></PaddleItem>
          ))}
        </div>
      </CategoryFilter>
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
