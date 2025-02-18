import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react'; // import all icon
import navigationItems from '../data/navigationItems.json';

export const NavigationItems = () => {
  return (
    <ul>
      {navigationItems.map((navItem) => {
        // take icon from lucide icon
        const Icon = LucideIcons[navItem.icon];

        // make sure that the icon is valid before rendered
        return (
          Icon && (
            <li key={navItem?.id}>
              <Link to={navItem?.path}>
                <span>
                  {/* icon rendered */}
                  <Icon />
                </span>
                {/* menu text rendered */}
                {navItem?.name}
              </Link>
            </li>
          )
        );
      })}
    </ul>
  );
};
