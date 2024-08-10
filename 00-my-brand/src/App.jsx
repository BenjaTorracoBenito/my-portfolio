import './App.css'

export default function App() {

  return (
    <nav className='flex justify-center'>
      <ul className='h-20 w-1/2 flex justify-center items-center bg-gradient-to-b from-green to-l-green rounded-b-3xl'>
        <li className='mb-2 mx-5 text-light text-lg'><a className='py-1  hover:text-xl transition-all ease delay-100' href="#">HOME</a></li>
        <li className='mb-2 mx-5 text-light text-lg'><a className='py-1  hover:text-xl transition-all ease delay-100' href="#">ABOUT</a></li>
        <li className='mb-2 mx-5 text-light text-lg'><a className='py-1  hover:text-xl transition-all ease delay-100' href="#">CONTACT</a></li>
      </ul>
    </nav>
  )
}