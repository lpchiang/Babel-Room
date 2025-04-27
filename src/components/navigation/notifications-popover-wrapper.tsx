import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Bell } from 'lucide-react'

const NotificationsPopoverWrapper: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger className='py-2'>
        <Bell />
      </PopoverTrigger>
      <PopoverContent>To do</PopoverContent>
    </Popover>
  )
}

export default NotificationsPopoverWrapper;