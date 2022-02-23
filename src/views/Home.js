import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react"; 
import getWeather from "../API";


export default function Home() {
  useEffect(()=> {
    getWeather();
  })

  return (
    <>
    <h1>Home</h1>
    <Navbar />
    <Footer />
    </>
  );
}