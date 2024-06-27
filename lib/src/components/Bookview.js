import React, { useEffect, useState } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import Page from './page';


// const bookContent = [
//   "Page 1 Content",
//   "Page 2 Content",
//   "Cntr 3 pbagrag",
//    "Page 4 Content",
//   "Page 5 Content",
// ];

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache:new InMemoryCache(),
    });

const GET_BOOK = gql`
    query GetBook($title: String!) {
    getBook(title: $title) {
      title
      author
      pages {
        pageIndex
        content
        tokens {
          position
          value
        }
      }
    }
  }
`;

const bookTitles = [
  { value: "a_color_of_his_own", label: "A Color of His Own" },
  { value: "fishing_in_the_air", label: "Fishing in the Air" },
];


const BookViewer = (title) => {
    const [bookContent, setBookContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const { data } = useQuery(GET_BOOK, {
        variables: { title },
    });
    useEffect(() => {
        if(data && data.getBook){
            document.title = data.getBook.title;
        }
    }, console.log[data]);

    const book = data.getBook;
    if(!book) return <p>No book available</p>
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
    <ApolloProvider client = {client}>
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
    </ApolloProvider>
  );
};

export default BookViewer;
