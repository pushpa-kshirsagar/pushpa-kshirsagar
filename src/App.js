import Card from './Molecules/Card/Card';
import ArrowRight from '@material-ui/icons/ChevronRight';
import SectionButton from './Atoms/Sections/SectionButton';
import SectionLine from './Atoms/Sections/SectionLine';

function App() {
  return (
    <div className="App">
      <Card name={'asdas'} ImgIcon={ArrowRight} isImage={false}/>
      <SectionButton/>
      <SectionLine/>
    </div>
  );
}

export default App;
