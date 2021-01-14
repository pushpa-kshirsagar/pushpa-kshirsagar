import Card from './Molecules/Card/Card';
import PersonIcon from '@material-ui/icons/Person';
import Accordian from './Molecules/Accordian/Accordian';

function App() {
  return (
    <div className="App">
      <Card name={'asdas'} Picture={PersonIcon} isPicure={true} />
      <Accordian />
      {/* <List name={"name"} description={"dscription"} status={'suspended'} isFlaged={false}isNotification={true} isSelected={true}/> */}
    </div>
  );
}

export default App;
