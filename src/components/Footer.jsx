import React from 'react'
import '../stylesheets/Footer.css'

const Footer = () => {

  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className='footer'>
      <div>
        Edgar Espinoza &copy; {year}
      </div>

    </div>
  )
}

export default Footer;
