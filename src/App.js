import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Component/Pages/Home";

function App() {
  useEffect(() => {
    const importTE = async () => {
      await import("tw-elements");
    };
    importTE();
  }, []);
  return (
    <div className="mx-28 mt-8">
      <Home />
      <ToastContainer />
    </div>
  );
}

export default App;
