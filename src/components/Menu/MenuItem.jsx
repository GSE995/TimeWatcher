import { Link } from 'react-router-dom';

import css from './MenuItem.module.scss';

export const MenuItem = ({ item }) => (
  <div className={css.menuItem}>
    <Link to={item.path}>
      <div className={css.indicator} />
      <i className={css.icon}></i>
      <div className={css.itemText}>{item.text}</div>
    </Link>
  </div>
);
