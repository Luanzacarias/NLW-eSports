import { useEffect, useState } from 'react';
import { Image, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';
import { CreateAdBanner } from '../../components/CreateAdBanner';
import { ModalCreateAd } from '../../components/ModalCreateAd';

import logoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';

import envs from '../../config/env';

export function Home() {
  const { SERVER_URL } = envs;

  const [games, setGames] = useState<GameCardProps[]>([]);
  const [openModalCreateAd, setOpenModalCraeteAd] = useState(false);

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl } : GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  useEffect(() => {
    // endereço ip da máquina
    fetch(`${SERVER_URL}/games`)
      .then(response => response.json())
      .then(data => setGames(data))
  },[])

  return (
    <Background>
      <ScrollView>
        <SafeAreaView style={styles.container}>
        
          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <Heading
            title='Encontre seu duo'
            subtitle='Selecione o game que deseja jogar...'
          />

          <FlatList
            data={games}
            // Qual dado vai ser utilizado como chave
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <GameCard
                data={item}
                onPress={() => handleOpenGame(item)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
          
          <CreateAdBanner 
            openModal={() => setOpenModalCraeteAd(true)}
          />
          <ModalCreateAd 
            visible={openModalCreateAd}
            onClose={() => setOpenModalCraeteAd(false)}
          />

        </SafeAreaView>
      </ScrollView> 
    </Background>
  );
}