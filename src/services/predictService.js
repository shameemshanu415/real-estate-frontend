// import API from "./api";

// export const predictPrice = (data) => {
//   return API.post("/predict", data);
// };

import API from "./api";

export const predictPrice = (data) => {
  return API.post("/predictor/predict/", data);
};
