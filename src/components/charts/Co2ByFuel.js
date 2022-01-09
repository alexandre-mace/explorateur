import React  from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from "highcharts/highcharts-3d";
import FormControl from '@mui/material/FormControl';
import {Autocomplete, TextField} from "@mui/material";
import useWindowDimensions from "../../utils/useWindowDimensions";
import {getOptions} from "../../options/chartOptions";
import seriesLabel from 'highcharts/modules/series-label';
import getCo2ByFuel from "../../data/adapter/getCo2ByFuel";
import ChartLoader from "../ChartLoader";
import handleCountryChange from "../../utils/handleCountryChange";
import handleYearChange from "../../utils/handleYearChange";
import ChartTitle from "../ChartTitle";
import ChartSources from "../ChartSources";
import sortToLowest from "../../utils/sortToLowest";
import ChartTypes from "../ChartTypes";
import getCountryLabel from "../../utils/getCountryLabel";

seriesLabel(Highcharts);
highcharts3d(Highcharts);

const Co2ByFuel = (props) => {
    const [dataset, setDataset] = React.useState(null)
    const [year, setYear] = React.useState('2020')
    const [country, setCountry] = React.useState('World')
    const [chart, setChart] = React.useState('area')
    const {width} = useWindowDimensions();

    React.useLayoutEffect(() => {
        setDataset(getCo2ByFuel(country, year))
    }, [])

    React.useEffect(() => {
        setDataset(getCo2ByFuel(country, (chart !== 'pie' ? null : year)))
    }, [year, country, chart])

    return (
        <>
            {dataset === null &&
                <ChartLoader/>
            }

            {dataset !== null &&
                <>
                    <div className="row pb-4 pt-2 justify-content-between">
                        <div className="col-auto chart-related-settings">
                            <FormControl sx={{ minWidth: 200, maxWidth: 400, marginRight: 1, marginBottom: 1 }}>
                                <Autocomplete
                                    disableClearable
                                    disablePortal
                                    id="country-box"
                                    options={dataset.countries.sort((a, b) => -getCountryLabel(b).charAt(0).localeCompare(getCountryLabel(a).charAt(0)))}
                                    color={"primary"}
                                    value={country}
                                    getOptionLabel={(option) => getCountryLabel(option)}
                                    onChange={(event, value) => handleCountryChange(value, setCountry)}
                                    sx={{ width: 250 }}
                                    renderInput={(params) => <TextField {...params} label={"Pays"} />}
                                />
                            </FormControl>
                            {chart !== 'area' &&
                                <FormControl sx={{ minWidth: 200, maxWidth: 400, marginLeft: {
                                    xs: 0,
                                    md: 1
                                } }}>
                                    <Autocomplete
                                        disableClearable
                                        disablePortal
                                        id="year-box"
                                        options={dataset.years}
                                        value={year}
                                        getOptionLabel={(option) => option.toString()}
                                        onChange={(value) => handleYearChange(value, setYear)}
                                        sx={{ width: 250 }}
                                        renderInput={(params) => <TextField {...params} label={"Année"} />}
                                    />
                                </FormControl>
                            }
                        </div>
                        <div className="col-auto">
                            <ChartTypes chart={chart} setChart={setChart} chartTypes={['pie', 'area']}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
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
                            {chart === 'area' &&
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={{
                                        ...(getOptions(chart, width)),
                                        ...{
                                            xAxis: {
                                                categories: dataset.years,
                                                tickmarkPlacement: 'on',
                                                title: {
                                                    enabled: false
                                                }
                                            },
                                            yAxis: {
                                                title: {
                                                    text: 'MtCO2eq'
                                                },
                                            },
                                        },
                                        ...{series: dataset.data.sort(sortToLowest)}}}
                                    {...props}
                                />
                            }
                        </div>
                    </div>
                    <ChartTitle title={"Émissions de CO2 par source"}/>
                    <ChartSources sourcesLink={"https://ourworldindata.org/emissions-by-fuel"} sourcesName={"OWID"}/>
                </>
            }
        </>
    )
}

export default Co2ByFuel;