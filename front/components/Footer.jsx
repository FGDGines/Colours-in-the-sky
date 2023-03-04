import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

export function Footer () {
  return (
    <div className='footer-container'>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
      <p>{new Date().getFullYear()} Colours in the sky. Todos los derechos reservados. Powered by FGD. Develop by <a href='https://www.rxtsel.dev' target='_blank'>@rxtsel</a></p>
    </div>
  )
}
