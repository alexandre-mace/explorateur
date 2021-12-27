import React from "react";
import {IconButton} from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import LineChartIcon from "@mui/icons-material/ShowChart";
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

const ChartTypes = ({ chartTypes, chart, setChart }) => (
    <>
        {chartTypes.includes('area') &&
            <IconButton aria-label="Aire" color={chart === 'area' ? 'primary' : 'default'} onClick={() => setChart('area')}>
                <StackedLineChartIcon fontSize={'large'} />
            </IconButton>
        }
        {chartTypes.includes('line') &&
            <IconButton aria-label="Ligne" color={chart === 'line' ? 'primary' : 'default'} onClick={() => setChart('line')}>
                <LineChartIcon fontSize={'large'} />
            </IconButton>
        }
        {chartTypes.includes('pie') &&
            <IconButton aria-label="Tarte" color={chart === 'pie' ? 'primary' : 'default'} onClick={() => setChart('pie')}>
                <PieChartIcon fontSize={'large'} />
            </IconButton>
        }
        {chartTypes.includes('packedbubble') &&
            <IconButton aria-label="Bulles" color={chart === 'packedbubble' ? 'primary' : 'default'} onClick={() => setChart('packedbubble')}>
                <BubbleChartIcon fontSize={'large'} />
            </IconButton>
        }
    </>
)

export default ChartTypes