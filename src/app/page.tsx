import Image from "next/image";
import './index.css'

import useLocalStorage from 'use-local-storage';
import { useRouter } from "next/navigation";

import Landing from "./landing/page";
import Connect from "./connect/page";

export default function Home() {

  return (
    <Landing />
  );
}

