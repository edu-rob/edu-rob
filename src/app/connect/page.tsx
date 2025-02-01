"use client";

import { FormEventHandler } from 'react';
import './connect.css'
/// <reference types="web-bluetooth" />

let device: BluetoothDevice;

export default function Connect() {

  async function init() {
    if (!navigator.bluetooth) console.log("Error in connecting");
    if (!device) await requestDevice();
  
    const connectButton = document.querySelector("ConnectButton");
    if (connectButton) {
      connectButton.textContent = "connecting...";
    }

    await connectDevice();
  }

  async function requestDevice() {
    const options = {
      acceptAllDevices: true,
    };
    device = await navigator.bluetooth.requestDevice(options);
    device.addEventListener("gattserverdisconnected", connectDevice);
  }
  
  async function connectDevice() {  
    if (!device || !device.gatt) {
      throw new Error('Device or GATT server is not available');
    }

    const server = await device.gatt.connect();
  
    console.log("connected");
  }

  const connectToBluetooth = () => {
    init().catch
  }
  

  return (
    <div>
      <h1> Connect Page </h1>
      <input name="PromptInput" id=""></input>
      <textarea name="ScriptOututTextArea" id=""></textarea>
      <button className="ConnectButton" id='ConnectButton' onClick={connectToBluetooth}>
        Connect
      </button>
    </div>
  );
}