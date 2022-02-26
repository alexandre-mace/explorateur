import React  from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from "highcharts/highcharts-3d";
import useWindowDimensions from "../../utils/useWindowDimensions";
import {getOptions} from "../../options/chartOptions";
import seriesLabel from 'highcharts/modules/series-label';
import ChartTypes from "../ChartTypes";
import ChartTitle from "../ChartTitle";
import ChartSources from "../ChartSources";

seriesLabel(Highcharts);
highcharts3d(Highcharts);

const GhgEmissionsByGas = (props) => {
    const [dataset, setDataset] = React.useState({
        data: [
            {
                name: 'Dioxyde de carbone (CO2)',
                y: 74.4
            },
            {
                name: 'Méthane (CH4)',
                y: 17.3,
            },
            {
                name: 'Protoxyde d\'azote (N₂O)',
                y: 6.2
            },
            {
                name: 'Hydrofluorocarbures (HFCs, CFCs, SF6)',
                y: 2.1
            }
        ]
    })
    const [chart, setChart] = React.useState('pie')
    const {width} = useWindowDimensions();

    return (
        <>
            <div className="row pb-4 pt-2 justify-content-end">
                <div className="col-auto">
                    <ChartTypes chart={chart} setChart={setChart} chartTypes={['pie']}/>
                </div>
            </div>

            <div className="row">
                <div className="col px-0">
                    {chart === 'pie' &&
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{...(getOptions(chart, width)), ...{series: [{
                                        type: chart,
                                        data: dataset.data
                                    }]}}}
                            {...props}
                        />
                    }
                </div>
            </div>
            <ChartTitle title={"Émissions de GES CO2eq par gaz (2016)"}/>
            <ChartSources sourcesName={"OWID"} sourcesLink={"https://ourworldindata.org/co2-and-other-greenhouse-gas-emissions"}/>
        </>
    )
}

export default GhgEmissionsByGas;