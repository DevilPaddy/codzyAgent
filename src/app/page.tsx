import Link from "next/link"
import Home from "../../components/Home"
import IdeasHome from "../../components/ideas"
import Tutorials from "../../components/tutorials"
export default function () {

  return (
    <div className="max-w-[1152px] mx-auto">
      <div id="home" className="mx-auto">
        <Home />
      </div>

      <div id="ideas">
        <IdeasHome />
      </div>

      <div id="tutorials">
        <Tutorials />
      </div>
    </div>
  )
}