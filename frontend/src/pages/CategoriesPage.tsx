import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CardLayout, CategoryLayout } from '../components/layout/GlobalLayout';
import CardSkeleton from '../components/loadings/CardSkeleton';
import { CardType, TextType, BtnType, WrapperType } from '../components/common/theme';
import useCategory, { ICategory } from '../hooks/useCategory';
import { useSubscription } from '../hooks/useSubscription';
import { checkName } from '../util/functionUtil';
import Modal from '../components/Modal';
import { AiOutlineClose } from 'react-icons/ai';

interface ISubscriptionInfo {
  categoryId: string;
  categoryName: string;
  subStatus: boolean;
}
export const CategoriesPage = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [subStatus, setSubStatus] = useState<string>('구독하기 ✅');
  // const [categoryName, setCategoryName] = useState<string>('');
  // const [categoryId, setCategoryId] = useState<string>('');
  const [subInfo, setSubInfo] = useState<ISubscriptionInfo[]>([]);
  const [newSubInfo, setNewSubInfo] = useState<ISubscriptionInfo>({
    categoryId: '',
    categoryName: '',
    subStatus: false,
  });

  const {
    catQuery: { isLoading, data: categories },
  } = useCategory();

  const { subMutation } = useSubscription(newSubInfo.categoryId as string);
  const handleSubButton = (category: ICategory) => {
    console.log('111', category._id, category.categoryName);
    setNewSubInfo((prev) => ({ categoryId: category._id, categoryName: category.categoryName, subStatus: true }));
    setIsModal(!isModal);
    console.log('222', newSubInfo);
  }; //비동기라서 바로 업데이트안되고 새로 리렌더링해줘야함 바로 보여줄거면 useRef
  const applySubscription = () => {
    setSubInfo([...subInfo, newSubInfo]);
    console.log('newSubInfo', newSubInfo.categoryId);
    console.log('subInfo', subInfo);
    subMutation.mutate();
    // setSubStatus('구독중 ✅');
    //card list 만들어서 카테고리 id
    //리액트 쿼리
    // 하나는 객체로 만들어서 key 값
    setIsModal(!isModal);
  };
  const handleSubStatus = (id: string) => {
    subInfo.map((e) => {
      e.categoryId = id;
      setSubStatus('구독중');
    });
  };
  const skeletonCards = Array(15).fill(0);
  return (
    <CategoryLayout>
      <CardLayout>
        <div className={TextType.titleText}>{'See all the Greens!'} &nbsp;</div>
        <div className={TextType.introduceText}>
          {'관심있는 토픽에 대한 뉴스레터를 둘러보거나 구독해보아요!'} &nbsp;
        </div>
        <div className={WrapperType.cardContentsWrapper}>
          <ul className={WrapperType.cardListWrapper}>
            {isLoading &&
              skeletonCards.map((e, i) => (
                <li className={CardType.size} key={`{skeleton-${i}}`}>
                  <CardSkeleton />
                </li>
              ))}
            {categories &&
              categories.map((category, idx) => (
                <li className={CardType.size + CardType.flipContent} key={category._id}>
                  <div key={`back-${category._id}`} className={CardType.layout + CardType.back}>
                    <button type="button" className={BtnType.newsLetterBtn}>
                      {' '}
                      <Link to={`/categories/${category.categoryName}`}>뉴스레터 📰</Link>
                    </button>
                    <button
                      type="button"
                      className={subStatus === '구독하기 ✅' ? BtnType.subscribeBtn : BtnType.subscribingBtn}
                      data-id={category._id}
                      id={category._id}
                      disabled={subStatus !== '구독하기 ✅' ? true : false}
                      onClick={() => {
                        handleSubButton(category);
                        // handleSubStatus(category._id);
                      }}
                    >
                      {subInfo[idx]?.subStatus === true ? '구독중' : '구독하기 '}
                    </button>
                  </div>
                  <div key={`front-${category._id}`} className={CardType.layout + CardType.front}>
                    <div className={CardType.imgWrapper}>
                      <img className={CardType.img} src={category.mascotImage} alt="default card" />
                    </div>
                    <div className={CardType.text}>
                      <h2>
                        <span className={TextType.mascotNameText}>{checkName(category.mascotName)}</span> 전하는{' '}
                        <br></br>
                        <span className={TextType.categoryNameText}>{category.categoryName}</span>
                      </h2>
                    </div>
                  </div>
                </li>
              ))}
            {isModal && categories && (
              <Modal
                onClose={() => {
                  setIsModal(!isModal);
                }}
              >
                <div className="relative w-full h-full max-w-md md:h-auto">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      data-modal-toggle="popup-modal"
                      onClick={() => {
                        setIsModal(!isModal);
                      }}
                    >
                      <AiOutlineClose size="24" />
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-16 py-8 text-center">
                      <h3 className="mt-5 mb-8 text-xl font-bold text-gray-500 dark:text-gray-400">
                        <span className={TextType.categoryNameText}>{newSubInfo.categoryName}</span> <br></br>토픽을
                        구독하시겠습니까?
                      </h3>
                      <button
                        data-modal-toggle="popup-modal"
                        type="button"
                        className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-400 font-medium rounded-lg text-lg inline-flex items-center px-5 py-2.5 text-center mr-2"
                        onClick={() => applySubscription()}
                      >
                        네
                      </button>
                      <button
                        data-modal-toggle="popup-modal"
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-lg font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        onClick={() => {
                          setIsModal(!isModal);
                        }}
                      >
                        아니요
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </ul>
        </div>
      </CardLayout>
    </CategoryLayout>
  );
};
