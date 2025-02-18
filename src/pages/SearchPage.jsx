import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';

import { SearchForm } from '../components/SearchForm';
import { CardBody } from '../components/CardBody';
import { useTitle } from '../context/TitleContext';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

export const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const contentRef = useRef(null);
  const { changeTitle } = useTitle();
  const { searchQuery } = useParams();
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState(searchQuery || '');

  const searchInputHandleChange = (e) => {
    e.preventDefault();

    setQuery(searchInputRef.current.value);
  };

  // multi search data
  const getDataSearch = async (query) => {
    if (!query) return;

    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);

    try {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSearchData(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    changeTitle('Search | DedFlicks');

    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (query) {
      getDataSearch(query);
    } else {
      setSearchData([]); // Kosongkan hasil pencarian jika query kosong
    }
  }, [query]); // Update pencarian saat query berubah

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery); // Set query saat halaman pertama kali dimuat
    }
  }, [searchQuery]);

  return (
    <div className="container">
      <div className="search-form-wrapper">
        <nav>
          <Link to={'/'}>Home</Link>

          <button onClick={() => navigate(-1)} className="text-cyan-300">
            Cancel
          </button>
        </nav>

        <SearchForm onChange={searchInputHandleChange} ref={searchInputRef} />
      </div>

      <main className="main-search-page">
        <section className="search-list" ref={contentRef}>
          {query === '' ? (
            <div className="search-caption">
              <h3 className="text-center">Find your favorite Movies, TV series, or Actors here.</h3>
            </div>
          ) : searchData && searchData?.length > 0 ? (
            searchData?.map((data) => (
              <Link to={data?.media_type === 'movie' ? `/details/movie/${data?.id}` : data?.media_type === 'tv' ? `/details/tv/${data?.id}` : data?.media_type === 'person' ? `/details/people/${data?.id}` : '/details'} key={data?.id}>
                <CardBody src={`${BASE_IMAGE_URL}${data?.poster_path || data?.profile_path}`} alt={data?.name || data?.title}>
                  <h3>{data?.name || data?.title}</h3>
                </CardBody>
              </Link>
            ))
          ) : (
            <p className="search-caption">No result found.</p>
          )}
        </section>
      </main>
    </div>
  );
};
