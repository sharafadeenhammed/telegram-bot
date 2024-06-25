
import countryList from "../data/countryList.js";
import serviceList from "../data/serviceList.js";

export const listCountryAvilable = () => {
  const data = countryList.map((item) => `${item.countryCode} ${item.country}`).join("\n");
  return "List of Countries Available\n\n" + data;
}

export const listServicesAvailable = () => {
  const data = serviceList.map((item) => `${item.name}`).join("\n");
  return "List of Services Available\n\n"  + data;
}

export const countryPicker = () => {
  const data = countryList.map((item) => `/${item.country}`).join("\n");
  return "Select a Country\n\n" +  data;
}

export const servicePicker = () => {
  const data = serviceList.map((item) => `/${item.name}`).join("\n");
  return "Select a Service\n\n" + data;
}

export const getCountryByCountryName = (countryName) => {
  const data = countryList.find((item) => item.country === countryName);
  return data;
}

export const getServiceByServiceName = (serviceName) => {
  const data = serviceList.find((item) => item?.name === serviceName);
  return data;
}