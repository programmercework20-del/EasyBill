import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAuth = async (data: any) => {
  await AsyncStorage.setItem('auth', JSON.stringify(data));
};

export const getAuth = async () => {
  const data = await AsyncStorage.getItem('auth');
  return data ? JSON.parse(data) : null;
};

export const clearAuth = async () => {
  await AsyncStorage.removeItem('auth');
};