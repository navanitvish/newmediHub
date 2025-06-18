import React from 'react'
import ProductDetails from '../../../components/UI/ProductDetails'

const AllProductDetails = () => {

    const product = {
      id: 1,
    name: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation",
    brand: "TechSound Pro",
    rating: 4.8,
    reviewCount: 2847,
    originalPrice: 12999,
    discountPrice: 8999,
    discount: "31%",
    badge: "Bestseller",
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop"
    ],
    colors: [
      { name: 'Midnight Black', value: '#1a1a1a', available: true },
      { name: 'Pearl White', value: '#f8f9fa', available: true },
      { name: 'Space Blue', value: '#1e3a8a', available: true },
      { name: 'Rose Gold', value: '#e11d48', available: false }
    ],
    sizes: ['Small', 'Medium', 'Large'],
    features: [
      "40mm dynamic drivers for superior sound",
      "Active Noise Cancellation (ANC)",
      "30-hour battery life with ANC off",
      "Quick charge: 5 min = 3 hours playback",
      "Bluetooth 5.2 connectivity",
      "Premium leather ear cushions"
    ],
    description: "Experience audio like never before with our Premium Wireless Bluetooth Headphones. Engineered with cutting-edge technology and premium materials, these headphones deliver exceptional sound quality, comfort, and style. The advanced active noise cancellation technology blocks out ambient noise, allowing you to immerse yourself completely in your music, calls, or content.",
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32 Ohms",
      "Battery Life": "30 hours (ANC off), 20 hours (ANC on)",
      "Charging Time": "2 hours",
      "Weight": "250g",
      "Bluetooth Version": "5.2",
      "Supported Codecs": "SBC, AAC, aptX"
    },
    deliveryFeatures: [
      { type: 'delivery', title: 'Free Delivery', description: 'Order above ₹499' },
      { type: 'warranty', title: '2 Year Warranty', description: 'Manufacturer warranty included' },
      { type: 'returns', title: 'Easy Returns', description: '30-day return policy' }
    ]
  };

  return (
    <div>

      <ProductDetails  product={product}/>
      
    </div>
  )
}

export default AllProductDetails
