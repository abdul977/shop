import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { DescriptionSection } from './components/DescriptionSection';
import { ProductGallery } from './components/ProductGallery';
import { BuyNowSection } from './components/BuyNowSection';
import { CustomerReviews } from './components/CustomerReviews';
import { FooterBanner } from './components/FooterBanner';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

function App() {
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      image: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//full%20picture%20advertisements%20all.png",
      video: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//heropage.mp4",
      title: "Full Collection"
    },
    {
      image: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//smartwatch%20picture.png",
      video: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//smart%20watch%20video%20three.mp4",
      title: "Smart Watch"
    },
    {
      image: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//earbud%20picture.png",
      video: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//earbud%20video.mp4",
      title: "Wireless Earbuds"
    },
    {
      image: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//bag%20pack%20picture.png",
      video: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//bag%20pack%20video.mp4",
      title: "Premium Backpack"
    },
    {
      image: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//power%20bank%20picture.jpg",
      video: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//Apple_MagSafe_Battery_Powebank_Unboxing.mp4",
      title: "Power Bank"
    },
    {
      image: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//charger%20picture.jpg",
      video: "https://ttcapwgcfadajcoljuuk.supabase.co/storage/v1/object/public/Video//smart%20watch%20video%204.mp4",
      title: "Wireless Charger"
    }
  ];

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <DescriptionSection />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <ProductGallery products={products} />
          <BuyNowSection 
            quantity={quantity} 
            increaseQuantity={increaseQuantity} 
            decreaseQuantity={decreaseQuantity} 
          />
        </div>
      </div>
      <CustomerReviews />
      <FooterBanner />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default App;
