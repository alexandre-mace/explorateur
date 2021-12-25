import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useWindowDimensions from "../../utils/useWindowDimensions";
import {areaOptions, mobileAreaOptions} from "../../options/chartOptions";
import getTemperatureAnomaly from "../data/adapter/getTemperatureAnomaly";

const TemperatureAnomaly = (props) => {
    const [dataset, setDataset] = React.useState(null)
    const {width} = useWindowDimensions();

    React.useLayoutEffect(() => {
        let data = getTemperatureAnomaly();
        setDataset(data)
    }, [])

    return (
        <>
            {dataset === null &&
                <div className="row">
                    <div className="col text-center">
                        'Chargement...'
                    </div>
                </div>
            }


            {dataset !== null &&
                <>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            ...(width > 500 ? areaOptions : mobileAreaOptions),
                            ...{
                                xAxis: {
                                    categories: dataset.dates,
                                    tickmarkPlacement: 'on',
                                    title: {
                                        enabled: false
                                    },
                                },
                                yAxis: {
                                    title: {
                                        text: '°C'
                                    },
                                },
                            },
                            ...{series: dataset.data}
                        }}
                        {...props}
                    />
                    <div className="row">
                        <div className="col text-center">
                            <h4 className={"mt-2"}>Réchauffement climatique</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <a className={"sources"} href="https://www.climatewatchdata.org/data-explorer/historical-emissions?historical-emissions-data-sources=cait&historical-emissions-gases=all-ghg&historical-emissions-regions=All%20Selected&historical-emissions-sectors=All%20Selected&page=1">Sources (CAIT)</a>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default TemperatureAnomaly;