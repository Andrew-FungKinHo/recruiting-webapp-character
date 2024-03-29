import React from "react";

const Attributes = ({ attributeValues, handleAttributeCounter, modifierValues }) => {
    return (
        <div>
            <h2>Attributes</h2>
            <div className="attributes-overall">
                {Object.keys(attributeValues).map((attribute, id) => {
                    return (
                        <div key={id} >
                            <h5>{attribute}</h5>
                            <div className="attribute-counter">
                                <button onClick={(e) => {
                                    handleAttributeCounter(e, attribute, "+");
                                }}
                                >
                                    +
                                </button>
                                <p>{attributeValues[attribute]}</p>
                                <button onClick={(e) => {
                                    handleAttributeCounter(e, attribute, "-");
                                }}
                                >
                                    -
                                </button>
                                <h4>Modifier: {modifierValues[attribute]}</h4>
                            </div>
                        </div>)
                }
                )
                }
            </div>
        </div>
    );
};

export default Attributes;