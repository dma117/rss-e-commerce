import { useState } from 'react';
import styles from './header.module.css';
import Logo from 'components/logo/logo';
import cn from 'classnames';

type HeaderProps = {
  isAuth: boolean,
  theme: 'light' | 'dark'
}

function Header({ isAuth, theme }: HeaderProps) {
  const [isOpen, setOpen] = useState(false);
  console.log(isAuth);

  return (
    <header className={cn(styles.header, styles[theme])}>
      <div className={`container ${styles.header__container}`}>
        <Logo
          theme={theme}
        />
        <nav className={cn(styles['header__nav'], { [styles.active]: isOpen })}>
          <ul className={styles['header__navList']}>
            <li className={styles['header__navItem']}>
              <a href="#main">Main</a>
            </li>
            <li className={styles['header__navItem']}>
              <a href="#about">About</a>
            </li>
            {isAuth
              ? <li className={styles['header__navItem']}>
                <button className={styles['logout-button']}>Logout</button>
              </li>
              : <>
                <li className={styles['header__navItem']}>
                  <a href="#login">Login</a>
                </li>
                <li className={styles['header__navItem']}>
                  <a href="#signup">Sign up</a>
                </li>
              </>
            }
          </ul>
        </nav>
        <button
          className={cn(styles['header__menuButton'], { [styles.open]: isOpen })}
          onClick={() => setOpen(!isOpen)}
        >
          <div></div>
        </button>
      </div>
    </header>
  );
}

export default Header;