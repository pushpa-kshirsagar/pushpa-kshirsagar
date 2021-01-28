import React, { useState } from 'react';
import SectionButton from '../../Atoms/Sections/SectionButton';
import SectionLine from '../../Atoms/Sections/SectionLine';
import '../../Atoms/Sections/Section.css';
const Sections = (props) => {
  const { sectionList } = props;
  const [selectedSection, setSelectedSection] = useState(sectionList[0]);

  return (
    <>
      <div className={['tabsContainer', 'iguru-leftpanel'].join(' ')}>
        <div className={'middleTabLabel'}>
          <SectionLine />
          {sectionList.map((section) => {
            return (
              <>
                <SectionButton
                  sectionClick={() => {
                    setSelectedSection(section);
                  }}
                  isSelectActive={selectedSection.id === section.id}
                />
                <SectionLine />
              </>
            );
          })}
        </div>
      </div>
      <div>
        <selectedSection.sectionComponent />
      </div>
    </>
  );
};

export default Sections;
