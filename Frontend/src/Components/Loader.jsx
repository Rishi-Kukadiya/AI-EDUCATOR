import '../CSS/Loader.css';
const Loader = ({ type = 'overlay', width = '100%', height = '20px', text = 'Processing...' }) => {
  if (type === 'overlay') {
    return (
      <div className="loader-overlay">
        <div className="ai-spinner"></div>
        <div className="loader-text">{text}</div>
      </div>
    );
  }

  return (
    <div 
      className="skeleton-loader" 
      style={{ width, height }}
    ></div>
  );
};

export default Loader;