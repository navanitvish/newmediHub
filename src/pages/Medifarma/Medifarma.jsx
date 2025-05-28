// src/pages/Medifarma/Medifarma.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Clock, Truck, Shield, Phone, Star, Heart, ShoppingBag, Sparkles, ChevronRight } from 'lucide-react';

import HealthConditionsBrowser from '../../components/UI/HealthConditionsBrowser';
import { addToCart } from '../../redux/slices/cartSlice';
import { selectAllProducts, filterByCategory } from '../../redux/slices/productsSlice';
import ApolloHealthcareNav from './medibar';
import PopularLabTests from '../LabTests/PopularLabTests';

import BannerCarousel from '../../components/UI/Banner';
import { ValueDealsCarousel } from './ValueDeals';
import { TopSellingProducts } from './TopSellingProducts';
import { DiebetesManagement } from './DiebetesManagement';
import { SkinCarebrand } from './SkinCarebrand';
import { Miniumoff } from './Miniumoff';
import { nav } from 'framer-motion/client';
import { useNavigate } from 'react-router-dom';
import Brand from './brand';
import PharmaciesNearYou from './PharmaciesNearYou';




const Medifarma = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const cartCount = useSelector(state => state.cart.totalItems);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        dispatch(filterByCategory(category));
    };

    const handlesearch = () => {
        navigate('/search');
    };



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
            <div className="font-sans text-gray-800 mt-4">
                <ApolloHealthcareNav />

                {/* Hero Section */}
                <section className="z-0 relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white">
                    {/* Decorative pill shapes in background */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                        <div className="absolute top-10 right-20 w-32 h-16 rounded-full bg-white rotate-45"></div>
                        <div className="absolute bottom-20 left-10 w-40 h-16 rounded-full bg-white -rotate-12"></div>
                        <div className="absolute top-1/3 left-1/4 w-24 h-12 rounded-full bg-white rotate-45"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
                            {/* Left Content */}
                            <div className="md:w-1/2">
                                <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-1.5 mb-6">
                                    <Sparkles size={16} className="text-blue-600 mr-2" />
                                    <span className="text-sm font-medium text-black">FIRST20 for 20% off your first order</span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                                    Your Health, <span className="text-white">Our Priority</span>
                                </h1>

                                <p className="text-lg text-blue-50 mb-8 max-w-lg">
                                    Get premium medicines and healthcare products delivered to your doorstep with exclusive online discounts and lightning-fast delivery.
                                </p>

                                {/* Trust Indicators */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                                            <Shield size={16} className="text-black" />
                                        </div>
                                        <span className="text-sm">Genuine Products</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                                            <Truck size={16} className="text-black" />
                                        </div>
                                        <span className="text-sm">Fast Delivery</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                                            <ShoppingBag size={16} className="text-black" />
                                        </div>
                                        <span className="text-sm">Easy Returns</span>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="mt-6">
                                    <button onClick={handlesearch} className="bg-white text-blue-600 px-8 py-4 rounded-full font-medium hover:bg-blue-50 transition-colors flex items-center shadow-lg">
                                       Search
                                        <ChevronRight size={20} className="ml-2" />
                                    </button>
                                    <p className="text-blue-100 text-sm mt-3">
                                        Free shipping on orders above ₹499
                                    </p>
                                </div>
                            </div>

                            {/* Right Content - Image with Decorative Elements */}
                            <div className="md:w-1/2 relative">
                                <div className="relative">
                                    {/* Main Image with Styled Container */}
                                    <div className="relative bg-gradient-to-br from-blue-700 to-indigo-600 p-2 rounded-2xl shadow-2xl rotate-1">
                                        <img
                                            src="https://cdn.dribbble.com/userupload/14829154/file/original-c8145ea435dea6f86e6c4517203bc229.png?resize=1024x768&vertical=center"
                                            alt="Family with healthcare products"
                                            className="rounded-xl shadow-inner w-full h-auto object-cover"
                                        />

                                        {/* Badge Overlay */}
                                        <div className="absolute -top-6 -right-6 bg-yellow-500 text-blue-900 rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg transform rotate-12">
                                            <span className="text-xs font-bold">SAVE</span>
                                            <span className="text-lg font-bold">20%</span>
                                        </div>
                                    </div>

                                    {/* Floating Product Card */}
                                    <div className="absolute -left-6 bottom-12 bg-white rounded-lg shadow-lg p-3 max-w-xs hidden md:block">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                                <img src="https://cdn.dribbble.com/userupload/37019428/file/original-50aa29d2fa2cee728e68f73231983c21.png?resize=728x546&vertical=center" alt="Product" className="rounded-full" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-sm font-bold text-gray-800">Premium Vitamins</h3>
                                                <div className="flex items-center">
                                                    <span className="text-xs text-green-600 font-medium">₹399</span>
                                                    <span className="text-xs text-gray-500 line-through ml-2">₹599</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Rating Card */}
                                    <div className="absolute -right-4 top-12 bg-white rounded-lg shadow-lg p-3 hidden md:block">
                                        <div className="flex items-center space-x-1">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-xs font-medium text-gray-800">4.9/5 (2.5k+ reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Wave Shape */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
                        <svg className="relative block w-full h-8 sm:h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="white"></path>
                        </svg>
                    </div>
                </section>

                {/* Features */}
                <section className="py-12 px-4 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
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
                                    <p className="text-sm white">For selected locations</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                                <div className="bg-purple-100 p-3 rounded-full mr-4">
                                    <Shield className="text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Genuine Products</h3>
                                    <p className="text-sm text-white">100% authentic items</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                                <div className="bg-orange-100 p-3 rounded-full mr-4">
                                    <Phone className="text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium">24/7 Support</h3>
                                    <p className="text-sm white">Call us anytime</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
               

                <HealthConditionsBrowser />

                 <Miniumoff/>

           


                <BannerCarousel />
                <TopSellingProducts/>

                <Brand />

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
                <ValueDealsCarousel />
                <DiebetesManagement/>
                <SkinCarebrand/>

                <PopularLabTests />
                <div className="max-w-7xl mx-auto rounded-2xl ">
                    <img src="https://images.apollo247.in/pd-cms/cms/2023-09/Diag_Web_Desktop.jpg?tr=q-80,f-webp,w-1300,dpr-2,c-at_max" alt="bnner" srcset=""
                        className='w-full rounded-2xl '
                    />

                </div>

                <div className="max-w-7xl mx-auto rounded-2xl ">
                    <img src="https://images.apollo247.in/images/category/threeStepsherobannerfinal.png?tr=q-80,f-webp,w-1250,dpr-1,c-at_max" alt="bnner" srcset=""
                        className='w-full rounded-2xl '
                    />

                </div>


<PharmaciesNearYou/>
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

                {/* Cart Link with Counter */}
                <div className="fixed bottom-6 right-6 z-50">
                    <Link
                        to="/cart"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
                    >
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Medifarma;