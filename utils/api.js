export const getBaseURL = () => {
  if (window.location.hostname === "localhost") {
    return "http://192.168.0.108:5000";
  } else {
    return `${window.location.protocol}//${window.location.hostname}:5000`;
  }
};