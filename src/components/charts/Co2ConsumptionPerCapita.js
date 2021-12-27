import React  from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from "highcharts/highcharts-3d";
import FormControl from '@mui/material/FormControl';
import {Autocomplete, TextField} from "@mui/material";
import useWindowDimensions from "../../utils/useWindowDimensions";
import {getOptions} from "../../options/chartOptions";
import seriesLabel from 'highcharts/modules/series-label';
import ChartLoader from "../ChartLoader";
import handleYearChange from "../../utils/handleYearChange";
import ChartTypes from "../ChartTypes";
import sortToLowest from "../../utils/sortToLowest";
import ChartTitle from "../ChartTitle";
import ChartSources from "../ChartSources";
import getCo2ConsumptionPerCapita from "../../data/adapter/getCo2ConsumptionPerCapita";

seriesLabel(Highcharts);
highcharts3d(Highcharts);

const Co2ConsumptionPerCapita = (props) => {
    const [dataset, setDataset] = React.useState(null)
    const [year, setYear] = React.useState('2018')
    const [countries, setCountries] = React.useState(['France', 'China', 'Germany', 'Russia', 'United States', 'India'])
    const [chart, setChart] = React.useState('line')
    const {width} = useWindowDimensions();

    React.useLayoutEffect(() => {
        setDataset(getCo2ConsumptionPerCapita(countries, year))
    }, [])

    React.useEffect(() => {
        setDataset(getCo2ConsumptionPerCapita(countries, (chart !== 'pie' ? null : year)))
    }, [year, countries, chart])

    return (
        <>
            {dataset === null &&
                <ChartLoader/>
            }

            {dataset !== null &&
                <>
                    <div className="row pb-4 pt-2 justify-content-between">
                        <div className="col-auto chart-related-settings">
                            <FormControl sx={{ minWidth: 300, maxWidth: 500, marginRight: 1 }}>
                                <Autocomplete
                                    disablePortal
                                    id="country-box"
                                    options={dataset.countries}
                                    color={"primary"}
                                    multiple
                                    value={countries}
                                    onChange={(value) => {
                                        if (typeof value.target.innerText === 'undefined') {
                                            let countryToRemove = '';
                                            if (value.target.parentElement.textContent !== '') {
                                                countryToRemove = value.target.parentElement.textContent
                                            } else if (value.target.parentElement.parentElement.textContent !== '') {
                                                countryToRemove = value.target.parentElement.parentElement.textContent
                                            }

                                            setCountries([...countries].filter(
                                                country => country !== countryToRemove
                                            ))
                                            return
                                        }
                                        if (value.target.innerText !== 'undefined') {
                                            setCountries([...countries, value.target.innerText])
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} label={"Pays"} />}
                                />
                            </FormControl>
                            {chart !== 'line' &&
                                <FormControl sx={{ minWidth: 200, maxWidth: 400, marginLeft: 1 }}>
                                    <Autocomplete
                                        disablePortal
                                        id="year-box"
                                        options={dataset.years}
                                        value={year}
                                        onChange={(value) => handleYearChange(value, setYear)}
                                        sx={{ width: 250 }}
                                        renderInput={(params) => <TextField {...params} label={"Année"} />}
                                    />
                                </FormControl>
                            }
                        </div>
                        <div className="col-auto">
                            <ChartTypes chart={chart} setChart={setChart} chartTypes={['pie', 'line']}/>
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
                            {chart === 'line' &&
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={{
                                        ...(getOptions(chart, width)),
                                        ...{
                                            xAxis: {
                                                categories: [...dataset.years].reverse(),
                                                tickmarkPlacement: 'on',
                                                title: {
                                                    enabled: false
                                                }
                                            },
                                            yAxis: {
                                                title: {
                                                    text: 't'
                                                },
                                            },
                                        },
                                        ...{series: dataset.data.sort(sortToLowest)}}}
                                    {...props}
                                />
                            }
                        </div>
                    </div>
                    <ChartTitle title={"Émissions de CO2  par Personne (ajusté par la consommation)"}/>
                    <ChartSources sourcesName={"OWID"} sourcesLink={"https://ourworldindata.org/co2-and-other-greenhouse-gas-emissions"}/>
                </>
            }
        </>
    )
}

export default Co2ConsumptionPerCapita;