import PostForm from "./features/posts/PostForm";
import PostList from "./features/posts/PostList";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showForm, setShowForm] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setShowForm(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        {isMobile && (
          <button 
            className="mobile-toggle-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'View Posts' : ' New Post'}
          </button>
        )}
      </header>

      <div className={`container ${isMobile ? 'mobile' : ''}`}>
        {(!isMobile || showForm) && (
          <div className="left-column">
            <PostForm />
          </div>
        )}
        
        {(!isMobile || !showForm) && (
          <div className="right-column">
            <PostList />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;