import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { ProductCarousel } from "../../components/UI/ProductCarousel";
import { addToCart } from '../../redux/slices/cartSlice';

export const Miniumoff = () => {
  const dispatch = useDispatch();

  // Fetch offer medicines using React Query
  const { data: apiResponse, isLoading, error } = useQuery({
    queryKey: ['offerMedicines'],
    queryFn: async () => {
      const response = await fetch('https://medisewa.onrender.com/api/v1/medicines/offer');
      if (!response.ok) {
        throw new Error('Failed to fetch offer medicines');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Extract medicines from result array
  const offerMedicines = apiResponse?.result || [];

  // Transform API data to match component structure
  const transformMedicineData = (medicines) => {
    if (!medicines || !Array.isArray(medicines)) return [];
    
    return medicines.map((medicine) => {
      // Get the primary image or first available image, fallback to placeholder
      const primaryImage = medicine.images?.find(img => img.isPrimary)?.image || 
                          medicine.images?.[0]?.image || 
                          '/api/placeholder/120/120';

      // Calculate discount price based on offer
      let discountPrice = medicine.price;
      let discountText = '';
      
      if (medicine.isOffer && medicine.offer > 0) {
        if (medicine.offerType === 'percentage') {
          discountPrice = medicine.price - (medicine.price * medicine.offer / 100);
          discountText = `${medicine.offer}% off`;
        } else if (medicine.offerType === 'fixed') {
          discountPrice = medicine.price - medicine.offer;
          discountText = `₹${medicine.offer} off`;
        }
      }

      // Determine badge based on medicine properties
      let badge = '';
      if (medicine.isOffer && medicine.offer >= 50) {
        badge = 'Big Offer';
      } else if (medicine.isOffer && medicine.offer >= 30) {
        badge = 'Great Deal';
      } else if (medicine.isOffer) {
        badge = 'Offer';
      } else if (medicine.inStock) {
        badge = 'In Stock';
      } else if (medicine.brand?.title) {
        badge = medicine.brand.title;
      }

      return {
        id: medicine._id,
        name: medicine.title,
        originalPrice: medicine.price,
        discountPrice: Math.round(discountPrice),
        discount: discountText,
        image: primaryImage,
        badge: badge,
        // Additional data that might be useful
        description: medicine.description,
        manufacturer: medicine.manufacturer,
        unit: medicine.unit,
        inStock: medicine.inStock,
        category: medicine.subCategory?.title,
        brandTitle: medicine.brand?.title,
        sizes: medicine.size || [] // Available sizes array
      };
    });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice,
      image: product.image,
      quantity: 1
    }));
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-600 text-center">
          <p>Failed to load offer medicines</p>
          <p className="text-sm text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  // Transform the fetched data
  const transformedProducts = transformMedicineData(offerMedicines);

  // Filter products that have actual offers (minimum 50% off as per component name)
  const minimumOffProducts = transformedProducts.filter(product => {
    if (product.discount.includes('%')) {
      const discountPercentage = parseInt(product.discount.replace('% off', ''));
      return discountPercentage >= 50;
    }
    return product.discount !== '';
  });

  return (
    <ProductCarousel
      title="Minimum 50% Off"
      viewAllLink="#minimum-off"
      products={minimumOffProducts.length > 0 ? minimumOffProducts : transformedProducts}
      onAddToCart={handleAddToCart}
    />
  );
};