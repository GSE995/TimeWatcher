import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Route } from '../../types/Route';

import css from './MenuItem.module.scss';

export interface MenuItemProps {
  item: Route;
}

export const MenuItem: FC<MenuItemProps> = ({ item }) => (
  <li className={css.root}>
    <Link to={item.path}>
      {item.icon}
      <span className={css.text}>{item.text}</span>
    </Link>
  </li>
);
