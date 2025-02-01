"use client";

import { FormEventHandler } from 'react';
import './connect.css'
import './bluetoothHandler/blueHandle.tsx'
import { useState } from 'react';

var device: BluetoothDevice;

export default function Connect() {
  
  return (
    <div>
      <h1 className="ConnectPageTitle"> Connect Page </h1>
      <input name="PromptInput" id=""></input>
      <textarea name="ScriptOututTextArea" id=""></textarea>

    </div>
  );
}

function ConnectPanel() {

  const [connectionStatus, setConnectionStatus] = useState("Not connected");

  const connectToBluetooth = () => {
    bluetoothInit().then
    getDevice().then((dev) => {
      device = dev;
    }).catch((error) => {
      console.error(error);
    });
  }

  var deviceIsConnected: boolean = !!device.id

  return (
    <div className="ConnectPanel">
      <button className="ConnectButton" id='ConnectButton' onClick={connectToBluetooth}>
        Connect
      </button>
      <label className="ConnectionStatus">
        {device.id}
      </label>
    </div>
  )
}