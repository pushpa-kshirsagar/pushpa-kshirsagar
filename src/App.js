import Card from './Molecules/Card/Card';
import List from './Molecules/List/List';
import ArrowRight from '@material-ui/icons/ChevronRight';
import SectionButton from './Atoms/Sections/SectionButton';
import SectionLine from './Atoms/Sections/SectionLine';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';

function App() {
  return (
    <div className="App">
      <Card name={'asdas'} Picture={PersonIcon} isPicure={true}/>
      <List/>
     
    </div>
  );
}

export default App;
