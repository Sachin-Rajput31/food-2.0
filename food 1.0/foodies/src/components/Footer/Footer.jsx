import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt=""  className='logo'/>
               <p className>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore beatae natus possimus ducimus deserunt. Omnis eligendi, labore sed aperiam itaque quos ad eaque voluptatem praesentium corporis. Suscipit optio debitis nam.</p>
             <div className="footer-social-icon">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />



             </div>
          
          
          </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
<ul>
<li>Home</li>
<li>About us</li>
<li>Delivery</li>
<li>Privacy Policy</li>


</ul>

        </div>
        <div className="footer-content-right">
<h2>GET IN TOUCH</h2>
<ul>
    <li>+1-222-653-5555</li>
    <li>foodies@foodies.com</li>
</ul>
        </div>
     
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © foodies.in -All Right Reserved.</p>
    </div>
  )
}

export default Footer
