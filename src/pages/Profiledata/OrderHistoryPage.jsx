import React, { useState } from 'react';
import { Calendar, Package, Clock, CheckCircle, XCircle, Truck, Eye, Download, Filter } from 'lucide-react';

const OrderHistoryPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample order data
  const orders = [
    {
      id: 'ORD-2025-001',
      date: '2025-06-20',
      status: 'delivered',
      total: 2680,
      items: [
        {
          id: 1,
          name: 'Smart medihub Annual Health Check-Up',
          type: 'Health Package',
          price: 2680,
          tests: 88,
          reportStatus: 'available',
          scheduledDate: '2025-06-22'
        }
      ],
      paymentMethod: 'Credit Card',
      deliveryAddress: 'Home Collection',
      estimatedTime: '10 hours'
    },
    {
      id: 'ORD-2025-002',
      date: '2025-06-18',
      status: 'completed',
      total: 1449,
      items: [
        {
          id: 2,
          name: 'Smart medihub Fever Panel - Basic',
          type: 'Health Package',
          price: 966,
          tests: 33,
          reportStatus: 'available',
          scheduledDate: '2025-06-19'
        },
        {
          id: 3,
          name: 'Smart medihub Hairfall Check - Basic',
          type: 'Health Package',
          price: 483,
          tests: 31,
          reportStatus: 'available',
          scheduledDate: '2025-06-19'
        }
      ],
      paymentMethod: 'UPI',
      deliveryAddress: 'Home Collection',
      estimatedTime: '10 hours'
    },
    {
      id: 'ORD-2025-003',
      date: '2025-06-15',
      status: 'processing',
      total: 859,
      items: [
        {
          id: 4,
          name: 'Smart medihub Kidney Check - Essential',
          type: 'Health Package',
          price: 859,
          tests: 63,
          reportStatus: 'pending',
          scheduledDate: '2025-06-24'
        }
      ],
      paymentMethod: 'Debit Card',
      deliveryAddress: 'Home Collection',
      estimatedTime: '10 hours'
    },
    {
      id: 'ORD-2025-004',
      date: '2025-06-10',
      status: 'cancelled',
      total: 1432,
      items: [
        {
          id: 5,
          name: 'Smart medihub Liver Function Test',
          type: 'Health Package',
          price: 1432,
          tests: 45,
          reportStatus: 'cancelled',
          scheduledDate: '2025-06-12'
        }
      ],
      paymentMethod: 'Credit Card',
      deliveryAddress: 'Home Collection',
      estimatedTime: '10 hours'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (selectedFilter === 'all') return true;
    return order.status === selectedFilter;
  });

  const OrderModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-semibold">{order.paymentMethod}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Items Ordered</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.tests} Tests</p>
                        <p className="text-sm text-gray-600">Scheduled: {new Date(item.scheduledDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{item.price}</p>
                        {item.reportStatus === 'available' && (
                          <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Download Report
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <span className="text-lg font-bold text-blue-600">₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className=" border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">Track and manage your health checkup orders</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select 
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Orders</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{order.id}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₹{order.total}</p>
                      <p className="text-sm text-gray-600">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.tests} Tests • {item.type}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">₹{item.price}</span>
                          {item.reportStatus === 'available' && (
                            <button className="text-blue-600 hover:text-blue-800 p-1">
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        {order.deliveryAddress}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Report in {order.estimatedTime}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default OrderHistoryPage;