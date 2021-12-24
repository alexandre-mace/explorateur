import './App.css';
import GhgEmissionsBySector from "./components/charts/GhgEmissionsBySector";
import Co2AtmosphericConcentration from "./components/charts/Co2AtmosphericConcentration";
import React from "react";
import FormControl from "@mui/material/FormControl";
import {Autocomplete, TextField} from "@mui/material";

const AtmosphericConcentration = 'Concentration atmosphériques'
const GesEmissions = 'Émissions de GES (Gaz à effet de serre)'
const bySector = 'Par secteur'

const themes = [
    {
        'name': GesEmissions,
        'indicators': [bySector]
    },
    {
        'name': AtmosphericConcentration,
        'indicators': ['CO2']
    }
];

function App() {
  const [theme, setTheme] = React.useState(GesEmissions)
  const [indicator, setIndicator] = React.useState(bySector)

  return (
      <>
          <div className="container mt-5">
              <div className="row mb-2 justify-content-center align-items-center h-100">
                  <div className="col-auto settings-wrapper">
                      <FormControl sx={{ minWidth: 300, maxWidth: 400, marginRight: 1 }}>
                          <Autocomplete
                              disablePortal
                              id="year-box"
                              options={themes.map(theme => theme.name)}
                              value={theme}
                              onChange={(value) => setTheme(value.target.innerText)}
                              sx={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="Thème" />}
                          />
                      </FormControl>
                      <FormControl sx={{ minWidth: 300, maxWidth: 400, marginLeft: 1 }}>
                          <Autocomplete
                              disablePortal
                              id="country-box"
                              options={themes.find(datum => datum.name === theme).indicators}
                              color={"primary"}
                              value={indicator}
                              onChange={(value) => setIndicator(value.target.innerText)}
                              sx={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="Indicateur" />}
                          />
                      </FormControl>
                  </div>
              </div>

          </div>

          <div className={"chart-wrapper p-3 p-md-5"}>
          {theme === GesEmissions &&
            <>
                {indicator === bySector &&
                    <GhgEmissionsBySector/>
                }
            </>
          }
          {theme === AtmosphericConcentration &&
            <>
                {indicator === 'CO2' &&
                    <AtmosphericConcentration/>
                }
            </>
          }
          </div>
      </>
  );
}

export default App;
