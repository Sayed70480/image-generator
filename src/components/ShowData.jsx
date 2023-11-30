import React, { useState, useEffect } from 'react';
import './showdata.css'; // Import your CSS file
import SearchBar from './searchbar.jsx';
import Button from 'react-bootstrap/Button';

function ShowData() {
  const [data, setData] = useState("");
  console.log("data : " + data)
  const [fetchData, setFetchData] = useState([]);
 
  const [page, setPage] = useState(1);

  const onsubmit = (obj) => {
    if (obj) {
      setData(obj);
     
    } else {
      setData('');
    }
    setPage(1);
  };

  useEffect(() => {
    const accessKey = "m94I_Ajd7DdVzh1VVwgoxjZtpb1woQQmmmsyB9pwDGc";

    async function searchImg() {
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${data.text}&client_id=${accessKey}`;
      const response = await fetch(url);
      const responseData = await response.json();
      const result = responseData.results;
      if (page === 1) {
        setFetchData([])
        setFetchData(result);
      } else {
        setFetchData((prevData) => [...prevData, ...result]);
      }
    }

    searchImg(); // Call this function when 'data' or 'page' changes
  }, [data, page]); // Watch 'data' and 'page'

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 500) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Add and remove the event listener on mount/unmount

  return (
    <>
      <SearchBar onsubmit={onsubmit} />
      <div className='data-container'>
        {fetchData.map((alldata, index) => (
          <div className='card' key={index}>
            <img src={alldata.urls.small} alt={`Image ${index}`} />
          </div>
        ))}
       
      </div>
    </>
  );
}

export default ShowData;
