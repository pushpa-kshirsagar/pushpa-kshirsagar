import logo from './logo.svg';
import Card from './Molecules/Card/Card';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header> */}
      {/* <HeaderCard
        headertype={'midddle'}
        label={'dashboard'}
        primaryheaderbadge={'distinct'}
        secondaryheaderbadge={'active'}
        thirdheaderbadge={'suspended'}
      />
      <HeaderCard
        headertype={'left'}
        label={'dashboard'}
        primaryheaderbadge={'distinct'}
        secondaryheaderbadge={'active'}
        thirdheaderbadge={'suspended'}
      /> */}
      <Card/>
    </div>
  );
}

export default App;
