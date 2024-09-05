import React from 'react';
import styles from '../styles/Sidebar.module.css';

interface SidebarProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
  return (
    <div className={styles.sidebar}>
      <button 
        className={`${styles.button} ${activeTab === 'home' ? styles.active : ''}`} 
        onClick={() => setActiveTab('home')}
      >
        About
      </button>
      <button 
        className={`${styles.button} ${activeTab === 'page1' ? styles.active : ''}`} 
        onClick={() => setActiveTab('page1')}
      >
        How To
      </button>
    </div>
  );
};

export default Sidebar;
