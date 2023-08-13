import React from 'react'

const About = () => {
  return (
    <div>




        <div className="about-section">
            <h2>About Us</h2>
            <p>
                Welcome to SV Hackers Club, a Student Interest Group ratified and recognized by Northeastern University at the Silicon Valley campus!
                We are a dynamic and passionate community of like-minded individuals who share a common interest in coding. Whether you're an enthusiastic beginner or a seasoned expert, our club offers a platform to learn, collaborate, and thrive.
                </p>


        </div>



        <div className="offer-section">
            <h2>What We Offer</h2>
            <ul>
                <li><strong>Engaging Workshops:</strong> Our club regularly hosts insightful workshops led by industry experts. Learn the latest trends, tools, and techniques in software developing that will give you a competitive edge.</li>
                <li><strong>Networking Opportunities:</strong> Connect with fellow members who share your passion. Network, collaborate, and create lasting friendships with individuals who are as driven as you are.</li>
                <li><strong>Hackathons and Challenges:</strong> Put your skills to the test by participating in our exciting hackathons and challenges. Apply what you've learned, solve real-world problems, and showcase your creativity.</li>
                <li><strong>Inclusive Community:</strong> We embrace diversity and welcome individuals from all backgrounds. SV Hackers Club is a safe space where everyone's ideas and perspectives are valued.</li>
            </ul>
        </div>


        <div className="offer-section">
            <h2>Our Goal</h2>
            <ul>
                <li><strong>A project-based mutual learning environment</strong>  elevate students’ software development and programming skills, and gain proficiency in diverse tech stacks</li>
                <li><strong>Bridging the gap between students and alumni, as well as those with co-op experience</strong>  fostering lasting and meaningful connections and offering support and advice on job-hunting.</li>

            </ul>
        </div>



        <div className="join-section">
            <h2>Join Us Now</h2>
            <p>
                Ready to embark on an exciting journey with SV Hackers Club? Join us today and unlock a world of opportunities in [Relevant Field/Area]. Whether you're looking to enhance your skills, make new friends, or contribute to meaningful projects, [Club Name] is the place to be!
            </p>
        </div>

        <div className="connect-section">
            <h2>Connect With Us</h2>
            <p>
                Stay updated on our latest events, workshops, and activities by following us on [Social Media Links]. For inquiries, feel free to reach out to us at [Contact Email].
            </p>
            <p>
                Remember, at SV Hackers Club, the only limit is your imagination. Join us and let's [ Slogan or Catchphrase] together!
            </p>
        </div>



        <div className="logo-section">

            <img src="logo512.png" alt="Club Logo" style={{ float: 'right' }} />
        </div>
        <div className="slogan-section" style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
            <p>
                {  }
                <strong>Stay Inspired. Stay Curious. Stay SV Hackers Club.</strong>
            </p>
        </div>









    </div>
  )
}

export default About