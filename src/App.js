import Card from './Molecules/Card/Card';
import List from './Molecules/List/List';
import ArrowRight from '@material-ui/icons/ChevronRight';
import SectionButton from './Atoms/Sections/SectionButton';
import SectionLine from './Atoms/Sections/SectionLine';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import { Keyboard } from '@material-ui/icons';

import Popup from './Molecules/Popup/Popup';

function App() {
  return (
    <div className="App">
      <Card name={'asdas'} Picture={PersonIcon} isPicure={true}/>
      <Popup isOpen={true}  />
      {/* <List name={"name"} description={"dscription"} status={'suspended'} isFlaged={false}isNotification={true} isSelected={true}/> */}
    </div>
  );
}

export default App;
