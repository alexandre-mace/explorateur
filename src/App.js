import './App.css';
import GhgEmissionsBySector from "./components/charts/GhgEmissionsBySector";
import Co2AtmosphericConcentration from "./components/charts/Co2AtmosphericConcentration";
import React from "react";
import FormControl from "@mui/material/FormControl";
import {Autocomplete, createTheme, TextField, ThemeProvider} from "@mui/material";
import TemperatureAnomaly from "./components/charts/TemperatureAnomaly";
import Co2BySource from "./components/charts/Co2BySource";
const AtmosphericConcentration = 'Concentration atmosphérique'
const GesEmissions = 'Émissions de GES (Gaz à effet de serre)'
const Co2Emissions = 'Émissions de CO2'
const ClimateChange = 'Changement climatique'
const bySector = 'Par secteur'
const bySource = 'Par source'
const co2 = 'CO2'
const temperature = 'Température'

const themes = [
    {
        'name': GesEmissions,
        'indicators': [bySector]
    },
    {
        'name': Co2Emissions,
        'indicators': [bySource]
    },
    {
        'name': AtmosphericConcentration,
        'indicators': [co2]
    },
    {
        'name': ClimateChange,
        'indicators': [temperature]
    },
];


let customTheme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        }
    },
});

function App() {
  const [theme, setTheme] = React.useState(GesEmissions)
  const [indicator, setIndicator] = React.useState(bySector)

    React.useLayoutEffect(() => {
        setIndicator(themes.find(datum => datum.name === theme).indicators[0])
    }, [theme])

  return (
      <ThemeProvider theme={customTheme}>
          <header className="container header">
              <div className="row align-items-center">
                  <div className="col d-flex justify-content-between">
                      <a href={"/"} className={"d-flex align-items-center"}>
                          <img height={27} width={27} className={"logo-img mr-3"} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/globe-showing-europe-africa_1f30d.png" alt="Planète"/> Explorateur
                      </a>
                      <div className={"climate-lab d-flex align-items-center"}>
                          <div className={"mr-3"}>un outil du </div>
                          <a target="_blank" rel="noopener noreferrer" className={"d-flex align-items-center climate-lab-link"} href="https://climatelab.fr"><img height={27} width={27} className={"logo-img mr-1"} src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/285/alembic_2697-fe0f.png" alt="Alambic"/> ClimateLab</a>
                      </div>
                  </div>
              </div>
          </header>
          <div className="container presentation">
              <div className="row">
                  <div className="col-12 text-center">
                      <h1 className={"mb-2"}>Explorateur</h1>
                  </div>
                  <div className="col-12">
                      <h2 className={"text-center m-auto"}>
                          Explore les données du climat.
                      </h2>
                  </div>
              </div>
          </div>
          <div className="container mt-5 mb-3">
              <div className="row align-items-center h-100">
                  <div className="col-12 col-md-6 pl-md-0 pr-md-2 settings-wrapper">
                      <FormControl sx={{ width: '100%', background: 'white' }}>
                          <Autocomplete
                              disablePortal
                              id="year-box"
                              options={themes.map(theme => theme.name)}
                              value={theme}
                              onChange={(value) => setTheme(value.target.innerText)}
                              sx={{ width: "100%" }}
                              renderInput={(params) => <TextField {...params} label="Thème" />}
                          />
                      </FormControl>
                  </div>
                  <div className="col-12 col-md-6 pr-md-0 pl-md-2">
                      <FormControl sx={{ width: '100%', background: 'white' }}>
                          <Autocomplete
                              disablePortal
                              id="country-box"
                              options={themes.find(datum => datum.name === theme).indicators}
                              color={"primary"}
                              value={indicator}
                              sx={{ width: "100%" }}
                              onChange={(value) => setIndicator(value.target.innerText)}
                              renderInput={(params) => <TextField {...params} label="Indicateur" />}
                          />
                      </FormControl>
                  </div>
              </div>
          </div>

          <div className={"container chart-wrapper py-3"}>
              {theme === GesEmissions &&
                  <>
                      {indicator === bySector &&
                          <GhgEmissionsBySector/>
                      }
                  </>
              }
              {theme === Co2Emissions &&
                  <>
                      {indicator === bySource &&
                          <Co2BySource/>
                      }
                  </>
              }
              {theme === AtmosphericConcentration &&
                  <>
                      {indicator === co2 &&
                          <Co2AtmosphericConcentration/>
                      }
                  </>
              }
              {theme === ClimateChange &&
                  <>
                      {indicator === temperature &&
                          <TemperatureAnomaly/>
                      }
                  </>
              }
          </div>
          <footer className={"container mt-4"}>
              <div className="row">
                  <div className="col text-center">
                      Fait avec amour par <strong><a target="_blank" rel="noopener noreferrer" href="https://github.com/alexandre-mace">@alexandre-mace</a></strong>
                  </div>
              </div>
          </footer>
      </ThemeProvider>
  );
}

export default App;
