
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { User } from "@/types/users";
import api from "@/lib/axios";
import { CreateUserDto, UpdateUserDto } from "../schema/user.schema";

export const userKeys = {
  all: ["users"] as const,
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: getAllUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => createUser(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: {
      id: string;
      data: UpdateUserDto;
    }) => updateUser(variables),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });
};


export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data.data;
};

export const createUser = async (data: CreateUserDto) => {
  const response = await api.post("/users", data);
  return response.data;
};

export const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateUserDto;
}) => {
  const response = await api.patch(`/users/${id}`, data);
  return response.data;
};
