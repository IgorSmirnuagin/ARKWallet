import Axios from "axios";
import CONFIG from "../config";

const instance = Axios.create({
  baseURL: CONFIG.host,
});

export default instance;
