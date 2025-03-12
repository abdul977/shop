import React, { useState } from 'react';
import { OrderForm, OrderFormData } from './OrderForm';

const PRODUCT_DETAILS = `• Premium SmartWatch with Heart Rate & BP Monitor
• High Quality Wireless Earbuds
• 10,000mAh Magnetic Power Bank
• Wireless Fast Charger
• Premium Backpack
• Bonus Accessories`;

export const FooterBanner = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleWhatsAppMessage = () => {
    const whatsappMessage = `🎯 I'm interested in the Muahib Festival Mega Combo Deal!

📦 Product Details:
${PRODUCT_DETAILS}

💰 Special Offer Price: ₦55,000
🚚 Free Delivery Included

Please provide more information about ordering. Thank you!`;

    window.open(`https://wa.me/+2348144493361?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const handleSubmit = (formData: OrderFormData) => {
    const whatsappMessage = `🎫 Order Number: ${formData.orderNumber}

👤 Customer Details:
   - Name: ${formData.name}
   - Phone: ${formData.phoneNumber}
   - Alt Phone: ${formData.alternativePhone || 'N/A'}
   - Address: ${formData.address}
   - City: ${formData.city}
   - State: ${formData.state}

📦 Order Details:
   - Product: Muahib Festival Mega Combo Deal
   ${PRODUCT_DETAILS.split('\n').map(item => '   ' + item).join('\n')}
   - Quantity: ${formData.quantity}
   - Price Per Unit: ₦55,000
   - Total Price: ₦${formData.totalPrice.toLocaleString()}

💬 Additional Comments: ${formData.comments || 'None'}

✅ Pay on Delivery: Confirmed
📍 Same-day delivery available in Abuja (delivery time depends on distance)
🎉 Thank you for your order!`;

    window.open(`https://wa.me/+2348144493361?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    setIsFormVisible(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Limited Time Muahib Festival Offer!</h2>
        <p className="text-lg mb-6">Get this exclusive 6-product combo at 50% OFF with Free Delivery</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-md transition-colors"
          >
            Buy Now at ₦55,000
          </button>
          <button
            onClick={handleWhatsAppMessage}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-8 rounded-md transition-colors flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Message on WhatsApp
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <OrderForm
              onSubmit={handleSubmit}
              onClose={() => setIsFormVisible(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
