import seriesLabel from "highcharts/modules/series-label";
import formatLabels from "../utils/formatLabels";

const colors = [
    '#8EF6AF',
    '#40C1B8',
    '#8948fa',
    '#FE6B35',
    '#FEF900',
    '#F21A1D',
    '#BDBDFD',
    '#3601f1',
    '#BC75F9',
    '#c9977d',
    '#E1EF7E',
    '#5d5352'
];

const pieOptions = {
    colors: colors,
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
        series: {
            animation: {
                duration: 600
            }
        },
        pie: {
            // size:'130%',
            allowPointSelect: true,
            slicedOffset: 30,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                style: {
                    fontSize: '16px',
                    fontWeight: "normal"
                },
                enabled: true,
                formatter: function () {
                    return '<b>' + formatLabels(this.key) + '</b>: ' + this.percentage.toFixed(0) + ' %'
                },
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

const mobilePieOptions = {
    colors: colors,
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
        series: {
            animation: {
                duration: 600
            }
        },
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                style: {
                    fontSize: '7px',
                    fontWeight: "normal"
                },
                enabled: false,
                formatter: function () {
                    return '<b>{formatLabels(this.name)}</b>: {this.percentage:.1f} %'
                },
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

const stackedAreaOptions = {
    colors: colors,
    chart: {
        type: 'area',
        options3d: {
            enabled: false,
        },
        // height: '50%'
    },
    title: {
        text: ''
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                enabled: false,
                symbol: 'circle',
            },
            label: {
                enabled: true,
                onArea: true,
                formatter: function () {
                   return formatLabels(this.name)
                },
                style: {
                    fontWeight: 500,
                    color: 'black'
                }
            }
        },
        series: {
            animation: {
                duration: 600
            }
        }
    },
    series: [],
    credits: {
        enabled: false
    },
};

const mobileStackedAreaOptions = {
    colors: colors,
    chart: {
        options3d: {
            enabled: false,
        }
    },
    title: {
        text: ''
    },
    plotOptions: {
        area: {
            stacking: 'normal',
        },
        series: {
            animation: {
                duration: 600
            }
        }
    },

    credits: {
        enabled: false
    },
};

const areaOptions = {
    colors: colors,
    chart: {
        type: 'area',
        options3d: {
            enabled: false,
        },
    },
    title: {
        text: ''
    },
    plotOptions: {
        area: {
            lineWidth: 1,
            marker: {
                enabled: false,
                symbol: 'circle',
            },
            label: {
                enabled: false,
                onArea: false,
                style: {
                    fontWeight: 500,
                    color: 'black'
                }
            }
        },
        series: {
            animation: {
                duration: 600
            }
        }
    },
    series: [],
    credits: {
        enabled: false
    },
};

const mobileAreaOptions = {
    colors: colors,
    chart: {
        options3d: {
            enabled: false,
        }
    },
    title: {
        text: ''
    },
    plotOptions: {
        area: {
            stacking: 'normal',
        },
        series: {
            animation: {
                duration: 600
            }
        }
    },

    credits: {
        enabled: false
    },
};

const lineOptions = {
    colors: colors,
    chart: {
        type: 'line',
        options3d: {
            enabled: false,
        },
    },
    title: {
        text: ''
    },
    plotOptions: {
        line: {
            marker: {
                enabled: false,
                symbol: 'circle',
            },
            label: {
                enabled: true,
                style: {
                    fontWeight: 500,
                    color: 'black'
                }
            }
        },
        series: {
            animation: {
                duration: 600
            }
        }
    },
    // series: [],
    // credits: {
    //     enabled: false
    // },
};

const mobileLineOptions = {
    colors: colors,
    chart: {
        options3d: {
            enabled: false,
        }
    },
    title: {
        text: ''
    },
    plotOptions: {
        series: {
            animation: {
                duration: 600
            }
        }
    },

    credits: {
        enabled: false
    },
};

const packedBubleOptions = {
    colors: colors,
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        backgroundColor: null,
        plotShadow: false,
        options3d: {
            enabled: false,
        }
    },
    title: {
        text: ''
    },
    plotOptions: {
        series: {
            animation: {
                duration: 600
            }
        },
        packedbubble: {
            dataLabels: {
                style: {
                    fontSize: '14px',
                    fontWeight: "500"
                },
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        type: 'packedbubble',
        data: [],
    }],
    credits: {
        enabled: false
    },
};

const mobilePackedBubbleOptions = {
    colors: colors,
    chart: {
        options3d: {
            enabled: false,
        }
    },
    title: {
        text: ''
    },
    plotOptions: {
        series: {
            animation: {
                duration: 600
            }
        },
        packedbubble: {
            cursor: 'pointer',
            dataLabels: {
                style: {
                    fontSize: '7px',
                    fontWeight: "normal"
                },
                enabled: false,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            legend: {
                enabled: false,
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
        type: 'packedbubble',
        data: []
    }],
    credits: {
        enabled: false
    },
};

const getOptions = (chart, width) => {
    if (chart === 'pie') {
        return width > 500 ? pieOptions : mobilePieOptions
    }
    if (chart === 'area') {
        return width > 500 ? stackedAreaOptions : mobileStackedAreaOptions
    }
    if (chart === 'line') {
        return width > 500 ? lineOptions : mobileLineOptions
    }
    if (chart === 'packedbubble') {
        return width > 500 ? packedBubleOptions : mobilePackedBubbleOptions
    }
}

export {
    pieOptions,
    mobilePieOptions,
    stackedAreaOptions,
    mobileStackedAreaOptions,
    areaOptions,
    mobileAreaOptions,
    lineOptions,
    mobileLineOptions,
    getOptions
}