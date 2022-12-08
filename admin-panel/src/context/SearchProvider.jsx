import React, { createContext, useContext, useState } from 'react'
import { searchPost } from '../api/post';
import { useNotification } from './NotificationProvider';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);

  const { updateNotification } = useNotification();

  const handleSearch = async (query) => {
    const { success, posts, message } = await searchPost(query);
    if (success) setSearchResult(posts);
    else updateNotification("error", message);
  }

  const resetSearch = () => {
    setSearchResult([]);
  }

  return (
    <SearchContext.Provider value={{ searchResult, handleSearch, resetSearch }} >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext);

export default SearchProvider