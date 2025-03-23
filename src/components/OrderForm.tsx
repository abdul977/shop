import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface OrderFormProps {
  onSubmit: (formData: OrderFormData) => void;
  onCancel: () => void;
  quantity?: number;
  isSubmitting?: boolean;
}

export interface OrderFormData {
  orderNumber: string;
  name: string;
  phoneNumber: string;
  alternativePhone: string;
  address: string;
  state: string;
  comments: string;
  quantity: number;
  totalPrice: number;
}

const PRICE_PER_UNIT = 57000;

const PRODUCT_DETAILS = `
• Premium SmartWatch with Heart Rate & BP Monitor
• High Quality Wireless Earbuds
• 10,000mAh Magnetic Power Bank
• Wireless Fast Charger
• Premium Backpack
• Bonus Accessories
`;

export const OrderForm: React.FC<OrderFormProps> = ({ 
  onSubmit, 
  onCancel, 
  quantity = 1, 
  isSubmitting = false 
}) => {
  const [formData, setFormData] = useState<Omit<OrderFormData, 'orderNumber' | 'totalPrice'>>({
    name: '',
    phoneNumber: '',
    alternativePhone: '',
    address: '',
    state: 'Abuja',
    comments: '',
    quantity: quantity
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = uuidv4();
    onSubmit({
      ...formData,
      orderNumber,
      totalPrice: formData.quantity * PRICE_PER_UNIT
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      <div className="mb-4 sm:mb-6 bg-red-50 border-2 border-red-500 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-1 order-2 sm:order-1">
            <h3 className="text-xl font-bold text-red-700 mb-3">🚨 Please Read Carefully!</h3>
            <p className="text-red-700 font-medium mb-3">
              We kindly request that you only place an order if you have a genuine intention to purchase. Non-serious orders have real consequences for our small business:
            </p>
            <ul className="list-disc ml-6 mb-4 text-red-700 space-y-2">
              <li>Each delivery attempt costs us fuel and driver time</li>
              <li>Products reserved for non-serious orders could have gone to genuine customers</li>
              <li>Our staff spends valuable time preparing and following up on orders</li>
            </ul>
            <div className="bg-white p-4 rounded-lg border border-red-300 mb-4">
              <p className="text-red-700 font-semibold text-center">
                If you're not ready to purchase now:
              </p>
              <ul className="list-none mt-2 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">📌</span>
                  <span className="text-red-700">Bookmark this page to return when ready</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">💬</span>
                  <span className="text-red-700">Contact us on WhatsApp (+234-814-449-3361) for future delivery</span>
                </li>
              </ul>
            </div>
          </div>
          <img 
            src="https://thumbs.dreamstime.com/z/cartoon-office-worker-begging-his-job-isolated-42117823.jpg"
            alt="Please consider our request"
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-lg mx-auto order-1 sm:order-2"
          />
        </div>
        <p className="mt-2 text-red-700 font-medium border-t border-red-300 pt-3">
          Abuja customers: Same-day delivery available (delivery time varies by location)
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 sm:mb-6 bg-blue-50 p-3 sm:p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-bold text-blue-800 mb-2">🎁 Package Contents:</h3>
          <pre className="whitespace-pre-wrap text-blue-800">{PRODUCT_DETAILS}</pre>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2">Alternative Phone Number</label>
          <input
            type="tel"
            name="alternativePhone"
            value={formData.alternativePhone}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2">Delivery Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          >
            <option value="Abuja">Abuja</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1 sm:mb-2">Order Comments (Optional)</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <p className="font-medium mb-2">Order Summary:</p>
          <div className="bg-gray-50 p-4 rounded-md">
            <p>Quantity: {quantity}</p>
            <p>Price per unit: ₦{PRICE_PER_UNIT.toLocaleString()}</p>
            <p className="font-bold text-lg mt-2">Total: ₦{(quantity * PRICE_PER_UNIT).toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-gray-600 mb-4">
          <input 
            type="checkbox" 
            required 
            className="mt-1 w-4 h-4"
            disabled={isSubmitting}
          />
          <label>I confirm that I will be available to receive and pay for my package</label>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/2 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white py-3 rounded-md font-bold text-sm sm:text-base"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-md font-bold hover:opacity-90 active:opacity-100 transition-opacity text-sm sm:text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Submit Order'}
          </button>
        </div>
      </form>
    </div>
  );
};
