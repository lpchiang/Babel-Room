import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Bell } from 'lucide-react'

const NotificationsPopoverWrapper: React.FC = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Bell />
      </PopoverTrigger>
      <PopoverContent>To do</PopoverContent>
    </Popover>
  )
}

export default NotificationsPopoverWrapper;