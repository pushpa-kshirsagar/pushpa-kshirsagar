import React from 'react';
import Grid from '@material-ui/core/Grid';
import Notifications from '@material-ui/icons/NotificationsActive';
import PersonIcon from '@material-ui/icons/Person';
import NextIcon from '@material-ui/icons/ArrowForward';
import TrippleDot from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AssociateIcon from '@material-ui/icons/Camera';
import Communique from '@material-ui/icons/EventNote';
import CalculatorIcon from '@material-ui/icons/Keyboard';
import ToolkitIcon from '@material-ui/icons/BusinessCenter';
import Worksheet from '@material-ui/icons/InsertDriveFile';
import Manuscript from '@material-ui/icons/Description';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import GaugeIcon from '@material-ui/icons/Dashboard';
import TemplateIcon from '@material-ui/icons/BorderClear';
import CalculatorAdvancedIcon from '@material-ui/icons/KeyboardHide';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MailOutline from '@material-ui/icons/MailOutline';
import Fingerprint from '@material-ui/icons/Fingerprint';
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';
import ReviseIcon from '@material-ui/icons/RadioButtonChecked';
import NavigatorIcon from '@material-ui/icons/OpenWith';
import SiftIcon from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import Check from '@material-ui/icons/Check';
import Add from '@material-ui/icons/Add';
import LastPage from '@material-ui/icons/LastPage';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import SendIcon from '@material-ui/icons/Send';
import FlagIcon from '@material-ui/icons/Flag';
import AssessmentIcon from '@material-ui/icons/Assessment';
import RefreshIcon from '@material-ui/icons/Refresh';
import Unverified from '../../images/unverified.svg';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import TelephoneVerified from '../../images/telephone_verified.svg';
import TelephoneUnverified from '../../images/telephone_unverified.svg';
import MobileVerified from '../../images/mobile_verified.svg';
import MobileUnverified from '../../images/mobile_unverified.svg';
import HierarchyIcon from '../../images/account_tree.svg';
import ListIcon from '../../images/view_list.svg';
import insights from '../../images/insights-black-18dp.svg';
import './Icons.css';
const Icons = (props) => {
  return (
    <div>
      <Grid container>
        <Grid item xs={3} className={'iguru-icons'}>
          <Notifications className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Notification</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <PersonIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Person</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <NextIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>NextIcon</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <TrippleDot className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>TrippleDot</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <SearchIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>SearchIcon</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <Check className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Check</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <AssociateIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>AssociateIcon</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <CalculatorIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Calculator</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <Communique className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Communique</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <ArrowLeft className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>ArrowLeft</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <Manuscript className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Manuscript</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <ArrowRight className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>ArrowRight</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <ToolkitIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Toolkit</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <Worksheet className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Worksheet</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <GaugeIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Gauge</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <TemplateIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Template</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <AssessmentIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>trial</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <RefreshIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Refresh</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <CalculatorAdvancedIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Calculator(financial)</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <ExpandLess className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>ExpandLess</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <ExpandMore className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>ExpandMore</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <MailIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>MailIcon</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <MailOutline className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>MailOutline</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <Fingerprint className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Fingerprint</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <EditIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>EditIcon</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <ReviseIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Revise</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <NavigatorIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Navigator</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <FlagOutlinedIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>FlagOutlinedIcon</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <FlagIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>FlagIcon</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <SiftIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Sift</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <FirstPage className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>FirstPage</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <LastPage className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>LastPage</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <Add className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Add</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <img className={'iguru-icons-wid-hei'} src={Unverified} alt="Unverified" />
          <div className={'iguru-icon-lbfnt'}>Unverified</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <img className={'iguru-icons-wid-hei'} src={insights} alt="insights" />
          <div className={'iguru-icon-lbfnt'}>insights</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <VerifiedUserOutlinedIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>Verified</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <SendIcon className={'iguru-icons-wid-hei'} />
          <div className={'iguru-icon-lbfnt'}>SendIcon</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <img
            className={['iguru-icons-wid-hei', 'iguru-icon-opacity'].join(' ')}
            alt="Anonymous"
            src={TelephoneVerified}
          />
          <div className={'iguru-icon-lbfnt'}>Telephone Verified</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <img
            className={['iguru-icons-wid-hei', 'iguru-icon-opacity'].join(' ')}
            alt="Anonymous"
            src={TelephoneUnverified}
          />
          <div className={'iguru-icon-lbfnt'}>Telephone Unverified</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <img
            className={['iguru-icons-wid-hei', 'iguru-icon-opacity'].join(' ')}
            alt="Anonymous"
            src={MobileVerified}
          />
          <div className={'iguru-icon-lbfnt'}>Mobile Verified</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <img
            className={['iguru-icons-wid-hei', 'iguru-icon-opacity'].join(' ')}
            alt="Anonymous"
            src={MobileUnverified}
          />
          <div className={'iguru-icon-lbfnt'}>Mobile Unverified</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <img
            className={['iguru-icons-wid-hei', 'iguru-icon-opacity'].join(' ')}
            alt="Anonymous"
            src={HierarchyIcon}
          />
          <div className={'iguru-icon-lbfnt'}>Hierarchy</div>
        </Grid>
        <Grid item xs={3} className={'iguru-icons'}>
          <img
            className={['iguru-icons-wid-hei', 'iguru-icon-opacity'].join(' ')}
            alt="Anonymous"
            src={ListIcon}
          />
          <div className={'iguru-icon-lbfnt'}>List</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Icons;
