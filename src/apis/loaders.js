const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const nowPlayingLoader = () => {
    return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
}

export const trendingLoader = () => {
    return fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
}

export const upComingLoader = () => {
    return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
}

export const popularLoader = () => {
    return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
}

export const topRatedLoader = () => {
    return fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
}

export const peoplePopularLoader = () => {
    return fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}`);
}

export const combinedLoader = async () => {
    const [nowPlayingResponse, trendingResponse, upComingResponse, popularResponse, topRatedResponse, peoplePopularResponse,] = await Promise.all([
        nowPlayingLoader(),
        trendingLoader(),
        upComingLoader(),
        popularLoader(),
        topRatedLoader(),
        peoplePopularLoader(),
    ]);

    const nowPlaying = await nowPlayingResponse.json();
    const trending = await trendingResponse.json();
    const upComing = await upComingResponse.json();
    const popular = await popularResponse.json();
    const topRated = await topRatedResponse.json();
    const peoplePopular = await peoplePopularResponse.json();

    return (
        {
            nowPlaying: nowPlaying.results,
            trending: trending.results,
            upComing: upComing.results,
            popular: popular.results,
            topRated: topRated.results,
            peoplePopular: peoplePopular.results,
        }
    );
};

// movies pagination
export const fetchMoviesByCattegory = async (category, page = 1) => {
    const categoryMap = {
        nowPlaying: `${BASE_URL}/movie/now_playing`,
        trending: `${BASE_URL}/trending/movie/week`,
        upComing: `${BASE_URL}/movie/upcoming`,
    };

    if (!categoryMap[category]) {
        throw new Error(`Invalid category: ${category}`);
    }

    const response = await fetch(`${categoryMap[category]}?api_key=${API_KEY}&page=${page}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data for category: ${category}`);
    }
    return await response.json();
};

// tv series pagination
export const fetchTvSeriesByCattegory = async (category, page = 1) => {
    const categoryMap = {
        popular: `${BASE_URL}/tv/popular`,
        topRated: `${BASE_URL}/tv/top_rated`,
    };

    if (!categoryMap[category]) {
        throw new Error(`Invalid category: ${category}`);
    }

    const response = await fetch(`${categoryMap[category]}?api_key=${API_KEY}&page=${page}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data for category: ${category}`);
    }
    return await response.json();
};

// people pagination
export const fetchPeoplePopular = async (page = 1) => {
    const peoplePopular = `${BASE_URL}/person/popular`;

    if (!peoplePopular) {
        throw new Error(`Invalid category: ${peoplePopular}`);
    }

    const response = await fetch(`${peoplePopular}?api_key=${API_KEY}&page=${page}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data for data: ${peoplePopular}`);
    }
    return await response.json();
};
