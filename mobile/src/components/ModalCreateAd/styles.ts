import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.COLORS.OVERLAY
    },
    content: {
        width: 280,
        backgroundColor: THEME.COLORS.SHAPE,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeIcon: {
        alignSelf: 'flex-end',
        margin: 12
    },
    text: {
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        textAlign: 'center',
        marginBottom: 32
    }
});