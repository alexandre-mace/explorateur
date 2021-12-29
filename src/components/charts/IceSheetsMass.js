import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useWindowDimensions from "../../utils/useWindowDimensions";
import {areaOptions, mobileAreaOptions} from "../../options/chartOptions";
import ChartLoader from "../ChartLoader";
import ChartTitle from "../ChartTitle";
import ChartSources from "../ChartSources";
import ChartTypes from "../ChartTypes";
import FormControl from "@mui/material/FormControl";
import {Autocomplete, TextField} from "@mui/material";
import getIceSheetsMass from "../../data/adapter/getIceSheetsMass";

const IceSheetsMass = (props) => {
    const [dataset, setDataset] = React.useState(null)
    const [glacier, setGlacier] = React.useState('Groenland')
    const {width} = useWindowDimensions();
    const [chart, setChart] = React.useState('area')

    React.useLayoutEffect(() => {
        let data = getIceSheetsMass(glacier);
        setDataset(data)
    }, [])

    React.useLayoutEffect(() => {
        let data = getIceSheetsMass(glacier);
        setDataset(data)
    }, [glacier])

    return (
        <>
            {dataset === null &&
                <ChartLoader/>
            }

            {dataset !== null &&
                <>
                    <div className="row pb-4 pt-2 justify-content-between">
                        <div className="col-auto chart-related-settings">
                            <FormControl sx={{ minWidth: 200, maxWidth: 400, marginLeft: 1 }}>
                                <Autocomplete
                                    disablePortal
                                    disableClearable
                                    id="glacier-box"
                                    options={['Groenland', 'Antarctique']}
                                    value={glacier}
                                    onChange={(value) => {
                                        if (value.target.innerText !== undefined) {
                                            setGlacier(value.target.innerText)
                                        }}
                                    }
                                    sx={{ width: 250 }}
                                    renderInput={(params) => <TextField {...params} label={"Zone"} />}
                                />
                            </FormControl>
                        </div>
                        <div className="col-auto">
                            <ChartTypes chart={chart} setChart={setChart} chartTypes={['area']}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
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
                                                text: 'trillion t'
                                            },
                                        },
                                    },
                                    ...{series: dataset.data}
                                }}
                                {...props}
                            />
                        </div>
                    </div>
                    <ChartTitle title={"Modification de la masse des calottes glaciaires - " + glacier}/>
                    <ChartSources
                        sourcesLink={"https://ourworldindata.org/co2-and-other-greenhouse-gas-emissions"}
                        sourcesName={"OWID"}
                    />
                </>
            }
        </>
    )
}

export default IceSheetsMass;