import { Avatar, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import jare from "./assets/Jare.jpg"
import { AvatarButtonProps } from "./types"

const AvatarButton = ({username}: AvatarButtonProps) => {
  return (
    <Button className="bg-transparent text-3xl">
        <Avatar>
          <AvatarImage src={jare}/>
        </Avatar>
      {username}
    </Button>
  )
}

export default AvatarButton