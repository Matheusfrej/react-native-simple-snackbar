import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SnackBar, setSnackBarType } from 'react-native-simple-snackbar';

export default function App() {
  const [status, setStatus] = React.useState<setSnackBarType | undefined>();
  const [status2, setStatus2] = React.useState<setSnackBarType | undefined>();

  return (
    <View style={styles.container}>
      <SnackBar setSnackBar={status} />

      <TouchableOpacity
        style={styles.touchable}
        onPress={() =>
          setStatus({
            content: 'Snackbar on top!',
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

      <View style={styles.container2}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            setStatus2({
              content: 'Snackbar on top!',
              backgroundColor: '#000',
              textAlign: 'right',
            })
          }
        >
          <Text style={styles.text2}>
            Touch here to activate snackbar on top
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            setStatus2({
              content: 'Snackbar on center!',
              backgroundColor: '#ffff00',
              textAlign: 'center',
              position: 'center',
              color: '#000',
              duration: 5000,
              fontSize: 22,
              fontWeight: 'bold',
            })
          }
        >
          <Text style={styles.text2}>
            Touch here to activate snackbar on center
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            setStatus2({
              content: 'Snackbar on bottom!',
              backgroundColor: '#ff0000',
              position: 'bottom',
            })
          }
        >
          <Text style={styles.text2}>
            Touch here to activate snackbar on bottom
          </Text>
        </TouchableOpacity>
        <SnackBar setSnackBar={status2} />
      </View>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() =>
          setStatus({
            content: 'Snackbar on bottom!',
            backgroundColor: '#2800a1',
            color: '#ffffff',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'justify',
            position: 'bottom',
          })
        }
      >
        <Text style={styles.text}>
          Touch here to activate snackbar on bottom
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
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

  text2: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});
