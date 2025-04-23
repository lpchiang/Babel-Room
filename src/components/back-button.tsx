import { Button } from "./ui/button"

type BackButtonProps = {
  href: string
  label: string
}

const BackButton = ({href, label}: BackButtonProps) => {
  return (
    <Button 
      variant="link"
      className="font-normal w-full"
      size="sm"
      asChild
    >
      <a href={href}>
        {label}
      </a>
    </Button>
  )
}

export default BackButton