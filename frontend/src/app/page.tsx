import Image from "next/image";
import './index.css'
import useLocalStorage from 'use-local-storage';
import { useRouter } from "next/navigation";
import axios from "axios"
import Connect from "./connect/page";

export const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})


export default function Home() {

  return (
    <Connect />
  );
}

