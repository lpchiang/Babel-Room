import { Card, CardContent, CardHeader } from '../ui/card';
import ContentPaginationWrapper from './content-pagination-wrapper';
import { ContentProps } from './types';

const Content = ({title, children}: ContentProps) => {
  return (
    <Card className='flex flex-col gap- w-auto h-fit bg-transparent p-0 border-none shadow-none *:p-0'>
      <CardHeader>
        <ContentPaginationWrapper title={title} />
      </CardHeader>
      <CardContent>
        <Card className='size-full'>
          <CardContent className='flex flex-row justify-center'>
            {children}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Content;