import React from 'react'
import '../styles/global.css'

const About: React.FC = () => {
  return (
    <div className="about-container">
      <section className="mission">
        <h2>Our Mission</h2>
        <p>We believe in the power of technology to transform lives. By embracing the hacker mindset of curiosity, creativity, and critical thinking, we strive to push the boundaries of what is possible and create solutions for the challenges of tomorrow.</p>
      </section>

      <section className="values">
        <h2>Our Values</h2>
        <ul>
          <li>Collaboration</li>
          <li>Innovation</li>
          <li>Integrity</li>
          <li>Respect</li>
          <li>Continuous Learning</li>
        </ul>
      </section>

      <section className="join">
        <h2>Join Us</h2>
        <p>If you share our passion for technology and hacking for good, we invite you to join our community. Together, we can build a better future, one hack at a time.</p>
      </section>
      
      <section className="contact">
        <h2>Contact Us</h2>
        <address>
          <p>Email: contact@hackersclub.com</p>
          <p>Phone: +123 456 7890</p>
          <p>linkedin: bbnnn/sssss</p>
        </address>
      </section>
    </div>
  );
};

export default About;