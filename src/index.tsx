/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export type setSnackBarType = {
  content: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  textAlign?: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined;
  duration?: number;
  position?: 'top' | 'bottom';
};
interface SnackBarProps {
  setSnackBar: setSnackBarType | undefined;
}

export function SnackBar({ setSnackBar }: SnackBarProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [internBackgroundColor, setInternBackgroundColor] =
    useState<string>('#22943E');
  const [timer, setTimer] = useState(3000);
  const [internColor, setInternColor] = useState('white');
  const [internFontSize, setInternFontSize] = useState(18);
  const [internFontWeight, setInternFontWeight] = useState<
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined
  >('600');
  const [internTextAlign, setInternTextAlign] = useState<
    'center' | 'auto' | 'left' | 'right' | 'justify' | undefined
  >('left');
  const [barPosition, setBarPosition] = useState('top');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    if (message !== null) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const animationTimeout = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }, timer - 200);
      timeoutRef.current = setTimeout(() => {
        setMessage(null);
        setInternBackgroundColor('#22943E');
        setTimer(3000);
        setInternFontSize(18);
        setInternColor('white');
        setInternFontWeight('600');
        setBarPosition('top');
        setInternTextAlign('left');
      }, timer);
      return () => {
        clearTimeout(timeoutRef.current);
        clearTimeout(animationTimeout);
      };
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, timer]);

  useEffect(() => {
    if (setSnackBar !== undefined) {
      const {
        content,
        backgroundColor,
        color,
        fontSize,
        fontWeight,
        textAlign,
        duration,
        position,
      } = setSnackBar;
      setMessage(content);
      if (backgroundColor) {
        setInternBackgroundColor(backgroundColor);
      } else {
        setInternBackgroundColor('#22943E');
      }
      if (color) {
        setInternColor(color);
      } else {
        setInternColor('white');
      }
      if (fontSize) {
        setInternFontSize(fontSize);
      } else {
        setInternFontSize(18);
      }
      if (fontWeight) {
        setInternFontWeight(fontWeight);
      } else {
        setInternFontWeight('600');
      }
      if (textAlign) {
        setInternTextAlign(textAlign);
      } else {
        setInternTextAlign('left');
      }
      if (duration) {
        setTimer(duration);
      } else {
        setTimer(3000);
      }
      if (position) {
        setBarPosition(position);
      } else {
        setBarPosition('top');
      }
    }
  }, [setSnackBar]);

  return (
    <>
      {message !== null && barPosition === 'top' && (
        <Animated.View
          style={{ ...styles.container, top: 0, opacity: fadeAnim }}
        >
          <View
            style={{
              ...styles.innerContainer,
              top: 64,
              backgroundColor: internBackgroundColor,
            }}
          >
            <Text
              style={{
                fontSize: internFontSize,
                fontWeight: internFontWeight,
                color: internColor,
                textAlign: internTextAlign,
              }}
            >
              {message}
            </Text>
          </View>
        </Animated.View>
      )}
      {message !== null && barPosition === 'bottom' && (
        <Animated.View
          style={{ ...styles.container, bottom: 0, opacity: fadeAnim }}
        >
          <View
            style={{
              ...styles.innerContainer,
              bottom: 64,
              backgroundColor: internBackgroundColor,
            }}
          >
            <Text
              style={{
                fontSize: internFontSize,
                fontWeight: undefined,
                color: internColor,
                textAlign: internTextAlign,
              }}
            >
              {message}
            </Text>
          </View>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
  },

  innerContainer: {
    position: 'absolute',
    left: 32,
    right: 32,
    zIndex: 10000,
    borderRadius: 4,
    padding: 16,
  },
});
