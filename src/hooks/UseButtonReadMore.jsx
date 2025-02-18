import { useState } from 'react';

export const useButtonReadMore = () => {
  const [synopsisReadMore, setSynopsisReadMore] = useState(false);
  const [biographyReadMore, setBiographyReadMore] = useState(false);
  const [castReadMore, setCastReadMore] = useState(false);

  const buttonSynopsisReadMoreHandleClick = () => {
    setSynopsisReadMore(!synopsisReadMore);
  };

  const buttonBiographyReadMoreHandleClick = () => {
    setBiographyReadMore(!biographyReadMore);
  };

  const buttonCastReadMoreHandleClick = () => {
    setCastReadMore(!castReadMore);
  };

  return { synopsisReadMore, buttonSynopsisReadMoreHandleClick, biographyReadMore, buttonBiographyReadMoreHandleClick, castReadMore, buttonCastReadMoreHandleClick };
};
