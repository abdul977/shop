import React from 'react';
import { Shield, Star, Package } from 'lucide-react';

export const DescriptionSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-xl mb-12 text-center">
            <p className="text-xl font-bold mb-4">🚨 FLASH SALE ENDS IN:</p>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {['01', '00', '59', '00'].map((value, index) => (
                <div key={index} className="bg-black/30 rounded-lg p-3">
                  <div className="text-2xl font-bold mb-1">{value}</div>
                  <div className="text-xs">{['Days', 'Hours', 'Minutes', 'Seconds'][index]}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-yellow-300 font-medium">⚡ Only 23 pieces left in stock!</p>
          </div>

          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Premium Quality</h2>
            <p className="text-lg text-gray-600 mb-8">
              The Muahib Festival Mega Combo brings together six premium products, carefully selected to enhance your daily life. Each item is crafted with attention to detail and designed for maximum functionality.
            </p>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">What's Included in Your Package:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Premium Smart Watch
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Wireless Earbuds
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Luxury Backpack
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Power Bank
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Wireless Charger
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Premium Accessories
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">Highest grade materials and craftsmanship</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Satisfaction Guaranteed</h3>
                <p className="text-gray-600">30-day money-back guarantee</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Complete Package</h3>
                <p className="text-gray-600">Everything you need in one box</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
