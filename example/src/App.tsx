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
            feedback: true,
            content: 'green and top!',
            time: 7000,
          })
        }
      >
        <Text style={styles.text}>
          Touch here to activate snackbar green and top
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() =>
          setStatus({
            feedback: true,
            content: 'green and bottom!',
            barPosition: 'bottom',
          })
        }
      >
        <Text style={styles.text}>
          Touch here to activate snackbar green and bottom
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() => setStatus({ feedback: false, content: 'red and top!' })}
      >
        <Text style={styles.text}>
          Touch here to activate snackbar red and top
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={() =>
          setStatus({
            feedback: false,
            content: 'red and bottom!',
            barPosition: 'bottom',
          })
        }
      >
        <Text style={styles.text}>
          Touch here to activate snackbar red and bottom
        </Text>
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
