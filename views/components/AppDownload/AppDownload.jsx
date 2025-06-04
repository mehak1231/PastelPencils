import React from 'react';
import './AppDownload.css';
import { images } from '../../images/images';

const AppDownload = () => {
  return (
    <div className="app-download">
      <div className="app-download-content">
        <h2>Download the Pastel Pencils App</h2>
        <p>
          Enhance your shopping experience with our mobile app! Get exclusive deals, faster checkout, and more.
        </p>
        <div className="app-download-platforms">
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
            <img src={images.play_store} alt="Download on Google Play" />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <img src={images.app_store} alt="Download on the App Store" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;