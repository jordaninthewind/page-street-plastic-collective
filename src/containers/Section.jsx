import '@app/containers/Section.css'

const Section = ({ children, title, id, subtitle }) => (
    <div className="section" id={id}>
      <h1 className="title">{title}</h1>
      {subtitle && <h2 className="subtitle">{subtitle}</h2>}
      {children}
    </div>
  );

export default Section