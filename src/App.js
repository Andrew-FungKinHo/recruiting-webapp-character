import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST } from './data/consts.js';
import Attributes from './components/AttributesSection';

function App() {
  const [attributeValues, setAttributeValues] = useState(createAttributesObject(0));

  // instantiates an object with Attributes as keys and initialValue as values
  function createAttributesObject(initialValue) {
    return ATTRIBUTE_LIST.reduce((obj, curr) => ({ ...obj, [curr]: initialValue }), {});
  }

  // handles attributes increments and decrements based on operator
  function handleAttributeCounter(e, attribute, op) {
    if (op === "-") {
      // disallow negative values
      if (attributeValues[attribute] <= 0) {
        return;
      }
      setAttributeValues({
        ...attributeValues,
        [attribute]: attributeValues[attribute] -= 1,
      });
    }
    // operation check if needed
    else {
      setAttributeValues({
        ...attributeValues,
        [attribute]: attributeValues[attribute] += 1,
      });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        React Coding exercise
      </header>
      <Attributes
        attributeValues={attributeValues}
        setAttributeValues={setAttributeValues}
        handleAttributeCounter={handleAttributeCounter}
      />
    </div>)
}

export default App;
