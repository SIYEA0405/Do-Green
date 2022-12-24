import { api } from '../util/api';
import { useQuery } from '@tanstack/react-query';

export interface ICategory {
  _id: string;
  categoryName: string;
  mascotName: string;
  mascotImage: URL;
  posts: string[];
  __v: number;
}

export default function useCategory() {
  const catQuery = useQuery<ICategory[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      return api.get('/category').then((res) => res.data);
    },
    staleTime: 1000 * 60 * 5,
  });

  return { catQuery };
}
