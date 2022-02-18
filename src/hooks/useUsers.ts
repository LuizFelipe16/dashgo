import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    }
  });

  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  });

  return {
    users,
    totalCount
  };
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    // o primeiro param é a chave de identificação, ela precisa alterar com a page, se 
    // não, ele não muda as informações em tela, por isso usamos a chave composta;
    staleTime: 1000 * 60 * 10, // 10 segundos, ele não vai precisar ser recarregada, ela é fresh
    // ...options
  });
}