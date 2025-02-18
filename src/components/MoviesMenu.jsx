import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import moviesMenu from '../data/moviesMenu.json';

export const MoviesMenu = ({ onClick, initialMenuActive }) => {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(1);

  useEffect(() => {
    initialMenuActive && setMenuActive(initialMenuActive);

    window.scrollTo(0, 0);
  }, [initialMenuActive, location]);

  return (
    <ul>
      {moviesMenu.map((movieMenu) => (
        <li key={movieMenu?.id}>
          <button
            onClick={() => {
              setMenuActive(movieMenu?.id);
              onClick(movieMenu?.id);
            }}
            className={menuActive === movieMenu?.id ? 'menu-active' : ''}
          >
            {movieMenu?.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
