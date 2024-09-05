import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <Link legacyBehavior href="/help">
        <a className={styles.button}>Home</a>
      </Link>
      <Link legacyBehavior href="/help/page1">
        <a className={styles.button}>Page 1</a>
      </Link>
      <Link legacyBehavior href="/help/page2">
        <a className={styles.button}>Page 2</a>
      </Link>
      <Link legacyBehavior href="/help/page3">
        <a className={styles.button}>Page 3</a>
      </Link>
    </div>
  );
};

export default Sidebar;
