 import { 
  Upload, 
  FileText, 
  Image, 
  File, 
  Trash2, 
  Eye, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  User,
  Pill,
  Plus,
  X
} from 'lucide-react';
 export const TabButton = ({ id, icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );