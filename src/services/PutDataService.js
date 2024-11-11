import axios from "axios";

const handlePutData = async (url, data, token,isFormData) => {
  console.log(url, data, token);
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
  
  try {
    let response = await axios({
      method: "put",
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

export { handlePutData };
