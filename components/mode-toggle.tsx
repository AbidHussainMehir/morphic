import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    // setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      {theme === 'dark' ? (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <Moon className="h-[1.2rem] w-[1.2rem]  transition-all" />
        </Button>
      ) : (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        </Button>
      )}
    </>
  )
}
