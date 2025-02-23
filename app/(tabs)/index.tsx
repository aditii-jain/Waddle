import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import CarbonProgressBar from '@/components/CarbonProgressBar';
import PenguinDisplay from '@/components/PenguinDisplay';
import LogModal from '@/components/LogModal';

export default function HomeScreen() {
  const [carbonValue, setCarbonValue] = useState(80);
  const carbonLimit = 100;
  const [isLogModalVisible, setIsLogModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Good Afternoon, <Text style={styles.nameText}>David!</Text>
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.penguinWrapper}>
          <PenguinDisplay percentage={(carbonValue / carbonLimit) * 100} />
        </View>
        
        <View style={styles.progressWrapper}>
          <CarbonProgressBar currentValue={carbonValue} maxValue={carbonLimit} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={() => setIsLogModalVisible(true)}
        >
          <IconSymbol size={32} name="plus" color="white" />
        </TouchableOpacity>
      </View>

      <LogModal 
        isVisible={isLogModalVisible}
        onClose={() => setIsLogModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#E8F5E9',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  nameText: {
    color: '#417F3D',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  penguinWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  progressWrapper: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 90,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  floatingButton: {
    width: 64,
    height: 64,
    backgroundColor: '#417F3D',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 6,
    borderColor: '#E8F5E9',
  },
});
