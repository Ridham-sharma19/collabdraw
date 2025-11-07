
"use client"
import Authpage from '../pages/authpage'

export default function signin() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Authpage isSignin={true}/>
    </div>
  )
}
