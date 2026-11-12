
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { User } from "@/types/users";
import api from "@/lib/axios";
import { CreateUserDto, UpdateUserDto } from "../schema/user.schema";
import { toast } from "react-hot-toast";

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
    onMutate:() => {
      toast.loading("Creating User...", { id : 'create-user'})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success("User Created Successfully", { id : 'create-user' });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onMutate:() => {
      toast.loading("Deleting User...", { id : 'delete-user'})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      toast.success("User Deleted Successfully", { id: 'delete-user' })
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; data: UpdateUserDto }) => updateUser(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success("User Update Successfully", { id : 'update-user' });
    },
  });
};


export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get("/api/users");
  return response.data.data;
};

export const createUser = async (data: CreateUserDto) => {
  const response = await api.post("/api/users", data);
  return response.data;
};

export const updateUser = async ({ id, data}: { id: string; data: UpdateUserDto }) => {
  const response = await api.patch(`/api/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/api/users/${id}`);
  return response.data;
};
