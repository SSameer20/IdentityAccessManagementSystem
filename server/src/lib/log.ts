import { logInterface } from "./helper";

const log: logInterface = {
  info: (message: string) => {
    console.log(`[INFO] ${message}`);
  },
  error: (message: string) => {
    console.log(`[ERROR] ${message}`);
  },
};

export default log;
