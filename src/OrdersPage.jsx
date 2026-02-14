import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
        // Auto-refresh every 5 seconds
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`);
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, {
                status: newStatus
            });

            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));

            const message = newStatus === 'accepted' ? '✅ Order Accepted!' : '❌ Order Rejected';
            alert(message);
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to update order status');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-yellow-600',
            accepted: 'bg-gradient-to-r from-green-400 to-green-500 text-green-900 border-green-600',
            rejected: 'bg-gradient-to-r from-red-400 to-red-500 text-red-900 border-red-600'
        };

        const icons = {
            pending: '⏳',
            accepted: '✓',
            rejected: '✗'
        };

        const labels = {
            pending: 'Preparing',
            accepted: 'Completed',
            rejected: 'Canceled'
        };

        return (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm md:text-base font-bold border-2 ${styles[status]} shadow-lg`}>
                <span className="text-lg md:text-xl">{icons[status]}</span>
                {labels[status]}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <div className="text-2xl font-bold text-gray-700">Loading orders...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="text-4xl md:text-6xl">📦</span>
                        Order Management
                    </h1>
                    <div className="bg-white px-6 py-3 rounded-2xl shadow-lg border-2 border-indigo-200">
                        <p className="text-gray-500 text-sm font-semibold">Total Orders</p>
                        <p className="text-3xl font-bold text-indigo-600">{orders.length}</p>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            {orders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-2xl p-12 md:p-20 text-center border-2 border-gray-200">
                    <span className="text-6xl md:text-8xl mb-6 block">📭</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
                    <p className="text-gray-600 text-base md:text-xl">Orders will appear here when customers place them</p>
                </div>
            ) : (
                <div className="space-y-6 md:space-y-8">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {/* Order Header */}
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 md:px-8 py-4 md:py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <p className="text-white text-sm md:text-base font-semibold mb-1">
                                        ID: #{order._id.slice(-6).toUpperCase()}
                                    </p>
                                    <p className="text-blue-100 text-xs md:text-sm">
                                        {new Date(order.orderTime).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                {getStatusBadge(order.status)}
                            </div>

                            {/* Order Body */}
                            <div className="p-6 md:p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                                    {/* Customer Info */}
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                                        <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800 border-b-2 border-blue-300 pb-2">
                                            CUSTOMER
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-lg md:text-xl">
                                                    {order.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 text-base md:text-lg">{order.username}</p>
                                                    <p className="text-gray-600 text-xs md:text-sm">{order.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
                                            ITEMS
                                        </h3>
                                        <div className="space-y-3">
                                            {order.foods.map((food, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-6 h-6 md:w-8 md:h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm">
                                                            {food.quantity}x
                                                        </span>
                                                        <span className="font-semibold text-gray-800 text-sm md:text-base">{food.name}</span>
                                                    </div>
                                                    <span className="font-bold text-indigo-600 text-sm md:text-base">₹{food.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t-2 border-gray-300">
                                            <div className="flex justify-between items-center">
                                                <span className="text-base md:text-lg font-bold text-gray-800">Total Amount</span>
                                                <span className="text-2xl md:text-3xl font-bold text-red-600">₹{order.totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Update Status */}
                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-300">
                                        <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-400 pb-2">
                                            UPDATE STATUS
                                        </h3>
                                        {order.status === 'pending' ? (
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-center gap-2 mb-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3">
                                                    <span className="text-3xl">⏱</span>
                                                    <span className="text-yellow-700 font-bold text-lg">Pending Order</span>
                                                </div>
                                                <button
                                                    onClick={() => handleStatusUpdate(order._id, 'accepted')}
                                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 md:py-4 rounded-xl text-base md:text-lg font-bold shadow-lg transform transition hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                                                >
                                                    <span className="text-xl">✓</span>
                                                    Mark as Completed
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(order._id, 'rejected')}
                                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 md:py-4 rounded-xl text-base md:text-lg font-bold shadow-lg transform transition hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                                                >
                                                    <span className="text-xl">✗</span>
                                                    Mark as Canceled
                                                </button>
                                            </div>
                                        ) : order.status === 'accepted' ? (
                                            <div className="text-center py-8">
                                                <div className="inline-flex items-center gap-3 bg-green-50 border-2 border-green-400 rounded-xl px-6 py-4">
                                                    <span className="text-4xl">✓</span>
                                                    <div className="text-left">
                                                        <p className="text-green-700 font-bold text-lg">Completed</p>
                                                        <p className="text-green-600 text-sm">Order delivered successfully</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <div className="inline-flex items-center gap-3 bg-red-50 border-2 border-red-400 rounded-xl px-6 py-4">
                                                    <span className="text-4xl">✗</span>
                                                    <div className="text-left">
                                                        <p className="text-red-700 font-bold text-lg">Canceled</p>
                                                        <p className="text-red-600 text-sm">Order was canceled</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Auto-refresh Note */}
            {orders.length > 0 && (
                <div className="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 border-l-4 border-indigo-500 p-4 md:p-6 rounded-xl shadow-lg">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">ℹ️</span>
                        <div>
                            <p className="text-indigo-900 font-semibold text-sm md:text-base">Auto-refresh enabled</p>
                            <p className="text-indigo-700 text-xs md:text-sm mt-1">
                                This page automatically refreshes every 5 seconds to show the latest orders.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
