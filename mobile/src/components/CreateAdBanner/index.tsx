import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { MagnifyingGlassPlus } from 'phosphor-react-native';
import { styles } from './styles';
import { THEME } from '../../theme';

interface Props {
    openModal: () => void;
}

export function CreateAdBanner({ openModal }: Props) {
  return (
    <LinearGradient 
        style={styles.linearGradient}
        colors={THEME.COLORS.NLW_GRADIENT}
        locations={[0.28, 0.62, 1]}
        start={[0,0]}
        end={[1,0]}
    >
        
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Não encontrou seu duo?</Text>
                <Text style={styles.subtitle}>Publique um anúncio para encontrar novos players!</Text>
            </View>
            <TouchableOpacity 
                style={styles.button}
                activeOpacity={0.6}    
                onPress={openModal}
            >
                <MagnifyingGlassPlus size={20} color={THEME.COLORS.TEXT} />   
                <Text style={styles.buttonText}>Publicar anúncio</Text>
            </TouchableOpacity>
        </View>
    </LinearGradient>
  );
}