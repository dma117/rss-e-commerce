import { useState } from 'react';
import styles from './header.module.css';
import Logo from '@components/logo/';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

type HeaderProps = {
  isAuth: boolean;
  theme: 'light' | 'dark';
};

function Header({ isAuth, theme }: HeaderProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className={cn(styles.header, styles[theme])}>
      <div className={`container ${styles.header__container}`}>
        <Logo theme={theme} />
        <nav className={cn(styles.header__nav, { [styles.active]: isOpen })}>
          <ul className={cn(styles.header__navList, styles.header__siteNav)}>
            <li className={styles.header__navItem}>
              <NavLink
                className={({ isActive }) =>
                  cn(styles.siteNav__link, { [styles.linkActive]: isActive })
                }
                to="/courses"
              >
                <i className={cn(styles.icon, styles.coursesIcon)}></i>
                Courses
              </NavLink>
            </li>
            <li className={styles.header__navItem}>
              <NavLink to="/about">About us</NavLink>
            </li>
          </ul>
          <ul className={cn(styles.header__navList, styles.header__userNav)}>
            <li className={styles.header__navItem}>
              <NavLink className={styles.userNav__link} to="/cart">
                <i className={cn(styles.icon, styles.basketIcon)}></i>
                Basket
              </NavLink>
            </li>
            {isAuth ? (
              <>
                <li className={styles.header__navItem}>
                  <NavLink className={styles.userNav__link} to="/profile">
                    <i className={cn(styles.icon, styles.profileIcon)}></i>
                    Profile
                  </NavLink>{' '}
                </li>
                <li className={styles.header__navItem}>
                  <button className={cn(styles.logoutButton, styles.userNav__link)}>
                    <i className={cn(styles.icon, styles.logoutIcon)}></i>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={styles.header__navItem}>
                  <NavLink className={styles.userNav__link} to="/login">
                    <i className={cn(styles.icon, styles.loginIcon)}></i>
                    Login
                  </NavLink>
                </li>
                <li className={styles.header__navItem}>
                  <NavLink className={styles.userNav__link} to="/sign-up">
                    <i className={cn(styles.icon, styles.loginIcon)}></i>
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
        <button
          className={cn(styles.header__menuButton, { [styles.open]: isOpen })}
          onClick={() => setOpen(!isOpen)}
        >
          <div className={styles.strip}></div>
        </button>
      </div>
    </header>
  );
}

export default Header;
