import dayjs from 'dayjs';

export const candleStickOptions = {
    options: {
        chart: {
            width: 100,
            height: 150,
            type: 'candlestick',
            background: '#00E396',
        },
        title: {
            text: 'CandleStick Chart - Category X-axis',
            align: 'left',
        },
        annotations: {
            xaxis: [
                {
                    x: 'Oct 06 14:00',
                    borderColor: '#00E396',
                    label: {
                        borderColor: '#00E396',
                        style: {
                            fontSize: '12px',
                            color: '#fff',
                            background: '#00E396',
                        },
                        orientation: 'horizontal',
                        offsetY: 7,
                        text: 'Annotation Test',
                    },
                },
            ],
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: 'category',
            labels: {
                formatter: function (val) {
                    return dayjs(val).format('MMM DD HH:mm');
                },
            },
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    },
};
