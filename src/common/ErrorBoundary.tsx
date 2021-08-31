import React from 'react';

import css from './ErrorBoundary.module.scss';

export class ErrorBoundary extends React.Component {
  state: any = {
    hasError: false,
  };

  componentDidCatch(error: any) {
    this.setState({ hasError: true });
  }

  updatePage = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={css.root}>
          <div>Opps something wrong...</div>
          <button onClick={this.updatePage}>update page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
