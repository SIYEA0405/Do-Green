import { useQuery, useInfiniteQuery, useQueryClient, useMutation, InfiniteData } from '@tanstack/react-query';
import { api } from '../util/api';

export interface IPost {
  _id: string;
  content: string;
  imageList: string[];
  createdAt: string;
  updatedAt: string;
  likesNum: number;
  isLike: boolean;
}
interface IPage {
  nextPage: number;
  result: IPost[];
  totalPage: number;
}

export default function usePost(catId?: string) {
  const queryClient = useQueryClient();

  const postQuery = useInfiniteQuery({
    queryKey: ['posts', catId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(`/post/posts/?categoryId=${catId}&page=${pageParam}&perPage=5`);
      const { result, totalPage } = res.data;
      return { nextPage: pageParam + 1, result, totalPage };
    },
    getNextPageParam: (lastPage) => (lastPage.nextPage <= lastPage.totalPage ? lastPage.nextPage : undefined),
  });

  const addLike = useMutation({
    mutationFn: async (newPost: IPost) => {
      await api.get(`/post/like/${newPost._id}`);
    },
    onMutate: async (newPost: IPost) => {
      //
      //
      console.log('믿고있다구!!!');
      await queryClient.cancelQueries({ queryKey: ['posts', catId] });
      const previousData = queryClient.getQueryData(['posts', catId]);
      queryClient.setQueryData<InfiniteData<IPage>>(['posts', catId], (oldData) => ({
        ...oldData!,
        pages: oldData!.pages.map((page) => ({
          ...page,
          result: page.result.map((post) => (post._id === newPost._id ? newPost : post)),
        })),
      }));
      return { previousData };
    },
    onError: (err, newPost, context) => {
      //
      //
      console.log(err);
      queryClient.setQueryData(['posts'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', catId] });
      console.log('좋아요 통신 성공!');
    },
  });

  return { postQuery, addLike };
}
