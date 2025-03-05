// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from '@nivo/line'
import { LineSvgProps } from '@nivo/line';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

interface MyResponsiveLineProps extends LineSvgProps {}

export const MyResponsiveLine = ({ data }: MyResponsiveLineProps) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 3,
            tickPadding: 2,
            tickRotation: 0,
            legend: 'anno',
            legendOffset: 31,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 4,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'voto',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        enableGridX={false}
        colors={{ scheme: 'category10' }}
        lineWidth={6}
        pointSize={8}
        pointColor="#ffffff"
        pointBorderWidth={3}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        areaOpacity={0.25}
        enableTouchCrosshair={true}
        useMesh={true}
        
    />
)