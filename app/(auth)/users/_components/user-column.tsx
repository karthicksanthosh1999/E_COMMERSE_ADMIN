
"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { User } from "@/types/users";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";

const columnHelper = createColumnHelper<User>();

export const UserColumns = columnHelper.columns([

  // User Profile
  columnHelper.display({
    id: "profile",
    header: "User Profile",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar ?? ""} alt={user.name} />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-sm text-muted-foreground">
              {user.email}
            </span>
          </div>
        </div>
      );
    },
  }),

  columnHelper.accessor("name", {
    header: "Full Name",
  }),

  columnHelper.accessor("email", {
    header: "Email Address",
  }),

  columnHelper.accessor("phone", {
    header: "Mobile No",
  }),
  columnHelper.accessor("role", {
    header: "Role",
  }),

  columnHelper.accessor("status", {
    header: "Status",
  }),

  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: ({ getValue }) =>
      new Date(getValue()).toLocaleDateString("en-IN"),
  }),

  // Actions
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
        
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),

]);
