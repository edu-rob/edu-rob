"use client";

import { useState, useEffect, ReactElement } from "react";
import "./connect.css";
import { bluetoothInit, getDevice, disconnectDevice, sendDataToDevice } from "../bluetoothHandler/blueHandler";
import NavBar from "../components/navBar/navBar";
import { api } from "../page";

interface genResponse {
  robot_commands: string,
  error: string,
  code: string
}

interface executeResponse {
  robot_commands: string,
  error: string
}


export default function Connect() {
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [errorValue, setErrorValue] = useState("");


  return (
    <>
      {/* Navbar */}
      <NavBar />

      {/* Landing Page Section */}
      <Landing />

      {/* Bluetooth Connection Section */}
      <BluetoothConnect inputValue={inputValue} setInputValue={setInputValue}
        textAreaValue={textAreaValue} setTextAreaValue={setTextAreaValue}
        errorValue={errorValue} setErrorValue={setErrorValue} />
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

function BluetoothConnect({
  inputValue,
  setInputValue,
  textAreaValue,
  setTextAreaValue,
  errorValue,
  setErrorValue
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  textAreaValue: string;
  setTextAreaValue: React.Dispatch<React.SetStateAction<string>>;
  errorValue: string;
  setErrorValue: React.Dispatch<React.SetStateAction<string>>;
}) {

  // Handler for the input's onChange event
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update the state with the input's value
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value); // Update the state with the text area's value
  };

  return (
    <section className="BluetoothConnectionSection">
      <div className="BluetoothConnectionContainer">
        <h1 className="ConnectPageTitle">Learn How To Code A Robot</h1>
        <div className="InputPanelContainer">
          <p>Type a text prompt into the box to control your robot, and press, Generate Code, to turn your prompt into Python!</p>
          <input
            name="PromptInput"
            id="PromptInput"
            type="text"
            placeholder="Enter a prompt..."
            value={inputValue} // Controlled input value
            onChange={handleInputChange} // Update state on input change
          />
          <p>Edit the generated Python, and see how it affects the robot!</p>
          <textarea
            name="ScriptOutputTextArea"
            id="ScriptOutputTextArea"
            placeholder="Output will appear here..."
            value={textAreaValue}
            onChange={handleTextAreaChange}
            rows={20}
          ></textarea>
          <label> {errorValue} </label>
        </div>
        <ConnectPanel inputValue={inputValue} textAreaValue={textAreaValue}
          execRespValue={errorValue} setTextAreaValue={setTextAreaValue} setErrorValue={setErrorValue} />
      </div>
    </section>
  )
}
interface ExampleFile {
  name: string,
  contents: string
}

function ConnectPanel({ inputValue, textAreaValue, execRespValue, setTextAreaValue, setErrorValue }:
  {
    inputValue: string; textAreaValue: string, execRespValue: string,
    setTextAreaValue: React.Dispatch<React.SetStateAction<string>>,
    setErrorValue: React.Dispatch<React.SetStateAction<string>>
  }) {
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
  }

  const sendCode = () => {
    // sendDataToDevice()
    api.post("/execute", { "code": textAreaValue }).then(response => {
      let data: executeResponse = response.data
      if (data.error != "") {
        setErrorValue(data.error)
      }
      console.log("Commands to be executed: " + data.robot_commands);
      sendDataToDevice(data.robot_commands).then(r => {
        console.log("Response from Rob: " + r)
      })
      console.log("Sending command to Rob: " + data.robot_commands);
      return;
    })
      .catch(err => { console.log('SENDING CODE ERROR!: ', err); })
  }

  const genCode = () => {
    /* TODO: Debug */
    api.post("/generate", { "prompt": inputValue }).then(response => {
      let data: genResponse = response.data

      if (data.error != "") {
        setErrorValue(data.error)
      }

      console.log("Generated code: " + data.code);
      setTextAreaValue(data.code);
      console.log("Sending code: " + data.robot_commands)
    }).catch(err => console.log(err))
  }

  const [exampleData, setExampleData] = useState<[ExampleFile] | []>([])

  useEffect(() => {
    api.get("/examples")
      .then(resp => {
        const data = resp.data
        console.log(data)
        setExampleData(data)
      })
      .catch(err => {
        console.log("Err getting examples", err)
      })
  }, [])

  return (

    <div className="ConnectPanel">
      <ConnectionStatusButton connectionStatus={connectionStatus} connectToBluetooth={connectToBluetooth}
        disconnectFromBluetooth={disconnectFromBluetooth} />
      <button className="GenerateButton" id="GenerateButton" onClick={genCode}>
        Generate Code
      </button>
      <button className="SubmitButton" id="SubmitButton" onClick={sendCode}>
        Submit
      </button>
      <label className="ConnectionStatus">
        {connectionStatus}: {deviceName || "No device"}
      </label>
      <div className="examplePanel">
        <div className="examplePanelText">
          Or choose an example program!
        </div>
        <div className="examplePanelFiles">
          {exampleData.length == 0 ? null :
            <select
              onChange={e => {
                const options = [...e.target.selectedOptions];
                const values = options.map(option => option.value);
                const ind = parseInt(values[0])
                console.log("setting", ind)
                console.log("with", exampleData[ind].contents)
                setTextAreaValue(exampleData[ind].contents)
              }}
            >
              {exampleData.map(({ name }, ind) => {
                return <option key={ind} value={ind}>{name}</option>
              })}
            </select>}
        </div>
      </div>
    </div>
  );
}

function ConnectionStatusButton({ connectionStatus, connectToBluetooth, disconnectFromBluetooth }:
  {
    connectionStatus: string;
    connectToBluetooth: () => void
    disconnectFromBluetooth: () => void
  }) {
  if (connectionStatus == "Connected") {
    return (
      <button className="DisconnectButton" id="DisconnectButton" onClick={disconnectFromBluetooth}>
        Disconnect
      </button>
    )
  } else {
    return (
      <button className="ConnectButton" id="ConnectButton" onClick={connectToBluetooth}>
        Connect
      </button>
    )
  }
}
