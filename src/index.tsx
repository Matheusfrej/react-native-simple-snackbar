import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export type setSnackBarType = {
  feedback: boolean | null;
  content: string | null;
  time?: number | null;
  barPosition?: 'top' | 'bottom' | null;
};
interface SnackBarProps {
  setSnackBar: setSnackBarType;
}

export function SnackBar({ setSnackBar }: SnackBarProps) {
  const [flag, setFlag] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(3000);
  const [position, setPosition] = useState('top');

  useEffect(() => {
    if (flag !== null) {
      const timeout = setTimeout(() => {
        setFlag(null);
        setMessage('');
        setPosition('top');
        setTimer(3000);
      }, timer);
      return () => {
        clearTimeout(timeout);
      };
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  useEffect(() => {
    if (setSnackBar.feedback !== null && setSnackBar.content !== null) {
      const { feedback, content, time, barPosition } = setSnackBar;
      setFlag(feedback);
      setMessage(content);
      if (time) {
        setTimer(time);
      } else {
        setTimer(3000);
      }
      if (barPosition) {
        setPosition(barPosition);
      } else {
        setPosition('top');
      }
    }
  }, [setSnackBar]);

  // setSnackBar({
  //   flag: true,
  //   message: 'testes',
  // });

  return (
    <>
      {flag !== null && position === 'top' && (
        <View style={styles.containerTop}>
          {flag && (
            <View style={styles.successTop}>
              <Text style={styles.content}>{message}</Text>
            </View>
          )}
          {!flag && (
            <View style={styles.failureTop}>
              <Text style={styles.content}>{message}</Text>
            </View>
          )}
        </View>
      )}
      {flag !== null && position === 'bottom' && (
        <View style={styles.containerBottom}>
          {flag && (
            <View style={styles.successBottom}>
              <Text style={styles.content}>{message}</Text>
            </View>
          )}
          {!flag && (
            <View style={styles.failureBottom}>
              <Text style={styles.content}>{message}</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerTop: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },

  containerBottom: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },

  successTop: {
    position: 'absolute',
    top: 64,
    left: 32,
    right: 32,
    zIndex: 1,
    borderRadius: 4,
    padding: 16,
    backgroundColor: '#22943E',
  },

  successBottom: {
    position: 'absolute',
    bottom: 64,
    left: 32,
    right: 32,
    zIndex: 1,
    borderRadius: 4,
    padding: 16,
    backgroundColor: '#22943E',
  },

  failureTop: {
    position: 'absolute',
    top: 64,
    left: 32,
    right: 32,
    zIndex: 1,
    borderRadius: 4,
    padding: 16,
    backgroundColor: '#E44040',
  },

  failureBottom: {
    position: 'absolute',
    bottom: 64,
    left: 32,
    right: 32,
    zIndex: 1,
    borderRadius: 4,
    padding: 16,
    backgroundColor: '#E44040',
  },

  content: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});
