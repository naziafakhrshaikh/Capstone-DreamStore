import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <main className='about-page'>
      <div className='about-container'>
        <h1 className='about-title'>About Dream Store</h1>

        <p className='about-text'>
          Since the dawn of time, humanity has been driven by one eternal force — the dream. 
          Every soul that has ever walked this earth has looked up at the stars and whispered 
          a wish into the universe. People toil through sleepless nights, cross mountains, and 
          weather storms — all in pursuit of something they long for, something that feels just 
          out of reach. We saw this. We felt this. And so, Dream Store was born.
        </p>

        <p className='about-text'>
          We created this sanctuary not merely as a store, but as a sacred space where human 
          longing meets fulfilment. Here, every dream is honored — no wish is too small, and 
          none too grand. From the everyday desires that quietly shape a life — a beautiful home, 
          a reliable car, clothes that make you feel alive — to the profound and priceless pursuits 
          that stir the depths of the soul — inner peace, the realization of one's purpose, the 
          discovery of true joy — Dream Store holds a place for all of it.
        </p>

        <p className='about-text'>
          We believe that every human being deserves to rest. To exhale. To know that somewhere, 
          something is taken care of. Our mission is simple yet boundless — to serve humanity by 
          becoming the one place where dreams of every shape, color, and weight find a home. 
          Whether your dream costs a dollar or a lifetime, it matters here. You matter here.
        </p>

        <p className='about-text'>
          So take a breath, let your guard down, and explore. Whatever you have been chasing — 
          it may just be waiting for you here.
        </p>

        <p className='about-signature'>— The Dream Store Team 🌙</p>
      </div>
    </main>
  );
};

export default About;