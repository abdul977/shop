import React, { useState, useEffect } from 'react';
import { Shield, Star, Package } from 'lucide-react';

type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';

interface TimeLeft {
  [key: string]: number | undefined;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export const DescriptionSection = () => {
  const timeUnits: TimeUnit[] = ['days', 'hours', 'minutes', 'seconds'];
  const timeLabels = ['Days', 'Hours', 'Minutes', 'Seconds'];

  // Set target date once when component mounts
  const targetDate = React.useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  }, []);

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <article className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto" itemScope itemType="https://schema.org/Product">
          <section className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-xl mb-12 text-center" aria-label="Limited Time Offer">
            <h1 className="text-xl font-bold mb-4">🚨 FLASH SALE ENDS IN:</h1>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {timeUnits.map((interval, index) => (
                <div key={index} className="bg-black/30 rounded-lg p-3">
                  <div className="text-2xl font-bold mb-1">
                    {timeLeft[interval] !== undefined ? timeLeft[interval] : '00'}
                  </div>
                  <div className="text-xs">{timeLabels[index]}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-yellow-300 font-medium" aria-live="polite">⚡ Only 23 pieces left in stock!</p>
          </section>

          <section className="text-center" itemProp="description">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" itemProp="name">Experience Premium Quality</h2>
            <p className="text-lg text-gray-600 mb-8" itemProp="description">
              The Muahib Festival Mega Combo brings together six premium products, carefully selected to enhance your daily life. Each item is crafted with attention to detail and designed for maximum functionality.
            </p>

            <section className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">What's Included in Your Package:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left" itemProp="includesObject" itemScope itemType="https://schema.org/ItemList">
                <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/Product">
                  <span className="text-green-500 mr-2" aria-hidden="true">✓</span>
                  <span itemProp="name">Premium Smart Watch</span>
                </li>
                <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/Product">
                  <span className="text-green-500 mr-2" aria-hidden="true">✓</span>
                  <span itemProp="name">Wireless Earbuds</span>
                </li>
                <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/Product">
                  <span className="text-green-500 mr-2" aria-hidden="true">✓</span>
                  <span itemProp="name">Luxury Backpack</span>
                </li>
                <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/Product">
                  <span className="text-green-500 mr-2" aria-hidden="true">✓</span>
                  <span itemProp="name">Power Bank</span>
                </li>
                <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/Product">
                  <span className="text-green-500 mr-2" aria-hidden="true">✓</span>
                  <span itemProp="name">Wireless Charger</span>
                </li>
                <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/Product">
                  <span className="text-green-500 mr-2" aria-hidden="true">✓</span>
                  <span itemProp="name">Premium Accessories</span>
                </li>
              </ul>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8" aria-label="Product Features">
              <article className="text-center" itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2" itemProp="name">Premium Quality</h3>
                <p className="text-gray-600" itemProp="value">Highest grade materials and craftsmanship</p>
              </article>
              <article className="text-center" itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2" itemProp="name">Satisfaction Guaranteed</h3>
                <p className="text-gray-600" itemProp="value">30-day money-back guarantee</p>
              </article>
              <article className="text-center" itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2" itemProp="name">Complete Package</h3>
                <p className="text-gray-600" itemProp="value">Everything you need in one box</p>
              </article>
            </section>
          </section>
        </div>
      </div>
    </article>
  );
};
