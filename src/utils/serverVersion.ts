import { getServerVersion } from "@/services/serverStatusService";
import Constants from 'expo-constants';


export const isVersionCorrect = async (): Promise<Boolean> => {
  try{
    const serverVersion = await getServerVersion();
    const expectedServerVersion = Constants?.expoConfig?.extra?.expectedServerVersion;
  
    //Check if major version is the same
    if (serverVersion && expectedServerVersion) {
      const serverMajorVersion = parseInt(serverVersion.split('.')[0], 10);
      const expectedMajorVersion = parseInt(expectedServerVersion.split('.')[0], 10);
      return serverMajorVersion === expectedMajorVersion;
    }
  }
  catch (error) {
    console.error("Error checking server version:", error);
  }
  return false;
};