"use client";

import { FormEventHandler } from "react";
import "./connect.css";
import { useState } from "react";
import { bluetoothInit, getDevice, disconnectDevice } from "../bluetoothHandler/blueHandler";
import NavBar from "../components/navBar/navBar";


export default function Connect() {
  return (
    <div className="ConnectPageContainer">
      <NavBar />
      <Landing />

      {/* Left panel for input and textarea */}
       <div className="LeftPanel">
        <h1 className="ConnectPageTitle">Bluetooth Connection</h1>
        <input name="PromptInput" id="PromptInput" placeholder="Enter a command..." />
        <textarea name="ScriptOutputTextArea" id="ScriptOutputTextArea" placeholder="Output will appear here..."></textarea>
      </div>

      {/* Right panel for connection status and buttons */}
      <div className="ConnectPanelContainer">
        <ConnectPanel />
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="LandingPageContainer">
      <NavBar />
      /* Hero Section */
      <header className="HeroSection">
        <h1 className="HeroTitle">Transforming Education with Robotics</h1>
        <p className="HeroSubtitle">
          EduRob combines cutting-edge robotics with immersive learning to shape the future of education.
        </p>
          {/* <button className="HeroButton">Get Started</button> */}
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

function ConnectPanel() {
  const [connectionStatus, setConnectionStatus] = useState("Not connected");
  const [deviceName, setDeviceName] = useState<string | null>(null);

  const connectToBluetooth = async () => {
    try {
      await bluetoothInit();
      const connectedDevice = await getDevice();
      if (connectedDevice) {
        setConnectionStatus("Connected");
        setDeviceName(connectedDevice.name || "Unnamed Device");
      } else {
        setConnectionStatus("Not connected");
        setDeviceName(null);
      }
    } catch (error) {
      console.error("Error connecting to Bluetooth: ", error);
      setConnectionStatus("Connection failed");
    }
  };

  const disconnectFromBluetooth = () => {
    disconnectDevice();
    setConnectionStatus("Not connected");
    setDeviceName(null);
  };

  return (
    <div className="ConnectPanel">
      <button className="ConnectButton" id="ConnectButton" onClick={connectToBluetooth}>
        Connect
      </button>
      <button className="DisconnectButton" id="DisconnectButton" onClick={disconnectFromBluetooth}>
        Disconnect
      </button>
      <label className="ConnectionStatus">
        {connectionStatus}: {deviceName || "No device"}
      </label>
    </div>
  );
}
