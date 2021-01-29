import React from 'react';
import SectionButton from '../../Atoms/Sections/SectionButton';
import SectionLine from '../../Atoms/Sections/SectionLine';
import '../../Atoms/Sections/Section.css';
const Sections = (props) => {
  const { listSections, selectedSection, setSelectedSection } = props;
  // const [selectedSection, setSelectedSection] = useState(listSections[0]);

  return (
    <>
      <div className={['tabsContainer', 'iguru-leftpanel'].join(' ')}>
        <div className={'middleTabLabel'}>
          <SectionLine />
          {listSections.map((section) => {
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
