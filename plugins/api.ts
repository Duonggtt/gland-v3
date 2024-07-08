import axios from "axios";

export default defineNuxtPlugin({
  name: "api",
  setup() {
    const defaulToken = "";
    const baseUrl = "https://api.g-center.io.vn:8447/gland/api/";
    const debug = true;
    let respData = null;
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

    return {
      provide: {
        api: {
          sendGetApi,
        },
      },
    };
  },
});
