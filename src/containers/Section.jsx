import '@app/containers/Section.css'

const Section = ({ children, title, id }) => (
    <div className="section" id={id}>
      <h1 className="title">{title}</h1>
      {children}
    </div>
  );

export default Section