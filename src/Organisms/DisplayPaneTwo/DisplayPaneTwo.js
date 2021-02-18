import React from 'react';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import { useSelector, useDispatch } from 'react-redux';
import './DisplayPaneTwo.css';
import ReviewList from '../../Molecules/ReviewList/ReviewList';
import FooterIconTwo from '../../Molecules/FooterIconTwo/FooterIconTwo';
import { FILTERMODE } from '../../actionType';
import { FilterList } from '@material-ui/icons';

export const DisplayPaneTwo = () => {
  const { FilterModeEnable, FilterMode } = useSelector((state) => state.FilterReducer);
  const tempAssociateList = [
    {
      id: 'associate1',
      textOne: 'Simple Sample 01',
      textTwo: '',
      status: 'active',
      isTooltipActive: true
    },
    {
      id: 'associate2',
      textOne: 'Simple Sample 02',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate3',
      textOne: 'Simple Sample 03',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate4',
      textOne: 'Simple Sample 04',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: true
    },
    {
      id: 'associate5',
      textOne: 'Simple Sample 05',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate6',
      textOne: 'Simple Sample 06',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate7',
      textOne: 'Simple Sample 07',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate8',
      textOne: 'Simple Sample 08',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate9',
      textOne: 'Simple Sample 09',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate10',
      textOne: 'Simple Sample 10',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate11',
      textOne: 'Simple Sample 11',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate12',
      textOne: 'Simple Sample 12',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate13',
      textOne: 'Simple Sample 13',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate14',
      textOne: 'Simple Sample 14',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate15',
      textOne: 'Simple Sample 15',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate16',
      textOne: 'Simple Sample 16',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate17',
      textOne: 'Simple Sample 17',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate18',
      textOne: 'Simple Sample 18',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate19',
      textOne: 'Simple Sample 19',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate20',
      textOne: 'Simple Sample 20',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate21',
      textOne: 'Simple Sample 21',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate22',
      textOne: 'Simple Sample 22',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate23',
      textOne: 'Simple Sample 23',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate24',
      textOne: 'Simple Sample 24',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate25',
      textOne: 'Simple Sample 25',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate26',
      textOne: 'Simple Sample 26',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate27',
      textOne: 'Simple Sample 27',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate28',
      textOne: 'Simple Sample 28',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate29',
      textOne: 'Simple Sample 29',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate30',
      textOne: 'Simple Sample 30',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate31',
      textOne: 'Simple Sample 31',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate32',
      textOne: 'Simple Sample 32',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate33',
      textOne: 'Simple Sample 33',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate34',
      textOne: 'Simple Sample 34',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate35',
      textOne: 'Simple Sample 35',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate36',
      textOne: 'Simple Sample 36',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate37',
      textOne: 'Simple Sample 37',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate38',
      textOne: 'Simple Sample 38',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate39',
      textOne: 'Simple Sample 39',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate40',
      textOne: 'Simple Sample 40',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate41',
      textOne: 'Simple Sample 41',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate22',
      textOne: 'Simple Sample 22',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate43',
      textOne: 'Simple Sample 43',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate44',
      textOne: 'Simple Sample 44',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate45',
      textOne: 'Simple Sample 45',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate46',
      textOne: 'Simple Sample 46',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate47',
      textOne: 'Simple Sample 47',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate28',
      textOne: 'Simple Sample 48',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate29',
      textOne: 'Simple Sample 49',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    },
    {
      id: 'associate50',
      textOne: 'Simple Sample 50',
      textTwo: 'Associate',
      status: 'active',
      isTooltipActive: false
    }
  ];
  const dispatch = useDispatch();
  const onClickFooter = (e) => {
    dispatch({ type: FILTERMODE });
    // if(e.currentTarget.getAttribute('data-value') === 'sift'){
    //   dispatch({ type: FILTERMODE});
    // }
  };
  /* for middle pane */
  const primaryIcon = [{ label: 'sift', onClick: onClickFooter, Icon: FilterList }];
  const secondaryIcon = [
    { label: 'suspended', onClick: onClickFooter, Icon: FilterList },
    { label: 'terminated', onClick: onClickFooter, Icon: FilterList },
    { label: 'unverified', onClick: onClickFooter, Icon: FilterList }
  ];
  return (
    <div>
      <div>
        <HeaderCard
          className=""
          displayPane="centre"
          headerOne="associates"
          headerOneBadgeOne=""
          headerOneBadgeTwo="distinct"
          headerOneBadgeThree="active"
          headerPanelColour="green"
          headerOneBadgeFour=""
          scanCount={tempAssociateList.length}
        />
      </div>
      <div
        style={{
          height: 'calc(100vh - 207px)',
          overflow: 'overlay'
        }}
        className="containerPadding"
      >
        {tempAssociateList.map((associate, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={associate.id}
                status={associate.status}
                textOne={associate.textOne}
                textTwo={associate.textTwo}
                isTooltipActive={associate.isTooltipActive}
              />
            </div>
          );
        })}
        <div className={'containerPadding'} style={{ height: '55px' }}>
          {' '}
        </div>
      </div>
      <FooterIconTwo
        FilterModeEnable={FilterModeEnable}
        FilterMode={FilterMode}
        onClick={onClickFooter}
        primaryIcon={primaryIcon}
        secondaryIcon={secondaryIcon}
      />
    </div>
  );
};

export default DisplayPaneTwo;
