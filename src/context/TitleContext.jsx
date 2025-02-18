import { createContext, useContext, useState } from 'react';

const TitleContext = createContext();

export const useTitle = () => {
  return useContext(TitleContext); // custom hook for using context
};

export const TitleProvider = ({ children }) => {
  const [title, setTitle] = useState(null);

  // function to change title
  const changeTitle = (newTitle) => {
    setTitle(newTitle);
    document.title = newTitle;
  };

  return <TitleContext.Provider value={{ title, changeTitle }}>{children}</TitleContext.Provider>;
};
