import { useState, useEffect } from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { MoviesMenu } from '../components/MoviesMenu';
import { CardBody } from '../components/CardBody';
import { useTitle } from '../context/TitleContext';
import { fetchMoviesByCattegory } from '../apis/loaders';

const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

export const MoviesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { changeTitle } = useTitle();
  const { nowPlaying, trending, upComing } = useLoaderData();

  const cattegory = location.state?.cattegory || 'nowPlaying';
  const [currentCattegory, setCurrentCattegory] = useState(cattegory);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [dataMovies, setDataMovies] = useState(() => {
    switch (currentCattegory) {
      case 'nowPlaying':
        return nowPlaying;
      case 'trending':
        return trending;
      case 'upComing':
        return upComing;
      default:
        return [];
    }
  });

  useEffect(() => {
    changeTitle('Movies | DedFlicks');

    window.scrollTo(0, 0);
  }, [changeTitle, location]);

  const buttonMenuHandleClick = (id) => {
    if (id === 1) {
      setCurrentCattegory('nowPlaying');
      setDataMovies(nowPlaying);
      setPage(1);
      setHasMore(true);
    } else if (id === 2) {
      setCurrentCattegory('trending');
      setDataMovies(trending);
      setPage(1);
      setHasMore(true);
    } else if (id === 3) {
      setCurrentCattegory('upComing');
      setDataMovies(upComing);
      setPage(1);
      setHasMore(true);
    }
  };

  const loadMoreHandleClick = async () => {
    if (!hasMore) return;

    try {
      const data = await fetchMoviesByCattegory(currentCattegory, page + 1);
      setDataMovies((prevMovies) => [...prevMovies, ...data.results]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data?.page < data?.total_pages);
    } catch (error) {
      console.error('Error loading more movies:', error);
    }
  };

  return (
    <div className="container">
      <nav className="movies-page-navigation">
        <button onClick={() => navigate(-1)} className="button-home">
          <ArrowLeft />
        </button>

        <Link to={'/search'} className="button-search">
          Search
        </Link>
      </nav>

      <header className="button-menu">
        <MoviesMenu onClick={buttonMenuHandleClick} initialMenuActive={currentCattegory === 'nowPlaying' ? 1 : currentCattegory === 'trending' ? 2 : 3} />
      </header>

      <main className="main-movies-page">
        <section className="movies-list">
          {dataMovies?.map((data) => (
            <Link to={data?.id ? `/details/movie/${data?.id}` : '#'} key={data?.id}>
              <CardBody src={`${BASE_IMAGE_URL}${data?.poster_path}`} alt={data?.title}>
                <h3>{data?.title}</h3>
              </CardBody>
            </Link>
          ))}
        </section>
      </main>

      <footer className="button-load-more">{hasMore && <button onClick={loadMoreHandleClick}>Load More</button>}</footer>
    </div>
  );
};
