"use client";

import { FormEventHandler } from "react";
import "./connect.css";
import { useState } from "react";
import { bluetoothInit, getDevice, disconnectDevice } from "../bluetoothHandler/blueHandler";
import NavBar from "../components/navBar/navBar";


export default function Connect() {
  return (
    <div className="ConnectPageContainer">
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
