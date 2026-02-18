import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  QrCodeIcon,
  DevicePhoneMobileIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  StarIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { orderAPI } from '../../services/api';

const Orders = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for testing when API fails
  const mockOrders = [
    {
      id: 'ORD001',
      userId: userId,
      status: 'processing',
      paymentStatus: 'Pending',
      date: new Date().toISOString(),
      total: 299.99,
      items: [
        {
          name: 'Premium MLM Package',
          price: 299.99,
          quantity: 1,
          mlmPoints: 100
        }
      ],
      payment: {
        method: 'qr'
      },
      mlmPointsEarned: 100,
      shipping: {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    },
    {
      id: 'ORD002',
      userId: userId,
      status: 'delivered',
      paymentStatus: 'Done',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      total: 149.99,
      items: [
        {
          name: 'Basic Product',
          price: 149.99,
          quantity: 1,
          mlmPoints: 50
        }
      ],
      payment: {
        method: 'upi',
        upiId: 'john@upi'
      },
      mlmPointsEarned: 50,
      shipping: {
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      }
    }
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching orders for userId:', userId);
        const response = await orderAPI.getOrders(userId);

        console.log('Orders API response:', response);

        // Check if response has data
        if (response && response.success && Array.isArray(response.data)) {
          setOrders(response.data);
        } else if (response && Array.isArray(response)) {
          setOrders(response);
        } else {
          console.log('Using mock orders due to invalid API response');
          setOrders(mockOrders);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        console.log('Using mock orders due to API error');
        setOrders(mockOrders);
        setError('Using demo data - API connection failed');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // Filter orders based on active tab
  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter(order => (order?.shippingStatus || 'Processing').toLowerCase() === activeTab.toLowerCase());

  const getStatusIcon = (status) => {
    const s = (status || 'Processing').toLowerCase();
    switch (s) {
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-blue-500" />;
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPaymentStatusIcon = (status) => {
    if (!status) return <ClockIcon className="h-5 w-5 text-gray-500" />;

    switch (status) {
      case 'Completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Done':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'Processing':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'Failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'Refunded':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    if (!status) return 'Processing';

    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'Delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'Shipped':
        return 'Shipped';
      case 'processing':
        return 'Processing';
      case 'Processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
      case 'Cancelled':
        return 'Cancelled';
      default:
        return 'Processing';
    }
  };

  const getPaymentStatusText = (status) => {
    if (!status) return 'Payment Pending';

    switch (status) {
      case 'Completed':
        return 'Payment Successful';
      case 'Done':
        return 'Payment Successful';
      case 'Pending':
        return 'Payment Pending';
      case 'Processing':
        return 'Payment Processing';
      case 'Failed':
        return 'Payment Failed';
      case 'Refunded':
        return 'Payment Refunded';
      default:
        return 'Payment Pending';
    }
  };

  const formatDate = (dateString) => {
    try {
      return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
    } catch {
      return 'N/A';
    }
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';

    switch (status) {
      case 'delivered':
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';

    switch (status) {
      case 'Completed':
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Refunded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container-responsive py-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

      {/* Demo Data Notice */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg animate-fade-in">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {error} - Showing demo order data for testing purposes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Order Status Tabs - Mobile Friendly Scroll */}
      <div className="border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
        <nav className="-mb-px flex space-x-6 lg:space-x-8 min-w-max">
          {[
            { id: 'all', label: 'All Orders', count: orders.length },
            { id: 'processing', label: 'Processing', count: orders.filter(o => (o.shippingStatus || 'Processing').toLowerCase() === 'processing').length },
            { id: 'shipped', label: 'Shipped', count: orders.filter(o => (o.shippingStatus || '').toLowerCase() === 'shipped').length },
            { id: 'delivered', label: 'Delivered', count: orders.filter(o => (o.shippingStatus || '').toLowerCase() === 'delivered').length },
            { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => (o.shippingStatus || '').toLowerCase() === 'cancelled').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-soft">
          <div className="spinner spinner-lg mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your orders...</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-6 lg:space-y-8">
          {filteredOrders.map((order) => (
            <div key={order?._id || Math.random()} className="card animate-fade-in shadow-soft hover:shadow-medium transition-shadow duration-300">
              <div className="px-4 py-5 sm:px-6 bg-secondary-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start">
                    <div className={`mt-1 flex-shrink-0 p-2 rounded-lg bg-white shadow-sm`}>
                      {getStatusIcon(order?.shippingStatus)}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        Order #{order?._id?.substring(0, 8).toUpperCase() || 'N/A'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on {formatDate(order?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                    <div className="flex flex-wrap gap-2">
                      <span className={`status-indicator ${getStatusColor(order?.shippingStatus)}`}>
                        {getStatusText(order?.shippingStatus)}
                      </span>
                      <span className={`status-indicator ${getPaymentStatusColor(order?.paymentStatus)}`}>
                        {getPaymentStatusText(order?.paymentStatus)}
                      </span>
                    </div>
                    <p className="text-xl font-extrabold text-primary-600">
                      ${(order?.totals?.total || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-5 sm:px-6 space-y-6">
                {/* Order Items */}
                {order?.items && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Items</h4>
                    <div className="space-y-4">
                      {order.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex gap-4 py-3 border-b border-gray-50 last:border-b-0 items-start">
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                            {item?.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <ShoppingBagIcon className="h-8 w-8 text-gray-300" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{item?.name || 'Unknown Item'}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Qty: {item?.quantity || 1}</p>
                            {item?.mlmPoints > 0 && (
                              <p className="text-xs font-medium text-blue-600 mt-1 flex items-center">
                                <StarIcon className="h-3 w-3 mr-1 fill-current" />
                                {item.mlmPoints} MLM points
                              </p>
                            )}
                          </div>
                          <div className="text-right flex flex-col justify-center">
                            <p className="text-sm font-bold text-gray-900">
                              ${((item?.price || 0) * (item?.quantity || 1)).toFixed(2)}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              ${item?.price?.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                  {/* Shipping Information */}
                  {order?.shipping && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Shipping Address</h4>
                      <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <p className="font-semibold text-gray-900">{order.shipping.firstName} {order.shipping.lastName}</p>
                        <p className="mt-1">{order.shipping.address}</p>
                        <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
                        {order.shipping.phone && <p className="mt-1 flex items-center text-gray-500"><PhoneIcon className="h-3 w-3 mr-1" /> {order.shipping.phone}</p>}
                      </div>
                    </div>
                  )}

                  {/* Payment Information */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Payment Details</h4>
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500">Method</span>
                        <div className="flex items-center font-medium">
                          {order?.payment?.method === 'qr' ? (
                            <><QrCodeIcon className="h-4 w-4 mr-1 text-gray-400" /> QR Code</>
                          ) : order?.payment?.method === 'upi' ? (
                            <><DevicePhoneMobileIcon className="h-4 w-4 mr-1 text-gray-400" /> UPI</>
                          ) : (
                            order?.payment?.method || 'Not specified'
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Status</span>
                        <div className="flex items-center font-bold">
                          {getPaymentStatusIcon(order?.paymentStatus)}
                          <span className={`ml-1.5 ${order?.paymentStatus === 'Done' || order?.paymentStatus === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {order?.paymentStatus || 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MLM Points Earned */}
                {order?.mlmPointsEarned > 0 && (order?.shippingStatus || '').toLowerCase() !== 'cancelled' && (
                  <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 flex items-center shadow-sm">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <ArrowPathIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary-900">MLM Points Realized</h4>
                      <p className="text-xs text-primary-700">{order.mlmPointsEarned} points have been credited to your network balance.</p>
                    </div>
                  </div>
                )}

                {/* Order Actions */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <Link
                    to={`/user/${userId}/orders/${order._id}`}
                    className="btn btn-secondary btn-sm flex-1 sm:flex-none justify-center"
                  >
                    View Full Details
                  </Link>
                  {order?.shippingStatus?.toLowerCase() === 'delivered' && (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm flex-1 sm:flex-none justify-center"
                    >
                      Order Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow-soft">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-secondary-50 mb-6">
            <ShoppingBagIcon className="h-10 w-10 text-secondary-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No orders found</h3>
          <p className="mt-2 text-gray-500 max-w-xs mx-auto">
            {activeTab === 'all'
              ? "You haven't placed any orders yet. Start your journey today!"
              : `You don't have any orders with status "${activeTab}".`}
          </p>
          <div className="mt-8">
            <Link
              to={`/user/${userId}/shop`}
              className="btn btn-primary btn-lg px-8"
            >
              Go to Shop
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;