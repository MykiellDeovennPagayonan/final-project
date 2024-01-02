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
    <nav className='bg-gray-300 w-screen h-20 p-4 flex'>
          <div className="flex items-center">
        <img src="/scriba-landing-img-png.png" alt="Logo" className="h-12 mr-2"/>
        <span className="text-3xl font-bold text-green-500 outlined-text">Scriba</span>


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
