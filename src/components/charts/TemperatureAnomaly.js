import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useWindowDimensions from "../../utils/useWindowDimensions";
import {areaOptions, mobileAreaOptions} from "../../options/chartOptions";
import getTemperatureAnomaly from "../../data/adapter/getTemperatureAnomaly";
import ChartLoader from "../ChartLoader";
import ChartTitle from "../ChartTitle";
import ChartSources from "../ChartSources";
import ChartTypes from "../ChartTypes";

const TemperatureAnomaly = (props) => {
    const [dataset, setDataset] = React.useState(null)
    const {width} = useWindowDimensions();
    const [chart, setChart] = React.useState('area')

    React.useLayoutEffect(() => {
        let data = getTemperatureAnomaly();
        setDataset(data)
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
                        </div>
                    </div>
                    <ChartTitle title={"Réchauffement climatique"}/>
                    <ChartSources
                        sourcesLink={"https://ourworldindata.org/co2-and-other-greenhouse-gas-emissions"}
                        sourcesName={"OWID"}
                    />
                </>
            }
        </>
    )
}

export default TemperatureAnomaly;