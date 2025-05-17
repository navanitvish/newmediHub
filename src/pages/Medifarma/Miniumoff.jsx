
import { useDispatch } from 'react-redux';
import { ProductCarousel } from "../../components/UI/ProductCarousel";
import { addToCart } from '../../redux/slices/cartSlice';


export const Miniumoff = () => {
  // This could come from a context, redux, or props
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice,
      image: product.image,
      quantity: 1

    }));
  };

  
  // Different set of products
 const topSellingProducts = [
  {
    id: 101,
    name: 'Premium Multivitamins, 30 tablets',
    originalPrice: 450,
    discountPrice: 225,
    discount: '50% off',
    image: 'https://images.apollo247.in/pub/media/catalog/product/l/o/lor0419_3.jpg?tr=q-80,f-webp,w-150,dpr-1,c-at_max',
    badge: 'Top Seller'
  },
  {
    id: 102,
    name: 'Calcium & Vitamin D3 Supplements, 60 tablets',
    originalPrice: 350,
    discountPrice: 175,
    discount: '50% off',
    image: '/api/placeholder/120/120',
    badge: 'Popular'
  },
  {
    id: 103,
    name: 'Life Premium Citrus Refreshing Wet Wipes, 60 count',
    originalPrice: 160,
    discountPrice: 80,
    discount: '50% off',
    image: 'https://images.apollo247.in/pub/media/catalog/product/n/i/niv0123_2_1.jpg?tr=q-80,f-webp,w-150,dpr-1,c-at_max',
    badge: 'Bestseller'
  },
  {
    id: 104,
    name: 'Life Aloe Vera Skin Care Gel, 200 gm (2×100 gm)',
    originalPrice: 160,
    discountPrice: 80,
    discount: '50% off',
    image: 'https://images.apollo247.in/pub/media/catalog/product/L/A/LAC0550_1-AUG23_1.jpg?tr=q-80,f-webp,w-150,dpr-1,c-at_max',
    badge: 'Buy 1 Get 1'
  },
  {
    id: 105,
    name: 'Essentials Sandal Soap, 250 gm (2×125 gm)',
    originalPrice: 200,
    discountPrice: 100,
    discount: '50% off',
    image: '/api/placeholder/120/120',
    badge: 'Buy 1 Get 1'
  },
  {
    id: 106,
    name: 'Pharmacy ORS Orange Flavour Drink, 200ml',
    originalPrice: 100,
    discountPrice: 50,
    discount: '50% off',
    image: 'https://images.apollo247.in/pub/media/catalog/product/g/a/gar0522_1.jpg?tr=q-80,f-webp,w-150,dpr-1,c-at_max',
    badge: 'Bestseller'
  },
  {
    id: 107,
    name: 'Multivitamin Tablets, 100 count',
    originalPrice: 180,
    discountPrice: 90,
    discount: '50% off',
    image: '/api/placeholder/120/120',
    badge: 'Buy 1 Get 1'
  },
  {
    id: 108,
    name: 'Hand Sanitizer, 100ml',
    originalPrice: 120,
    discountPrice: 60,
    discount: '50% off',
    image: 'https://images.apollo247.in/pub/media/catalog/product/v/a/vas0223_2_1.jpg?tr=q-80,f-webp,w-150,dpr-1,c-at_max',
    badge: 'Bestseller'
  },
  {
    id: 109,
    name: 'Sugar-Free Diabetes Care Tablets, 60 count',
    originalPrice: 500,
    discountPrice: 250,
    discount: '50% off',
    image: 'https://images.apollo247.in/pub/media/catalog/product/J/O/JOH0081_1-AUG23_1.jpg?tr=q-80,f-webp,w-150,dpr-1,c-at_max',
    badge: 'Diabetes Care'
  }
];


  
  return (
    <ProductCarousel
      title="Miniumum 50 % Off"
      viewAllLink="#top-selling"
      products={topSellingProducts}
      onAddToCart={handleAddToCart}
    />
  );
};
