/// <reference types="web-bluetooth" />

let device: BluetoothDevice;

export async function bluetoothInit() {
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
      /* UUID stuff goes here... */
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

  export function disconnectDevice(): string {
    if (device?.gatt?.connected) {
      device.gatt.disconnect(); // Disconnect from the device
      return ('Device disconnected:' + device.name);
    } else {
      return 'No device is connected.';
    }
  }

  export async function getDevice(): Promise<BluetoothDevice> {
    return device;
  }