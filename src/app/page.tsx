import Image from "next/image";
import './index.css'

import useLocalStorage from 'use-local-storage';
import { useRouter } from "next/router";

import NavBar from "../components/navBar/navBar";
import Landing from "../pages/landing/landing";

export default function Home() {

  return (
  <>
    <NavBar/>
    <Landing />
  </>
  );
}
