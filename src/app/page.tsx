import { FC } from "react"
import { ModeToggle } from "@/components/toggle-mode"

const Home : FC = () => {
  return (
    <div className="flex h-screen w-screen bg-inherit">
      <ModeToggle />
      <p> hello </p>
    </div>
  )
}

export default Home