import Link from "next/link";
import { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";


export default function Home() {
  const [music, setMusic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateMusic = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const { music } = await response.json();
      setMusic(music);
    } catch (error) {
      console.error("Failed to generate music:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="md:flex ">
      <div className=" grow flex flex-col items-center justify-center h-screen bg-slate-200 max-w-4xl rounded-lg hover:bg-slate-300 transition-all duration-500">
      <h1 className="text-3xl font-bold mb-6">AI Music Generator</h1>
      
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt"
        className="px-4 py-2 text-black border border-gray-500 rounded-lg mb-4 w-64"
      />
      <button
        onClick={generateMusic}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-800 transition-all duration-500"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Music"}
      </button>
      {isLoading && (
        <div className="mt-4">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c3.042 0 5.824-1.135 7.938-3l-2.647-3A7.962 7.962 0 0112 16v4zm5.291-6A7.962 7.962 0 0112 20v4c4.418 0 8-3.582 8-8h-4zM16.938 3C15.824 1.135 13.042 0 10 0v4c1.79 0 3.527.684 4.826 1.938L16.937 3z"
            ></path>
          </svg>
          Generating music...
        </div>
      )}
      {music && <audio className="mt-4" controls src={music} />}
    </div>
      <div className="flex gap-2 md:gap-0 md:flex-col bg-slate-400 hover:bg-slate-300 transition-colors duration-500 grow items-center justify-center">
        <div className="text-lg text-gray-600">Created By</div>
        <Link href={'https://www.linkedin.com/in/abir-dutta-a30b22251/'} className="flex md:gap-2 items-center justify-center"><div className="md:text-5xl font-bold text-gray-700 hover:text-gray-900 transition-colors duration-500">Abir Dutta</div><FaArrowAltCircleRight className="md:size-9" /></Link>
      </div>
    </div>
  );
}