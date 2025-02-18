import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTitle } from '../context/TitleContext';

export const ErrorPage = () => {
  const navigate = useNavigate();
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle('Error Page | DedFlicks');
  }, [changeTitle]);

  return (
    <div className="error-page">
      <span>
        <h1>Oops! Something Went Wrong.</h1>

        <p>We're sorry, but it looks like the content you were looking for doesn't have a video clip or trailer available at the moment. This could be due to the video not being uploaded yet or it's currently unavailable.</p>

        <p>Please feel free to explore other content or try again later. We’re constantly updating our collection to provide the best viewing experience for you!</p>

        <p>Thank you for your understanding.</p>

        <span>
          <button onClick={() => navigate(-1)}>Back to previous page</button>
          <Link to={'/'}>Back to home page</Link>
        </span>
      </span>
    </div>
  );
};
