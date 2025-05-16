
import { useDispatch } from 'react-redux';
import { ProductCarousel } from "../../components/UI/ProductCarousel";
import { addToCart } from '../../redux/slices/cartSlice';


export const TopSellingProducts = () => {
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
      name: 'Apollo Premium Multivitamins, 30 tablets',
      originalPrice: 450,
      discountPrice: 399,
      discount: '11% off',
      image: '/api/placeholder/120/120',
      badge: 'Top Seller'
    },
    {
      id: 102,
      name: 'Apollo Calcium & Vitamin D3 Supplements, 60 tablets',
      originalPrice: 350,
      discountPrice: 315,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Popular'
    },
    {
      id: 103,
      name: 'Apollo Life Premium Citrus Refreshing Wet Wipes, 60 count',
      originalPrice: 160,
      discountPrice: 144,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Bestseller'
    },
    {
      id: 104,
      name: 'Apollo Life Aloe Vera Skin Care Gel, 200 gm (2×100 gm)',
      originalPrice: 160,
      discountPrice: 144,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Buy 1 Get 1'
    },
    {
      id: 105,
      name: 'Apollo Essentials Sandal Soap, 250 gm (2×125 gm)',
      originalPrice: 200,
      discountPrice: 180,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Buy 1 Get 1'
    },
    {
      id: 106,
      name: 'Apollo Pharmacy ORS Orange Flavour Drink, 200ml',
      originalPrice: 100,
      discountPrice: 90,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Bestseller'
    },
    {
      id: 107,
      name: 'Apollo Multivitamin Tablets, 100 count',
      originalPrice: 180,
      discountPrice: 162,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Buy 1 Get 1'
    },
    {
      id: 108,
      name: 'Apollo Hand Sanitizer, 100ml',
      originalPrice: 120,
      discountPrice: 108,
      discount: '10% off',
      image: '/api/placeholder/120/120',
      badge: 'Bestseller'
    },

    
    // Add more products as needed...
  ];
  
  return (
    <ProductCarousel
      title="Top Selling Products"
      viewAllLink="#top-selling"
      products={topSellingProducts}
      onAddToCart={handleAddToCart}
    />
  );
};
