import { PropsWithChildren, useEffect } from "react";
import { Animated, useAnimatedValue, ViewStyle } from "react-native";

type FadeInViewProps = PropsWithChildren<{
  style: ViewStyle;
  duration?: number;
}>;

const FadeInView: React.FC<FadeInViewProps> = props => {
  const fadeAnim = useAnimatedValue(0); //initial opacity value

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: props.duration ?? 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, props.duration]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;