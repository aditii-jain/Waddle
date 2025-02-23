import { View, Text, StyleSheet, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';

type StoreReward = {
  id: string;
  storeName: string;
  discount: string;
  points: number;
  imageUrl: string;
};

const STORE_REWARDS: StoreReward[] = [
  {
    id: '1',
    storeName: 'EcoStore',
    discount: '25% OFF',
    points: 500,
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&q=80',
  },
  {
    id: '2',
    storeName: 'Green Market',
    discount: '30% OFF',
    points: 750,
    imageUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=500&q=80',
  },
  {
    id: '3',
    storeName: 'Eco Fashion',
    discount: '20% OFF',
    points: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80',
  },
  {
    id: '4',
    storeName: 'Sustainable Home',
    discount: '15% OFF',
    points: 500,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
  },
];

export default function RewardsScreen() {
  const [userPoints, setUserPoints] = useState(2500);

  const handleRewardClaim = (reward: StoreReward) => {
    if (userPoints >= reward.points) {
      setUserPoints(prevPoints => prevPoints - reward.points);
      Alert.alert(
        "Discount Applied!",
        `${reward.discount} discount for ${reward.storeName} has been applied to your account.`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        "Insufficient Points",
        `You need ${reward.points - userPoints} more points to claim this reward.`,
        [{ text: "OK" }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Rewards</Text>
          <Text style={styles.name}>David</Text>
        </View>
        <View style={styles.pointsContainer}>
          <IconSymbol name="star.fill" size={16} color="#fff" />
          <Text style={styles.pointsText}>{userPoints}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Discounts</Text>
          {STORE_REWARDS.map((reward) => (
            <TouchableOpacity 
              key={reward.id} 
              style={styles.couponCard}
              onPress={() => handleRewardClaim(reward)}
              activeOpacity={0.7}
            >
              <View style={styles.storeInfo}>
                <Image 
                  source={{ uri: reward.imageUrl }} 
                  style={styles.storeImage}
                />
                <View>
                  <Text style={styles.storeName}>{reward.storeName}</Text>
                  <Text style={styles.discount}>{reward.discount}</Text>
                </View>
              </View>
              <View style={[
                styles.pointsBadge,
                userPoints < reward.points && styles.insufficientPoints
              ]}>
                <IconSymbol name="star.fill" size={12} color="#fff" />
                <Text style={styles.badgeText}>{reward.points}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#417F3D',
    marginBottom: 4,
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#417F3D',
    fontStyle: 'italic',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#417F3D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  pointsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#417F3D',
    marginBottom: 12,
  },
  couponCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  storeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  discount: {
    fontSize: 16,
    color: '#417F3D',
    fontWeight: '500',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#417F3D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  insufficientPoints: {
    backgroundColor: '#666', // Gray out the points badge when user can't afford it
  },
}); 