import { Link } from "react-router-dom";
import hero from "../assets/hero.mp4"
const Home = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={hero}
        loop
        muted
        autoPlay
      ></video>
      
      {/* Overlay content */}
      <div className="relative grid content-center w-full h-screen justify-center bg-black/50">
        <h1 className="text-4xl lg:text-6xl text-center font-semibold text-white">
          Welcome to the Invoice App
        </h1>
        <nav className="mt-5 mx-auto">
          <Link
            to="/invoice"
            className="bg-blue-700 items-center justify-center text-white p-3 rounded-lg"
          >
            Create Invoice
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Home;
