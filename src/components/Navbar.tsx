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
    <nav className='bg-gray-300 w-screen h-19 px-4 flex'>
      <Link href='/home'>
        <div className='flex items-center'>
          <img
            src='/scriba-landing-img-png.png'
            alt='Logo'
            className='h-12 mr-2'
          />
          <span className='text-3xl font-bold text-green-500 outlined-text py-2 roboto-font'>
  Scriba
</span>


        </div>
      </Link>
      <div className='ml-auto'>
        {' '}
        <Link href='/study-notes'>
          {' '}
          <Button className='w-full sm:w-auto px-12 md:w-12 lg:w-24 h-full bg-transparent ml-auto mr-2 text-gray-700 hover:bg-transparent focus:bg-transparent hover:text-green-600 focus:text-green-600 hover:border-b-4 focus:border-b-4 hover:rounded-none focus:rounded-none hover:border-green-900 focus:border-green-900 font-semibold py-2 focus:outline-none'>
            <p className='hidden md:inline-block'>Study Notes</p>
          </Button>
        </Link>
        <Link href='/study-groups'>
          {' '}
          <Button className='w-full sm:w-auto px-12 md:w-12 lg:w-24 h-full bg-transparent ml-auto mr-2 text-gray-700 hover:bg-transparent focus:bg-transparent hover:text-green-600 focus:text-green-600 hover:border-b-4 focus:border-b-4 hover:rounded-none focus:rounded-none hover:border-green-900 focus:border-green-900 font-semibold py-2 focus:outline-none'>
            {' '}
            <p className='hidden md:inline-block'>Study Groups</p>{' '}
          </Button>
        </Link>
        <Button
  onClick={() => logout()}
  className='hidden md:inline-block text-xs md:text-sm lg:text-base px-2 md:px-3 lg:px-4 py-1 md:py-1.5 hover:bg-green-900 hover:text-white transition-colors duration-300 ease-in-out'

>

          {' '}
          Log out{' '}
        </Button>
      </div>
    </nav>
  )
}