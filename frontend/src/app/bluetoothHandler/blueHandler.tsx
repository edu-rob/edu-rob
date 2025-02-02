/// <reference types="web-bluetooth" />

let device: BluetoothDevice;
let server: BluetoothRemoteGATTServer;
let service: BluetoothRemoteGATTService;
let characteristic: BluetoothRemoteGATTCharacteristic;
const SERVICE_UUID: string = "b0fb72c7-adb9-4e75-b8da-4228a4341af7"
const CHARACTERISTIC_UUID: string = "e5bb21f5-ae3b-4959-8815-fcfa0627091f"

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
        {namePrefix: "RobBT" } /* Match devices whose names start with "
                                * RobBT" and then followed by some number
                                */
      ],
      optionalServices: [SERVICE_UUID]
    };

    device = await navigator.bluetooth.requestDevice(options);
    device.addEventListener("gattserverdisconnected", connectDevice);
  }
  
  async function connectDevice() {  
    if (!device || !device.gatt) {
      throw new Error('Device or GATT server is not available');
    }

    server = await device.gatt.connect();
    console.log("Server: " + server)
    service = await server.getPrimaryService(SERVICE_UUID);
    console.log("Service: " + service)
    characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);
    console.log("Characteristic: " + characteristic)
  
    console.log("connected!");
  }

  export async function sendDataToDevice(data: string): Promise<boolean> {
    try {
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(data);

      let response = await characteristic.writeValueWithResponse(encodedData);
      console.log("Sent data: " + data)
      console.log("Response: " + response)
      return true;
    } catch(err) {
      console.log(err)
      return false;
    }
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

  export function getDevice(): BluetoothDevice {
    return device;
  }