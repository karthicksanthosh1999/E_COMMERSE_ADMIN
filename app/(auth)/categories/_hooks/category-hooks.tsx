
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { User } from "@/types/users";
import api from "@/lib/axios";
import { CreateCategoryDto, UpdateCategoryDto } from "../category-schema";
import { toast } from "react-hot-toast";

export const userKeys = {
  all: ["users"] as const,
};

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: getAllCategory,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDto) => createCategory(data),
    onMutate:() => {
      toast.loading("Creating User...", { id : 'create-user'})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success("User Created Successfully", { id : 'create-user' });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onMutate:() => {
      toast.loading("Deleting User...", { id : 'delete-user'})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
      toast.success("User Deleted Successfully", { id: 'delete-user' })
    }
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: string; data: UpdateCategoryDto }) => updateCategory(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success("User Update Successfully", { id : 'update-user' });
    },
  });
};


export const getAllCategory = async (): Promise<User[]> => {
  const response = await api.get("/categories");
  return response.data.data;
};

export const createCategory = async (data: CreateCategoryDto) => {
  const response = await api.post("/admin/categories", data);
  return response.data;
};

export const updateCategory = async ({ id, data}: { id: string; data: UpdateCategoryDto }) => {
  const response = await api.patch(`/admin/users/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};
