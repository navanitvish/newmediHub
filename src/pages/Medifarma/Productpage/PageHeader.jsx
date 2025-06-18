

import { ChevronDown } from 'lucide-react';

// Header Component
export const PageHeader = ({ title, sortBy, setSortBy, sortOptions = [] }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort By :</span>
        <div className="relative">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
