import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Paddle from '../../models/Paddle';
import db from '../../utils/db';
import { Store } from '../../utils/Store';

export default function PaddleScreen(props) {
  const { paddle } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!paddle) {
    return <Layout title="Paddle Not Found">Paddle Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === paddle.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/paddles/${paddle._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. paddle is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...paddle, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={paddle.name}>
      <div className="py-2">
        <Link href="/">back to paddles</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={paddle.image}
            alt={paddle.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{paddle.name}</h1>
            </li>
            <li>Brand: {paddle.brand}</li>
            <li>Rating: {paddle.rating}</li>
            <li>Description: {paddle.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${paddle.price}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function  (context) {
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
