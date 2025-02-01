"use client";

import { FormEventHandler } from 'react';
import './connect.css'
import { useState } from 'react';

var device: BluetoothDevice | null = null;

export default function Connect() {
  
  return (
    <div className="ConnectPageContainer">
      <div>
        <h1 className="ConnectPageTitle"> Connect Page </h1>
        <input name="PromptInput" id=""></input>
        <textarea name="ScriptOututTextArea" id=""></textarea>
      </div>
      <div className="ConnectPanelContainer">
        <ConnectPanel/>
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
      console.error("Error connecting to Bluetooth:", error);
      setConnectionStatus("Connection failed");
    }
  };

  return (
    <div className="ConnectPanel">
      <button className="ConnectButton" id="ConnectButton" onClick={connectToBluetooth}>
        Connect
      </button>
      <label className="ConnectionStatus">
        {connectionStatus}: {deviceName || "No device"}
      </label>
    </div>
  );
}