import React, { Fragment } from 'react';
import SectionButton from '../../Atoms/Section/SectionButton';
import SectionLine from '../../Atoms/Section/SectionLine';
import '../../Atoms/Section/Section.css';
const Section = (props) => {
  const { listSections, selectedSection, setSelectedSection } = props;
  // const [selectedSection, setSelectedSection] = useState(listSections[0]);

  return (
    <>
      <div className={['tabsContainer', 'iguru-leftpanel'].join(' ')}>
        <div className={'middleTabLabel'}>
          <SectionLine />
          {listSections.map((section, index) => {
            return (
              <Fragment key={index}>
                <SectionButton
                  sectionClick={() => {
                    setSelectedSection(section);
                  }}
                  isSelectActive={selectedSection.id === section.id}
                />
                <SectionLine />
              </Fragment>
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

export default Section;
