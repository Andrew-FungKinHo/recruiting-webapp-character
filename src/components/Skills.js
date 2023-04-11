import React from "react";

const Skills = ({ maxPointsForSkills }) => {
    return (
        <div>
            <h2>Skills</h2>
            <h3>
                Remaining points to spend: {maxPointsForSkills}
            </h3>
        </div>
    );
};

export default Skills;