import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '../ui/pagination';
import { ContentPaginationWrapperProps } from './types';

const ContentPaginationWrapper = ({title}: ContentPaginationWrapperProps) => {
  return (
    <Pagination className='bg-blue-700 rounded-lg content-center p-4'>
          <PaginationContent className='flex flex-row w-full justify-between'>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <div className='text-3xl text-white'>{title}</div>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
  )
}

export default ContentPaginationWrapper;