import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SnackBar, setSnackBarType } from 'react-native-simple-snackbar';

export default function App() {
  const [status, setStatus] = React.useState<setSnackBarType | undefined>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() =>
          setStatus({
            content: 'Snackbar on top!',
            duration: 8000,
            backgroundColor: '#a2e5a0',
            color: '#0b0b09',
            fontSize: 30,
            fontWeight: '900',
            textAlign: 'center',
          })
        }
      >
        <Text style={styles.text}>Touch here to activate snackbar on top</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() =>
          setStatus({
            content: 'Snackbar on bottom!',
            backgroundColor: '#000',
            position: 'bottom',
          })
        }
      >
        <Text style={styles.text}>
          Touch here to activate snackbar on bottom
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          console.log('clicou');
        }}
      >
        <Text style={styles.text}>Clica aqui pra testar</Text>
      </TouchableOpacity>

      <SnackBar setSnackBar={status} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    margin: 30,
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
