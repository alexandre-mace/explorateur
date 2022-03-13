import loadable from '@loadable/component'
import React from "react";

const Loading = () =>
    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: '2rem'}}>
        <div className="d-flex h-100 w-100 align-items-center justify-content-center text-center">
            🌍 Explorateur
        </div>
    </div>

export const Co2ByFuel = loadable(() => import("../components/charts/Co2ByFuel"), {
    fallback: Loading(),
})
export const GhgEmissionsBySector = loadable(() => import("../components/charts/GhgEmissionsBySector"), {
    fallback: Loading(),
})
export const Ch4EmissionsBySector = loadable(() => import("../components/charts/Ch4EmissionsBySector"), {
    fallback: Loading(),
})
export const Co2BySector = loadable(() => import("../components/charts/Co2BySector"), {
    fallback: Loading(),
})
export const ElectricityProductionBySource = loadable(() => import("../components/charts/ElectricityProductionBySource"), {
    fallback: Loading(),
})
export const ElectricityConsumptionBySource = loadable(() => import("../components/charts/ElectricityConsumptionBySource"), {
    fallback: Loading(),
})
export const GhgEmissionsBySectorPerCapita = loadable(() => import("../components/charts/GhgEmissionsBySectorPerCapita"), {
    fallback: Loading(),
})
export const NitrousOxideBySector = loadable(() => import("../components/charts/NitrousOxideBySector"), {
    fallback: Loading(),
})