"use client";

import { useState } from "react";
import "./connect.css";
import { bluetoothInit, getDevice, disconnectDevice, sendDataToDevice, getDataFromDevice } from "../bluetoothHandler/blueHandler";
import NavBar from "../components/navBar/navBar";

// State to hold the input value

export default function Connect() {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Landing Page Section */}
      <Landing />

      {/* Bluetooth Connection Section */}
      <BluetoothConnect inputValue={inputValue} setInputValue={setInputValue} />
    </>
  );
}

function Landing() {
  return (
    <div className="LandingPageContainer">
      <header className="HeroSection">
        <h1 className="HeroTitle">Transforming Education with Robotics</h1>
        <p className="HeroSubtitle">
          EduRob combines cutting-edge robotics with immersive learning to shape the future of education.
        </p>
      </header>
      <section className="FeaturesSection">
        <h2 className="SectionTitle">Why Choose EduRob?</h2>
        <div className="FeatureCards">
          <div className="FeatureCard">
            <i className="fas fa-robot FeatureIcon"></i>
            <h3 className="FeatureTitle">Innovative Robotics</h3>
            <p className="FeatureDescription">
              Engage with hands-on robotics projects and cutting-edge technologies.
            </p>
          </div>
          <div className="FeatureCard">
            <i className="fas fa-graduation-cap FeatureIcon"></i>
            <h3 className="FeatureTitle">Personalised Learning</h3>
            <p className="FeatureDescription">
              Tailor the learning experience to your needs and interests.
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
      <section className="CTASection">
        <h2 className="CTATitle">Ready to Shape the Future?</h2>
        <p className="CTADescription">
          Join thousands of educators and students who are transforming their education through robotics.
        </p>
      </section>
    </div>
  );
}

function ConnectPanel({ inputValue }: { inputValue: string }) {
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

  const sendData = () => {
    sendDataToDevice(inputValue)
  }

  return (
    <div className="ConnectPanel">
      <button className="ConnectButton" id="ConnectButton" onClick={connectToBluetooth}>
        Connect
      </button>
      <button className="DisconnectButton" id="DisconnectButton" onClick={disconnectFromBluetooth}>
        Disconnect
      </button>
      <button className="SubmitButton" id="SubmitButton" onClick={sendData}>
        Submit
      </button>
      <label className="ConnectionStatus">
        {connectionStatus}: {deviceName || "No device"}
      </label>
    </div>
  );
}

function BluetoothConnect({
  inputValue,
  setInputValue}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) {

  // Handler for the input's onChange event
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the state with the input's value
  };

  return(
    <section className="BluetoothConnectionSection">
        <div className="BluetoothConnectionContainer">
          <h1 className="ConnectPageTitle">Bluetooth Connection</h1>
          <div className="InputPanelContainer">
            <input 
              name="PromptInput"
              id="PromptInput"
              type="text"
              placeholder="Enter a prompt..."
              value={inputValue} // Controlled input value
              onChange={handleInputChange} // Update state on input change
              />
            <textarea name="ScriptOutputTextArea" id="ScriptOutputTextArea" placeholder="Output will appear here..."></textarea>
          </div>
          <ConnectPanel inputValue={inputValue} />
        </div>
      </section>
  )
}
