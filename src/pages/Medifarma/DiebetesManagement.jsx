




import { useDispatch } from 'react-redux';
import { ProductCarousel } from "../../components/UI/ProductCarousel";
import { addMedicine } from '../../redux/slices/medicineSlice';
import { useQuery } from '@tanstack/react-query';
export const DiebetesManagement = () => {
  const dispatch = useDispatch();
  
  const handleAddToCart = (product) => {
    dispatch(addMedicine({
      id: product.id || product._id,
      name: product.name || product.title,
      originalPrice: product.originalPrice || product.price,
      price: product.discountPrice || product.price,
      image: product.image || (product.images && product.images[0]) || '/api/placeholder/120/120',
      quantity: 1
    }));
  };

  const { data: apiResponse, isLoading, error } = useQuery({
    queryKey: ['CetegoriesWiseMedicines'],
    queryFn: async () => {
      const response = await fetch('https://medisewa.onrender.com/api/v1/medicines/categoriesWiseMedicines');
      if (!response.ok) {
        throw new Error('Failed to fetch Category wise medicines');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Extract medicines from result array
  const offerMedicines = apiResponse?.result || [];
  
  // Transform API data to match the expected product format
  const transformedProducts = offerMedicines.flatMap(category => 
    (category.products || []).map(product => ({
      id: product._id,
      name: product.title,
      originalPrice: product.price,
      discountPrice: product.discount ? 
        Math.round(product.price * (1 - product.discount / 100)) : 
        product.price,
      discount: product.discount ? `${product.discount}% off` : null,
      image: product.images && product.images.length > 0 ? 
        product.images[0] : 
        '/api/placeholder/120/120',
      badge: product.isOffer ? 'Offer' : 
             product.inStock ? 'In Stock' : 'Out of Stock',
      inStock: product.inStock,
      manufacturer: product.manufacturer,
      description: product.description,
      unit: product.unit,
      size: product.size
    }))
  );

  console.log("Transformed Products:", transformedProducts);
  console.log("API Response:", apiResponse);

  // Fallback dummy data (keep as backup if API fails)
  const fallbackProducts = [
    {
      id: 101,
      name: 'Premium Multivitamins, 30 tablets', 
      originalPrice: 450,
      discountPrice: 399,
      discount: '11% off',
      image: 'https://images.apollo247.in/pub/media/catalog/product/c/e/cer0553-1_1__1_1.jpg?tr=q-80,f-webp,w-150,dpr-1,c-at_max',
      badge: 'Top Seller'
    },
    {
      id: 102,
      name: 'Calcium & Vitamin D3 Supplements, 60 tablets',
      originalPrice: 350,
      discountPrice: 315,
      discount: '10% off',
      image: 'https://images.apollo247.in/pub/media/catalog/product/c/e/cer0552-1_1_.jpg?tr=q-80,f-webp,w-150,dpr-1,c-at_max',
      badge: 'Popular'
    }
  ];

  // Use API data if available, otherwise use fallback
  const productsToDisplay = transformedProducts.length > 0 ? transformedProducts : fallbackProducts;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading Woman Wellness products...</div>
      </div>
    );
  }

  if (error) {
    console.error('Error fetching products:', error);
    // Still show fallback products on error
  }
  
  return (
    <ProductCarousel
      title="Diebetes Products"
      viewAllLink="#DiebetesProducts"
      products={productsToDisplay}
      onAddToCart={handleAddToCart}
      isLoading={isLoading}
    />
  );
};