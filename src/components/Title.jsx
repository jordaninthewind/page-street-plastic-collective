import '@app/components/Title.css';

const Title = ({ children }) => {
  const letters = children.split('').map((letter, index) => (
    <span 
      key={index} 
      className="title-letter"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </span>
  ));

  return (
    <div className="title-container">
      <h1 className="title">
        {letters}
      </h1>
    </div>
  );
};

export default Title;