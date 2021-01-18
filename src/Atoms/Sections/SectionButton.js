import React from 'react';
import Button from '@material-ui/core/Button';
import './Section.css';
const SectionButton = (props) => {
  const { isSelectActive, className = '' } = props;
  return (
    <div className={['middleTabItem', isSelectActive ? 'activeTabItem' : null].join(' ')}>
      <Button className={className}> </Button>
    </div>
  );
};

export default SectionButton;
