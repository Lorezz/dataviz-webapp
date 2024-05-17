import { sampleData, palettes } from "../lib/constants";

export function getAvailablePalettes(numSeries: number) {
  const keys = Object.keys(palettes);
  const availabelPalettes = [
    ...keys.filter((k) => k.indexOf(`_${numSeries}_`) > -1),
    ...keys.slice(0, 3),
  ].sort();

  return availabelPalettes;
}
export function getPalette(palette: string) {
  return (palettes as any)?.[palette];
}

export function transposeData(data: any) {
  return data[0].map((_: any, colIndex: number) =>
    data.map((row: string[]) => row[colIndex])
  );
}

export function toDataSource(parsed: any, config = {}) {
  const categories = parsed[0].slice(1) || [];
  const series = parsed.slice(1).map((row: string[]) => {
    const [name, ...data] = row;
    return {
      type: "bar",
      name,
      data,
    };
  });
  const dataSource = {
    categories,
    series,
  };
  const cfg = { config: { ...sampleData.config, ...config } };
  const transformed = { ...sampleData, ...cfg, dataSource };
  return transformed;
}

export function getBarValues(data: any) {
  return {
    ...data,
    dataSource: {
      categories: data.dataSource.categories,
      series: data.dataSource.series.map((s: object) => {
        return { ...s, type: "bar" };
      }),
    },
  };
}

export function getLineValues(data: any) {
  return {
    ...data,
    dataSource: {
      categories: data.dataSource.categories,
      series: data.dataSource.series.map((s: object) => {
        return { ...s, type: "line" };
      }),
    },
  };
}

export function getPieValues(data: any) {
  return {
    ...data,
    dataSource: {
      categories: [],
      series: {
        type: "pie",
        radius: ["50%", "85%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "inside",
        },
        labelLine: {
          show: false,
        },
        data: data.dataSource.series.map((row: any) => {
          return { name: row.name, value: row.data[0] };
        }),
      },
    },
  };
}

//create a functions to generate a series of random numbers between a range of values
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//create a functions  to move a number in a range of values positive and negative
export function moveNumber(number: number, min: number, max: number) {
  const move = getRandomInt(min, max);
  return number + move;
}
//create a function to fill an array of a given length with random numbers
export function fillArray(length: number, min: number, max: number) {
  return Array.from({ length }, () => getRandomInt(min, max));
}
//create a function to generate a random array of arrays
export function generateRandomData(length: number, min: number, max: number) {
  return Array.from({ length }, () => fillArray(length, min, max));
}

// create a function to generate words from a string of words
export function generateWords(words: string, length: number) {
  const wordsArray = words.split(" ");
  return Array.from(
    { length },
    () => wordsArray[getRandomInt(0, wordsArray.length - 1)]
  ).join(" ");
}

//return a letter of the alphabet
export function getLetter(index: number) {
  return String.fromCharCode(65 + index);
}

//generate a string given the the length from random letters of the alphabet
export function generateCategories(length: number) {
  return Array.from({ length }, (_, index) => getLetter(getRandomInt(0, 25)));
}

export function generateItems(prefix: string, length: number) {
  return Array.from({ length }, (_, index) => `${prefix} ${index + 1}`);
}