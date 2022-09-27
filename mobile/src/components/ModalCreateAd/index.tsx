import React from 'react';
import { View, Modal, ModalProps, Text, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../theme';
import { styles } from './styles';

interface Props extends ModalProps {
    onClose: () => void;
}

export function ModalCreateAd({ onClose, ...rest }: Props) {
  return (
    <Modal
        animationType='fade'
        statusBarTranslucent
        transparent
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

                <Text style={styles.text}>Funcionalidade indisponível no momento</Text>
            </View>
        </View>        
    </Modal>

  );
}