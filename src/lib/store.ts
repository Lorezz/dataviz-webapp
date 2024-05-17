import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { sampleData } from "./constants";

let store = (set: any) => ({
  data: 0,
  chart: null,
  config: sampleData.config,
  rawData: null,
  setConfig: (value: object) => set(() => ({ config: value })),
  setChart: (value: object) => set(() => ({ chart: value })),
  setRawData: (value: object) => set(() => ({ rawData: value })),
  setData: (value: object) => set(() => ({ data: value })),
});

const useStoreState = create(devtools(store));
export default useStoreState;
