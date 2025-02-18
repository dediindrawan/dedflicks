import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import peopleMenu from '../data/peopleMenu.json';

export const PeopleMenu = ({ onClick, initialMenuActive }) => {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(1);

  useEffect(() => {
    initialMenuActive && setMenuActive(initialMenuActive);

    window.scrollTo(0, 0);
  }, [initialMenuActive, location]);

  return (
    <ul>
      {peopleMenu.map((peopleMenu) => (
        <li key={peopleMenu?.id}>
          <button
            // onClick={() => {
            //   setMenuActive(peopleMenu?.id);
            //   onClick(peopleMenu?.id);
            // }}
            className={menuActive === peopleMenu?.id ? 'menu-active' : ''}
          >
            {peopleMenu?.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
