import React from 'react';
import SectionButton from '../../Atoms/Sections/SectionButton';
import SectionLine from '../../Atoms/Sections/SectionLine';
import '../../Atoms/Sections/Section.css';
const Sections = (props) => {
  const { isSelectActive } = props;
  return (
    <div className={['tabsContainer', 'iguru-leftpanel'].join(' ')}>
      <div className={'middleTabLabel'}>
        <SectionLine />
        <SectionButton isSelected={isSelectActive} />
        <SectionLine />
      </div>
    </div>
  );
};

export default Sections;
