import { useState, useEffect } from 'react';
import { Link, useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { TvSeriesMenu } from '../components/TvSeriesMenu';
import { CardBody } from '../components/CardBody';
import { useTitle } from '../context/TitleContext';
import { fetchTvSeriesByCattegory } from '../apis/loaders';

const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

export const TvSeriesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { changeTitle } = useTitle();
  const { popular, topRated } = useLoaderData();
  const [currentCattegory, setCurrentCattegory] = useState('popular');

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [dataTvSeries, setDataTvSeries] = useState(() => {
    switch (currentCattegory) {
      case 'popular':
        return popular;
      case 'topRated':
        return topRated;
      default:
        return [];
    }
  });

  useEffect(() => {
    changeTitle('Tv Series | DedFlicks');

    window.scrollTo(0, 0);
  }, [changeTitle, location]);

  const buttonMenuHandleClick = (id) => {
    if (id === 1) {
      setCurrentCattegory('popular');
      setDataTvSeries(popular);
      setPage(1);
      setHasMore(true);
    } else if (id === 2) {
      setCurrentCattegory('topRated');
      setDataTvSeries(topRated);
      setPage(1);
      setHasMore(true);
    }
  };

  const loadMoreHandleClick = async () => {
    if (!hasMore) return;

    try {
      const data = await fetchTvSeriesByCattegory(currentCattegory, page + 1);
      setDataTvSeries((prevTvSeries) => [...prevTvSeries, ...data.results]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data?.page < data?.total_pages);
    } catch (error) {
      console.error('Error loading more movies:', error);
    }
  };

  return (
    <div className="container">
      <nav className="tv-series-page-navigation">
        <button onClick={() => navigate(-1)} className="button-home">
          <ArrowLeft />
        </button>

        <Link to={'/search'} className="button-search">
          Search
        </Link>
      </nav>

      <header className="button-menu">
        <TvSeriesMenu onClick={buttonMenuHandleClick} />
      </header>

      <main className="main-tv-series-page">
        <section className="tv-series-list">
          {dataTvSeries?.map((data) => (
            <Link to={data?.id ? `/details/tv/${data?.id}` : '#'} key={data?.id}>
              <CardBody src={`${BASE_IMAGE_URL}${data?.poster_path}`} alt={data?.name}>
                <h3>{data?.name}</h3>
              </CardBody>
            </Link>
          ))}
        </section>
      </main>

      <footer className="button-load-more">{hasMore && <button onClick={loadMoreHandleClick}>Load More</button>}</footer>
    </div>
  );
};
