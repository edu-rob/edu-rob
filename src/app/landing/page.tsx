"use client";

import './landing.css'
import NavBar from "../components/navBar/navBar";
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="LandingPageContainer">
      <NavBar />
      /* Hero Section */
      <header className="HeroSection">
        <h1 className="HeroTitle">Transforming Education with Robotics</h1>
        <p className="HeroSubtitle">
          EduRob combines cutting-edge robotics with immersive learning to shape the future of education.
        </p>
        <Link href="/connect">
          <button className="HeroButton">Get Started</button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="FeaturesSection">
        <h2 className="SectionTitle">Why Choose EduRob?</h2>
        <div className="FeatureCards">
          <div className="FeatureCard">
            <i className="fas fa-robot FeatureIcon"></i>
            <h3 className="FeatureTitle">Innovative Robotics</h3>
            <p className="FeatureDescription">
              Engage students with hands-on robotics projects and cutting-edge technologies.
            </p>
          </div>
          <div className="FeatureCard">
            <i className="fas fa-graduation-cap FeatureIcon"></i>
            <h3 className="FeatureTitle">Personalized Learning</h3>
            <p className="FeatureDescription">
              Tailor the learning experience to individual student needs and interests.
            </p>
          </div>
          <div className="FeatureCard">
            <i className="fas fa-globe FeatureIcon"></i>
            <h3 className="FeatureTitle">Global Reach</h3>
            <p className="FeatureDescription">
              Connect with educators and learners worldwide to share ideas and resources.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="CTASection">
        <h2 className="CTATitle">Ready to Shape the Future?</h2>
        <p className="CTADescription">
          Join thousands of educators and students who are transforming education through robotics.
        </p>
        <button className="CTAButton">Join Now</button>
      </section>

      {/* Footer */}
      <footer className="Footer">
        <p className="FooterText">© 2025 EduRob. All rights reserved.</p>
      </footer>
    </div>
  );
}