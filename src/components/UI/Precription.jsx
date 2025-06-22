import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Image, 
  Trash2, 
  Eye, 
  Download, 
  Search, 
  Plus,
  X,
  Calendar,
  User
} from 'lucide-react';

const PrescriptionUpload = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const prescriptions = [
    { id: 1, name: "prescription_john.pdf", patient: "John Smith", date: "2025-06-18", size: "2.3 MB", status: "processed" },
    { id: 2, name: "rx_scan.jpg", patient: "Emily Davis", date: "2025-06-17", size: "1.8 MB", status: "pending" },
    { id: 3, name: "medical_rx.png", patient: "Robert Wilson", date: "2025-06-16", size: "3.1 MB", status: "processed" },
    { id: 4, name: "prescription_maria.pdf", patient: "Maria Garcia", date: "2025-06-15", size: "1.5 MB", status: "error" }
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const newFiles = Array.from(e.dataTransfer.files).map((file, i) => ({
      id: Date.now() + i,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      status: 'uploading'
    }));
    setFiles([...files, ...newFiles]);
    setTimeout(() => setFiles(prev => prev.map(f => newFiles.find(nf => nf.id === f.id) ? {...f, status: 'completed'} : f)), 1500);
  };

  const handleFileInput = (e) => {
    const newFiles = Array.from(e.target.files).map((file, i) => ({
      id: Date.now() + i,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      status: 'uploading'
    }));
    setFiles([...files, ...newFiles]);
    setTimeout(() => setFiles(prev => prev.map(f => newFiles.find(nf => nf.id === f.id) ? {...f, status: 'completed'} : f)), 1500);
  };

  const removeFile = (id) => setFiles(files.filter(f => f.id !== id));

  const getStatusStyles = (status) => {
    const styles = {
      processed: 'bg-green-50 text-green-700 border-green-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      error: 'bg-red-50 text-red-700 border-red-200',
      uploading: 'bg-blue-50 text-blue-700 border-blue-200',
      completed: 'bg-green-50 text-green-700 border-green-200'
    };
    return styles[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getFileIcon = (name) => {
    return name.includes('.pdf') ? <FileText className="w-5 h-5 text-red-500" /> : <Image className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Prescription Manager</h1>
              <p className="text-gray-600">Upload and manage prescription files</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'upload', icon: Upload, label: 'Upload' },
              { id: 'manage', icon: FileText, label: 'Manage' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Prescriptions</h3>
                <p className="text-gray-500 mb-6">Drag files here or click to browse</p>
                <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer inline-flex items-center gap-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  Choose Files
                  <input type="file" multiple accept="image/*,.pdf" onChange={handleFileInput} className="hidden" />
                </label>
              </div>

              {/* File Types */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { icon: Image, label: 'Images', desc: 'JPG, PNG', color: 'blue' },
                  { icon: FileText, label: 'PDFs', desc: 'PDF files', color: 'red' },
                  { icon: Upload, label: 'All Types', desc: 'Any format', color: 'green' }
                ].map((item, i) => (
                  <div key={i} className={`p-4 bg-${item.color}-50 rounded-xl flex items-center gap-3`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                    <div>
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Uploads */}
            {files.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Uploads</h3>
                <div className="space-y-3">
                  {files.map(file => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.name)}
                        <div>
                          <div className="font-medium text-gray-900">{file.name}</div>
                          <div className="text-sm text-gray-500">{file.size}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusStyles(file.status)}`}>
                          {file.status}
                        </span>
                        <button onClick={() => removeFile(file.id)} className="p-1 text-red-500 hover:bg-red-50 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Manage Tab */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">All Prescriptions</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total', value: prescriptions.length, color: 'blue' },
                { label: 'Processed', value: prescriptions.filter(p => p.status === 'processed').length, color: 'green' },
                { label: 'Pending', value: prescriptions.filter(p => p.status === 'pending').length, color: 'yellow' },
                { label: 'Errors', value: prescriptions.filter(p => p.status === 'error').length, color: 'red' }
              ].map((stat, i) => (
                <div key={i} className={`p-4 bg-${stat.color}-50 rounded-xl`}>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Prescription List */}
            <div className="space-y-3">
              {prescriptions.map(rx => (
                <div key={rx.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        {getFileIcon(rx.name)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{rx.name}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {rx.patient}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {rx.date}
                          </div>
                          <span>{rx.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusStyles(rx.status)}`}>
                        {rx.status}
                      </span>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

export default PrescriptionUpload;