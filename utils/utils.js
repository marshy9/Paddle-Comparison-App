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
