import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import tvSeriesMenu from '../data/tvSeriesMenu.json';

export const TvSeriesMenu = ({ onClick, initialMenuActive }) => {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(1);

  useEffect(() => {
    initialMenuActive && setMenuActive(initialMenuActive);

    window.scrollTo(0, 0);
  }, [initialMenuActive, location]);

  return (
    <ul>
      {tvSeriesMenu.map((tvMenu) => (
        <li key={tvMenu?.id}>
          <button
            onClick={() => {
              setMenuActive(tvMenu?.id);
              onClick(tvMenu?.id);
            }}
            className={menuActive === tvMenu?.id ? 'menu-active' : ''}
          >
            {tvMenu?.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
