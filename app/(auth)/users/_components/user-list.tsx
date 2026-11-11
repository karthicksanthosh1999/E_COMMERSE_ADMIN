import React from 'react'

import { User } from '@/types/users';
import UserHeader from './user-header';
import { UserTable } from './user-table';
import { UserColumns } from './user-column';

const UserList = () => {

    const data: User[] = [
        {
            id:'1',
            email:"karthick.santhosh@gmail.com",
            name:"Joseph Karthick",
            phone:"855236948",
            role: 'ADMIN',
            status:"ACTIVE",
            createdAt:"2026-12-23"
        }
    ]

  return (
    <div>
        <UserTable columns={UserColumns} data={data} />
    </div>
  )
}

export default UserList
