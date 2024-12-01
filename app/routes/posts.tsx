import { Outlet } from "@remix-run/react"

function Posts() {
  return (
    <div className="container my-10">
      <Outlet />
    </div>
  )
}

export default Posts