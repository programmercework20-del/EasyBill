import './global.css';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider, useDispatch } from 'react-redux';
import { getAuth } from './src/utils/authStorage';
import { setCredentials, finishLoading } from './src/redux/slices/authSlice';
import { store } from './src/redux/store';

function App() {

const InitApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const auth = await getAuth();

      if (auth) {
        dispatch(setCredentials(auth));
      } else {
        dispatch(finishLoading());
      }
    };

    loadUser();
  }, []);

  return <RootNavigator />;
};

  return (
    <Provider store={store}>
      <NavigationContainer>
        <InitApp />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
