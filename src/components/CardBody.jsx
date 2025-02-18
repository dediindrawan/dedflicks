export const CardBody = ({ src, alt, children }) => {
  return (
    <figure className="card-body">
      <img src={src} alt={alt} />
      <figcaption>{children}</figcaption>
    </figure>
  );
};
