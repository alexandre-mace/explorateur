import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from "highcharts/highcharts-3d";
import FormControl from '@mui/material/FormControl';
import {Autocomplete, TextField} from "@mui/material";
import useWindowDimensions from "../../utils/useWindowDimensions";
import getGhgBySector from "../data/adapter/getGhgBySector";
import getOwidDataJson from "../data/adapter/owid/getOwidDataJson";


highcharts3d(Highcharts);

const options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        backgroundColor: null,
        plotShadow: false,
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: ''
    },
    plotOptions: {
        pie: {
            size:'130%',
            allowPointSelect: true,
            slicedOffset: 40,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                style: {
                    fontSize: '16px',
                    fontWeight: "normal"
                },
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        type: 'pie',
        data: [],
    }],
    credits: {
        enabled: false
    },
};

const mobileOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        backgroundColor: null,
        plotShadow: false,
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: ''
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            size:'150%',
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                style: {
                    fontSize: '7px',
                    fontWeight: "normal"
                },
                enabled: false,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            legend: {
                align: 'center',
                layout: 'vertical',
                verticalAlign: 'top',
                x: 40,
                y: 0,
            },
            showInLegend: true
        }
    },
    series: [{
        type: 'pie',
        data: []
    }],
    credits: {
        enabled: false
    },
};



const GhgEmissionsBySector = (props) => {
    const chartComponentRef = useRef(null);
    const [CO2EmissionsBySectorDatasets, setCO2EmissionsBySectorDatasets] = React.useState(null)
    const [year, setYear] = React.useState('2018')
    const [country, setCountry] = React.useState('Monde')
    const {width} = useWindowDimensions();

    React.useLayoutEffect(() => {
        setCO2EmissionsBySectorDatasets(getGhgBySector(country, year))
    }, [])

    React.useEffect(() => {
        setCO2EmissionsBySectorDatasets(getGhgBySector(country, year))
    }, [year, country])

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

    console.log(CO2EmissionsBySectorDatasets)

    return (
        <div className={"container"}>
            {CO2EmissionsBySectorDatasets === null &&
            <div className="row">
                <div className="col text-center">
                    'Chargement...'
                </div>
            </div>
            }

            {CO2EmissionsBySectorDatasets !== null &&
                <>
                    <div className="row pb-4 justify-content-center">
                        <div className="col-auto">
                            <FormControl sx={{ minWidth: 300, maxWidth: 400 }}>
                                <Autocomplete
                                    disablePortal
                                    id="country-box"
                                    options={CO2EmissionsBySectorDatasets.countries}
                                    color={"primary"}
                                    value={country}
                                    onChange={handleCountryChange}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label={"Pays"} />}
                                />
                            </FormControl>
                            <FormControl sx={{ minWidth: 300, maxWidth: 400, marginBottom: 2 }}>
                                <Autocomplete
                                    disablePortal
                                    id="year-box"
                                    options={CO2EmissionsBySectorDatasets.years}
                                    value={year}
                                    onChange={handleYearChange}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label={"Année"} />}
                                />
                            </FormControl>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <h3>Émissions de GES (CO2eq) par secteur</h3>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col">
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={{...(width > 500 ? options : mobileOptions), ...{series: [{
                                            type: 'pie',
                                            data: CO2EmissionsBySectorDatasets.data
                                        }]}}}
                                ref={chartComponentRef}
                                {...props}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <a href="https://www.climatewatchdata.org/data-explorer/historical-emissions?historical-emissions-data-sources=cait&historical-emissions-gases=all-ghg&historical-emissions-regions=All%20Selected&historical-emissions-sectors=All%20Selected&page=1">Sources (CAIT)</a>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default GhgEmissionsBySector;