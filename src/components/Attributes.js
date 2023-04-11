import React from "react";

const Attributes = ({ attributeValues, handleAttributeCounter }) => {
    return (
        <div>
            <h2>Attributes</h2>
            <div>
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