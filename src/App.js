import { useEffect, useState } from 'react';
import './App.css';
import { API_URL, ATTRIBUTE_LIST, CLASS_LIST, INIT_POINT, MAX_ATTRIBUTE_TOTAL } from './data/consts.js';
import Attributes from './components/Attributes';
import ClassesSection from './components/ClassSection';

function App() {

  const [attributeValues, setAttributeValues] = useState(createAttributesObject(INIT_POINT));
  const [classesQualified, setClassesQualified] = useState(creatClassesQualifiedObj(false));
  const [currentClass, setCurrentClass] = useState(null);
  const [modifierValues, setModifierValues] = useState(createAttributesObject(Math.floor((INIT_POINT - 10) / 2)));

  useEffect(() => {
    fetch(API_URL).then((response) => response.json())
      .then((data) => {
        setAttributeValues(data.body.attributeValues);
        setClassesQualified(data.body.classesQualified);
        setModifierValues(data.body.modifierValues);
      });
  }, []);

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

    else if (op === "+") {
      // find current sum of all the attribute points
      const currentAttributeTotal = Object.values(attributeValues).reduce((acc, cur) => acc + cur, 0);

      // disable events if exceed MAX_ATTRIBUTE_TOTAL
      if (currentAttributeTotal >= MAX_ATTRIBUTE_TOTAL) {
        return;
      }
      setAttributeValues({
        ...attributeValues,
        [attribute]: attributeValues[attribute] += 1,
      });
    }
    // unknown operation
    else {
      return;
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

  async function handleSaveCharacterInformation(e) {
    e.preventDefault();
    const data = {
      attributeValues,
      classesQualified,
      modifierValues,
    };

    try {
      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save data");
      }
      console.log("Character information saved.")
      // Handle success case
    } catch (error) {
      // Handle error case
      console.log("Saved failed. Character information is not saved.")
    }
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
      <button onClick={(e) => { handleSaveCharacterInformation(e) }}>Save character</button>
    </div>)
}

export default App;
