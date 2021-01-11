import React from 'react';
import SectionButton from '../../Atoms/Sections/SectionButton';
import SectionLine from '../../Atoms/Sections/SectionLine';
import '../../Atoms/Sections/Section.css';
const Sections = (props) => {
  const { isSelected } = props;
  return (
    <div className={['tabsContainer', 'iguru-leftpanel'].join(' ')}>
      <div className={'middleTabLabel'}>
        <SectionLine />
        <SectionButton isSelected={isSelected} />
        <SectionLine />
      </div>
    </div>
  );
};

export default Sections;
