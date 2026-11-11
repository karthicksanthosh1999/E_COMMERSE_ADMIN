'use client'

import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import UserModel from './user-model';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const UserHeader = () => {
    const [userModel, setUserModel] = useState(false)
  return (
    <>
    <div className='flex items-center justify-between py-2 border-b mb-2'>
        <div className="">
            <CardTitle>User List</CardTitle>
            <CardDescription>User Description</CardDescription>
        </div>
        <div className='relative'>
            <Input 
                type='text'
                placeholder='Search Phone, Email'
                className='rounded-sm border border-brand-gold w-xs'
            />
            <Search size={20} className='absolute top-1 right-2 text-brand-brown ' />
        </div>
        <div className='flex items-center gap-2'>
            <h1 className='text-base font-semibold'>User Count: 1</h1>
            <Button 
                type='button'
                className={'rounded-sm cursor-pointer'}
                onClick={()=>setUserModel(true)}
                >Add User
            </Button>
        </div>
    </div>
        <UserModel mode='CREATE' onClose={setUserModel} open={userModel} />
    </>
  )
}

export default UserHeader;
