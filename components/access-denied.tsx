import { signIn } from "next-auth/react"
import Link from "next/link"

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <Link href={'/user/login'} className='text-blue-700' onClick={(e) => {
            e.preventDefault()
            signIn()
          }}> You must be signed in to view this page</Link>
    </>
  )
}

{/* <p>
<a
  href="/user/login"
  onClick={(e) => {
    e.preventDefault()
    signIn()
  }}
>
  You must be signed in to view this page
</a>
</p> */}