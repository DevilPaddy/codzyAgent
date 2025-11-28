'use client'

import { useSession } from "next-auth/react";
import Home from "../../components/Home"
import IdeasHome from "../../components/ideas"
import Tutorials from "../../components/tutorials"
import Description from "../../components/Description"
import LogedPage from "../../components/LogedUser/LogedPage";

export default function () {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <LogedPage />
    )
  }

  return (
    <div className="max-w-[1152px] mx-auto">
      <section className="userIsNotLogged">

        <div id="home" className="mx-auto">
          <Home />
        </div>

        <div>
          <Description />
        </div>

        <div id="ideas">
          <IdeasHome />
        </div>

        <div id="tutorials">
          <Tutorials />
        </div>

      </section>
    </div>
  )
}