import Image from "next/image";
import './index.css'

import useLocalStorage from 'use-local-storage';
import { useRouter } from "next/navigation";

import Connect from "./connect/page";

export default function Home() {

  return (
    <Connect />
  );
}

