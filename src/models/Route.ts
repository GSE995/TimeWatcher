import { ReactNode } from 'react';

export type Route = {
  id: number;
  text: string;
  icon: ReactNode;
  path: string;
  component: ReactNode;
  exact: boolean;
};
