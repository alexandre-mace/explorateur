import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from "highcharts/highcharts-3d";
import FormControl from '@mui/material/FormControl';
import {Autocomplete, TextField} from "@mui/material";
import useWindowDimensions from "../../utils/useWindowDimensions";
import getGhgBySector from "../data/adapter/getGhgBySector";
import {
    mobilePieOptions, mobileStackedAreaOptions,
    pieOptions,
    stackedAreaOptions
} from "../../options/chartOptions";
import seriesLabel from 'highcharts/modules/series-label';

seriesLabel(Highcharts);
highcharts3d(Highcharts);

const GhgEmissionsBySector = (props) => {
    // const chartComponentRef = useRef(null);
    const [CO2EmissionsBySectorDatasets, setCO2EmissionsBySectorDatasets] = React.useState(null)
    const [year, setYear] = React.useState('2018')
    const [country, setCountry] = React.useState('Monde')
    const [chart, setChart] = React.useState('pie')
    const {width} = useWindowDimensions();

    React.useLayoutEffect(() => {
        setCO2EmissionsBySectorDatasets(getGhgBySector(country, year))
    }, [])

    React.useEffect(() => {
        setCO2EmissionsBySectorDatasets(getGhgBySector(country, (chart !== 'pie' ? null : year)))
    }, [year, country, chart])

    const handleYearChange = (value) => {
        if (value.target.innerText !== undefined) {
            setYear(value.target.innerText)
        }
    }

    const handleCountryChange = (value) => {
        if (value.target.innerText !== undefined) {
            setCountry(value.target.innerText)
        }
    }

    const getOptions = (chart) => {
        if (chart === 'pie') {
            return width > 500 ? pieOptions : mobilePieOptions
        }
        if (chart === 'area') {
            return width > 500 ? stackedAreaOptions : mobileStackedAreaOptions
        }
    }

    function compare(a, b) {
        if (typeof a.data === 'undefined') {
            return 0
        }

        if (a.data[a.data.length - 1] < b.data[b.data.length - 1]){
            return 1;
        }
        if (a.data[a.data.length - 1] > b.data[b.data.length - 1]){
            return -1;
        }
        return 0;
    }

    return (
        <>
            {CO2EmissionsBySectorDatasets === null &&
                <div className="row">
                    <div className="col text-center">
                        'Chargement...'
                    </div>
                </div>
            }

            {CO2EmissionsBySectorDatasets !== null &&
                <>
                    <div className="row pb-4 pt-2 justify-content-between">
                        <div className="col-auto chart-related-settings">
                            <FormControl sx={{ minWidth: 200, maxWidth: 400, marginRight: 1 }}>
                                <Autocomplete
                                    disablePortal
                                    id="country-box"
                                    options={CO2EmissionsBySectorDatasets.countries}
                                    color={"primary"}
                                    value={country}
                                    onChange={handleCountryChange}
                                    sx={{ width: 250 }}
                                    renderInput={(params) => <TextField {...params} label={"Pays"} />}
                                />
                            </FormControl>
                            {chart !== 'area' &&
                                <FormControl sx={{ minWidth: 200, maxWidth: 400, marginLeft: 1 }}>
                                    <Autocomplete
                                        disablePortal
                                        id="year-box"
                                        options={CO2EmissionsBySectorDatasets.years}
                                        value={year}
                                        onChange={handleYearChange}
                                        sx={{ width: 250 }}
                                        renderInput={(params) => <TextField {...params} label={"Année"} />}
                                    />
                                </FormControl>
                            }
                        </div>
                        <div className="col-auto">
                            <div onClick={() => setChart('pie')}>pie</div>
                            <div onClick={() => setChart('area')}>stacked</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            {chart === 'pie' &&
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={{...(getOptions(chart)), ...{series: [{
                                                type: chart,
                                                data: CO2EmissionsBySectorDatasets.data
                                            }]}}}
                                    {...props}
                                />
                            }
                            {chart === 'area' &&
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={{
                                        ...(getOptions(chart)),
                                        ...{
                                            xAxis: {
                                                categories: [...CO2EmissionsBySectorDatasets.years].reverse(),
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
                                        ...{series: CO2EmissionsBySectorDatasets.data.sort(compare)}}}
                                    {...props}
                                />
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <h4 className={"mt-2"}>Émissions de GES (CO2eq) par secteur</h4>
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

export default GhgEmissionsBySector;