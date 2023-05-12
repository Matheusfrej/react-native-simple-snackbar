# react-native-simple-snackbar

A simple and full costumizable solution for a timed **SnackBar**.

## Installation

```sh
npm install react-native-simple-snackbar
```
or
```sh
yarn add react-native-simple-snackbar
```

## Usage

Just import the **SnackBar** Component and, if you want, the type of the object that controls it's status, **setSnackBarType**.
To display the snackbar, update the value of the state controller.

You can also have multiple instances of **SnackBar** inside different containers, as long as you have a different instance of controller for each one.

Below are the keys you can pass to the controller:
| Key | Data type | Default value? | Description |
| --- | --- | --- | --- |
| content | string | Required. | The message to show |
| duration | number | 3000 | How long to display the Snackbar in milliseconds |
| animation | 'slide' \| 'fade' | 'slide' | The animation of the snackbar |
| position | 'top' \| 'bottom' | 'top' | The position in container where snackbar will be displayed |
| backgroundColor | style | '#22943E' | The background color of the Snackbar |
| color | style | '#ffffff' | The color of the text |
| fontSize | number | 18 | Font size of the text |
| fontWeight | style | '600' | Font weight of the text |
| textAlign | style | 'left' | Text align of the text |

### All you need:
```tsx
//...
import { SnackBar } from 'react-native-simple-snackbar'
//...

export default function Component() {
  //...
  // start controller empty
  const [status, setStatus] = useState()
  //...

  return (
    <View style={{flex: 1}}>

      {/* When you want the SnackBar to be shown, just update the controller */}
      <TouchableOpacity onPress={() => setStatus({ content: 'My SnackBar Works!!' })}>
        <Text style={styles.text}>Touch here to activate snackbar</Text>
      </TouchableOpacity>
      
      {/* Instantiate the SnackBar inside the container you want to show it */}
      <SnackBar setSnackBar={status} />
    </View>
  )
}

```


### Code example:
```tsx
import { SnackBar, setSnackBarType } from 'react-native-simple-snackbar';
import { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function App() {

  // start controller empty (use the type here if you are using typescript)
  const [status, setStatus] = useState<setSnackBarType | undefined>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        // When you want the SnackBar to be shown, just update the controller
        onPress={() =>
          setStatus({
            content: 'Snackbar on top!',
            backgroundColor: '#a2e5a0',
            color: '#0b0b09',
            fontSize: 30,
            fontWeight: '900',
            textAlign: 'center',
            position: 'top',
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
            backgroundColor: '#e10404',
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
      {/* instantiate the SnackBar inside the container you want to show it */}
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

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
