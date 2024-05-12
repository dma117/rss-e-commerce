import { useState } from 'react';
import styles from './header.module.css';
import Logo from 'components/logo/logo';
import cn from 'classnames';

type HeaderProps = {
  isAuth: boolean
}

function Header({isAuth}: HeaderProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <Logo
          width={76}
          color='#fff'
        />
        <nav className={cn(styles['header__nav'], { [styles.active]: isOpen })}>
          <ul className={styles['header__nav-list']}>
            <li className={styles['header__nav-item']}>
              <a href="#main">Main</a>
            </li>
            <li className={styles['header__nav-item']}>
              <a href="#about">About</a>
            </li>
            {isAuth ? 
            <li className={cn(styles['header__nav-item'])}>
              <button className={styles['logout-button']}>Logout</button>
            </li>            
          :
            <li className={styles['header__nav-item']}>
              <a href="#login">Login</a>
            </li>}
          </ul>
        </nav>
        <button
          className={cn(styles['header__menu-button'], { [styles.open]: isOpen })}
          onClick={() => setOpen(!isOpen)}
        >
          <div></div>
        </button>
      </div>
    </header>
  );
}

export default Header;