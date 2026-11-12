'use client';

import { UserTable } from './user-table';
import { UserColumns } from './user-column';
import { useGetAllUsers } from '../services/user.service';

const UserList = () => {

    const { data, isLoading } = useGetAllUsers();

  return (
    <div>
        {
            data &&  <UserTable columns={UserColumns} data={data} isLoading={isLoading} />
        }
    </div>
  )
}

export default UserList
