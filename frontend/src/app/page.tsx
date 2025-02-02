"use client";

import './index.css'

import axios from "axios"

import Connect from "./connect/page";

// @ts-ignore
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

