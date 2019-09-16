import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { Link } from 'gatsby';
import styles from './Menu.module.scss';

const Menu = ({ menu }) => (
  <nav className={styles['menu']}>
    <ul className={styles['menu__list']}>
      {menu.map((item) => (
        <li className={styles['menu__list-item']} key={item.path}>
          {!item['sub_menu']
            ? <Link
                to={item.path}
                className={styles['menu__list-item-link']}
                activeClassName={styles['menu__list-item-link--active']}
              >
                {item.label}
              </Link>
            : <React.Fragment>
                <span>{item.label}</span>
                <ul className={styles['menu__list__sub_menu__list']}>
                  {item.sub_menu.map((subItem) => (
                    <li className={styles['menu__list-item']} key={subItem.path}>
                      <Link
                        to={`/categories/${kebabCase(subItem.path)}`}
                        className={styles['menu__list-item-link']}
                        activeClassName={styles['menu__list-item-link--active']}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            }
          {/* <Link
            to={item.path}
            className={styles['menu__list-item-link']}
            activeClassName={styles['menu__list-item-link--active']}
          >
            {item.label}
          </Link> */}
        </li>
      ))}
    </ul>
  </nav>
);

export default Menu;
