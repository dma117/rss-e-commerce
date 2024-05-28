import { Routes } from '@/utils/const';
import styles from './header.module.css';

export const siteNavItems = [
  {
    title: 'Courses',
    route: Routes.COURSES,
    icon: styles.coursesIcon
  },
  {
    title: 'About',
    route: Routes.ABOUT
  }
];

export const userNavItems = {
  default: [
    {
      title: 'Basket',
      route: Routes.CART,
      icon: styles.basketIcon,
    },
  ],
  loggedIn: [
    {
      title: 'Profile',
      route: Routes.PROFILE,
      icon: styles.profileIcon,
    },
    {
      title: 'Logout',
      icon: styles.basketIcon,
    },
  ],
  notLoggedIn: [
    {
      title: 'Login',
      route: Routes.LOGIN,
      icon: styles.loginIcon,
    },
    {
      title: 'Sign Up',
      route: Routes.SIGNUP,
      icon: styles.signupIcon,
    },
  ],
};
