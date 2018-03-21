import axios, { AxiosResponse } from "axios";
import colors from "colors";
import commander from "commander";
import fs from "fs";

const command = commander
  .version("0.1.0")
  .option("-c, --city [name]", "Add city name")
  .parse(process.argv);

if (process.argv.slice(2).length === 0) {
    command.outputHelp(colors.red);
    process.exit();
}

interface IWeatherResponse {
    status: string;
    count: string;
    info: string;
    infocode: string;
    lives: ILive[];
  }

interface ILive {
    province: string;
    city: string;
    adcode: string;
    weather: string;
    temperature: string;
    winddirection: string;
    windpower: string;
    humidity: string;
    reporttime: string;
}

const URL = "http://restapi.amap.com/v3/weather/weatherInfo";
const KEY = fs.readFileSync(".key");

// axios.get(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`).then((res: AxiosResponse<IWeatherResponse>) => {
//     const live = res.data.lives[0];
//     log(colors.yellow(live.reporttime));
//     log(colors.white(`${live.province} ${live.city}`));
//     log(colors.green(`${live.weather} ${live.temperature} 度`));
// }).catch(() => {
//     log(colors.red("天气服务出现异常"));
// });

const log = console.log;
async function getWeather(city: string) {
    try {
      const url = `${URL}?city=${encodeURI(city)}&key=${KEY}`;
      const response = await axios.get(url);
      const live = response.data.lives[0];
      log(colors.yellow(live.reporttime));
      log(colors.white(`${live.province} ${live.city}`));
      log(colors.green(`${live.weather} ${live.temperature} 度`));
    } catch {
      log(colors.red("天气服务出现异常"));
    }
}

getWeather(command.city);
