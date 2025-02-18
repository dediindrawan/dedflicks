import { useEffect } from 'react';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { Clapperboard, ChevronRight } from 'lucide-react';

import tmdbLogo from '../assets/tmdb-logo.png';
import { Banner } from '../components/Banner';
import { NavigationItems } from '../components/NavigationItems';
import { CardContainer } from '../components/CardContainer';
import { CardBody } from '../components/CardBody';
import { useTitle } from '../context/TitleContext';

const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

export const HomePage = () => {
  const location = useLocation();
  const { changeTitle } = useTitle();
  const { nowPlaying, trending, upComing } = useLoaderData();

  if ((nowPlaying, trending, upComing)) {
    nowPlaying.length = 10;
    trending.length = 10;
    upComing.length = 10;
  }

  useEffect(() => {
    changeTitle('DedFlicks');

    window.scrollTo(0, 0);
  }, [changeTitle, location]);

  return (
    <div className="container">
      <header className="header">
        <Link to={'/'} className="brand">
          De<span>dF</span>licks
        </Link>

        <span className="banner">
          <Banner />
        </span>
      </header>

      <nav className="navbar">
        <NavigationItems />
      </nav>

      <main className="main-home-page">
        <section className="now-playing-content">
          <CardContainer headingTitle="Now playing" to={'/movies'} state={{ cattegory: 'nowPlaying' }}>
            {nowPlaying?.map((data) => (
              <Link to={`/details/movie/${data?.id}`} key={data?.id}>
                <CardBody src={`${BASE_IMAGE_URL}${data?.poster_path}`} alt={data?.title} title={data?.title}>
                  <h3>{data?.title}</h3>
                </CardBody>
              </Link>
            ))}
          </CardContainer>
        </section>

        <section className="trending-content">
          <CardContainer headingTitle="Trending this week" to={'/movies'} state={{ cattegory: 'trending' }}>
            {trending?.map((data) => (
              <Link to={`/details/movie/${data?.id}`} key={data?.id}>
                <CardBody src={`${BASE_IMAGE_URL}${data?.poster_path}`} alt={data?.title} title={data?.title}>
                  <h3>{data?.title}</h3>
                </CardBody>
              </Link>
            ))}

            <Link to={'/movies'} className="button-card" state={{ cattegory: 'trending' }}>
              See all
              <ChevronRight className="-mt-[0.1rem] ml-1" size={18} />
            </Link>
          </CardContainer>
        </section>

        <section className="upcoming-content">
          <CardContainer headingTitle="Coming soon" to={'/movies'} state={{ cattegory: 'upComing' }}>
            {upComing?.map((data) => (
              <Link to={`/details/movie/${data?.id}`} key={data?.id}>
                <CardBody src={`${BASE_IMAGE_URL}${data?.poster_path}`} alt={data?.title} title={data?.title}>
                  <h3>{data?.title}</h3>
                </CardBody>
              </Link>
            ))}

            <Link to={'/movies'} className="button-card" state={{ cattegory: 'upComing' }}>
              See all
              <ChevronRight className="-mt-[0.1rem] ml-1" size={18} />
            </Link>
          </CardContainer>
        </section>
      </main>

      <footer className="footer-home-page">
        <small>
          <Clapperboard className="mt-[0.1rem] text-cyan-300" size={'0.75rem'} /> That's all for now.
        </small>

        <small>
          &copy; {new Date().getFullYear()} <Link to={'/'}>DedFlicks</Link> by:{' '}
          <Link to={'https://dediindrawan.vercel.app'} target="_blank" rel="noopener noreferrer">
            Dedi Indrawan
          </Link>
        </small>

        <small>
          Source data movie from{' '}
          <Link to={'https://www.themoviedb.org'} target="_blank" rel="noopener noreferrer">
            TMDB (The Movie Database)
          </Link>
        </small>

        <img src={tmdbLogo} alt="logo" />
      </footer>
    </div>
  );
};
