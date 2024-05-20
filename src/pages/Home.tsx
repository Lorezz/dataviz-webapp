import { Button, Container } from "design-react-kit";
import { useState } from "react";
import { getAvailablePalettes, getPalette, transposeData } from "../lib/utils";
import DataTable from "../components/DataTable";
import RenderChart from "../components/RenderChart";

import TransformSource from "../components/TransformSource";
import useStoreState from "../lib/store";
import GenerateRandomData from "../components/GenerateRandomData";
import LoadSource from "../components/LoadSource";
import CSVUpload from "../components/CSVUpload";
import SelectChart from "../components/SelectChart";
import ChartOptions from "../components/ChartOptions";

function Home() {
  const [state, send] = useState("UPLOAD");
  const config = useStoreState((state) => state.config);
  const setConfig = useStoreState((state) => state.setConfig);
  const chart = useStoreState((state) => state.chart);
  const setChart = useStoreState((state) => state.setChart);
  const data = useStoreState((state) => state.data);
  const setData = useStoreState((state) => state.setData);
  const rawData = useStoreState((state) => state.rawData);
  const setRawData = useStoreState((state) => state.setRawData);

  function reset() {
    setData(null);
  }
  function transpose() {
    setData(null);
    const transposed = transposeData(data);
    // setChart("");
    setTimeout(() => {
      handleChangeData(transposed);
    }, 300);
  }

  function handleChangeData(d) {
    if (!config.palette) {
      const numSeries = d.length - 1;
      let palette = getAvailablePalettes(numSeries)[0];
      config.palette = palette;
      config.colors = getPalette(palette);
      setConfig(config);
    }
    // setChart("");
    setData(d);
    send("CHOOSE" as any);
  }
  function matches(state, value) {
    return value === state;
  }

  return (
    <Container>
      <div className="text-white uppercase">STATE: {state as string}</div>
      <div className="w-full xl:flex  justify-center">
        <div className="flex-col bg-gray-50 items-start justify-start">
          <div>
            <Button onClick={() => send("GENERATE")}>1 - GENERATE DATA</Button>
            {matches(state, "GENERATE") && (
              <div>
                <GenerateRandomData setData={setData} />
              </div>
            )}
          </div>
          <div>
            <Button onClick={() => send("TRANSFORM")}>
              1 - TRANSFORM SOURCE
            </Button>
            {matches(state, "TRANSFORM") && (
              <div>
                <LoadSource setRawData={setRawData} />
              </div>
            )}
          </div>
          <div>
            <Button onClick={() => send("UPLOAD")}>1 - UPLOAD DATA</Button>
            {matches(state, "UPLOAD") && (
              <div>
                <CSVUpload setData={(d: any) => setData(d)} />
              </div>
            )}
          </div>
          <div>
            <Button onClick={() => send("CHOOSE")}>2 - CHOOSE CHART</Button>
            {matches(state, "CHOOSE") && (
              <div>
                <SelectChart setChart={setChart} chart={chart} />
              </div>
            )}
          </div>
          <div>
            <Button onClick={() => send("SETTINGS")}>3 - CHART OPTIONS</Button>
            {matches(state, "SETTINGS") && (
              <div>
                <ChartOptions
                  config={config}
                  setConfig={setConfig}
                  chart={chart}
                  numSeries={(data as any)?.length - 1 || 0}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full border-2 overflow-y-scroll bg-white min-h-scr">
          {state === "TRANSFORM" && rawData && (
            <div className="bg-gray-50 w-full">
              <TransformSource setData={setData} rawData={rawData} />
            </div>
          )}

          {data && data[0] && (
            <div className="w-full bg-gray-50">
              <hr />
              <div className="w-full bg-white xl:m-5 xl:shadow-lg">
                <center>
                  <RenderChart chart={chart} data={data} config={config} />
                </center>
              </div>
              <hr />
              <div className="overflow-auto w-full bg-white xl:m-5 xl:shadow-lg">
                <h1 className="title">Data</h1>
                <center>
                  <DataTable data={data} reset={reset} transpose={transpose} />
                </center>
              </div>
              <hr />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Home;
