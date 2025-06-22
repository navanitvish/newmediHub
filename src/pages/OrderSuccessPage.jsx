"use client"
import { useNavigate, useLocation } from "react-router-dom"
import { CheckCircle, ArrowLeft, Download } from "lucide-react"

const OrderSuccessPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Get order data from location state or URL params
  const orderData = location.state?.orderData
  const urlParams = new URLSearchParams(location.search)
  const orderId = orderData?.orderId || urlParams.get("orderId")

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Thank you for your order. We'll process it shortly.</p>
        </div>

        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="font-mono text-lg font-semibold text-gray-800">{orderId}</p>
          </div>
        )}

        {orderData && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Order Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-medium">
                  {orderData.customer?.firstName} {orderData.customer?.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{orderData.customer?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{orderData.customer?.phone}</span>
              </div>
              {orderData.appointment && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Appointment Date:</span>
                    <span className="font-medium">{orderData.appointment.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Slot:</span>
                    <span className="font-medium">{orderData.appointment.timeSlot}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-bold text-lg">₹{orderData.payment?.amount}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 mb-2">What's Next?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• You'll receive a confirmation email shortly</li>
              <li>• Our team will contact you to confirm your appointment</li>
              <li>• Lab technician will visit at your scheduled time</li>
              <li>• Reports will be available within 24-48 hours</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50"
          >
            <Download size={16} className="mr-2" />
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage
