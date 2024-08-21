import axios, { type AxiosResponse } from "axios";

export default defineNuxtPlugin({
  name: "api",
  setup() {
    const defaulToken = "";
    const baseUrl = "https://82.112.230.174:8443/api/";
    const debug = true;
    let respData:
      | AxiosResponse<any, any>
      | PromiseLike<AxiosResponse<any, any>>
      | null = null;
    const { $common } = useNuxtApp();

    const defaultData = {
      url: "",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${defaulToken}`,
      },
    };

    const validateAPI = (url: any) => {
      let check = true;
      let message = "";

      if (!url) {
        check = false;
        message += ", url is Null!";
      }

      return {
        check: check,
        message: message,
      };
    };

    const checkJwT = (url: string, checkToken = true) => {
      const jwt = localStorage.getItem("jwt");
      if (jwt || !checkToken) {
        let data = {
          url: baseUrl.concat(url),
          header: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        };
        return data;
      }
      return defaultData;
    };

    /**
     * Send a GET api for collecting data, pram sẽ nằm trên url
     * @param {*} url
     * @returns
     */
    const sendGetApi = async (url: string, checkToken = true) => {
      const test = validateAPI(url);
      let dataAuthen = checkJwT(url, checkToken);
      // send api
      if (test.check) {
        try {
          const response = await axios
            .get(dataAuthen.url, {
              headers: dataAuthen.header,
            })
            .then(function (response) {
              respData = response;
              if (debug) {
                console.log(
                  `%c >>>> Calling GET api: /${url}`,
                  "color: #66ad73"
                );
                console.log("response data :", respData);
              }
              return respData;
            });
          return response.data;
        } catch (error: any) {
          if (debug) {
            console.error("Error fetching data:", error);
            console.error(url, dataAuthen.header);
          }
          let check = typeof error.response.data;
          if (check === "string") {
            $common.showError(error.response.data);
          } else {
            $common.showError(error.response.data.value);
          }
        }
      } else {
        console.error(test.message);
      }
      return [];
    };

    /**
     * Send a POST api for update data
     * @param {*} url
     * @returns
     */
    const sendPostApi = async function (
      url: string,
      data: any,
      checkToken = true
    ) {
      const test = validateAPI(url);
      let dataAuthen = checkJwT(url, checkToken);
      if (test.check) {
        try {
          await axios({
            method: "post",
            url: dataAuthen.url,
            responseType: "json",
            data: data,
            headers: dataAuthen.header,
          }).then(function (response) {
            respData = response;
            if (debug) {
              console.log(
                `%c >>>> Calling POST api: /${url}`,
                "color: #ff9b29"
              );
              console.log("Payload : ", data);
              console.log("response data :", respData);
            }
            return respData;
          });
        } catch (error: any) {
          if (debug) {
            console.error("Error fetching data:", error);
            // Common.showError(`Không lấy được thông tin api: ${url}, check log!!`);
            console.error(url, dataAuthen.header, data);
          }
          let check = typeof error.response.data;
          if (check === "string") {
            $common.showError(error.response.data);
          } else {
            $common.showError(error.response.data.value);
          }
          return error.response;
        }
      } else {
        console.error(test.message);
      }
      return respData;
    };

    /**
     *
     * @param {*} url
     * @returns
     */
    const sendPutApi = async function (url: string, checkToken = true) {
      const test = validateAPI(url);
      let dataAuthen = checkJwT(url, checkToken);
      if (test.check) {
        try {
          await axios({
            method: "put",
            url: dataAuthen.url,
            responseType: "json",
            headers: dataAuthen.header,
          }).then(function (response) {
            respData = response;
            if (debug) {
              console.log(`%c >>>> Calling PUT api: /${url}`, "color: #d6bc3a");
              console.log("response data :", respData);
            }
            return respData;
          });
        } catch (error: any) {
          if (debug) {
            console.error("Error fetching data:", error);
            $common.showError(
              `Không lấy được thông tin api: ${url}, check log!!`
            );
          }
        }
      } else {
        console.error(test.message);
      }
      return {
        status: "fail",
        message: test.message,
      };
    };

    /**
     *
     * @param {*} url
     * @returns
     */
    const sendDeleteApi = async function (url: string, checkToken = true) {
      const test = validateAPI(url);
      let dataAuthen = checkJwT(url, checkToken);
      if (test.check) {
        try {
          await axios({
            method: "delete",
            url: dataAuthen.url,
            responseType: "json",
            headers: dataAuthen.header,
          }).then(function (response) {
            respData = response;
            if (debug) {
              console.log(
                `%c >>>> Calling DELETE api: /${url}`,
                "color: #c93a46"
              );
              console.log("response data :", respData);
            }
            return respData;
          });
        } catch (error: any) {
          if (debug) {
            console.error("Error fetching data:", error);
            // Common.showError(`Không lấy được thông tin api: ${url}, check log!!`);
          }
          $common.showError(error.response.data);
        }
      } else {
        console.error(test.message);
      }
      return {
        status: "fail",
        message: test.message,
      };
    };
    
    return {
      provide: {
        api: {
          sendGetApi,
          sendPostApi,
          sendPutApi,
          sendDeleteApi,
        },
      },
    };
  },
});
