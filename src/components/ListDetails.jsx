export const ListDetails = ({ title, description, ...props }) => {
  return (
    <span {...props}>
      <h3>{title}</h3>
      <p>{description}</p>
    </span>
  );
};
