import axios from "axios";

const handlePostData = async (url, data, token, isFormData) => {
  try {
    // let xsrfToken = axios({
    //   method: "get",
    //   url: "/sanctum/csrf-cookie",
    // });
    // console.log(xsrfToken.headers);
    // console.log("localData.token", localData.token);
    let headers = {};
    //  headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    if (isFormData) {
      headers["Content-Type"] = "multipart/form-data";
    }
    let response = await axios({
      method: "post",
      url: url,
      data: data,
      headers: headers,
    });

    return response;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};

export { handlePostData };
