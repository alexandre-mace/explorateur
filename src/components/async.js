import loadable from '@loadable/component'
import {TemperatureAnomaly as TemperatureAnomalySync} from "../components/charts/TemperatureAnomaly";
import Co2ByFuel from "../components/charts/Co2ByFuel";
import {Co2ConsumptionPerCountry as Co2ConsumptionPerCountrySync} from "../components/charts/Co2ConsumptionPerCountry";
import {Co2ConsumptionPerCapita as Co2ConsumptionPerCapitaSync} from "../components/charts/Co2ConsumptionPerCapita";
import {GhgEmissionsPerCountry as GhgEmissionsPerCountrySync} from "../components/charts/GhgEmissionsPerCountry";
import {GhgEmissionsPerCapita as GhgEmissionsPerCapitaSync} from "../components/charts/GhgEmissionsPerCapita";
import {GhgEmissionsByGas as GhgEmissionsByGasSync} from "../components/charts/GhgEmissionsByGas";
import {GhgEmissionsBySectorPerCapita as GhgEmissionsBySectorPerCapitaSync} from "../components/charts/GhgEmissionsBySectorPerCapita";
import {Co2BySector as Co2BySectorSync} from "../components/charts/Co2BySector";
import {Ch4EmissionsBySector as Ch4EmissionsBySectorSync} from "../components/charts/Ch4EmissionsBySector";
import {NitrousOxideEmissionsBySector as NitrousOxideEmissionsBySectorSync} from "../components/charts/NitrousOxideBySector";
import {SeaLevelRise as SeaLevelRiseSync} from "../components/charts/SeaLevelRise";
import {OceanPh as OceanPhSync} from "../components/charts/OceanPh";
import {IceSheetsMass as IceSheetsMassSync} from "../components/charts/IceSheetsMass";
import {PrimaryDirectEnergyConsumptionBySource as PrimaryDirectEnergyConsumptionBySourceSync} from "../components/charts/PrimaryDirectEnergyConsumptionBySource";
import {ElectricityProductionBySource as ElectricityProductionBySourceSync} from "../components/charts/ElectricityProductionBySource";

export const Co2ByFuelAsync = loadable(() => import("../components/charts/Co2ByFuel"))