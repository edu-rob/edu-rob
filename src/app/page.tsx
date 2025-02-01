import Image from "next/image";
import './index.css'

import useLocalStorage from 'use-local-storage';
import { useRouter } from "next/navigation";

import Landing from "./landing/landing";

export default function Home() {

  return (
    <Landing />
  );
}

