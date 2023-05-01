import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Free Shirt',
      slug: 'free-shirt',
      category: 'Shirts',
      image: '/images/shirt1.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner1.jpg',
    },
    {
      name: 'Fit Shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.jpg',
      price: 80,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/banner2.jpg',
    },
    {
      name: 'Slim Shirt',
      slug: 'slim-shirt',
      category: 'Shirts',
      image: '/images/shirt3.jpg',
      price: 90,
      brand: 'Raymond',
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Golf Pants',
      slug: 'golf-pants',
      category: 'Pants',
      image: '/images/pants1.jpg',
      price: 90,
      brand: 'Oliver',
      rating: 2.9,
      numReviews: 13,
      countInStock: 20,
      description: 'Smart looking pants',
    },
    {
      name: 'Fit Pants',
      slug: 'fit-pants',
      category: 'Pants',
      image: '/images/pants2.jpg',
      price: 95,
      brand: 'Zara',
      rating: 3.5,
      numReviews: 7,
      countInStock: 20,
      description: 'A popular pants',
    },
    {
      name: 'Classic Pants',
      slug: 'classic-pants',
      category: 'Pants',
      image: '/images/pants3.jpg',
      price: 75,
      brand: 'Casely',
      rating: 2.4,
      numReviews: 14,
      countInStock: 20,
      description: 'A popular pants',
    },
  ],
  paddles: [
    {
      name: 'Legacy Pro',
      image: '/images/legacy.png',
      brand: 'Legacy Pickleball',
      price: 145,
      weight: 8,
      core: 'Thermoformed foam Sealed Edges',
      surface: 'Toray t700 Raw Carbon Fiber',
      length: 16.5,
      width: 7.5,
      handleLength: 5.3,
      gripSize: 4.125,
      rpmCategory: 'High',
      description:
        'The Legacy Pro is unmatched in its balance between spin and power. A true versatile paddle that can reset the ball and apply power to those shots that require a little more oomph. The Toray t700 carbon fiber face mixed with the special layering combine to make this paddle stand out amongst the rest. The core has been modified to help reduce vibration for those players looking to stay away from pesky arm injuries. Designed specifically to be well balanced fresh out of the package. We have engineered the Legacy Pro to withstand lots of stress at the handle. The thermoforming seal with foam takes the stability of the paddle to new heights in the Pickleball Industry.',
    },
    {
      name: 'GX6 Power Series ',
      image: '/images/gearbox6power.jpg',
      brand: 'Gearbox',
      price: 150,
      weight: 8.5,
      core: 'Carbon Fiber Solid Span Technology',
      surface: 'Carbon Fiber Edgeless Frame',
      length: 16.625,
      width: 7.375,
      handleLength: 5.625,
      gripSize: 3.625,
      rpmCategory: 'Average',
      description:
        'The GX6 features a longer shaped head to give you precise control with a larger sweet spot. It also includes patent pending Solid Span Technology, giving this paddle Optimal Power, a Softer Feel, a Softer Sound, a Durable Edgeless Rim and a Massive Sweet Spot. The paddle handle feels natural in the hand with a very comfortable grip shape.',
    },
    {
      name: 'CRBN 2X Power Series',
      image: '/images/crbn2-power-14mm',
      brand: 'CRBN',
      price: 229.99,
      weight: 8,
      core: 'Polypropylene',
      surface: 'T700 Carbon Fiber',
      length: 15.75,
      width: 8,
      handleLength: 4.75,
      gripSize: 4.125,
      rpmCategory: 'High',
      description:
        'This performance pickleball paddle is crafted with the same durable, gritty carbon fiber face that you can expect from CRBN, with additional and unmatched power and pop. No expense was spared making this the best power-focused carbon fiber paddle on the market. The perfect balance of durability, touch, and power allow you to be even more aggressive on the courts. ',
    },
    {
      name: 'Adipower Dummy1',
      image: '/images/adidas-adipower-attk',
      brand: 'Adidas',
      price: 69.69,
      weight: 6.9,
      core: 'Polypropylene',
      surface: 'Vinyl',
      length: 15.75,
      width: 8,
      handleLength: 4.75,
      gripSize: 4.125,
      rpmCategory: 'Low',
      description: 'This is a test entry (delete later)',
    },
    {
      name: 'Adipower Dummy2',
      image: '/images/adidas-adipower-attk',
      brand: 'Adidas',
      price: 69.69,
      weight: 6.9,
      core: 'Polypropylene',
      surface: 'Vinyl',
      length: 15.75,
      width: 8,
      handleLength: 4.75,
      gripSize: 4.125,
      rpmCategory: 'Low',
      description: 'This is a test entry (delete later)',
    },
    {
      name: 'Adipower Dummy3',
      image: '/images/adidas-adipower-attk',
      brand: 'Adidas',
      price: 69.69,
      weight: 6.9,
      core: 'Polypropylene',
      surface: 'Vinyl',
      length: 15.75,
      width: 8,
      handleLength: 4.75,
      gripSize: 4.125,
      rpmCategory: 'Low',
      description: 'This is a test entry (delete later)',
    },
    {
      name: 'Adipower Dummy4',
      image: '/images/adidas-adipower-attk',
      brand: 'Adidas',
      price: 69.69,
      weight: 6.9,
      core: 'Polypropylene',
      surface: 'Vinyl',
      length: 15.75,
      width: 8,
      handleLength: 4.75,
      gripSize: 4.125,
      rpmCategory: 'Low',
      description: 'This is a test entry (delete later)',
    },
  ],
};

export default data;
