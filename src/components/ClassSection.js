import React from "react";
import { CLASS_LIST } from "../data/consts.js"

const ClassesSection = ({ classesQualified }) => {
    return (
        <div>
            <h2>Classes</h2>
            <div className="classes-section">
                {Object.keys(CLASS_LIST).map((classType, id) => {
                    return (
                        <div key={id} className="">
                            <h4>
                                {classesQualified[classType] ? <>&#10003;</> : ""} {classType} {classesQualified[classType] ? <>&#10003;</> : ""}
                            </h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ClassesSection;