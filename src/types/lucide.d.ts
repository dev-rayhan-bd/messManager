import 'lucide-react-native';
import { ViewStyle, StyleProp } from 'react-native';

declare module 'lucide-react-native' {
  export interface LucideProps {
    color?: string;
    stroke?: string;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
  }
}
