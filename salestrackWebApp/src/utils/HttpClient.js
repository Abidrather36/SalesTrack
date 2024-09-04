import axios from "axios";
import { ApiUrl } from "../Services/Shared";

export class HttpClient {
  addToDb(Baseurl = "", requestModel) {
    return axios.post(ApiUrl + Baseurl, requestModel)
      .then(res => res.data)
      .catch(error => {
        console.error("Error during HTTP request:", error);
        throw error;
      });
  }
}
