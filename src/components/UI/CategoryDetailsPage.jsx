// Component for the category details page (previously CategoryPage)
export default function CategoryDetailsPage({ category, packages, mustHaveTests, onBackClick }) {
  return (
    <div>
      <button 
        onClick={onBackClick}
        className="flex items-center text-blue-600 font-medium mb-4"
      >
        ← Back to Health Checks
      </button>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar */}
        <div className="w-full md:w-64 border rounded-lg p-4">
          <h2 className="font-bold mb-4">Filters</h2>
          
          <div className="mb-6">
            <h3 className="font-bold mb-2">Type of Tests</h3>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="top-deals" className="h-4 w-4" />
              <label htmlFor="top-deals">Top Deals</label>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">Must Have Tests</h3>
            {mustHaveTests.map((test, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input type="checkbox" id={`test-${index}`} className="h-4 w-4" />
                <label htmlFor={`test-${index}`}>{test}</label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{category?.name} In Delhi ({packages?.length})</h1>
            <div className="relative w-40">
              <select className="w-full border rounded-lg p-2 appearance-none bg-white pr-8">
                <option>Sort By</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Tests: Most to Least</option>
              </select>
              <span className="absolute right-3 top-3">▼</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages?.map(pkg => (
              <div key={pkg.id} className="border rounded-lg overflow-hidden">
                <div className="p-4 flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <div className="text-2xl mb-1">
                      {pkg.id.includes('male') ? '👨' : 
                       pkg.id.includes('female') ? '👩' : '👤'}
                    </div>
                    <div className="text-xs text-center bg-purple-200 px-2 py-1 rounded">PACKAGE</div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1">{pkg.name}</h3>
                    <p className="text-sm mb-1">{pkg.testsIncluded} Tests Included</p>
                    {pkg.offer && (
                      <p className="text-xs text-green-600 font-bold">{pkg.offer}</p>
                    )}
                    {pkg.tags && pkg.tags.length > 0 && (
                      <div className="flex gap-2 mt-1">
                        {pkg.tags.map((tag, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-green-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border-t p-4 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold">₹{pkg.price}</span>
                      <span className="text-xs line-through text-gray-500">₹{pkg.originalPrice}</span>
                      <span className="text-xs text-green-600">{pkg.discount}</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call to book button */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <span className="text-xl">📞</span>
          <div>
            <div className="font-bold">CALL TO BOOK</div>
            <div className="text-sm">08045572851</div>
          </div>
        </button>
      </div>
    </div>
  );
}