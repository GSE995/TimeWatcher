import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../components/Buttons/Primary';

storiesOf('Buttons', module)
  .add('Primary', () => (
    <Button className="primary-button">Hello Button</Button>
  )) 