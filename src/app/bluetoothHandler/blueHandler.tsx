/// <reference types="web-bluetooth" />

let device: BluetoothDevice;

export async function bluetoothInit() {
    if (!navigator.bluetooth) console.log("Error in connecting");
    // If a device was previously connected, disconnect and remove reference
    if (device) {
      try {
        device.gatt?.disconnect();
        console.log(`Disconnected from ${device.name}`);
      } catch (error) {
        console.warn("Error while disconnecting:", error);
      }
    }

    if (!device) await requestDevice();
  
    const connectButton = document.querySelector("ConnectButton");
    if (connectButton) {
      connectButton.textContent = "connecting...";
    }

    await connectDevice();
  }

  async function requestDevice() {
    const options = {
      /* UUID stuff goes here... */
      filters: [
        {namePrefix: "ESP32" } // Match devices whose names start with "ESP32"
      ],
    };

    device = await navigator.bluetooth.requestDevice(options);
    device.addEventListener("gattserverdisconnected", connectDevice);
  }
  
  async function connectDevice() {  
    if (!device || !device.gatt) {
      throw new Error('Device or GATT server is not available');
    }

    await device.gatt.connect();
  
    console.log("connected");
  }

  export function disconnectDevice(): void {
    if (device?.gatt?.connected) {
      device.gatt.disconnect(); // Disconnect from the device
      window.location.reload(); // Refresh the window so that new connections can be made
      console.log('Device disconnected:' + device.name);
    } else {
      console.log('No device is connected');
    }
  }

  export async function getDevice(): Promise<BluetoothDevice> {
    return device;
  }