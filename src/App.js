import Card from './Molecules/Card/Card';
import PersonIcon from '@material-ui/icons/Person';
import Accordian from './Molecules/Accordian/Accordian';
import { Keyboard } from '@material-ui/icons';
import Verified from './images/verified.svg';
import TelephoneVerified from './images/telephone_verified.svg';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
function App() {
  return (
    <div className="App">
      <Card name={'asdas'} Picture={PersonIcon} isPicure={true} />
      <Accordian headerLabel={'header'} isTextListExpanded={false} isTextList={false} IconOne={VerifiedUserIcon} IconTwo={VerifiedUserIcon} isDisplayCardExpanded={true} textOneLabel={'email address'} textOne={'sdad'} textOneLabelBadgeOne={'asda'}/>
      {/* <List name={"name"} description={"dscription"} status={'suspended'} isFlaged={false}isNotification={true} isSelected={true}/> */}
    </div>
  );
}

export default App;
