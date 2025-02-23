// components/PenguinDisplay.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


interface PenguinDisplayProps {
   percentage: number;
}


export default function PenguinDisplay({ percentage }: PenguinDisplayProps) {
   const getPenguinState = () => {
       if (percentage > 100) return 'angry';
       if (percentage === 100) return 'sad';
       if (percentage < 70) return 'happy';
       return 'neutral';
   };


   const getPenguinImage = () => {
       switch (getPenguinState()) {
           case 'happy':
               return require('../assets/images/happy-penguin.png');
           case 'sad':
               return require('../assets/images/sad-penguin.png');
           case 'angry':
               return require('../assets/images/angry-penguin.png');
           default:
               return require('../assets/images/happy-penguin.png');
       }
   };


   return (
       <View style={styles.penguinContainer}>
           <Image
               source={getPenguinImage()}
               style={styles.penguinImage}
               resizeMode="contain"
           />
       </View>
   );
}


const styles = StyleSheet.create({
   penguinContainer: {
       aspectRatio: 1,
       width: '100%',
       backgroundColor: '#F5F5F5',
       borderRadius: 10,
       overflow: 'hidden',
       marginBottom: 20,
   },
   penguinImage: {
       width: '100%',
       height: '100%',
   },
});
