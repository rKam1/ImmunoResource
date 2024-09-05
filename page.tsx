import React from 'react';
import Sidebar from './Components/Sidebar';
import styles from './styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h1>Home</h1>
        <p>Welcome to the home page.</p>
      </div>
    </div>
  );
};

export default Home;
