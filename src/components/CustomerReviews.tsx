import React from 'react';
import { Star } from 'lucide-react';

export const CustomerReviews = () => {
  const reviews = [
    {
      name: "Oluwaseun A.",
      rating: 5,
      comment: "Absolutely love this combo! The backpack is spacious and stylish, and the earbuds have amazing sound quality. Great value for money.",
      date: "2 days ago"
    },
    {
      name: "Chioma M.",
      rating: 5,
      comment: "The smartwatch is fantastic - accurate fitness tracking and the battery lasts for days. The power bank has saved me multiple times already!",
      date: "1 week ago"
    },
    {
      name: "Adebayo K.",
      rating: 4,
      comment: "Everything in this package exceeded my expectations except the wireless charger which is a bit slow. Still, amazing deal overall!",
      date: "2 weeks ago"
    }
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium text-lg">{review.name}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 px-6 border border-blue-600 rounded-md">
            View All 256 Reviews
          </button>
        </div>
      </div>
    </div>
  );
};
