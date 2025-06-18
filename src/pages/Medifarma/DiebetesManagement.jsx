
import { useDispatch } from 'react-redux';
import { ProductCarousel } from "../../components/UI/ProductCarousel";
import { addToCart } from '../../redux/slices/cartSlice';


export const DiebetesManagement = () => {
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
    discountPrice: 399,
    discount: '11% off',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?fit=crop&w=150&q=80',
    badge: 'Top Seller'
  },
  {
    id: 102,
    name: 'Calcium & Vitamin D3 Supplements, 60 tablets',
    originalPrice: 350,
    discountPrice: 315,
    discount: '10% off',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?fit=crop&w=150&q=80',
    badge: 'Popular'
  },
  {
    id: 103,
    name: 'Life Premium Citrus Refreshing Wet Wipes, 60 count',
    originalPrice: 160,
    discountPrice: 144,
    discount: '10% off',
    image: 'https://images.unsplash.com/photo-1611078489935-0cb964deb5c7?fit=crop&w=150&q=80',
    badge: 'Bestseller'
  },
  {
    id: 104,
    name: 'Life Aloe Vera Skin Care Gel, 200 gm (2×100 gm)',
    originalPrice: 160,
    discountPrice: 144,
    discount: '10% off',
    image: 'https://images.unsplash.com/photo-1626882048554-350f72c7c115?fit=crop&w=150&q=80',
    badge: 'Buy 1 Get 1'
  },
  {
    id: 105,
    name: 'Essentials Sandal Soap, 250 gm (2×125 gm)',
    originalPrice: 200,
    discountPrice: 180,
    discount: '10% off',
    image: 'https://images.unsplash.com/photo-1618477388954-3f9c7d61e0ad?fit=crop&w=150&q=80',
    badge: 'Buy 1 Get 1'
  },
  {
    id: 106,
    name: 'Pharmacy ORS Orange Flavour Drink, 200ml',
    originalPrice: 100,
    discountPrice: 90,
    discount: '10% off',
    image: 'https://images.unsplash.com/photo-1611070678295-7e4c7a2deaa8?fit=crop&w=150&q=80',
    badge: 'Bestseller'
  },
  {
    id: 107,
    name: 'Multivitamin Tablets, 100 count',
    originalPrice: 180,
    discountPrice: 162,
    discount: '10% off',
    image: 'https://images.unsplash.com/photo-1588776814546-3f0f19e1f1e1?fit=crop&w=150&q=80',
    badge: 'Buy 1 Get 1'
  },
  {
    id: 108,
    name: 'Hand Sanitizer, 100ml',
    originalPrice: 120,
    discountPrice: 108,
    discount: '10% off',
    image: 'https://images.unsplash.com/photo-1583947582886-fcd5c8821f54?fit=crop&w=150&q=80',
    badge: 'Bestseller'
  },
  {
    id: 109,
    name: 'Sugar-Free Diabetes Care Tablets, 60 count',
    originalPrice: 500,
    discountPrice: 450,
    discount: '10% off',
    image: 'https://images.unsplash.com/photo-1606813909274-fba0d0422013?fit=crop&w=150&q=80',
    badge: 'Diabetes Care'
  }
];


  
  return (
    <ProductCarousel
      title="Diebetes Management"
      viewAllLink="#top-selling"
      products={topSellingProducts}
      onAddToCart={handleAddToCart}
    />
  );
};
