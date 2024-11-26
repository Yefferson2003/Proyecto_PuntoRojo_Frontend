// import Carousel from "@/components/about/Carousel";
// import Info from "@/components/about/Info";
// import Reviews from "@/components/about/Reviews";
// import ProductsOffer from "@/components/products/ProductsOffer";
// import React, { useEffect, useState } from "react";

import React, { Suspense, lazy } from 'react';

const Carousel = lazy(() => import('@/components/about/Carousel'));
const Info = lazy(() => import('@/components/about/Info'));
const Reviews = lazy(() => import('@/components/about/Reviews'));
const ProductsOffer = lazy(() => import('@/components/products/ProductsOffer'));


const HomeView: React.FC = () => {
  const images: string[] = [
    'Img_1.webp',
    'Img_2.webp',
    'Img_3.webp',
    'Img_4.webp',
    'Img_5.webp',
    'Img_6.webp'
  ];

  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        {images.length > 0 && (
          <Carousel 
            img1={images[0]} 
            img2={images[1]} 
            img3={images[2]} 
            img4={images[3]} 
            img5={images[4]} 
            img6={images[5]} 
          />
        )}

        <Info />
        <ProductsOffer />
        <Reviews />
      </Suspense>
    </section>
  );
}

export default HomeView;