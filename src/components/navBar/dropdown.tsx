'use client'

import * as React from 'react'
import Link from '../../../node_modules/next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Input } from "@/components/ui/input"



import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'


export function NavigationMenuDemo () {
    const router = useRouter()
    function logout () {
        localStorage.clear()
        router.push('/')
      }
  return (
    <div className='ml-auto'>
      {' '}
      <NavigationMenu>
        <NavigationMenuList>
        <NavigationMenuItem>

<Input type="Enter Code Here" placeholder="Enter Code Here" />

</NavigationMenuItem>


          <NavigationMenuItem>
            <Button onClick={() => logout()} className=''>
              Log out
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
