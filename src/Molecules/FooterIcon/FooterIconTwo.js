import React from 'react';
import { Grid, BottomNavigation } from '@material-ui/core';
import CircleIcon from '../IconButton/IconButton';
import './FooterIconTwo.css';
const SingleIconWithFlex = (props) => {
  const data = props.data;
  return (
    <React.Fragment>
      <CircleIcon
        label={data[0].label}
        Icon={data[0].Icon}
        colour={props.colour}
        onClick={data[0].onClick}
        dataValue={data[0].label}
      />
    </React.Fragment>
  );
};
const IconTwoWithFlexSixColumn = (props) => {
  const data = props.data;
  return (
    <React.Fragment>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[0].label}
          Icon={data[0].Icon}
          colour={props.colour}
          onClick={data[0].onClick}
          dataValue={data[0].dataValue ? data[0].dataValue : data[0].label}
          disabled={data[0]?.disabled}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[1].label}
          Icon={data[1].Icon}
          colour={props.colour}
          onClick={data[1].onClick}
          dataValue={data[1].dataValue ? data[1].dataValue : data[1].label}
          disabled={data[1]?.disabled}
        />
      </div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
    </React.Fragment>
  );
};
const IconThreeWithFlexFiveColumn = (props) => {
  const data = props.data;
  return (
    <React.Fragment>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[0].label}
          Icon={data[0].Icon}
          colour={props.colour?props.colour:'displayPaneCentre'}
          onClick={data[0].onClick}
          dataValue={data[0].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[1].label}
          Icon={data[1].Icon}
          colour={props.colour?props.colour:'displayPaneCentre'}
          onClick={data[1].onClick}
          dataValue={data[1].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[2].label}
          Icon={data[2].Icon}
          colour={props.colour?props.colour:'displayPaneCentre'}
          onClick={data[2].onClick}
          dataValue={data[2].label}
        />
      </div>
      <div className={'mbPager'}></div>
    </React.Fragment>
  );
};
const IconFourWithFlexSixColumn = (props) => {
  const data = props.data;
  return (
    <React.Fragment>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[0].label}
          Icon={data[0].Icon}
          colour={data[0].colour ? data[0].colour : 'displayPaneCentre'}
          onClick={data[0].onClick}
          dataValue={data[0].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[1].label}
          Icon={data[1].Icon}
          colour={data[1].colour ? data[1].colour : 'displayPaneCentre'}
          onClick={data[1].onClick}
          dataValue={data[1].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[2].label}
          Icon={data[2].Icon}
          colour={data[2].colour ? data[0].colour : 'displayPaneCentre'}
          onClick={data[2].onClick}
          dataValue={data[2].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[3].label}
          Icon={data[3].Icon}
          colour={data[3].colour ? data[3].colour : 'displayPaneCentre'}
          onClick={data[3].onClick}
          dataValue={data[3].label}
        />
      </div>
      <div className={'mbPager'}></div>
    </React.Fragment>
  );
};
const IconFiveWithFlexFiveColumn = (props) => {
  const data = props.data;
  return (
    <React.Fragment>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[0].label}
          Icon={data[0].Icon}
          colour={'displayPaneCentre'}
          onClick={data[0].onClick}
          dataValue={data[0].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[1].label}
          Icon={data[1].Icon}
          colour={'displayPaneCentre'}
          onClick={data[1].onClick}
          dataValue={data[1].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[2].label}
          Icon={data[2].Icon}
          colour={'displayPaneCentre'}
          onClick={data[2].onClick}
          dataValue={data[2].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[3].label}
          Icon={data[3].Icon}
          colour={'displayPaneCentre'}
          onClick={data[3].onClick}
          dataValue={data[3].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[4].label}
          Icon={data[4].Icon}
          colour={'displayPaneCentre'}
          onClick={data[4].onClick}
          dataValue={data[4].label}
        />
      </div>
    </React.Fragment>
  );
};
const IconFiveWithFlexSixColumn = (props) => {
  const data = props.data;
  return (
    <React.Fragment>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[0].label}
          Icon={data[0].Icon}
          colour={data[0].colour ? data[0].colour : 'displayPaneCentre'}
          onClick={data[0].onClick}
          dataValue={data[0].label}
          disabled={data[0].disabled}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[1].label}
          Icon={data[1].Icon}
          colour={data[0].colour ? data[0].colour : 'displayPaneCentre'}
          onClick={data[1].onClick}
          dataValue={data[1].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[2].label}
          Icon={data[2].Icon}
          colour={data[0].colour ? data[0].colour : 'displayPaneCentre'}
          onClick={data[2].onClick}
          dataValue={data[2].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[3].label}
          Icon={data[3].Icon}
          colour={data[0].colour ? data[0].colour : 'displayPaneCentre'}
          onClick={data[3].onClick}
          dataValue={data[3].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[4].label}
          Icon={data[4].Icon}
          colour={data[0].colour ? data[0].colour : 'displayPaneCentre'}
          onClick={data[4].onClick}
          dataValue={data[4].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[5].label}
          Icon={data[5].Icon}
          colour={data[0].colour ? data[0].colour : 'displayPaneCentre'}
          onClick={data[5].onClick}
          dataValue={data[5].label}
        />
      </div>
    </React.Fragment>
  );
};

