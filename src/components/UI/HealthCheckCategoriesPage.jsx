// Component for the main categories page (previously HomePage)
export default function HealthCheckCategoriesPage({ categories, onCategoryClick }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctor Created Health Checks (29)</h1>
        <button className="text-blue-600 font-medium">View All</button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
            onClick={() => onCategoryClick(category.id)}
          >
            <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mb-2 relative`}>
              <span className="text-2xl">{category.icon}</span>
              <span className="absolute -right-1 -bottom-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                +
              </span>
            </div>
            <span className="text-sm text-center">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}