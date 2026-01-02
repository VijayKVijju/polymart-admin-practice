

/*
const InquiryManagement = () => {
  return <h2>Inquiry Management Page</h2>;
};

export default InquiryManagement;
*/

//-------------------------------
import React, { useState, useEffect } from 'react';
import { Search, X, Package, Calendar, User, MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch inquiries from backend
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      // Update this URL to match your backend API endpoint
      const response = await fetch('http://localhost:5000/api/admin/buyer-inquiries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch inquiries');
      }

      const data = await response.json();
      // Handle different response structures
      const inquiriesData = data.inquiries || data.data || data;
      setInquiries(Array.isArray(inquiriesData) ? inquiriesData : []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      alert('Failed to fetch inquiries from database. Please check your backend connection.');
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedInquiry(null);
  };

  const updateInquiryStatus = async (inquiryId, status, remark = '') => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/buyer-inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status, adminRemark: remark })
      });

      if (!response.ok) {
        throw new Error('Failed to update inquiry');
      }

      // Refresh inquiries after update
      await fetchInquiries();
      closeModal();
      alert(`Inquiry ${status} successfully!`);
    } catch (error) {
      console.error('Error updating inquiry:', error);
      alert('Failed to update inquiry. Please try again.');
    }
  };

  const handleApprove = () => {
    const remark = prompt('Enter approval remark (optional):');
    if (remark !== null) {
      updateInquiryStatus(selectedInquiry._id, 'approved', remark || 'Approved by admin');
    }
  };

  const handleReject = () => {
    const remark = prompt('Enter rejection reason:');
    if (remark) {
      updateInquiryStatus(selectedInquiry._id, 'rejected', remark);
    } else {
      alert('Please provide a rejection reason');
    }
  };

  const handleComplete = () => {
    if (window.confirm('Mark this inquiry as completed?')) {
      updateInquiryStatus(selectedInquiry._id, 'completed', 'Order completed');
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => 
    inquiry._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.listingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.buyerId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeInquiries = filteredInquiries.filter(inq => 
    inq.status === 'pending' || inq.status === 'approved'
  );
  
  const completedInquiries = filteredInquiries.filter(inq => 
    inq.status === 'rejected' || inq.status === 'completed'
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
      completed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon size={14} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const InquiryCard = ({ inquiry }) => (
    <div 
      onClick={() => handleCardClick(inquiry)}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-900">HDPE 7000F</h3>
        <span className="text-xl font-bold text-blue-600">{inquiry.quantity} MT</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">Polyethylene / Film Grade</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">₹{inquiry.pricePerKg}/kg</span>
        {getStatusBadge(inquiry.status)}
      </div>
    </div>
  );

  const Modal = ({ inquiry, onClose }) => {
    if (!inquiry) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Inquiry Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Status */}
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-600 font-medium">Status</span>
              {getStatusBadge(inquiry.status)}
            </div>

            {/* Inquiry ID */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">Inquiry ID</label>
                <p className="text-gray-900 font-mono text-sm bg-gray-50 p-2 rounded">{inquiry._id}</p>
              </div>
            </div>

            {/* Listing & Buyer IDs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Listing ID</label>
                <p className="text-gray-900 font-mono text-sm bg-gray-50 p-2 rounded truncate">{inquiry.listingId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Buyer ID</label>
                <p className="text-gray-900 font-mono text-sm bg-gray-50 p-2 rounded truncate">{inquiry.buyerId}</p>
              </div>
            </div>

            {/* Quantity & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">Quantity</label>
                <p className="text-2xl font-bold text-blue-600">{inquiry.quantity} MT</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-600 mb-1">Price per Kg</label>
                <p className="text-2xl font-bold text-green-600">₹{inquiry.pricePerKg}</p>
              </div>
            </div>

            {/* Admin Remark */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                <MessageSquare size={16} />
                Admin Remark
              </label>
              <div className="bg-gray-50 p-4 rounded-lg min-h-[80px]">
                <p className="text-gray-900">
                  {inquiry.adminRemark || 'No remarks added yet'}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                  <Calendar size={16} />
                  Created At
                </label>
                <p className="text-gray-900">{formatDate(inquiry.createdAt)}</p>
                <p className="text-xs text-gray-500">{new Date(inquiry.createdAt).toLocaleTimeString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                  <Calendar size={16} />
                  Updated At
                </label>
                <p className="text-gray-900">{formatDate(inquiry.updatedAt)}</p>
                <p className="text-xs text-gray-500">{new Date(inquiry.updatedAt).toLocaleTimeString()}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              {inquiry.status === 'pending' && (
                <>
                  <button 
                    onClick={handleApprove}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Approve Inquiry
                  </button>
                  <button 
                    onClick={handleReject}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Reject Inquiry
                  </button>
                </>
              )}
              {inquiry.status === 'approved' && (
                <button 
                  onClick={handleComplete}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-blue-600">Inquiry Management</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by Inquiry id, seller id..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Active Inquiries */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Inquiries</h2>
              {activeInquiries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeInquiries.map((inquiry) => (
                    <InquiryCard key={inquiry._id} inquiry={inquiry} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No active inquiries found</p>
              )}
            </div>

            {/* Completed Inquiries */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Inquiries</h2>
              {completedInquiries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedInquiries.map((inquiry) => (
                    <InquiryCard key={inquiry._id} inquiry={inquiry} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No completed inquiries found</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && <Modal inquiry={selectedInquiry} onClose={closeModal} />}
    </div>
  );
};

export default InquiryManagement;