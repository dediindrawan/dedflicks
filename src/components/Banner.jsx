import { Link } from 'react-router-dom';

export const Banner = () => {
  return (
    <>
      <span>
        <h2>Time to explore!</h2>
        <p>Start discovering millions of movies.</p>
      </span>
      <Link to={'/search'}>Search</Link>
    </>
  );
};