const IconFourWithFlexSixColumnAssessment = (props) => {
  const data = props.data;
  return (
    <React.Fragment>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[0].label}
          Icon={data[0].Icon}
          colour={'displayPaneCentre'}
          onClick={data[0].onClick}
          dataValue={data[0].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[1].label}
          Icon={data[1].Icon}
          colour={'displayPaneCentre'}
          onClick={data[1].onClick}
          dataValue={data[1].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[2].label}
          Icon={data[2].Icon}
          colour={'displayPaneCentre'}
          onClick={data[2].onClick}
          dataValue={data[2].label}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[3].label}
          Icon={data[3].Icon}
          colour={'displayPaneCentre'}
          onClick={data[3].onClick}
          dataValue={data[3].label}
        />
      </div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
    </React.Fragment>
  );

}
const IconTwoWithFlexSixColumnAssessment = (props) => {
  const data = props.data;
  return (
    <React.Fragment>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>

      <div className={'mbPager'}>
        <CircleIcon
          label={data[0].label}
          Icon={data[0].Icon}
          colour={props.colour}
          onClick={data[0].onClick}
          dataValue={data[0].dataValue ? data[0].dataValue : data[0].label}
          disabled={data[0]?.disabled}
        />
      </div>
      <div className={'mbPager'}>
        <CircleIcon
          label={data[1].label}
          Icon={data[1].Icon}
          colour={props.colour}
          onClick={data[1].onClick}
          dataValue={data[1].dataValue ? data[1].dataValue : data[1].label}
          disabled={data[1]?.disabled}
        />
      </div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
      <div className={'mbPager'}></div>
    </React.Fragment>
  );
};
const FooterIconTwo = (props) => {
  const {
    FilterModeEnable,
    primaryIcon,
    secondaryIcon,
    className = '',
    backColour = 'displayPaneCentre',
    disabled = false,
    isAssessmentPreviewShow = false
  } = props;
  //console.log(secondaryIcon);
  //console.log('secondaryIcon');
  return (
    <div className={`middleFooterD  ${className}`}>
      <div className={'footerInner'}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <BottomNavigation className={'MuiBottomNavigationCustom'}>
            {FilterModeEnable ? (
              primaryIcon.length === 1 ? (
                <SingleIconWithFlex data={primaryIcon} colour={backColour} />
              ) : primaryIcon.length === 2 ? (
                <IconTwoWithFlexSixColumn data={primaryIcon} colour={backColour} />
              ) : null
            ) :
              isAssessmentPreviewShow ? (
                secondaryIcon.length === 4 ? (
                  <IconFourWithFlexSixColumnAssessment data={secondaryIcon} />
                ) : secondaryIcon.length === 2 ? (
                  <IconTwoWithFlexSixColumnAssessment data={secondaryIcon} colour={backColour} />
                ) :
                  null)
                :
                secondaryIcon.length === 2 ? (
                  <IconTwoWithFlexSixColumn data={secondaryIcon} colour={backColour} />
                ) : secondaryIcon.length === 3 ? (
                  <IconThreeWithFlexFiveColumn data={secondaryIcon}colour={backColour} />
                ) : secondaryIcon.length === 4 ? (
                  <IconFourWithFlexSixColumn data={secondaryIcon} />
                ) : secondaryIcon.length === 5 ? (
                  <IconFiveWithFlexFiveColumn data={secondaryIcon} />
                ) : secondaryIcon.length === 6 ? (
                  <IconFiveWithFlexSixColumn data={secondaryIcon} />
                ) : null}

            {/* */}
          </BottomNavigation>
        </Grid>
      </div>
    </div>
  );
};
export default FooterIconTwo;
