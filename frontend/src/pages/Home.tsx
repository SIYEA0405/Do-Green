import React from 'react';
import CardsList from '../components/homepage/CardsList';
import MainTopCards from '../components/structure/MainTopCards';
import { ToTopButton } from '../components/structure/ScrollToTop';
function Home() {
  return (
    <>
      <div className="w-full min-h-screen grid grid-cols-10 grid-rows-6">
        <div className="grid mt-[106.77px] mb-[92px] col-span-full row-span-6 sm:mb-[72px]">
          <MainTopCards />
          <CardsList />
        </div>
      </div>
      <ToTopButton />
    </>
  );
}
export default Home;
