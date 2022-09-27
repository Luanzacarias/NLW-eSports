import { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';

import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';

import { Routes } from './src/Routes';

// Inserindo o conteúdo de notificações criado
import * as Notifications from 'expo-notifications';
import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { Subscription } from 'expo-modules-core';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  // Parte de notificações de// useRef ajuda a manipular de forma direta a estrutura do react-native(DOM virtual) 
  // observar quando chegar notificação
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  })

  useEffect(() => {
    getNotificationListener.current = Notifications
      .addNotificationReceivedListener(notification => {
        console.log(notification);
      })

      responseNotificationListener.current = Notifications
        .addNotificationResponseReceivedListener(response => {
          console.log(response);
        })
      
      // limpar os listiners
      return () => {
        if(getNotificationListener.current && responseNotificationListener.current){
          Notifications.removeNotificationSubscription(getNotificationListener.current);
          Notifications.removeNotificationSubscription(responseNotificationListener.current);
        }
      }
  }, [])
  return (
    <Background>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {
        fontsLoaded ? <Routes /> : <Loading />
      }
    </Background>
  );
}


