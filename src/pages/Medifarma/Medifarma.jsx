import React, { useState } from 'react';
import { Search, ShoppingCart, Clock, Truck, Shield, Phone, Mail, MapPin, ChevronDown, ChevronRight, Star, Heart, User, Menu, X } from 'lucide-react';

const Medifarma = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cartCount, setCartCount] = useState(0);

    const handleAddToCart = () => {
        setCartCount(cartCount + 1);
    };

    const categories = ['All', 'Medicines', 'Healthcare', 'Vitamins', 'Ayurveda', 'Personal Care'];

    const featuredProducts = [
        {
            id: 1,
            name: 'Multivitamin Tablets',
            price: 599,
            discount: 699,
            image: '/api/placeholder/200/200',
            rating: 4.8,
            reviews: 142,
        },
        {
            id: 2,
            name: 'Diabetes Care Kit',
            price: 1299,
            discount: 1499,
            image: '/api/placeholder/200/200',
            rating: 4.7,
            reviews: 89,
        },
        {
            id: 3,
            name: 'Immunity Booster',
            price: 449,
            discount: 599,
            image: '/api/placeholder/200/200',
            rating: 4.5,
            reviews: 215,
        },
        {
            id: 4,
            name: 'Protein Supplement',
            price: 1099,
            discount: 1299,
            image: '/api/placeholder/200/200',
            rating: 4.6,
            reviews: 176,
        },
    ];

    const blogPosts = [
        {
            id: 1,
            title: 'Understanding Diabetes: Prevention and Management',
            excerpt: 'Learn about the latest approaches to diabetes care and prevention strategies.',
            image: '/api/placeholder/300/200',
            date: 'April 10, 2025',
        },
        {
            id: 2,
            title: 'The Importance of Vitamin D in Your Daily Diet',
            excerpt: 'Discover why Vitamin D is crucial and how to ensure you get enough of it.',
            image: '/api/placeholder/300/200',
            date: 'April 5, 2025',
        },
        {
            id: 3,
            title: 'Ayurvedic Remedies for Common Ailments',
            excerpt: 'Explore traditional Ayurvedic solutions for everyday health issues.',
            image: '/api/placeholder/300/200',
            date: 'April 1, 2025',
        },
    ];

    return (
      <div className='bg-gray-100'>
          <div className="font-sans text-gray-800 mt-28  ">
            {/* Top Bar */}
            <div className="bg-blue-600 text-white py-2 px-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Phone size={16} />
                            <span>+91 1800-123-4567</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Mail size={16} />
                            <span>support@medifarma.in</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-sm hover:underline">Download App</a>
                        <a href="#" className="text-sm hover:underline">Career</a>
                        <a href="#" className="text-sm hover:underline">Become a Partner</a>
                    </div>
                </div>
            </div>

          

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto  flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Health, Our Priority</h1>
                        <p className="text-lg mb-6">Get medicines delivered to your doorstep with exclusive online discounts. Use code FIRST20 for 20% off on your first order.</p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors">
                                Order Now
                            </button>
                            <button className="border border-white text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors">
                                Talk to Doctor
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img src="/api/placeholder/600/400" alt="Happy family with healthcare products" className="rounded-lg shadow-xl" />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto ">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                <Truck className="text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">Free Delivery</h3>
                                <p className="text-sm text-gray-600">On orders above ₹599</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                            <div className="bg-green-100 p-3 rounded-full mr-4">
                                <Clock className="text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">Same Day Delivery</h3>
                                <p className="text-sm text-gray-600">For selected locations</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                            <div className="bg-purple-100 p-3 rounded-full mr-4">
                                <Shield className="text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">Genuine Products</h3>
                                <p className="text-sm text-gray-600">100% authentic items</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                            <div className="bg-orange-100 p-3 rounded-full mr-4">
                                <Phone className="text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-medium">24/7 Support</h3>
                                <p className="text-sm text-gray-600">Call us anytime</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Navigation */}
            <section className="py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                    }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Featured Products</h2>
                        <a href="#" className="text-blue-600 flex items-center">
                            View All <ChevronRight size={16} />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                <div className="p-4">
                                    <div className="relative mb-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-48 object-contain rounded-md"
                                        />
                                        <button
                                            className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50"
                                        >
                                            <Heart size={18} className="text-gray-500 hover:text-red-500" />
                                        </button>
                                    </div>

                                    <div className="mb-2">
                                        <div className="flex items-center mb-1">
                                            <Star size={16} className="text-yellow-400 fill-current" />
                                            <span className="text-sm ml-1">{product.rating}</span>
                                            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                                        </div>
                                        <h3 className="font-medium">{product.name}</h3>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-bold text-lg">₹{product.price}</span>
                                            <span className="text-gray-500 text-sm ml-2 line-through">₹{product.discount}</span>
                                        </div>
                                        <button
                                            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                                            onClick={handleAddToCart}
                                        >
                                            <ShoppingCart size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Offers Banner */}
            <section className="py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 md:p-10 text-white">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="md:w-3/5 mb-6 md:mb-0">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">Get 25% off on all Ayurvedic Products</h2>
                                <p className="mb-6">Use code AYUR25 at checkout. Valid until April 30, 2025.</p>
                                <button className="bg-white text-green-600 px-6 py-3 rounded-full font-medium hover:bg-green-50 transition-colors">
                                    Shop Now
                                </button>
                            </div>
                            <div className="md:w-2/5">
                                <img src="/api/placeholder/400/200" alt="Ayurvedic products" className="rounded-lg shadow-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Health Blog */}
            <section className="py-10 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Health Blog</h2>
                        <a href="#" className="text-blue-600 flex items-center">
                            View All <ChevronRight size={16} />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <span className="text-xs text-gray-500">{post.date}</span>
                                    <h3 className="font-bold text-lg mt-2 mb-3">{post.title}</h3>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <a href="#" className="text-blue-600 font-medium flex items-center">
                                        Read More <ChevronRight size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                            <div className="flex items-center mb-4">
                                <img src="/api/placeholder/50/50" alt="Customer" className="rounded-full w-12 h-12 mr-4" />
                                <div>
                                    <h4 className="font-medium">Priya Sharma</h4>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className="text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                "I've been using Medifarma for all my medical needs for the past year. The delivery is always prompt, and the medicines are genuine. The discounts are amazing, and their customer service is exceptional. Highly recommended!"
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                            <div className="flex items-center mb-4">
                                <img src="/api/placeholder/50/50" alt="Customer" className="rounded-full w-12 h-12 mr-4" />
                                <div>
                                    <h4 className="font-medium">Rahul Verma</h4>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className="text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                "As someone who takes regular medication, Medifarma has been a lifesaver. The subscription service ensures I never run out of my essentials. The app is user-friendly, and the reminders are incredibly helpful. Thank you for making healthcare so convenient!"
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                            <div className="flex items-center mb-4">
                                <img src="/api/placeholder/50/50" alt="Customer" className="rounded-full w-12 h-12 mr-4" />
                                <div>
                                    <h4 className="font-medium">Anjali Patel</h4>
                                    <div className="flex">
                                        {[...Array(4)].map((_, i) => (
                                            <Star key={i} size={16} className="text-yellow-400 fill-current" />
                                        ))}
                                        <Star size={16} className="text-gray-300" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">
                                "I recently consulted with a doctor through Medifarma's online consultation service. The process was smooth, and the doctor was very knowledgeable. The prescription was directly sent to the app, and I received my medicines the next day. Great service overall!"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download App */}
            <section className="py-10 px-4 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Download Our Mobile App</h2>
                        <p className="mb-6">Get exclusive app-only offers and manage your healthcare needs on the go. Scan the QR code or download from your app store.</p>
                        <div className="flex space-x-4">
                            <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center">
                                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.5 0.5C9.5 0.5 8.5 1 7.5 2C6.5 3 6 4.5 6 6C6 7.5 6.5 9 7.5 10C8.5 11 9.5 11.5 10.5 11.5C11.5 11.5 12.5 11 13.5 10C14.5 9 15 7.5 15 6C15 4.5 14.5 3 13.5 2C12.5 1 11.5 0.5 10.5 0.5Z" />
                                    <path d="M3.5 17.5C3.5 14.5 6.5 12 10 12C13.5 12 16.5 14.5 16.5 17.5C16.5 18.5 16 19 15 19H5C4 19 3.5 18.5 3.5 17.5Z" />
                                </svg>
                                App Store
                            </button>
                            <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center">
                                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 3V17C3 18.1 3.9 19 5 19H15C16.1 19 17 18.1 17 17V3C17 1.9 16.1 1 15 1H5C3.9 1 3 1.9 3 3ZM15 17H5V3H15V17Z" />
                                    <path d="M10 16C10.6 16 11 15.6 11 15C11 14.4 10.6 14 10 14C9.4 14 9 14.4 9 15C9 15.6 9.4 16 10 16Z" />
                                </svg>
                                Google Play
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                        <img src="/api/placeholder/300/500" alt="Mobile app" className="rounded-lg shadow-xl" />
                    </div>
                </div>
            </section>





            


        </div>
      </div>

        
        
 






    




    

   
  );
};

export default Medifarma;