import "../Highcharts/HighchartsSetup";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { mergeDeepRight } from "ramda";
import React, { forwardRef } from "react";

import { chartPaletteLight } from "../../../styles";
import { ChartRef, SeriesChartData } from "../../../types";

export type VerticalBarChartProps = {
  className?: string;
  data: SeriesChartData;
  options?: {
    title?: string;
    categoryLabel?: string;
    seriesLabel?: string;
    tooltipPointFormat?: string;
    isMarkerShown?: boolean;
    isLegendShown?: boolean;
    customOptions?: object;
    isSharedTooltip?: boolean;
  };
};

const defaultOptions = {
  tooltipPointFormat: `{series.name}: <b>{point.y}</b>`,
  isMarkerShown: false,
  isLegendShown: true,
  customOptions: {},
  isSharedTooltip: true,
};

const VerticalBarChart = forwardRef<ChartRef, VerticalBarChartProps>(
  (props: VerticalBarChartProps, ref) => {
    const { className, data, options } = props;

    const {
      categoryLabel,
      seriesLabel,
      title,
      isMarkerShown,
      isLegendShown,
      customOptions,
      isSharedTooltip,
    } = { ...defaultOptions, ...options };

    const seriesData = data.series.map((s, i) => {
      return {
        name: s.name,
        data: s.values,
        type: "column",
        color: chartPaletteLight[i],
      };
    });

    const hcOptions = {
      chart: {
        type: "column",
        marginTop: !title ? 32 : undefined,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: isMarkerShown,
          },
        },
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: data.categories,
        title: {
          text: categoryLabel,
        },
      },
      yAxis: {
        title: {
          text: seriesLabel,
        },
      },
      tooltip: {
        shared: isSharedTooltip,
      },
      legend: {
        enabled: isLegendShown,
      },
      series: seriesData,
    };

    return (
      <HighchartsReact
        ref={ref}
        allowChartUpdate={false}
        containerProps={{ className }}
        highcharts={Highcharts}
        options={mergeDeepRight(hcOptions, customOptions)}
      />
    );
  }
);

VerticalBarChart.displayName = "VerticalBarChart";

export default VerticalBarChart;
