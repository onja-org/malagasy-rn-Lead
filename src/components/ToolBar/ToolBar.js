import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function ToolBar({button}) {
  return <View style={styles.button}>{button}</View>;
}

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
});
