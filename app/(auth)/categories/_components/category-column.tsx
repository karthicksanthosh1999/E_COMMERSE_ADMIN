
"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableFeatures } from "@/components/data-table-features";
import { Categories } from "@/types/category";
import { useDeleteCategory } from "../_hooks/category-hooks";
import { useState } from "react";
import CategoryViewModal from "./category-view-model";

const columnHelper = createColumnHelper<DataTableFeatures, Categories>();

export const UserColumns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Category Name",
  }),

  columnHelper.accessor("description", {
    header: "Description",
     cell: ({ getValue }) => <h1 className="">{getValue() ?? "N/A"}</h1>
  }),

  columnHelper.accessor("parentId", {
    header: "Parent Category",
    cell: ({ getValue }) => <h1 className="">{getValue() ?? "N/A"}</h1>

  }),
  columnHelper.accessor("isActive", {
    header: "Is Active",
  }),

  columnHelper.accessor("attributeSchema.key", {
    header: "Key",
    cell: ({ getValue }) => <h1 className="">{getValue() ?? "N/A"}</h1>
  }),

  // Actions
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {

      const { mutate } = useDeleteCategory();

      const [ viewModelOpen, setViewModelOpen ] = useState(false);
      const [selectedCategory, setSelectedCategory] = useState<Categories | null>(null)

      const handleViewModel = (category : Categories) => {
        setSelectedCategory(category)
        setViewModelOpen(true)
      };

      const handleViewModelClose = () => {
        setSelectedCategory(null)
        setViewModelOpen(false)
      }
        
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=>handleViewModel(row.original)} className={'cursor-pointer'}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>console.log(row.original.id)} className={'cursor-pointer'}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>mutate(row?.original?.id ?? "")} className={'text-destructive cursor-pointer'}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>

          </DropdownMenu>
          {
            selectedCategory && 
          <CategoryViewModal category={selectedCategory} onClose={handleViewModelClose} />
          }
        </>
      );
    },
  }),

]);
