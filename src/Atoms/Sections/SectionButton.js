import React from 'react';
import Button from '@material-ui/core/Button';
import './Section.css';
const SectionButton = (props) => {
  const { isSelected } = props;
  return (
        <div className={['middleTabItem', isSelected ? 'activeTabItem' : null].join(' ')}>
          <Button> </Button>
        </div>
  );
};

export default SectionButton;
