import { useState } from 'react';
import styles from './header.module.css';
import Logo from 'components/logo/logo';
import cn from 'classnames';
import basketIcon from '../../assets/basket.svg';
import profileIcon from '../../assets/profile.svg';
import loginIcon from '../../assets/login.svg';
import signupIcon from '../../assets/signup.svg';
import logoutIcon from '../../assets/logout.svg';
import coursesIcon from '../../assets/courses.svg';



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
        <nav className={cn(styles.header__nav, { [styles.active]: isOpen })}>
          <ul className={cn(styles.header__navList, styles.header__siteNav)}>
            <li className={styles.header__navItem}>
              <a className={styles.siteNav__link} href="#main">
              <img src={coursesIcon} alt="Courses icon" />
                Courses
                </a>
            </li>
            <li className={styles.header__navItem}>
              <a href="#about">About us</a>
            </li>
          </ul>
          <ul className={cn(styles.header__navList, styles.header__userNav)}>
            <li className={styles.header__navItem}>
              <a className={styles.userNav__link} href="#busket">
                <img src={basketIcon} alt="Basket icon" />
                Basket
              </a>
            </li>
            {isAuth
              ? <>
                <li className={styles.header__navItem}>
                  <a className={styles.userNav__link} href="#profile">
                    <img src={profileIcon} alt="Profile icon" />
                    Profile
                  </a>                </li>
                <li className={styles.header__navItem}>
                  <button className={cn(styles.logoutButton, styles.userNav__link)}>
                    <img src={logoutIcon} alt="Profile icon" />
                    Logout
                  </button>
                </li>
              </>
              : <>
                <li className={styles.header__navItem}>
                  <a className={styles.userNav__link}  href="#login">
                    <img src={loginIcon} alt="Profile icon" />
                    Login
                  </a>
                </li>
                <li className={styles.header__navItem}>
                  <a className={styles.userNav__link}  href="#signup">
                    <img src={signupIcon} alt="Profile icon" />
                    Sign up
                  </a>
                </li>
              </>
            }
          </ul>
        </nav>
        <button
          className={cn(styles.header__menuButton, { [styles.open]: isOpen })}
          onClick={() => setOpen(!isOpen)}
        >
          <div></div>
        </button>
      </div>
    </header>
  );
}

export default Header;