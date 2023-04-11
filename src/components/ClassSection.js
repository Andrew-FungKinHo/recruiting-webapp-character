import React from "react";
import { CLASS_LIST } from "../data/consts.js"

const ClassesSection = ({ classesQualified, currentClass, setCurrentClass }) => {
    return (
        <div>
            <h2>Classes</h2>
            <div className="classes-headers">
                {Object.keys(CLASS_LIST).map((classType, id) => {
                    return (
                        <div key={id} className="">
                            <h4 onClick={() => { setCurrentClass(classType) }}>
                                {classesQualified[classType] ? <>&#10003;</> : ""} {classType} {classesQualified[classType] ? <>&#10003;</> : ""}
                            </h4>
                        </div>
                    );
                })}
            </div>
            <div>
                {currentClass === null ?
                    (
                        <div>Select one of the Classes to view stats</div>
                    ) :
                    (
                        <div>
                            {Object.keys(CLASS_LIST[currentClass]).map((attribute, id) => {
                                return (
                                    <div key={id}>
                                        {attribute}: {CLASS_LIST[currentClass][attribute]}
                                    </div>
                                );
                            })}
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ClassesSection;