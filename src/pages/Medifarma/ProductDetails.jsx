 import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  Star, 
  Heart, 
  Minus, 
  Plus, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Check,
  ChevronDown,
  MessageCircle,
  ThumbsUp,
  Camera,
  Play
} from 'lucide-react';
import { ProductImageGallery } from '../../components/UI/ProductImageGallery';
 const ProductDetails = ({
  product = {},
  formatPrice = (price) => `₹${price.toLocaleString()}`,
  onAddToCart,
  onBuyNow,
  onAddToWishlist,
  breadcrumbs = [],
  reviews = [],
  relatedProducts = []
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart && product.id) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.discountPrice,
        image: product.images?.[0],
        quantity,
        size: selectedSize,
        color: selectedColor
      });
    }
  };

  const handleBuyNow = () => {
    if (onBuyNow && product.name) {
      onBuyNow({
        product: product.name,
        quantity,
        size: selectedSize,
        color: selectedColor
      });
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  console.log(product);

  // Return early if no product data
  if (!product || !product.images || product.images.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600">Please check the product information and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-52 h-52 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="w-4 h-4" />}
                <span className={index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-gray-900 cursor-pointer'}>
                  {crumb}
                </span>
              </div>
            ))}
          </nav>
        )}

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <ProductImageGallery 
              images={product.images || []} 
              productName={product.name || 'Product'}
              badge={product.badge}
              discount={product.discount}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand and Title */}
            <div>
              {product.brand && (
                <p className="text-blue-600 font-semibold text-sm mb-2">{product.brand}</p>
              )}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                {product.name || 'Product Name'}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(product.rating || 4.8) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{product.rating || 4.8}</span>
                </div>
                <span className="text-gray-600">({(product.reviewCount || 245).toLocaleString()} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100/50">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.discountPrice || 0)}
                </span>
                {product.originalPrice && product.originalPrice > (product.discountPrice || 0) && (
                  <span className="text-lg text-gray-400 line-through">
                    MRP {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    Save {formatPrice((product.originalPrice || product.discountPrice || 0) - (product.discountPrice || 0))}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Color: {selectedColor}</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => color.available && setSelectedColor(color.name)}
                      disabled={!color.available}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        selectedColor === color.name 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-300 hover:border-gray-400'
                      } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {!color.available && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-0.5 bg-red-500 rotate-45"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 rounded-xl font-medium transition-all duration-300 ${
                        selectedSize === size 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white border-2 border-gray-300 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-semibold min-w-16 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-emerald-600 font-semibold">
                  {product.stock ? `In Stock (${product.stock} available)` : 'In Stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                ADD TO CART
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                BUY NOW
              </button>
              <button 
                onClick={handleWishlist}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isWishlisted 
                    ? 'border-red-300 bg-red-50 text-red-600' 
                    : 'border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button className="p-4 rounded-xl border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100/50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Free Delivery</p>
                  <p className="text-sm text-gray-600">Order above ₹499</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">2 Year Warranty</p>
                  <p className="text-sm text-gray-600">Manufacturer warranty included</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden mb-16">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 font-semibold transition-all duration-300 border-b-2 ${
                    activeTab === tab 
                      ? 'border-blue-500 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {showFullDescription ? product.description : `${(product.description || '').substring(0, 200)}...`}
                  </p>
                  {product.description && product.description.length > 200 && (
                    <button 
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    >
                      {showFullDescription ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
                
                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                <div className="grid gap-4">
                  {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex py-3 border-b border-gray-100 last:border-b-0">
                      <span className="font-semibold text-gray-900 w-1/3">{key}</span>
                      <span className="text-gray-700 w-2/3">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                  
                  {/* Rating Summary */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">{product.rating || 4.8}</div>
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(product.rating || 4.8) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">{(product.reviewCount || 245).toLocaleString()} reviews</div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-3 mb-2">
                            <span className="text-sm text-gray-600 w-8">{stars}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ width: `${Math.random() * 80 + 10}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-gray-900">{review.user}</span>
                              {review.verified && (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                        <p className="text-gray-700 mb-4">{review.comment}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm">Helpful ({review.helpful})</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">Reply</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text mb-8">
              You Might Also Like
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-2xl shadow-md border border-gray-100/50 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100/50">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(relatedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({relatedProduct.rating})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-bold text-gray-900">{formatPrice(relatedProduct.discountPrice)}</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-gray-400 text-sm line-through">{formatPrice(relatedProduct.originalPrice)}</span>
                      )}
                    </div>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                      View Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;