import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>POPULAR LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li className='listElem'>Kolkata</li>
              <li className='listElem'>Mumbai</li>
              <li className='listElem'>Chennai</li>
              <li className='listElem'>Pune</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>TRENDING LOCATIONS</p>
          </div>
          <div className="list">
            <ul>
              <li className='listElem'>Bhubaneshwar</li>
              <li className='listElem'>Hyderabad</li>
              <li className='listElem'>Chandigarh</li>
              <li className='listElem'>Nashik</li>
            </ul>
          </div>
        </div>
        
        <div>
          <div className="heading">
            <p>OLX</p>
          </div>
          <div className="list">
            <ul>
              <li className='listElem'>Blog</li>
              <li className='listElem'>Help</li>
              <li className='listElem'>Sitemap</li>
              <li className='listElem'>Legal & Privacy information</li>
              <li className='listElem'>Vulnerability Disclosure Program</li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
      <div className="footer">
        <p>Help - Sitemap</p>
        <p>Free Classifieds in India. © 2006-{new Date().getFullYear()} OLX</p>
      </div>
    </div>
  );
}

export default Footer;
