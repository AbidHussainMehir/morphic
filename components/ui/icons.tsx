'use client'
import { useTheme } from 'next-themes'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  const { theme } = useTheme()
  console.log({ theme })

    // Determine image source based on theme
    const logoSrc = theme === 'dark'
    ? '/athena-high-resolution-logo-white-transparent.svg'
    : '/athena-high-resolution-logo-transparent.svg';
  return (
    <>
      <img
        src={logoSrc}
        height={'80em'}
        width={'80em'}
        style={{ marginLeft: '5px' }}
      />
      {/* // <svg
    //   fill="currentColor"
    //   viewBox="0 0 256 256"
    //   role="img"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className={cn('h-4 w-4', className)}
    //   {...props}
    // >
    //   <circle cx="128" cy="128" r="128" fill="black"></circle>
    //   <circle cx="102" cy="128" r="18" fill="white"></circle>
    //   <circle cx="154" cy="128" r="18" fill="white"></circle>
    // </svg> */}
    </>
  )
}

export { IconLogo }
