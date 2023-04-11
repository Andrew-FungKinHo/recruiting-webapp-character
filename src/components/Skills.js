import React from "react";
import { SKILL_LIST } from "../data/consts";

const Skills = ({ maxPointsForSkills }) => {
    return (
        <div>
            <h2>Skills</h2>
            <h3>
                Remaining points to spend: {maxPointsForSkills}
            </h3>
            {SKILL_LIST.map((skill) => {
                return (
                    <div className="skill">
                        <div className="skill-name">
                            <strong>
                                {skill.name} ({skill.attributeModifier.slice(0, 3)})
                            </strong>
                        </div>
                        <div>
                            <button
                            >
                                -
                            </button>{" "}
                            <button

                            >
                                +
                            </button>
                        </div>

                    </div>
                );
            })}
        </div>
    );
};

export default Skills;