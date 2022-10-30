import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>
                <Link to="/">React Web Games</Link>
            </h1>
        </div>
    );
};