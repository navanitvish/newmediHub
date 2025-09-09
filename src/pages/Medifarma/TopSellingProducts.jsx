import { useDispatch } from 'react-redux';
import { ProductCarousel } from "../../components/UI/ProductCarousel";
import { addMedicine } from '../../redux/slices/medicineSlice';
import { useQuery } from '@tanstack/react-query';

export const TopSellingProducts = () => {
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
    queryKey: ['topSellMedicines'],
    queryFn: async () => {
      const response = await fetch('https://medisawabackend.onrender.com/api/v1/selles/topSellMedicines');
      if (!response.ok) {
        throw new Error('Failed to fetch top selling medicines');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Extract and transform API data
  const apiProducts = apiResponse?.result || [];
  
  // Transform API data to match the expected product format
  const transformedProducts = apiProducts.map(item => {
    const product = item.medicine;
    const totalSold = item.totalSold;
    
    // Calculate discount price based on offer
    let discountPrice = product.price;
    if (product.isOffer && product.offer) {
      if (product.offerType === 'percentage') {
        discountPrice = Math.round(product.price * (1 - product.offer / 100));
      } else if (product.offerType === 'fixed') {
        discountPrice = Math.max(0, product.price - product.offer);
      }
    }
    
    return {
      id: product._id,
      name: product.title,
      originalPrice: product.price,
      discountPrice: discountPrice,
      discount: product.isOffer && product.offer ? 
        `${product.offer}${product.offerType === 'percentage' ? '%' : '₹'} off` : null,
      image: product.images && product.images.length > 0 ? 
        product.images[0].image : 
        '/api/placeholder/120/120',
      badge: totalSold > 20 ? 'Top Seller' : 
             product.isOffer ? 'Special Offer' :
             product.inStock ? 'In Stock' : 'Out of Stock',
      inStock: product.inStock,
      manufacturer: product.manufacturer,
      description: product.description,
      unit: product.unit,
      size: product.size,
      totalSold: totalSold,
      quantity: product.quntity
    };
  });

  console.log("Top Selling Products API Response:", apiResponse);
  console.log("Transformed Top Selling Products:", transformedProducts);

  
  const productsToDisplay = transformedProducts.length > 0 ? transformedProducts : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading top selling products...</div>
      </div>
    );
  }

  if (error) {
    console.error('Error fetching top selling products:', error);
    // Still show fallback products on error
  }

  return (
    <ProductCarousel
      title="Top Selling Products"
      viewAllLink="#top-selling"
      products={productsToDisplay}
      onAddToCart={handleAddToCart}
      isLoading={isLoading}
    />
  );
};