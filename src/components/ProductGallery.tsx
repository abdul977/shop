import React from 'react';
import { ProductCard } from './ProductCard';

interface ProductGalleryProps {
  products: {
    image: string;
    video: string;
    title: string;
  }[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ products }) => {
  return (
    <div className="bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Product Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
