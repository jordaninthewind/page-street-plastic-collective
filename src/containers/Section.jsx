import '@app/containers/Layout.css';

const Section = ({ children, title, id, subtitle }) => (
  <div className="layout" id={id}>
    <h1 className="title">{title}</h1>
    {subtitle && <h2 className="subtitle">{subtitle}</h2>}
    {children}
  </div>
);

export default Section;
