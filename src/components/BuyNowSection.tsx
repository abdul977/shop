import React, { useState } from 'react';
import { ShoppingCart, Truck, Shield } from 'lucide-react';
import { OrderForm, OrderFormData } from './OrderForm';
import { sendPurchaseEvent } from '../utils/facebookApi';

interface BuyNowSectionProps {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

const PRODUCT_DETAILS = `• Premium SmartWatch with Heart Rate & BP Monitor
• High Quality Wireless Earbuds
• 10,000mAh Magnetic Power Bank
• Wireless Fast Charger
• Premium Backpack
• Bonus Accessories`;

export const BuyNowSection: React.FC<BuyNowSectionProps> = ({ quantity, increaseQuantity, decreaseQuantity }) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: OrderFormData) => {
    setIsSubmitting(true);
    try {
      // Send purchase event to Facebook (both client and server-side)
      fbq('track', 'Purchase', {
        currency: 'NGN',
        value: formData.totalPrice
      });
      await sendPurchaseEvent(
        formData.phoneNumber,
        formData.totalPrice
      );

      const whatsappMessage = `🎫 Order Number: ${formData.orderNumber}

👤 Customer Details:
   - Name: ${formData.name}
   - Phone: ${formData.phoneNumber}
   - Alt Phone: ${formData.alternativePhone || 'N/A'}
   - Address: ${formData.address}
   - State: ${formData.state}

📦 Order Details:
   - Product: Muahib Festival Mega Combo Deal
   ${PRODUCT_DETAILS.split('\n').map(item => '   ' + item).join('\n')}
   - Quantity: ${formData.quantity}
   - Price Per Unit: ₦57,000
   - Total Price: ₦${formData.totalPrice.toLocaleString()}

💬 Additional Comments: ${formData.comments || 'None'}

✅ Pay on Delivery: Confirmed
📍 Same-day delivery available in Abuja (delivery time depends on distance)
🎉 Thank you for your order!`;

      window.open(`https://wa.me/+2348144493361?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setIsSubmitting(false);
      setShowOrderForm(false);
    }
  };

  const handleCancel = () => {
    setShowOrderForm(false);
  };

  return (
    <div className="lg:w-1/2">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 sticky top-4">
        <h2 className="text-3xl font-bold mb-2">Muahib Festival Mega Combo</h2>
        <div className="flex items-center mb-4">
          <p className="text-3xl font-bold text-blue-600 mr-3">₦57,000</p>
          <p className="text-lg line-through text-gray-500 mr-3">₦110,000</p>
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">50% OFF</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Truck className="h-4 w-4 mr-1" />
          <span className="mr-4">Free Delivery</span>
          <Shield className="h-4 w-4 mr-1" />
          <span>1 Year Warranty</span>
        </div>

        <div className="mb-6">
          <p className="font-medium mb-2">Quantity:</p>
          <div className="flex items-center">
            <button 
              onClick={decreaseQuantity}
              className="bg-gray-200 px-3 py-1 rounded-l-md hover:bg-gray-300"
              disabled={isSubmitting}
            >
              -
            </button>
            <span className="bg-gray-100 px-6 py-1">{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className="bg-gray-200 px-3 py-1 rounded-r-md hover:bg-gray-300"
              disabled={isSubmitting}
            >
              +
            </button>
          </div>
        </div>

        <button 
          onClick={() => setShowOrderForm(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium flex items-center justify-center mb-4"
          disabled={isSubmitting}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {isSubmitting ? 'Processing...' : 'Buy Now'}
        </button>
        
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <p className="text-green-800 font-medium">Limited Time Offer! Only 23 combos left in stock.</p>
        </div>

        <div className="space-y-4">
          <div className="flex">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Free Delivery</p>
              <p className="text-sm text-gray-600">Same-day delivery in Abuja</p>
            </div>
          </div>
          <div className="flex">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Payment on Delivery</p>
              <p className="text-sm text-gray-600">Cash, UPI, or card payment options</p>
            </div>
          </div>
        </div>
      </div>

      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <OrderForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              quantity={quantity}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
    </div>
  );
};
