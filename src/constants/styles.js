// src/constants/styles.js

import { StyleSheet } from 'react-native';
import { oneshinhan } from './fonts';
import { colors } from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: oneshinhan,
    color: colors.textColor,
    fontSize: 16,
  },
  // Add other styles here
});

export default styles;
