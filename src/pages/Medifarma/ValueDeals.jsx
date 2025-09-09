import { useDispatch } from 'react-redux';
import { ProductCarousel } from "../../components/UI/ProductCarousel";
import { addMedicine } from '../../redux/slices/medicineSlice';
import { useQuery } from '@tanstack/react-query';

export const ValueDealsCarousel = () => {
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
      const response = await fetch('https://medisawabackend.onrender.com/api/v1/medicines/categoriesWiseMedicines');
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

  // Filter products under ₹200 based on discounted price
  const filterProductsUnder200 = (products) => {
    return products.filter(product => {
      const finalPrice = product.discountPrice || product.originalPrice;
      return finalPrice <= 200;
    });
  };

  // Apply filter to transformed products
  const filteredApiProducts = filterProductsUnder200(transformedProducts);

  console.log("All Transformed Products:", transformedProducts);
  console.log("Products Under ₹200:", filteredApiProducts);
  console.log("API Response:", apiResponse);

  // Fallback dummy data (keep as backup if API fails) - also under ₹200
  const fallbackProducts = [
    {
      id: 101,
      name: 'Basic Multivitamins, 30 tablets',
      originalPrice: 250,
      discountPrice: 180,
      discount: '28% off',
      image: 'https://images.apollo247.in/pub/media/catalog/product/c/e/cer0553-1_1__1_1.jpg?tr=q-80,f-webp,w-150,dpr-1,c-at_max',
      badge: 'Value Deal'
    },
    {
      id: 102,
      name: 'Vitamin C Tablets, 60 count',
      originalPrice: 220,
      discountPrice: 165,
      discount: '25% off',
      image: 'https://images.apollo247.in/pub/media/catalog/product/c/e/cer0552-1_1_.jpg?tr=q-80,f-webp,w-150,dpr-1,c-at_max',
      badge: 'Under ₹200'
    },
    {
      id: 103,
      name: 'Iron Supplement, 30 tablets',
      originalPrice: 200,
      discountPrice: 150,
      discount: '25% off',
      image: '/api/placeholder/120/120',
      badge: 'Best Value'
    }
  ];

  // Filter fallback products as well (just to be safe)
  const filteredFallbackProducts = filterProductsUnder200(fallbackProducts);

  // Use filtered API data if available, otherwise use filtered fallback
  const productsToDisplay = filteredApiProducts.length > 0 ? filteredApiProducts : filteredFallbackProducts;

  // Additional check: If no products under ₹200 found, show a message
  const noProductsUnder200 = productsToDisplay.length === 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading Value Deals under ₹200...</div>
      </div>
    );
  }

  if (error) {
    console.error('Error fetching products:', error);
    // Still show fallback products on error
  }

  if (noProductsUnder200) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-gray-600">
          No products available under ₹200 at the moment. Check back later!
        </div>
      </div>
    );
  }

  return (
    <ProductCarousel
      title={`Value Deals under ₹200 (${productsToDisplay.length} items)`}
      viewAllLink="#value-deals"
      products={productsToDisplay}
      onAddToCart={handleAddToCart}
      isLoading={isLoading}
    />
  );
};