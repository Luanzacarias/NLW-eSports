import { useState } from 'react';
import { View, Text, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { Heading } from '../Heading';

import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function ModalDuoMatch({ discord, onClose, ...rest}: Props) {

    const [isCopping, setIsCopping] = useState(false);

    async function handleCopyDiscordToClipboard() {
        setIsCopping(true);

        await Clipboard.setStringAsync(discord);
        Alert.alert('Discord Copiado!', 'Usuário na sua área de transferência, use no Discord para encontrar essa pessoa.')
        
        setIsCopping(false);
    }

  return (
    <Modal
        animationType='fade'
        transparent
        statusBarTranslucent
        {...rest}
    >
        <View style={styles.container}>
            <View style={styles.content}>

                <TouchableOpacity
                    style={styles.closeIcon}
                    onPress={onClose}
                    activeOpacity={0.6}
                >
                    <MaterialIcons
                        name='close'
                        size={24}
                        color={THEME.COLORS.CAPTION_500}
                    />
                </TouchableOpacity>

                <CheckCircle
                    size={64}
                    color={THEME.COLORS.SUCCESS}
                    weight='bold'
                />

                <Heading
                    title="Let's Play!"
                    subtitle="Agora é só começar a jogar!"
                    style={styles.heading}
                />

                <Text style={styles.label}>
                    Adicione no Discord
                </Text>
                
                <TouchableOpacity
                    style={styles.discordButton}
                    onPress={handleCopyDiscordToClipboard}
                    activeOpacity={0.6}
                    disabled={isCopping}
                >
                    
                    <Text style={styles.discord}>
                        {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                    </Text>  

                </TouchableOpacity>
            </View>
            
        </View>
    </Modal>
  );
}