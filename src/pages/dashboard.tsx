import Navigation from "@/components/navigation/navigation"
import { Fragment } from "react/jsx-runtime"

const Dashboard = ({children}: {children: React.ReactNode}) => {
  return (
    <Fragment>
      <Navigation/>
      <aside>

      </aside>
      <main>
        <div>Lessons</div>
        <div>Exercises</div>
      </main>
    </Fragment>
  )
}

export default Dashboard