// Product Card Component
// Badge Component
const Badge = ({ type, text, className = "" }) => {
  const baseClasses = "absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium";
  const typeClasses = {
    bestseller: "bg-purple-100 text-purple-700",
    offer: "bg-blue-100 text-blue-700",
    discount: "bg-green-100 text-green-700"
  };
  
  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${className}`}>
      {text}
    </div>
  );
};

// Product Image Component
 const ProductImage = ({ product, imageClassName = "" }) => {
  return (
    <div className={`relative bg-gray-50 h-48 flex items-center justify-center ${imageClassName}`}>
      {product.bestseller && (
        <Badge type="bestseller" text="Bestseller" />
      )}
      {product.offer && (
        <Badge type="offer" text={product.offer} />
      )}
      {product.discount && (
        <Badge type="discount" text={product.discount} />
      )}
      
      {product.image ? (
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">NIVEA</span>
        </div>
      )}
    </div>
  );
};
const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  className = "",
  disabled = false 
}) => {
  const baseClasses = "rounded-md font-medium transition-colors focus:outline-none focus:ring-2";
  
  const variants = {
    primary: "bg-teal-700 hover:bg-teal-800 text-white focus:ring-teal-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500",
    outline: "border border-teal-700 text-teal-700 hover:bg-teal-50 focus:ring-teal-500"
  };
  
  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <ProductImage product={product} />
      
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <Button onClick={() => onAddToCart(product)}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

// Products Grid Component
export const ProductsGrid = ({ products, onAddToCart, gridClassName = "" }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${gridClassName}`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};