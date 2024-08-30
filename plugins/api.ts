import axios, { type AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid"; // Import hàm tạo UUID

export default defineNuxtPlugin({
  name: "api",
  setup() {
    const defaulToken = "";
    const baseUrl = ""; //update cho microservice sau
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
        traceId: uuidv4(), // Thêm traceId vào default header
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
      const traceId = uuidv4(); // Tạo UUID cho traceId

      if (jwt || !checkToken) {
        let data = {
          url: baseUrl.concat(url),
          header: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
            traceId: traceId, // Thêm traceId vào header
          },
        };
        return data;
      }
      return defaultData;
    };

    const sendGetApi = async (url: string, checkToken = true) => {
      const test = validateAPI(url);
      let dataAuthen = checkJwT(url, checkToken);
      if (test.check) {
        try {
          const response = await axios.get(dataAuthen.url, {
            headers: dataAuthen.header,
          });
          respData = response;
          if (debug) {
            console.log(`%c >>>> Calling GET api: /${url}`, "color: #66ad73");
            console.log("response data :", respData);
          }
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

    const sendPutApi = async function (
      url: string, 
      data: any, 
      checkToken = true
    ) {
      const test = validateAPI(url);
      let dataAuthen = checkJwT(url, checkToken);
      
      if (test.check) {
        try {
          const response = await axios({
            method: "put",
            url: dataAuthen.url,
            responseType: "json",
            data: data, // Truyền dữ liệu vào PUT request
            headers: dataAuthen.header,
          });
    
          respData = response;
          if (debug) {
            console.log(`%c >>>> Calling PUT api: /${url}`, "color: #d6bc3a");
            console.log("Payload : ", data);
            console.log("response data :", respData);
          }
          return respData; // Trả về kết quả sau khi gọi API thành công
    
        } catch (error: any) {
          if (debug) {
            console.error("Error fetching data:", error);
            console.error(url, dataAuthen.header, data);
            $common.showError(
              `Không lấy được thông tin api: ${url}, check log!!`
            );
          }
          return error.response; // Trả về phản hồi lỗi nếu có
        }
      } else {
        console.error(test.message);
        return {
          status: "fail",
          message: test.message,
        };
      }
    };
    

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
            $common.showError(error.response.data);
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
