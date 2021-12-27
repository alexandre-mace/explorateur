import React from "react";

const ChartSources = ({ sourcesLink, sourcesName }) => (
    <div className="row">
        <div className="col text-center">
            <a className={"sources"} href={sourcesLink}>Sources ({sourcesName})</a>
        </div>
    </div>
)

export default ChartSources