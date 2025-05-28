import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, MessageCircle, Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ApolloHealthcareNav() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Fetch categories using React Query directly
  const { data: categoryResponse, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('https://medisewa.onrender.com/api/v1/categories/categoryWithSubscategories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
  });

  // Extract categories from response
  const categories = categoryResponse?.result || [];

  console.log('categories', categories);

  return (
    <div className="flex flex-col w-full bg-white font-sans">
      {/* Top Navigation */}
      <div className="flex w-full bg-blue-600 text-black shadow-md fixed z-10">
        <div className="max-w-7xl mx-auto flex">
          {isLoading ? (
            <div className="px-4 py-3 text-white">Loading categories...</div>
          ) : error ? (
            <div className="px-4 py-3 text-red-200">
              Failed to load categories
            </div>
          ) : categories && categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id || `cat-${Math.random()}`}
                className="px-4 py-3 cursor-pointer hover:bg-blue-800 transition-colors relative group"
                onMouseEnter={() => setActiveDropdown(category._id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={`/category/${category._id || ''}`} 
                  className="whitespace-nowrap text-white no-underline hover:text-white font-medium"
                >
                  {category.title || 'Category'}
                </Link>
                
                {/* Dropdown for categories with subcategories */}
                {activeDropdown === category._id && 
                 category.subcategories && 
                 Array.isArray(category.subcategories) && 
                 category.subcategories.length > 0 && (
                  <div className="absolute left-0 top-full mt-px z-50 bg-white shadow-xl rounded-b-lg flex w-max max-w-6xl border-t-2 border-blue-600">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory._id} className="p-6 min-w-48">
                        <h3 className="font-bold text-blue-700 text-lg mb-4 pb-2 border-b border-gray-200">
                          {subcategory.title || 'Subcategory'}
                        </h3>
                        
                        {/* If subcategory has items/products */}
                        {subcategory.items && Array.isArray(subcategory.items) ? (
                          <ul className="space-y-2">
                            {subcategory.items.map((item, i) => (
                              <li key={item._id || i}>
                                <Link
                                  to={`/category/${category._id}/subcategory/${subcategory._id}/item/${item._id}`}
                                  className={`hover:text-blue-700 transition-colors block ${
                                    item.featured ? 'text-gray-800 font-medium' : 'text-gray-600'
                                  }`}
                                >
                                  {item.name || item.title || 'Item'}
                                  {item.featured && (
                                    <span className="inline-block ml-2 text-xs text-white bg-blue-600 px-1.5 py-0.5 rounded">
                                      Popular
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          /* If no items, show subcategory as clickable link */
                          <Link
                            to={`/category/${category._id}/subcategory/${subcategory._id}`}
                            className="text-gray-600 hover:text-blue-700 transition-colors block"
                          >
                            View {subcategory.title}
                            <ChevronRight className="inline w-4 h-4 ml-1" />
                          </Link>
                        )}
                        
                        {/* Show subcategory description if available */}
                        {subcategory.description && (
                          <p className="text-xs text-gray-500 mt-2 italic">
                            {subcategory.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-white">No categories available</div>
          )}
        </div>
      </div>
    </div>
  );
}