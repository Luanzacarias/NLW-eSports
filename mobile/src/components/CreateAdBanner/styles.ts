import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    marginVertical: 32,
    borderRadius: 8,
  },
  container: {
    flexDirection: 'column',
    backgroundColor: THEME.COLORS.SHAPE,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius:8,
    borderBottomRightRadius: 8,
    width: 320
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: THEME.FONT_FAMILY.BOLD,
    fontSize: THEME.FONT_SIZE.LG,
    color: THEME.COLORS.TEXT,
    textAlign: 'center'
  },
  subtitle: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.CAPTION_400,
    textAlign: 'center'
  },
  button: {
    marginTop: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: THEME.COLORS.PRIMARY,
    borderRadius: 6,
  },
  buttonText: {
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    fontSize: THEME.FONT_SIZE.MD,
    color: THEME.COLORS.TEXT,
    marginLeft: 8
  }
});