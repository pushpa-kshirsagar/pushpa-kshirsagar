import Card from './Molecules/Card/Card';
import PersonIcon from '@material-ui/icons/Person';
import Popup from './Molecules/Popup/Popup';

function App() {
  return (
    <div className="App">
      <Card name={'asdas'} Picture={PersonIcon} isPicure={true} />
      <Popup isOpen={true} />
      {/* <List name={"name"} description={"dscription"} status={'suspended'} isFlaged={false}isNotification={true} isSelected={true}/> */}
    </div>
  );
}

export default App;
