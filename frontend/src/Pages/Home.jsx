import React from 'react';
import Slider from '../components/Home/Slider';
import Categories from '../components/Home/Categories';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import Banner from '../components/Home/Banner';
import MostLiked from '../components/Home/MostLiked';
import VendorStories from '../components/Home/VendorStories';

function Home() {
  return (
    <div>
      <Slider />
      <Categories />
      <FeaturedProducts />
      <Banner />
      <MostLiked />
      <VendorStories />
    </div>
  );
}

export default Home;
