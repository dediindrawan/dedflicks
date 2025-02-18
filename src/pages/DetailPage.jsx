import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Star, Calendar, UserCheck, Briefcase } from 'lucide-react';

import { ListDetails } from '../components/ListDetails';
import { CardBody } from '../components/CardBody';
import { useTitle } from '../context/TitleContext';
import { useButtonReadMore } from '../hooks/UseButtonReadMore';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

export const DetailPage = () => {
  const [data, setData] = useState(null);
  const [credit, setCredit] = useState([]);
  const [key, setKey] = useState(null);

  const navigate = useNavigate();
  const { type, id } = useParams(); // get 'type' and 'id' from URL
  const { changeTitle } = useTitle();

  const { synopsisReadMore, buttonSynopsisReadMoreHandleClick, biographyReadMore, buttonBiographyReadMoreHandleClick, castReadMore, buttonCastReadMoreHandleClick } = useButtonReadMore();

  //   get api global data content
  const getDataContent = async () => {
    try {
      let url = '';

      if (type === 'movie') {
        url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
      } else if (type === 'tv') {
        url = `${BASE_URL}/tv/${id}?api_key=${API_KEY}`;
      } else if (type === 'people') {
        url = `${BASE_URL}/person/${id}?api_key=${API_KEY}`;
      } else {
        console.error('Unknown type');
        return;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error message:', error);
    }
  };

  useEffect(() => {
    if (type && id) {
      getDataContent();
    }
  }, [type, id]); // add 'type' and 'id' into dependency

  // get api credit content
  const getCreditContent = async () => {
    try {
      let url = '';

      if (type === 'movie') {
        url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
      } else {
        console.error('Unknown type');

        return;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error fetching credits');
      }

      const results = await response.json();
      setCredit(results);
    } catch (error) {
      console.error('Error message:', error);
    }
  };

  //   get api key content to watching video if available
  const getKeyContent = async () => {
    try {
      let url = '';

      if (type === 'movie') {
        url = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`;
      } else if (type === 'tv') {
        url = `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`;
      } else {
        console.error('Unknown type');

        return;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(error);
      }

      const results = await response.json();
      setKey(results.results[0]);
    } catch (error) {
      console.error('Error message:', error);
    }
  };

  useEffect(() => {
    getCreditContent();
    getKeyContent();
  }, []);

  //   change format date
  const dateFormated = (dateString) => {
    const releaseDate = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formated = releaseDate.toLocaleDateString('us-US', options).replace(', ', '-').replace(' ', ', ');

    return formated;
  };

  useEffect(() => {
    changeTitle('Details | DedFlicks');
  }, [changeTitle]);

  if (!data) {
    return (
      <span className="loading">
        <p>
          Failed to load data, please try again later. <br /> <br />{' '}
          <Link to={'/'} className="underline text-cyan-300">
            Back to home
          </Link>
        </p>
      </span>
    );
  }

  return (
    <div className="container">
      <nav className="detail-page-navigation">
        <button onClick={() => navigate(-1)} className="button-back">
          <ArrowLeft />
        </button>

        <Link to={'/search'} className="button-search">
          Search
        </Link>
      </nav>

      <header className="detail-page-header">
        <figure>
          <img src={`${BASE_IMAGE_URL}${data?.backdrop_path || data?.poster_path || data?.profile_path}`} alt={data?.title || data?.name} />
        </figure>
      </header>

      <main className="main-detail-page">
        {(data && credit) || key ? (
          <>
            {key ? (
              <Link to={key ? `/play-video/${key?.key}` : `/error-page`} className="movie-clip-section reveal-scroll">
                <Play className="play-icon" />
              </Link>
            ) : (
              <div className="movie-clip-section reveal-scroll"></div>
            )}

            <section className="thumbnail-section reveal-scroll">
              <CardBody src={`${BASE_IMAGE_URL}${data?.poster_path || data?.profile_path}`} alt={data?.title || data?.name}>
                <h1>{data?.title || data?.name || 'No Title Available'}</h1>

                {data?.release_date ? (
                  <>
                    <p>
                      <Calendar className="calendar-icon" size={16} /> {dateFormated(data?.release_date) || '-'}
                    </p>
                    <p>
                      <Star className="star-icon" size={16} /> {data?.vote_average.toString().length > 2 ? data?.vote_average.toString().substring(0, 3) : data?.vote_average.toString() + '.0'} / 10.0
                    </p>
                  </>
                ) : !data?.release_date && !data?.gender ? (
                  <>
                    <p>
                      <Calendar className="calendar-icon" size={16} /> {dateFormated(data?.first_air_date || '-')}
                    </p>
                    <p>
                      <Star className="star-icon" size={16} /> {data?.vote_average.toString().length > 2 ? data?.vote_average.toString().substring(0, 3) : data?.vote_average.toString() + '.0'} / 10.0
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <UserCheck className="calendar-icon" size={16} /> {data?.gender === 1 ? 'Female' : 'Male'}
                    </p>
                    <p>
                      <Briefcase className="calendar-icon" size={16} /> {data?.known_for_department || '-'}
                    </p>
                  </>
                )}
              </CardBody>
            </section>

            <section className="detail-section">
              <h2 className="reveal-scroll">Details</h2>

              {/* genre */}
              {data?.genres ? (
                <ListDetails className="reveal-scroll" title="Genre:" description={data?.genres.map((genre) => genre?.name).join(', ') || '-'} />
              ) : (
                <ListDetails title="Date of Birth:" description={dateFormated(data?.birthday || '-')} />
              )}

              {/* synopsis */}
              {/* fallback to handling empty string overview */}
              {data?.overview === '' && <ListDetails title="Synopsis:" description={'-'} />}

              {/* normally handling rendering data */}
              {data?.overview ? (
                <>
                  {synopsisReadMore ? (
                    <>
                      <ListDetails
                        title="Synopsis:"
                        description={
                          <>
                            {data?.overview && (
                              <>
                                {data?.overview}

                                {data?.overview && (
                                  <button className="button-read" onClick={buttonSynopsisReadMoreHandleClick}>
                                    Read less
                                  </button>
                                )}
                              </>
                            )}
                          </>
                        }
                      />
                    </>
                  ) : (
                    <>
                      <ListDetails
                        title="Synopsis:"
                        description={
                          <>
                            {data?.overview ? (
                              // truncate text if text length over than 218 characters and set text content button with Read more
                              <>
                                {data?.overview?.length > 218 ? data?.overview?.substring(0, 218) + '...' : data?.overview}

                                {data?.overview?.length > 218 && (
                                  <button className="button-read" onClick={buttonSynopsisReadMoreHandleClick}>
                                    Read more
                                  </button>
                                )}
                              </>
                            ) : (
                              '-'
                            )}
                          </>
                        }
                      />
                    </>
                  )}
                </>
              ) : (
                <>{data?.place_of_birth && <ListDetails title="Place of Birth:" description={data?.place_of_birth || '-'} />}</>
              )}

              {/* crew */}
              {credit?.crew !== undefined && (
                <>
                  <ListDetails
                    title="Story Writer:"
                    description={
                      credit?.crew
                        .filter((writer) => writer?.department === 'Writing')
                        .map((writer) => writer?.name)
                        .join(', ') || '-'
                    }
                  />
                  <ListDetails
                    title="Director:"
                    description={
                      credit?.crew
                        .filter((director) => director?.job === 'Director')
                        .map((director) => director?.name)
                        .join(', ') || '-'
                    }
                  />
                  <ListDetails
                    title="Producer:"
                    description={
                      credit?.crew
                        .filter((producer) => producer?.job === 'Producer')
                        .map((producer) => producer?.name)
                        .join(', ') || '-'
                    }
                  />
                </>
              )}

              {/* production companies */}
              {data?.production_companies ? (
                <ListDetails title="Production Companies:" description={data?.production_companies.map((prod) => prod?.name).join(', ') || '-'} />
              ) : (
                // biography
                <>
                  {biographyReadMore ? (
                    <>
                      <ListDetails
                        title="Biography:"
                        description={
                          <>
                            {data?.biography && (
                              <>
                                {data?.biography}

                                {data?.biography && (
                                  <button className="button-read" onClick={buttonBiographyReadMoreHandleClick}>
                                    Read less
                                  </button>
                                )}
                              </>
                            )}
                          </>
                        }
                      />
                    </>
                  ) : (
                    <ListDetails
                      title="Biography:"
                      description={
                        <>
                          {data?.biography ? (
                            // truncate text if text length over than 218 characters and set text content button with Read more
                            <>
                              {data?.biography?.length > 218 ? data?.biography?.substring(0, 218) + '...' : data?.biography}

                              {data?.biography?.length > 218 && (
                                <button className="button-read" onClick={buttonBiographyReadMoreHandleClick}>
                                  Read more
                                </button>
                              )}
                            </>
                          ) : (
                            '-'
                          )}
                        </>
                      }
                    />
                  )}
                </>
              )}

              {/* cast */}
              {credit?.cast && (
                <>
                  {castReadMore ? (
                    <ListDetails
                      title="Cast:"
                      description={
                        <>
                          {credit?.cast !== undefined && credit?.cast?.length !== 0 && (
                            <>
                              {credit?.cast.map((cast) => cast?.name).join(', ')}

                              {credit?.cast && (
                                <button className="button-read" onClick={buttonCastReadMoreHandleClick}>
                                  Read less
                                </button>
                              )}
                            </>
                          )}
                        </>
                      }
                    />
                  ) : (
                    <ListDetails
                      title="Cast:"
                      description={
                        <>
                          {credit?.cast !== undefined && credit?.cast?.length !== 0 ? (
                            // truncate text if text length over than 218 characters and set text content button with Read more
                            <>
                              {credit?.cast.map((cast) => cast?.name).join(', ')?.length > 218
                                ? credit?.cast
                                    .map((cast) => cast?.name)
                                    .join(', ')
                                    ?.substring(0, 218) + '...'
                                : credit?.cast.map((cast) => cast?.name).join(', ')}

                              {credit?.cast.map((cast) => cast?.name).join(', ')?.length > 218 && (
                                <button className="button-read" onClick={buttonCastReadMoreHandleClick}>
                                  Read more
                                </button>
                              )}
                            </>
                          ) : (
                            '-'
                          )}
                        </>
                      }
                    />
                  )}
                </>
              )}
            </section>
          </>
        ) : (
          <p className="loading">Loading...</p>
        )}
      </main>
    </div>
  );
};
