const API_URL = "https://gps.autotracker.group/api/devices";
const token =
  "RzBFAiEA92qN8JvTQ6BIgvjSTke8iQltj3SJf9vhkqyf5zcuUL4CIF1GRd1vLuSJrzzDqv80AF_BAiF91tCWPMvlhuRNrI0DeyJ1IjozLCJlIjoiMjAyMy0xMi0zMVQyMTowMDowMC4wMDArMDA6MDAifQ";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
const validateDeviceData = (deviceData) => {
  if (!deviceData.status || !deviceData.name || !deviceData.uniqueId) {
    throw new Error("Required fields (status, name, uniqueId) are missing");
  }
  if (typeof deviceData.name !== "string") {
    throw new Error("name must be a string");
  }
  if (typeof deviceData.uniqueId !== "string") {
    throw new Error("uniqueId must be a string");
  }
  if (typeof deviceData.status !== "string") {
    throw new Error("status must be a string");
  }

  return true;
};
export const fetchDevices = async () => {
  try {
    const response = await fetch(API_URL, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch devices. Server response: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const fetchDeviceById = async (deviceIds) => {
  try {
    const queryParams = deviceIds.map(id => `id=${id}`).join('&');
    const response = await fetch(`${API_URL}/?${queryParams}`, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch devices. Server response: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const addDevice = async (newDeviceData) => {
  try {
    validateDeviceData(newDeviceData);

    console.log(newDeviceData, "addDevice");

    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(newDeviceData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add device. Server response: ${errorText}`);
    }
  } catch (error) {
    throw error;
  }
};

export const updateDevice = async (deviceId, updatedDeviceData) => {
  try {
    validateDeviceData(updatedDeviceData);

    console.log(deviceId, updatedDeviceData, "updateDevice");

    const response = await fetch(`${API_URL}/${deviceId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(updatedDeviceData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update device. Server response: ${errorText}`);
    }

  } catch (error) {
    throw error;
  }
};

export const deleteDevice = async (deviceId) => {
    try {
      const response = await fetch(`${API_URL}/${deviceId}`, {
        method: "DELETE",
        headers,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to delete device. Server response:", errorText);
        throw new Error(`Failed to delete device. ${errorText}`);
      }
  

    } catch (error) {
      console.error("Error deleting device:", error.message);
      throw error;
    }
  };
