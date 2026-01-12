import { Category } from './types';

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Organic Hass Avocados',
    price: 4.99,
    description: 'Creamy and fresh organic avocados picked at the peak of ripeness.',
    category: Category.FRUITS,
    image: 'https://picsum.photos/seed/avocado/400/400',
    rating: 4.8,
    reviews: 124,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Farm Fresh Organic Milk',
    price: 3.50,
    description: 'Grass-fed cow milk, pasteurized and non-homogenized.',
    category: Category.DAIRY,
    image: 'https://picsum.photos/seed/milk/400/400',
    rating: 4.9,
    reviews: 89,
    isNew: true
  },
  {
    id: '3',
    name: 'Red Quinoa Bulk Pack',
    price: 12.99,
    description: 'High-protein ancient grain, perfect for salads and side dishes.',
    category: Category.GRAINS,
    image: 'https://picsum.photos/seed/quinoa/400/400',
    rating: 4.7,
    reviews: 56
  },
  {
    id: '4',
    name: 'Organic Kale Bunch',
    price: 2.99,
    description: 'Crispy green kale leaves, nutrient-dense and fresh from the field.',
    category: Category.VEGETABLES,
    image: 'https://picsum.photos/seed/kale/400/400',
    rating: 4.5,
    reviews: 210,
    isBestSeller: true
  },
  {
    id: '5',
    name: 'Raw Salted Cashews',
    price: 8.49,
    description: 'Perfectly roasted organic cashews with a hint of sea salt.',
    category: Category.SNACKS,
    image: 'https://picsum.photos/seed/cashews/400/400',
    rating: 4.6,
    reviews: 45
  },
  {
    id: '6',
    name: 'Organic Gala Apples',
    price: 5.99,
    description: 'Sweet and crunchy gala apples, grown without synthetic pesticides.',
    category: Category.FRUITS,
    image: 'https://picsum.photos/seed/apple/400/400',
    rating: 4.8,
    reviews: 320,
    isNew: true
  }
];

export const CATEGORIES = Object.values(Category);
