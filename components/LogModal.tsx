import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Pressable
} from 'react-native';

interface LogModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (type: string, value: number) => void;
}

type ActionType = 'Transportation' | 'Food' | null;
type TransportationType = 'SUV' | 'Sedan' | 'Bus' | 'Plane' | null;
type FoodType = 'Beef' | 'Chicken' | 'Vegetables' | 'Fruits' | null;

export default function LogModal({ isVisible, onClose, onSubmit }: LogModalProps) {
  const [actionType, setActionType] = useState<ActionType>(null);
  const [transportationType, setTransportationType] = useState<TransportationType>(null);
  const [foodType, setFoodType] = useState<FoodType>(null);
  const [quantity, setQuantity] = useState('');

  const resetForm = () => {
    setActionType(null);
    setTransportationType(null);
    setFoodType(null);
    setQuantity('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!actionType || !quantity) return;

    const numericQuantity = parseFloat(quantity);
    if (isNaN(numericQuantity)) return;

    onSubmit(actionType.toLowerCase(), numericQuantity);
    handleClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Log Activity</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Action Type</Text>
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => setActionType('Transportation')}
            >
              <Text style={[
                styles.selectButtonText,
                actionType === 'Transportation' && styles.selectedText
              ]}>
                Transportation {actionType === 'Transportation' && '✓'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => setActionType('Food')}
            >
              <Text style={[
                styles.selectButtonText,
                actionType === 'Food' && styles.selectedText
              ]}>
                Food {actionType === 'Food' && '✓'}
              </Text>
            </TouchableOpacity>
          </View>

          {actionType === 'Transportation' && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Transportation Type</Text>
                {(['SUV', 'Sedan', 'Bus', 'Plane'] as TransportationType[]).map((type) => (
                  <TouchableOpacity 
                    key={type}
                    style={styles.selectButton}
                    onPress={() => setTransportationType(type)}
                  >
                    <Text style={[
                      styles.selectButtonText,
                      transportationType === type && styles.selectedText
                    ]}>
                      {type} {transportationType === type && '✓'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Distance (Miles)</Text>
                <TextInput
                  style={styles.input}
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                  placeholder="Enter distance"
                />
              </View>
            </>
          )}

          {actionType === 'Food' && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Food Type</Text>
                {(['Beef', 'Chicken', 'Vegetables', 'Fruits'] as FoodType[]).map((type) => (
                  <TouchableOpacity 
                    key={type}
                    style={styles.selectButton}
                    onPress={() => setFoodType(type)}
                  >
                    <Text style={[
                      styles.selectButtonText,
                      foodType === type && styles.selectedText
                    ]}>
                      {type} {foodType === type && '✓'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Amount (Grams)</Text>
                <TextInput
                  style={styles.input}
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                  placeholder="Enter amount"
                />
              </View>
            </>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        
        <Pressable style={styles.closeArea} onPress={handleClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  closeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  selectButton: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectButtonText: {
    fontSize: 16,
  },
  selectedText: {
    color: '#417F3D',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#417F3D',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 