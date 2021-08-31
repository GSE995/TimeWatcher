import { FC } from 'react';

import { Route } from '../../models/Route';
import { MenuItem } from './MenuItem';

import css from './Menu.module.scss';
export interface MenuProps {
  routes: Route[];
}

export const Menu: FC<MenuProps> = ({ routes }: MenuProps) => (
  <nav className={css.root}>
    <ul className={css.items}>
      {routes.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  </nav>
);
