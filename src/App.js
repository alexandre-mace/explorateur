import './App.css';
import Co2AtmosphericConcentration from "./components/charts/Co2AtmosphericConcentration";
import React from "react";
import FormControl from "@mui/material/FormControl";
import {Autocomplete, createTheme, TextField, ThemeProvider} from "@mui/material";
import TemperatureAnomaly from "./components/charts/TemperatureAnomaly";
import {Co2ByFuel} from "./components/async";
import {GhgEmissionsBySector} from "./components/async";
import {Ch4EmissionsBySector} from "./components/async";
import {Co2BySector} from "./components/async";
import {ElectricityProductionBySource} from "./components/async";
import {GhgEmissionsBySectorPerCapita} from "./components/async";
import {NitrousOxideBySector} from "./components/async";
import Co2ConsumptionPerCountry from "./components/charts/Co2ConsumptionPerCountry";
import Co2ConsumptionPerCapita from "./components/charts/Co2ConsumptionPerCapita";
import GhgEmissionsPerCountry from "./components/charts/GhgEmissionsPerCountry";
import GhgEmissionsPerCapita from "./components/charts/GhgEmissionsPerCapita";
import GhgEmissionsByGas from "./components/charts/GhgEmissionsByGas";
import SeaLevelRise from "./components/charts/SeaLevelRise";
import OceanPh from "./components/charts/OceanPh";
import IceSheetsMass from "./components/charts/IceSheetsMass";
import PrimaryDirectEnergyConsumptionBySource from "./components/charts/PrimaryDirectEnergyConsumptionBySource";
const co2AtmosphericConcentration = 'Concentration atmosphérique de CO2'
const GesEmissions = 'Émissions de GES (Gaz à effet de serre)'
const Co2Emissions = 'Émissions de CO2'
const Ch4Emissions = 'Émissions de Méthane'
const NitrousOxydeEmissions = 'Émissions de Protoxyde d\'azote'
const ClimateChange = 'Changement climatique'
const bySector = 'Par secteur'
const byFuel = 'Par carburant'
const byGaz = 'Par gaz'
const ghgEmissionsByGaz = 'Émissions de GES (Gaz à effet de serre) par gaz'
const byCountry = 'Par pays'
const perCapita = 'Par personne'
const bySectorPerCapita = 'Par secteur et par personne'
const temperature = 'Température'
const seaLevelRise = 'Montée du niveau de la mer'
const oceanPh = 'Acidification de l\'océan'
const byCountryConsumptionAdjusted = 'Par pays (ajusté par la consommation)'
const perCapitaConsumptionAdjusted = 'Par personne (ajusté par la consommation)'
const iceSheetsMass = 'Modification de la masse des calottes glaciaires'
const Energy = 'Énergie'
const Electricity = 'Électricité'
const directPrimaryConsumptionBySource = 'Énergie primaire (directe) par source'
const electricityProductionBySource = 'Production d\'électricité par source'

const themes = [
    {
        'name': Energy,
        'indicators': [directPrimaryConsumptionBySource]
    },
    {
        'name': Electricity,
        'indicators': [electricityProductionBySource]
    },
    {
        'name': GesEmissions,
        'indicators': [bySector, bySectorPerCapita, byCountry, perCapita, byGaz]
    },
    {
        'name': Co2Emissions,
        'indicators': [bySector, byFuel, byCountryConsumptionAdjusted, perCapitaConsumptionAdjusted]
    },
    {
        'name': Ch4Emissions,
        'indicators': [bySector]
    },
    {
        'name': NitrousOxydeEmissions,
        'indicators': [bySector]
    },
    {
        'name': ClimateChange,
        'indicators': [temperature, seaLevelRise, oceanPh, ghgEmissionsByGaz, co2AtmosphericConcentration, iceSheetsMass]
    },
];


let customTheme = createTheme({
    palette: {
        primary: {
            main: '#6478ff',
        }
    },
});

let missingCharts = [
    'Per capita CO₂ emissions by fuel type, 2019', // by fuel type
]

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

          <div className={"container position-relative chart-wrapper py-3"}>
              {theme === Energy &&
                  <>
                      {indicator === directPrimaryConsumptionBySource &&
                          <PrimaryDirectEnergyConsumptionBySource/>
                      }
                  </>
              }
              {theme === Electricity &&
                  <>
                      {indicator === electricityProductionBySource &&
                          <ElectricityProductionBySource/>
                      }
                  </>
              }
              {theme === GesEmissions &&
                  <>
                      {indicator === bySector &&
                          <GhgEmissionsBySector/>
                      }
                      {indicator === bySectorPerCapita &&
                          <GhgEmissionsBySectorPerCapita/>
                      }
                      {indicator === byCountry &&
                          <GhgEmissionsPerCountry/>
                      }
                      {indicator === perCapita &&
                          <GhgEmissionsPerCapita/>
                      }
                      {indicator === byGaz &&
                          <GhgEmissionsByGas/>
                      }
                  </>
              }
              {theme === Co2Emissions &&
                  <>
                      {indicator === byFuel &&
                          <Co2ByFuel/>
                      }
                      {indicator === bySector &&
                          <Co2BySector/>
                      }
                      {indicator === byCountryConsumptionAdjusted &&
                          <Co2ConsumptionPerCountry/>
                      }
                      {indicator === perCapitaConsumptionAdjusted &&
                          <Co2ConsumptionPerCapita/>
                      }
                  </>
              }
              {theme === Ch4Emissions &&
                  <>
                      {indicator === bySector &&
                          <Ch4EmissionsBySector/>
                      }
                  </>
              }
              {theme === NitrousOxydeEmissions &&
                  <>
                      {indicator === bySector &&
                          <NitrousOxideBySector/>
                      }
                  </>
              }
              {theme === ClimateChange &&
                  <>
                      {indicator === temperature &&
                          <TemperatureAnomaly/>
                      }
                      {indicator === seaLevelRise &&
                          <SeaLevelRise/>
                      }
                      {indicator === oceanPh &&
                          <OceanPh/>
                      }
                      {indicator === ghgEmissionsByGaz &&
                          <GhgEmissionsByGas/>
                      }
                      {indicator === co2AtmosphericConcentration &&
                          <Co2AtmosphericConcentration/>
                      }
                      {indicator === iceSheetsMass &&
                          <IceSheetsMass/>
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
