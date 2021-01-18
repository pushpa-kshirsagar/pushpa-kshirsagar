import Card from './Molecules/Card/Card';
import PersonIcon from '@material-ui/icons/Person';
import Accordian from './Molecules/KeyCard/KeyCard';
import { Keyboard } from '@material-ui/icons';
import Verified from './images/verified.svg';
import TelephoneVerified from './images/telephone_verified.svg';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
function App() {
  const allData=[{
    headerOne: 'allocation',
    isDisplayCardExpanded: true,
    dataTwo: [
      {
        labelTextOne: 'group',
        labelTextOneBadgeOne: 'primary',
        labelTextOneBadgeTwo: 'secondary',
        isListSelect: true,
        isListSelectExpanded: false
      },
      {
        labelTextOne: 'manager',
        labelTextOneBadgeOne: 'primary',
        labelTextOneBadgeTwo: 'secondary',
        isListSelect: true,
        isListSelectExpanded: false
      }
    ]
  }];
  return (
    <div className="App">
      {/* <Card name={'asdas'} Picture={PersonIcon} isPicure={true} /> */}
      <Accordian headerLabel={'header'} allData={allData}isTextListExpanded={false} isTextList={false} IconOne={VerifiedUserIcon} IconTwo={VerifiedUserIcon} isDisplayCardExpanded={true} textOneLabel={'email address'} textOne={'sdad'} textOneLabelBadgeOne={'asda'}/>
      {/* <List name={"name"} description={"dscription"} status={'suspended'} isFlaged={false}isNotification={true} isSelected={true}/> */}
    </div>
  );
}

export default App;
