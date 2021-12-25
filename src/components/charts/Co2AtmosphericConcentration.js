import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useWindowDimensions from "../../utils/useWindowDimensions";
import getCo2Concentration from "../data/adapter/getCo2Concentration";
import {areaOptions, mobileAreaOptions} from "../../options/chartOptions";

const Co2AtmosphericConcentration = (props) => {
    const [dataset, setDataset] = React.useState(null)
    const [triggerChart, setTriggerChart] = React.useState(false)
    const {width} = useWindowDimensions();

    React.useLayoutEffect(() => {
        let data = getCo2Concentration();
        setDataset(data)
        setTimeout(() => {
            setTriggerChart(true)
        }, 10)
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
                                    categories: Array.from({length: 2018}, (_, i) => i + 1),
                                    tickmarkPlacement: 'on',
                                    title: {
                                        enabled: false
                                    }
                                },
                                yAxis: {
                                    title: {
                                        text: 'MtCO2eq'
                                    },
                                    min: 250
                                },
                            },
                            ...{series: dataset.data}
                        }}
                        {...props}
                    />
                    <div className="row">
                        <div className="col text-center">
                            <h4 className={"mt-2"}>Concentration atmosphérique de CO2</h4>
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

export default Co2AtmosphericConcentration;