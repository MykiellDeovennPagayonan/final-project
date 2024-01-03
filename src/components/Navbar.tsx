'use client'
import Link from 'next/link'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
  const router = useRouter()

  function logout() {
    localStorage.clear()
    router.push('/')
  }

  return (
    <nav className='bg-gray-300 w-screen h-20 p-4 px-8 flex'>
      <Link href="/home">
        <div className="flex items-center">
          <Image width={50} height={50} src="/scriba-landing-img-png.png" alt="Logo" className="h-12 mr-2" />
          <span className="text-3xl font-bold text-green-500 outlined-text">Scriba</span>

        </div>
      </Link>
      <div className='ml-auto'>
        {' '}
        <Link href='/study-notes'>
          {' '}
          <Button className='ml-auto mr-2 bg-gray-700 hover:bg-green-300 hover:text-black'> Study Notes </Button>
        </Link>
        <Link href='/study-groups'>
          {' '}
          <Button className='ml-auto mr-2 bg-gray-700 hover:bg-green-300 hover:text-black'> Study Groups </Button>
        </Link>
        <Button onClick={() => logout()} className='hover:bg-green-900 hover:text-white'> Log out </Button>
      </div>
    </nav>
  )
}
