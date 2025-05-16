import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Plus } from 'lucide-react';

// Mock product data - in a real app, this would come from an API or Redux store
const productData = {
  All: [
    { id: 1, name: 'Paracetamol', price: 5.99, category: 'Medicines', image: '/api/placeholder/200/200', description: 'Pain reliever and fever reducer' },
    { id: 2, name: 'Blood Pressure Monitor', price: 49.99, category: 'Healthcare', image: '/api/placeholder/200/200', description: 'Digital BP monitoring device' },
    { id: 3, name: 'Vitamin C Tablets', price: 9.99, category: 'Vitamins', image: '/api/placeholder/200/200', description: 'Immunity booster supplement' },
    { id: 4, name: 'Ashwagandha', price: 15.99, category: 'Ayurveda', image: '/api/placeholder/200/200', description: 'Traditional medicinal herb' },
  ],
  Medicines: [
    { id: 1, name: 'Paracetamol', price: 5.99, category: 'Medicines', image: '/api/placeholder/200/200', description: 'Pain reliever and fever reducer' },
    { id: 6, name: 'Antibiotics', price: 12.99, category: 'Medicines', image: '/api/placeholder/200/200', description: 'Broad spectrum antibiotic' },
    { id: 7, name: 'Cough Syrup', price: 8.99, category: 'Medicines', image: '/api/placeholder/200/200', description: 'Helps with cough and cold symptoms' },
    { id: 8, name: 'Antacid', price: 6.99, category: 'Medicines', image: '/api/placeholder/200/200', description: 'Relieves heartburn and indigestion' },
  ],
  Healthcare: [
    { id: 2, name: 'Blood Pressure Monitor', price: 49.99, category: 'Healthcare', image: '/api/placeholder/200/200', description: 'Digital BP monitoring device' },
    { id: 9, name: 'Thermometer', price: 12.99, category: 'Healthcare', image: '/api/placeholder/200/200', description: 'Digital thermometer for accurate readings' },
    { id: 10, name: 'Glucose Monitor', price: 39.99, category: 'Healthcare', image: '/api/placeholder/200/200', description: 'Blood sugar monitoring system' },
    { id: 11, name: 'First Aid Kit', price: 19.99, category: 'Healthcare', image: '/api/placeholder/200/200', description: 'Essential first aid supplies' },
  ],
  Vitamins: [
    { id: 3, name: 'Vitamin C Tablets', price: 9.99, category: 'Vitamins', image: '/api/placeholder/200/200', description: 'Immunity booster supplement' },
    { id: 12, name: 'Multivitamin', price: 14.99, category: 'Vitamins', image: '/api/placeholder/200/200', description: 'Complete daily nutritional support' },
    { id: 13, name: 'Vitamin D3', price: 8.99, category: 'Vitamins', image: '/api/placeholder/200/200', description: 'Supports bone health and immunity' },
    { id: 14, name: 'Vitamin B Complex', price: 11.99, category: 'Vitamins', image: '/api/placeholder/200/200', description: 'Energy and metabolism support' },
  ],
  Ayurveda: [
    { id: 4, name: 'Ashwagandha', price: 15.99, category: 'Ayurveda', image: '/api/placeholder/200/200', description: 'Traditional medicinal herb' },
    { id: 15, name: 'Triphala', price: 13.99, category: 'Ayurveda', image: '/api/placeholder/200/200', description: 'Digestive and detoxification support' },
    { id: 16, name: 'Turmeric Capsules', price: 17.99, category: 'Ayurveda', image: '/api/placeholder/200/200', description: 'Anti-inflammatory herbal supplement' },
    { id: 17, name: 'Neem Tablets', price: 10.99, category: 'Ayurveda', image: '/api/placeholder/200/200', description: 'Natural blood purifier' },
  ],
  'Personal Care': [
    { id: 5, name: 'Face Wash', price: 7.99, category: 'Personal Care', image: '/api/placeholder/200/200', description: 'Gentle cleansing face wash' },
    { id: 18, name: 'Hand Sanitizer', price: 3.99, category: 'Personal Care', image: '/api/placeholder/200/200', description: 'Kills 99.9% of germs without water' },
    { id: 19, name: 'Body Lotion', price: 8.99, category: 'Personal Care', image: '/api/placeholder/200/200', description: 'Deep moisturizing skin care' },
    { id: 20, name: 'Sunscreen', price: 12.99, category: 'Personal Care', image: '/api/placeholder/200/200', description: 'SPF 50 broad spectrum protection' },
  ]
};

const ProductCategoryDisplay = () => {
  const categories = ['All', 'Medicines', 'Healthcare', 'Vitamins', 'Ayurveda', 'Personal Care'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dispatch = useDispatch();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    dispatch({ 
      type: 'cart/addToCart', 
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      }
    });
  };

  return (
    <div className="bg-gray-50 ">
      {/* Category Navigation */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Display */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-semibold mb-6">{selectedCategory} Products</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productData[selectedCategory]?.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="p-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                    <span className="font-bold text-blue-600">${product.price}</span>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-2xl transition duration-300"
                  >
                
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCategoryDisplay;