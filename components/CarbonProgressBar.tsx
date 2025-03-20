// components/CarbonProgressBar.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface CarbonProgressBarProps {
   currentValue: number;
   maxValue: number;
   progressColor: string;
}


export default function CarbonProgressBar({ currentValue, maxValue, progressColor }: CarbonProgressBarProps) {
   const percentage = (currentValue / maxValue) * 100;
   const isOverLimit = percentage > 100;
   const isCloseToLimit = percentage >= 66;


   return (
       <View style={styles.progressContainer}>
           <View style={styles.progressBar}>
               <View
                   style={[
                       styles.progressFill,
                       {
                           width: `${Math.min(percentage, 100)}%`,
                           backgroundColor: progressColor,
                       },
                   ]}
               />
           </View>
           <Text style={styles.progressText}>
               {isOverLimit ? "You are over your carbon limit goal for today." :
                isCloseToLimit ? "You are close to your carbon limit goal for today." :
                "Track your carbon footprint for today."}
           </Text>
       </View>
   );
}


const styles = StyleSheet.create({
   progressContainer: {
       marginTop: 10,
   },
   progressBar: {
       height: 10,
       backgroundColor: '#E0E0E0',
       borderRadius: 5,
       overflow: 'hidden',
   },
   progressFill: {
       height: '100%',
   },
   progressText: {
       marginTop: 8,
       color: '#666666',
   },
});
