import { Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
      <div className="flex items-center justify-between w-full">
        <div>
            <input type="search" className='border' />
        </div>
        <div className='flex items-center gap-5'>
            <div className='relative'>
                <Bell size={20} />
                <span className='h-fit w-fit rounded-full bg-primary text-[11px] p-0.5 absolute -top-2 -right-2 font-semibold'>20</span>
            </div>
            <Link href={'/profile'} className='flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2'>
                <Image src={'https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg'} alt="" height={40} width={40} />
                <div className="">
                    <h4 className='text-[15px] font-semibold '>Joseph Karthick</h4>
                    <p className='text-xs text-gray-400'>karthick@scita.in</p>
                </div>
            </Link>
        </div>
      </div>
  )
}

export default Header
