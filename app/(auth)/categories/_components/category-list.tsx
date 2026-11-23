'use client';

import { CategoryTable } from './category-table';
import { UserColumns } from './category-column';
import { useGetAllCategory } from '../_hooks/category-hooks';

const CategoryList = () => {

    const { data, isLoading } = useGetAllCategory();

  return (
    <div>
        {
            data &&  <CategoryTable columns={UserColumns} data={data} isLoading={isLoading} />
        }
    </div>
  )
}

export default CategoryList
