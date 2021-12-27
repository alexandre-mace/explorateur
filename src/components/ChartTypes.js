import React from "react";
import {IconButton} from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";

const ChartTypes = ({ chartTypes, chart, setChart }) => (
    <>
        {chartTypes.includes('area') &&
            <IconButton aria-label="Aire" color={chart === 'area' ? 'primary' : 'default'} onClick={() => setChart('area')}>
                <StackedLineChartIcon fontSize={'large'} />
            </IconButton>
        }
        {chartTypes.includes('pie') &&
            <IconButton aria-label="Tarte" color={chart === 'pie' ? 'primary' : 'default'} onClick={() => setChart('pie')}>
                <PieChartIcon fontSize={'large'} />
            </IconButton>
        }
    </>
)

export default ChartTypes