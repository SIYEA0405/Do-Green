import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../util/api';
import { useMutation } from '@tanstack/react-query';
import createUrl from '../../hooks/useImage';

export default function CategoryForm() {
  const mascotNameRef = useRef(null);
  const categoryRef = useRef(null);
  const [convertImgUrl, setConvertImgUrl] = useState('');

  const mutation = useMutation((data) => api.post('/category/create', data));

  const handleSubmit = (event) => {
    const formData = {
      mascotName: mascotNameRef.current.value,
      categoryName: categoryRef.current.value,
      mascotImage: convertImgUrl,
    };

    confirm(`${formData.mascotName} 카테고리를 저장하시겠습니까?`) ? mutation.mutate(formData) : event.preventDefault();
  };
  const [priewImg, setPriewImg] = useState(
    'https://user-images.githubusercontent.com/91370858/208048148-47028f2f-d283-4ab1-a43e-3c073543161e.png',
  );
  const {
    mutate: imgUrlMutation,
    data: imgUrlData,
    isError: imgUrlError,
    isSuccess: imgSuccess,
    error: imgError,
  } = createUrl();

  useEffect(() => {
    setConvertImgUrl(imgUrlData);
  }, [imgUrlData]);

  const setConvertImage = async (imgUrl: FileList) => {
    if (imgUrl && imgUrl.length > 0) {
      const file = imgUrl?.[0];
      setPriewImg(URL.createObjectURL(file));
      imgUrlMutation(file);
    }
  };
  return (
    <form className="flex flex-row px-7 py-3 justify-between items-center" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center flex-col w-[40%] h-full">
        <label className="w-[40%]" htmlFor="categoryImg">
          <img className="cursor-pointer" alt="categoryImage" src={priewImg} />
        </label>
        <input
          id="categoryImg"
          onChange={(event) => {
            setConvertImage(event.target.files);
          }}
          type="file"
          placeholder="마스코트 이미지를 넣어주세요"
          className="w-[70%] cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
        />
      </div>
      <div className="flex justify-between flex-col w-[60%]">
        <label className="flex text-sm" htmlFor="categoryMascotNameInput">
          Mascot Name
        </label>
        <input
          ref={mascotNameRef}
          id="categoryMascotNameInput"
          type="text"
          placeholder="마스코트 이름을 적어주세요"
          required
          className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <label className="flex text-sm" htmlFor="categoryNameInput">
          Category Name
        </label>
        <input
          ref={categoryRef}
          id="categoryNameInput"
          type="text"
          placeholder="카테고리 이름을 적어주세요"
          required
          className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />

        <button
          type="submit"
          className="p-2.5 rounded-md justify-center border-2 border-garden4 hover:bg-garden4 hover:text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
