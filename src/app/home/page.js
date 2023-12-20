// Import necessary modules
"use client";
import React, { useState, useEffect} from "react";
import { IoSearch } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { FaStar } from "react-icons/fa"; // Import the star icon
import { auth } from "../firebase";

const Searchbar = () => {


  const signOut = () => {
    auth.signOut();
    window.location.href = "/login";
  };

  // State to track the loading state, gifs, page, and saved gifs
  const [loading, setLoading] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [savedGifs, setSavedGifs] = useState([]); // Track saved gifs
  const [searchQuery, setSearchQuery] = useState("coding"); // Track user input
  const apiKey = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
  const limit = 6;
  const finalUrl = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${apiKey}&limit=${limit}&offset=${(page - 1) * limit}`;

  // Function to fetch data
  const fetchData = () => {
    setLoading(true);

    fetch(finalUrl)
      .then((resp) => resp.json())
      .then((info) => {
        console.log(info.data);
        // All gifs
        setGifs(info.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch data and load the initial page when the component mounts or search query changes
  useEffect(() => {
    fetchData();
  }, [searchQuery, page]);

  // Function to simulate loading (replace with your actual loading logic)
  const simulateLoading = () => {
    fetchData(); // Fetch new page of results
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSave = (gifUrl) => {
    // Check if the gif is already saved
    const isSaved = savedGifs.includes(gifUrl);

    if (isSaved) {
      // If already saved, remove it from savedGifs
      setSavedGifs(savedGifs.filter((url) => url !== gifUrl));
    } else {
      // If not saved, add it to savedGifs
      setSavedGifs([...savedGifs, gifUrl]);
    }
  };

  const handleSearch = () => {
    setPage(1); // Reset page to 1 when initiating a new search
    simulateLoading(); // Call your actual loading logic here
  };

  return (
    <div className="flex sm:justify-center md:justify-center md:mt-8 ">
      <div className="bg-white p-4 rounded-lg shadow-md md:w-3/4">
        <div className="flex items-center gap-2 space-x-2 md:gap-4 md:space-x-0">
          <div className="flex-shrink-0">
            <IoSearch className="h-6 w-6 text-gray-400 ml-2 md:ml-0" />
          </div>
          <input
            type="text"
            placeholder="Article name or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-2 px-3 md:py-4 md:px-4 rounded-md focus:outline-none border-none bg-slate-100"
          />
          <button
            onClick={handleSearch}
            className="bg-black text-white py-2 md:py-4 md:px-4 px-1 rounded-md relative transition duration-300 hover:bg-gray-800"
          >
            Search
          </button>
          <AiOutlineLogout 
            className={"text-gray-400 w-6 h-6 mr-1 cursor-pointer"}
            onClick={() => (signOut())}
          />
        </div>
        {loading && <div className="loader"></div>}
        <div className="container mx-auto py-10 px-2">
          <div className="grid lg:grid-cols-3 gap-1 ">
            {gifs.map((gif) => (
              <div
                className="shadow-lg rounded-lg w-full h-full overflow-hidden"
                key={gif.id}
              >
                <img
                  className="rounded-lg w-full md:h-[220px] h-[250px] object-cover"
                  src={gif.images.fixed_height.url}
                  alt={gif.title || "GIF"}
                />
                <div className="p-4 flex justify-between">
                  <div className="text-lg font-semibold mb-2">
                    <h3>{gif.title || "Untitled"} </h3>
                  </div>
                  <div className="mt-1.5">
                    <FaStar
                      className={`text-gray-400 mr-1 cursor-pointer ${
                        savedGifs.includes(gif.images.fixed_height.url)
                          ? "text-yellow-500"
                          : ""
                      }`}
                      onClick={() => handleSave(gif.images.fixed_height.url)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
  <button
    onClick={() => handlePageChange(page - 1)}
    disabled={page === 1}
    className="text-white bg-black py-2 px-4 rounded-md ml-2 transition duration-300 hover:bg-gray-400"
  >
    Previous
  </button>
  {[...Array(5).keys()].map((pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber + 1)}
      className={`${
        page === pageNumber + 1
          ? "text-white bg-gray-500"
          : "text-gray-700 hover:text-gray-900"
      } py-2 px-4 rounded-md mx-1 transition duration-300`}
    >
      {pageNumber + 1}
    </button>
  ))}
  {page >= 5 && <span className="py-2 px-4">...</span>}
  <button
    onClick={() => handlePageChange(page + 1)}
    className="text-white bg-black py-2 px-4 rounded-md ml-2 transition duration-300 hover:bg-gray-400"
  >
    Next
  </button>
</div>
          <SavedGifs savedGifs={savedGifs} />
        </div>
      </div>
    </div>
  );
};

// Define the SavedGifs component
const SavedGifs = ({ savedGifs }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Saved GIFs</h2>
      <div className="grid grid-cols-3 gap-4">
        {savedGifs.map((savedGif) => (
          <div
            key={savedGif}
            className="shadow-lg rounded-lg w-full h-full overflow-hidden"
          >
            <img
              className="rounded-lg w-full h-[200px] object-cover"
              src={savedGif}
              alt="Saved GIF"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
