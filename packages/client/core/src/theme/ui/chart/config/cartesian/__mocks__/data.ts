import { DBSource } from '../../../types'
export const FONT_FAMILY =
  'Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"'
const RAW_DATASET = [
  ['country', 'movies', 'shows'],
  ['CN', null, '100'],
  ['TW', null, '100'],
  ['KR', '2', '98'],
  ['JP', '10', '89'],
  ['GB', '13', '86'],
  ['ES', '16', '83'],
  ['US', '21', '78'],
  ['CA', '25', '75'],
  ['AU', '28', '71'],
  ['IN', '78', '21'],
]
const OUTPUT_DATASET = RAW_DATASET.map((row) =>
  row.map((cell) => (cell === null ? 'null' : cell)),
) as DBSource
export const FIELDS = RAW_DATASET[0] as string[]
export const SOURCE = RAW_DATASET.slice(1) as DBSource
export const DATASET = { fields: FIELDS, source: SOURCE }
export const testData = {
  animation: true,
  dataset: [{ sourceHeader: true, source: OUTPUT_DATASET }],
  xAxis: [
    {
      show: true,
      boundaryGap: true,
      type: 'category',
      name: 'country',
      nameLocation: 'center',
      nameRotate: 0,
      nameTextStyle: {
        fontFamily: FONT_FAMILY,
        color: '#63676D',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 600,
        verticalAlign: 'top',
        align: 'center',
      },
      nameGap: 32,
      position: 'bottom',
      axisLine: { show: true, lineStyle: { color: '#A2A6AC' } },
      axisTick: { show: false },
      splitLine: { show: false, lineStyle: { color: '#EFF0F1' } },
      axisPointer: { label: { show: true, formatter: '{value}' } },
      axisLabel: {
        showMaxLabel: true,
        fontFamily: FONT_FAMILY,
        color: '#A2A6AC',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: 400,
        show: true,
        rotate: 0,
        formatter: '{value}',
        width: 100,
        overflow: 'truncate',
      },
    },
  ],
  yAxis: [
    {
      show: true,
      boundaryGap: 0,
      type: 'value',
      name: 'movies',
      nameLocation: 'center',
      nameRotate: 90,
      nameTextStyle: {
        fontFamily: FONT_FAMILY,
        color: '#63676D',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 600,
        verticalAlign: 'top',
        align: 'center',
      },
      nameGap: 28,
      position: 'left',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#A2A6AC',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#EFF0F1',
        },
      },
      axisPointer: {
        label: {
          show: false,
          formatter: '{value}',
        },
      },
      axisLabel: {
        showMaxLabel: true,
        fontFamily: FONT_FAMILY,
        color: '#A2A6AC',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: 400,
        show: true,
        rotate: 0,
        formatter: '{value}',
        width: 100,
        overflow: 'truncate',
      },
    },
  ],
  series: [
    {
      type: 'bar',
      name: 'movies',
      showSymbol: true,
      areaStyle: { opacity: 0 },
      connectNulls: true,
      label: { position: 'top', show: false, formatter: '{@1}' },
      encode: { x: 0, y: 1 },
    },
  ],
  dataZoom: [],
  aria: {
    enabled: false,
    decal: {
      show: false,
    },
  },
  tooltip: {
    confine: false,
    order: 'valueDesc',
    trigger: 'axis',
    axisPointer: { type: 'cross' },
  },
  legend: { type: 'scroll', show: false, align: 'left', left: 40 },
  grid: { containLabel: true, left: 40, right: 8, top: 8, bottom: 32 },
}
