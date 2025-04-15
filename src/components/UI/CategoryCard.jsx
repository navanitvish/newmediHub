//File: src/components/CategoryCard.js
export default function CategoryCard({ category, onClick }) {
  return (
    <div 
      className="border border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition"
      onClick={() => onClick(category)}
    >
      <div className="mb-2 text-2xl">{category.icon}</div>
      <div className="text-xs text-center font-medium">{category.name}</div>
      <div className="mt-1 bg-orange-500 rounded-full w-4 h-4 flex items-center justify-center">
        <div className="bg-white rounded-full w-1.5 h-1.5"></div>
      </div>
    </div>
  );
}