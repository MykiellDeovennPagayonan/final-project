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
    <nav className='bg-gray-300 w-screen h-14 px-4 flex'>
      <Link href='/home'>
        <div className='flex items-center h-full'>
          <img
            src='/scriba-landing-img-png.png'
            alt='Logo'
            className='h-11 mr-2'
          />
          <span className='text-3xl font-bold text-emerald-400 outlined-text'>
            Scriba
          </span>
        </div>
      </Link>
      <div className='ml-auto'>
        {' '}
        <Link href='/study-notes'>
          {' '}
          <Button className='w-0 md:w-12 lg:w-24 h-full bg-transparent ml-auto mr-2 text-gray-700 hover:bg-transparent focus:bg-transparent hover:text-emerald-400 focus:text-emerald-600 hover:border-b-4 focus:border-b-4 hover:rounded-none focus:rounded-none hover:border-emerald-600 focus:border-emerald-600 font-semibold py-2 px-4 focus:outline-none'>
            <p className='hidden sm:block'>Study Notes</p>
          </Button>
        </Link>
        <Link href='/study-groups'>
          {' '}
          <Button className='w-0 md:w-12 lg:w-24 h-full bg-transparent ml-auto mr-2 text-gray-700 hover:bg-transparent focus:bg-transparent hover:text-emerald-400 focus:text-emerald-600 hover:border-b-4 focus:border-b-4 hover:rounded-none focus:rounded-none hover:border-emerald-600 focus:border-emerald-600 font-semibold py-2 px-4 focus:outline-none'>
            {' '}
            <p className='hidden sm:block'>Study Groups</p>{' '}
          </Button>
        </Link>
        <Button
          onClick={() => logout()}
          className='bg-emerald-400 hover:bg-emerald-600'
        >
          {' '}
          Log out{' '}
        </Button>
      </div>
    </nav>
  )
}