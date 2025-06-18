// Filter Item Component
import { Plus } from 'lucide-react';
 const FilterItem = ({ category, isExpanded, onToggle, children }) => {
  return (
    <div className="border-b border-gray-100 pb-3">
      <button
        onClick={() => onToggle(category)}
        className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 hover:text-teal-700"
      >
        <span>{category}</span>
        <Plus className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
      </button>
      {isExpanded && (
        <div className="mt-2 pl-2 space-y-1">
          {children || <div className="text-sm text-gray-600">Filter options would go here</div>}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({ filterCategories, expandedFilters, onToggleFilter }) => {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Filter By</h3>
        
        <div className="space-y-3">
          {filterCategories.map((category) => (
            <FilterItem
              key={category}
              category={category}
              isExpanded={expandedFilters[category]}
              onToggle={onToggleFilter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};