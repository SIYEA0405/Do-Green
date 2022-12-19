import React, { ReactNode } from 'react';

interface IMyPageLayoutProps {
  children: ReactNode;
}
interface IMyPageBarLayoutProps {
  children: ReactNode;
}
interface IMyPageTabLayoutProps {
  children: ReactNode;
}
interface IMyPageTabLinkLayoutProps {
  children: ReactNode;
}
export const MyPageLayout = ({ children }: IMyPageLayoutProps) => {
  return <div className="container w-full flex lg:mt-[113.99px] mx-auto px-5">{children}</div>;
};

export const MyPageBarLayout = ({ children }: IMyPageBarLayoutProps) => {
  return <div className="container h-24 flex lg:hidden items-center mt-[113.99px] px-5">{children}</div>;
};

export const MyPageTabLayout = ({ children }: IMyPageTabLayoutProps) => {
  return (
    <div className="xl:w-80 lg:w-60 lg:block hidden ">
      <div className="lg:flex-col md:flex mt-20 rounded-lg bg-garden4/5 ">{children}</div>
    </div>
  );
};

export const MyPageTabLinkLayout = ({ children }: IMyPageTabLinkLayoutProps) => {
  return <div className="flex flex-col font-bold text-xl">{children}</div>;
};
