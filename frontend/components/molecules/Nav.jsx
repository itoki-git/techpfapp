import React from 'react';

import Link from 'next/link';

import { url } from '../../pages/api/utility';
import styles from '../../styles/molecules/Nav.module.scss';

// ナビメニュー
const Nav = (props) => {
  const { menus } = props;
  return (
    <nav className={`${styles[props.style]} ${styles[props.active]}`}>
      <ul className={styles.ul}>
        {props.active ? (
          <li className={styles.navmenu} key="1">
            <Link href={url.search}>
              <a className={`${styles[props.button]} ${styles['link']}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="#fff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="10" cy="10" r="7" />
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </a>
            </Link>
          </li>
        ) : (
          <li className={styles.navmenu} key="1">
            <Link href={url.search}>
              <a className={`${styles[props.button]} ${styles['link']}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="#1a1e26"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="10" cy="10" r="7" />
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </a>
            </Link>
          </li>
        )}

        {menus.map((menu) => (
          <li className={styles.navmenu} key={menu.id}>
            <Link href={menu.to}>
              <a className={`${styles[props.button]} ${styles['link']}`}>
                <h4 className={styles.buttonName}>{menu.displayName}</h4>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Nav;
