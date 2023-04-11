import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST } from './data/consts.js';
import Attributes from './components/Attributes';
import ClassesSection from './components/ClassSection';

function App() {

  // TODO: remove magic numbers(0,-5) and put them in consts.js 
  const [attributeValues, setAttributeValues] = useState(createAttributesObject(0));
  const [classesQualified, setClassesQualified] = useState(creatClassesQualifiedObj(false));
  const [currentClass, setCurrentClass] = useState(null);
  const [modifierValues, setModifierValues] = useState(createAttributesObject(-5));

  function creatClassesQualifiedObj(initialBoolean) {
    return Object.keys(CLASS_LIST).reduce((obj, curr) => ({ ...obj, [curr]: initialBoolean }), {});
  }

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

    // linear complexity: At most number of classes * number of attributes comparisons
    for (let classType in CLASS_LIST) {
      let hasClass = true;
      for (let attribute in CLASS_LIST[classType]) {
        // break out of loop if any of the character's attributes does not reach the minimum
        if (attributeValues[attribute] < CLASS_LIST[classType][attribute]) {
          hasClass = false;
          break
        }
      }
      // assign the hasClass status back to each class
      classesQualified[classType] = hasClass
    }
    // update state of classesQualified
    setClassesQualified(classesQualified);

    // update the modifier value based on attribute values
    setModifierValues({
      ...modifierValues,
      [attribute]: Math.floor((attributeValues[attribute] - 10) / 2),
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        React Coding exercise
      </header>
      <ClassesSection classesQualified={classesQualified} currentClass={currentClass} setCurrentClass={setCurrentClass} />
      <Attributes
        attributeValues={attributeValues}
        setAttributeValues={setAttributeValues}
        handleAttributeCounter={handleAttributeCounter}
        modifierValues={modifierValues}
      />
    </div>)
}

export default App;
