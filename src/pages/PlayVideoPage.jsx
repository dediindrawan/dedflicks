import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useTitle } from '../context/TitleContext';

export const PlayVideoPage = () => {
  const { id } = useParams();
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle('Videos | DedFlicks');
  }, [changeTitle]);

  return (
    <div className="container">
      <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1`} className="clip-frame" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>;
    </div>
  );
};
