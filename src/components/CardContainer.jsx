import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const CardContainer = ({ headingTitle, children, ...props }) => {
  return (
    <>
      <span>
        <h3>{headingTitle}</h3>

        <Link {...props}>
          See all <ChevronRight className="-mt-[0.1rem] ml-1" size={18} />
        </Link>
      </span>

      <div className="card-container">{children}</div>
    </>
  );
};
