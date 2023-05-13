/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

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
  animation?: 'slide' | 'fade';
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
  const [internAnimation, setInternAnimation] = useState<'slide' | 'fade'>(
    'slide'
  );

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideTopAnim = useRef(new Animated.Value(0)).current;
  const slideBottomAnim = useRef(new Animated.Value(0)).current;

  const timeoutRef = useRef<any>(null);
  const slideTopRef = useRef<any>(null);
  const slideBottomRef = useRef<any>(null);
  useEffect(() => {
    if (message !== null) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      slideTopAnim.setValue(0);
      slideBottomAnim.setValue(0);
      fadeAnim.setValue(0);
      if (internAnimation === 'slide' && barPosition === 'top') {
        fadeAnim.setValue(1);
        if (slideTopRef.current) {
          clearTimeout(slideTopRef.current);
        }

        Animated.timing(slideTopAnim, {
          toValue: 64,
          duration: 100,
          useNativeDriver: true,
        }).start();
        slideTopRef.current = setTimeout(() => {
          Animated.timing(slideTopAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }, timer - 100);
      } else if (internAnimation === 'slide' && barPosition === 'bottom') {
        fadeAnim.setValue(1);

        if (slideBottomRef.current) {
          clearTimeout(slideBottomRef.current);
        }
        Animated.timing(slideBottomAnim, {
          toValue: -128,
          duration: 100,
          useNativeDriver: true,
        }).start();
        slideBottomRef.current = setTimeout(() => {
          Animated.timing(slideBottomAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }, timer - 100);
      } else {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
      const durationValue = internAnimation === 'slide' ? 0 : 200;
      const animationTimeout = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: durationValue,
          useNativeDriver: true,
        }).start();
      }, timer - durationValue);

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
        animation,
      } = setSnackBar;
      setMessage(content);
      setInternBackgroundColor(backgroundColor || '#22943E');
      setInternColor(color || 'white');
      setInternFontSize(fontSize || 18);
      setInternFontWeight(fontWeight || '600');
      setInternTextAlign(textAlign || 'left');
      setTimer(duration || 3000);
      setBarPosition(position || 'top');
      setInternAnimation(animation || 'slide');
    }
  }, [setSnackBar]);

  return (
    <>
      {message !== null && barPosition === 'top' && (
        <Animated.View
          style={{ ...styles.container, top: 0, opacity: fadeAnim }}
        >
          {internAnimation !== 'fade' ? (
            <Animated.View
              style={{
                ...styles.innerContainer,
                transform: [{ translateY: slideTopAnim }],
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
            </Animated.View>
          ) : (
            <Animated.View
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
            </Animated.View>
          )}
        </Animated.View>
      )}
      {message !== null && barPosition === 'bottom' && (
        <Animated.View
          style={{ ...styles.container, bottom: 0, opacity: fadeAnim }}
        >
          {internAnimation !== 'fade' ? (
            <Animated.View
              style={{
                ...styles.innerContainer,
                transform: [{ translateY: slideBottomAnim }],
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
            </Animated.View>
          ) : (
            <Animated.View
              style={{
                ...styles.innerContainer,
                bottom: 64,
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
            </Animated.View>
          )}
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    zIndex: 10000,
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
