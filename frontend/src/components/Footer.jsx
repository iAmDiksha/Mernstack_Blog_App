import React from 'react'
import '../CSS/Footer.css'

const Footer = () => {
  return (
    <footer>
  <div className="footer-container">
    <div className="footer-row">
      <div className="footer-col">
        <h4>About Us</h4>
        <p>
          Welcome to Writely! A platform where you can share your thoughts and discover exciting ideas.
        </p>
      </div>

      <div className="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/blogs">Blogs</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="#"><i class="ri-facebook-line"></i></a>
          <a href="#"><i class="ri-twitter-x-line"></i></a>
          <a href="#"><i class="ri-instagram-line"></i></a>
          <a href="#"><i class="ri-linkedin-line"></i></a>
        </div>
      </div>

      <div className="footer-col">
        <h4>Contact Us</h4>
        <p>Email: contact@writely.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
    </div>

    <div className="footer-bottom">
      <p>&copy; 2024 Writely. All rights reserved.</p>
    </div>
  </div>
    </footer>
  )
}

export default Footer
