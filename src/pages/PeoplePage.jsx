import { useState, useEffect } from 'react';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { PeopleMenu } from '../components/PeopleMenu';
import { CardBody } from '../components/CardBody';
import { useTitle } from '../context/TitleContext';
import { fetchPeoplePopular } from '../apis/loaders';
import { useLocation } from 'react-router-dom';

const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

export const PeoplePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { changeTitle } = useTitle();
  const { peoplePopular } = useLoaderData();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [dataPeople, setDataPeople] = useState(peoplePopular);

  useEffect(() => {
    changeTitle('People | DedFlicks');

    window.scrollTo(0, 0);
  }, [changeTitle, location]);

  // pagination data
  const loadMoreHandleClick = async () => {
    if (!hasMore) return;

    try {
      const data = await fetchPeoplePopular(page + 1);
      setDataPeople((prevPeoplePopular) => [...prevPeoplePopular, ...data.results]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data?.page < data?.total_pages);
    } catch (error) {
      console.error('Error loading more people:', error);
    }
  };

  return (
    <div className="container">
      <nav className="people-page-navigation">
        <button onClick={() => navigate(-1)} className="button-home">
          <ArrowLeft />
        </button>

        <Link to={'/search'} className="button-search">
          Search
        </Link>
      </nav>

      <header className="button-menu">
        <PeopleMenu />
      </header>

      <main className="main-people-page">
        <section className="people-list">
          {dataPeople?.map((data) => (
            <Link to={data?.id ? `/details/people/${data?.id}` : '#'} key={data?.id}>
              <CardBody src={`${BASE_IMAGE_URL}${data?.profile_path}`} alt={data?.name}>
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
