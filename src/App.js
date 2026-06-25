import React, { useState, useEffect } from 'react';
import './App.css';

const API = 'https://busubusu-backend.onrender.com/api';
const APK_LINK = 'https://drive.google.com/file/d/1CnnhPsUotOdteofLqzPJBOIWJ0hnU6Je/view?usp=sharing';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/posts`)
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="app">

      {/* STICKY NAV */}
      <nav className="nav">
        <div className="nav-brand">
          <span className="nav-b">B</span>
          <span className="nav-name">BUSU BUSU</span>
        </div>
        <a href={APK_LINK} className="nav-btn" target="_blank" rel="noreferrer">
          📲 Get the App
        </a>
      </nav>

      {/* POSTS GALLERY - main content */}
      <section className="gallery">
        <div className="gallery-header">
          <h1>Discover Talented Tailors</h1>
          <p>Browse designs from tailors across Kyenjojo, Kabarole & Kyegegwa</p>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading designs...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty">
            <p>✂️ No designs yet.</p>
            <p>Download the app to be the first tailor to post!</p>
            <a href={APK_LINK} className="download-btn" target="_blank" rel="noreferrer">📲 Download App</a>
          </div>
        ) : (
          <div className="grid">
            {posts.map(post => (
              <div className="card" key={post.id}>
                {post.image_urls?.[0] ? (
  <img src={post.image_urls[0]} alt={post.title} className="card-img" />
                ) : (
                  <div className="card-img-placeholder">✂️</div>
                )}
                <div className="card-body">
                  <p className="card-district">📍 {post.district}</p>
                  <p className="card-price">UGX {Number(post.price).toLocaleString()}</p>
                  <a href={APK_LINK} className="card-btn" target="_blank" rel="noreferrer">
                    View Details & Contact →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <span className="nav-b">B</span>
          <span className="nav-name">BUSU BUSU</span>
        </div>
        <p className="footer-tag">Home of Fashion</p>
        <a href={APK_LINK} className="download-btn" target="_blank" rel="noreferrer">
          📲 Download for Android
        </a>
        <p className="credit">Built with ❤️ by JESE · Buy Skill Up.Build Skill Up</p>
      </footer>
    </div>
  );
}

export default App;