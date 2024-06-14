import React, { useEffect, useState } from 'react';
import Page from './page';

// const bookContent = [
//   "Page 1 Content",
//   "Page 2 Content",
//   "Cntr 3 pbagrag",
//    "Page 4 Content",
//   "Page 5 Content",
// ];

const BookViewer = () => {
  const [bookContent, setBookContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  
  useEffect(() => {
    fetch('http://localhost:4000/graphql/', {
        method: 'GET',
        body: JSON.stringify({data})
    }).catch(function(error) {
        console.log(error)
    })
      .then((r) => r.json())
      .then((data) => console.log(data))
  }, [])
  const handleNext = () => {
    if (currentPage < bookContent.length - 2) {
      setCurrentPage(currentPage + 2);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 2);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen justify-between">
      <div className="flex w-[90%] h-4/5 justify-between">
        <Page content={bookContent[currentPage]} />
        <Page content={bookContent[currentPage + 1]} />
      </div>
      <div className="flex justify-between w-[50%]">
        <button className='px-[20px] py-[10px] text-[16px]' onClick={handlePrevious} disabled={currentPage === 0}>Previous</button>
        <button  className='px-[20px] py-[10px] text-[16px]'onClick={handleNext} disabled={currentPage >= bookContent.length - 2}>Next</button>
      </div>
    </div>
  );
};

export default BookViewer;
