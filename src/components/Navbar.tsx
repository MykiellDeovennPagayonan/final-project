'use client'
import Link from 'next/link'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export default function Navbar () {
  const router = useRouter()

  function logout () {
    localStorage.clear()
    router.push('/')
  }

  return (
    <nav className='bg-gray-300 w-screen h-20 p-4 flex border-b-1.5 border-gray-600'>
          <div className="flex items-center">
        <img src="/scriba-landing-img-png.png" alt="Logo" className="h-12 mr-2"/>
        <span className="text-3xl text-stroke font-bold text-mint-green " >Scriba</span>



    </div>
      <div className='ml-auto'>
        {' '}
        <Link href='/study-notes'>
          {' '}
          <Button className='ml-auto mr-2 bg-gray-700 bg-gray-500 hover:bg-green-300 hover:text-black'> Study Notes </Button>
        </Link>
        <Link href='/study-notes'>
          {' '}
          <Button className='ml-auto mr-2 bg-gray-700 bg-gray-500 hover:bg-green-300 hover:text-black'> Study Groups </Button>
        </Link>
        <Button onClick={() => logout()} className='hover:bg-green-900 hover:text-white'> Log out </Button>
      </div>
    </nav>
  )
}
