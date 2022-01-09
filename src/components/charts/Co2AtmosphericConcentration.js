import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useWindowDimensions from "../../utils/useWindowDimensions";
import getCo2Concentration from "../../data/adapter/getCo2Concentration";
import {areaOptions, mobileAreaOptions} from "../../options/chartOptions";
import ChartLoader from "../ChartLoader";
import ChartTitle from "../ChartTitle";
import ChartSources from "../ChartSources";
import ChartTypes from "../ChartTypes";

const Co2AtmosphericConcentration = (props) => {
    const [dataset, setDataset] = React.useState(null)
    const [triggerChart, setTriggerChart] = React.useState(false)
    const [chart, setChart] = React.useState('area')
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
                <ChartLoader/>
            }

            {dataset !== null &&
                <>
                    <div className="row pb-4 pt-2 justify-content-end">
                        <div className="col-auto">
                            <ChartTypes chart={chart} setChart={setChart} chartTypes={['area']}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col px-0">
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
                                            min: 265
                                        },
                                    },
                                    ...{series: dataset.data}
                                }}
                                {...props}
                            />
                        </div>
                    </div>
                    <ChartTitle title={"Concentration atmosphérique de CO2"}/>
                    <ChartSources
                        sourcesLink={"https://www.climatewatchdata.org/data-explorer/historical-emissions"}
                        sourcesName={"CAIT"}
                    />
                </>
            }
        </>
    )
}

export default Co2AtmosphericConcentration;