import React from 'react';
import { Dialog } from '@material-ui/core';
import Loading from '../images/loading.gif';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';

const LoadingComponent = (props) => {
  const { isActive } = props;
  return (
    <div>
      <Dialog open={isActive} className={'loaderimg'}>
        <div>
          <img src={Loading} alt={'...'} />
        </div>
      </Dialog>
    </div>
  );
};

LoadingComponent.propTypes = {
  className: PropTypes.string
};

export default LoadingComponent;
