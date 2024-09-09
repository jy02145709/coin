import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import ApexCharts from "react-apexcharts";
import { fetchCoinHistory } from "../api";

interface ICoinId {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price() {
  const { coinId } = useOutletContext<ICoinId>();

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const candleStickData =
    data?.map((price) => {
      return {
        x: new Date(price.time_close),
        y: [price.open, price.high, price.low, price.close],
      };
    }) ?? [];

  return (
    <div>
      {isLoading ? (
        "Loading price data..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[{ name: "Price", data: candleStickData }]}
          options={{
            chart: {
              type: "candlestick",
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#0fbcf9",
                  downward: "#f56c6c",
                },
              },
            },
            theme: {
              mode: "dark",
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
