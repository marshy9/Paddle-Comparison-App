import { useRouter } from 'next/router';

export const useSearchSubmit = () => {
  const router = useRouter();

  const handleSearchSubmit = (cart) => {
    const paddleSlugs = cart.map((paddle) => paddle.slug);
    const compareUrl = `/compare/${paddleSlugs.join('-to-')}`;
    router.push(compareUrl);
  };

  return { handleSearchSubmit };
};

export const addToCartHandler = (dispatch, cart, paddle) => {
  const existItem = cart.cartItems.find((x) => x.slug === paddle.slug);
  if (existItem) {
    const updatedCartItems = cart.cartItems.filter(
      (item) => item.slug !== paddle.slug
    );
    dispatch({ type: 'CART_REMOVE_ITEM', payload: updatedCartItems });
  } else {
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...paddle } });
  }
};
