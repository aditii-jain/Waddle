"use client";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Home, Search, Plus, Users, Star } from "lucide-react-native";
import { IconSymbol } from '@/components/ui/IconSymbol';

type Player = {
  name: string;
  points: number;
  avatar: string;
  streak: number;
};

type Event = {
  id: string;
  title: string;
  date: string;
  participants: number;
  imageUrl: string;
  status: 'Going' | 'Full' | 'Cancelled';
};

const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Beach Cleanup',
    date: '3/15',
    participants: 156,
    imageUrl: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=500&q=80',
    status: 'Going',
  },
  {
    id: '2',
    title: 'Tree Planting',
    date: '3/18',
    participants: 89,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80',
    status: 'Full',
  },
  {
    id: '3',
    title: 'Community Garden',
    date: '3/20',
    participants: 45,
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&q=80',
    status: 'Going',
  },
  {
    id: '4',
    title: 'E-Waste Collection',
    date: '3/25',
    participants: 92,
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80',
    status: 'Cancelled',
  },
  {
    id: '5',
    title: 'Solar Panel Workshop',
    date: '3/28',
    participants: 34,
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80',
    status: 'Going',
  },
  {
    id: '6',
    title: 'Farmers Market',
    date: '4/1',
    participants: 212,
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&q=80',
    status: 'Going',
  },
];

export default function PeopleScreen() {
  const [activeTab, setActiveTab] = useState<'Leaderboard' | 'Events'>('Leaderboard');

  const topPlayers: Player[] = [
    { name: 'Sarah', points: 3200, avatar: 'https://i.pravatar.cc/150?img=1', streak: 12 },
    { name: 'Michael', points: 3100, avatar: 'https://i.pravatar.cc/150?img=2', streak: 8 },
    { name: 'Emma', points: 2900, avatar: 'https://i.pravatar.cc/150?img=3', streak: 15 },
  ];

  const otherPlayers: Player[] = [
    { name: 'John', points: 2300, avatar: 'https://i.pravatar.cc/150?img=4', streak: 5 },
    { name: 'Lisa', points: 2100, avatar: 'https://i.pravatar.cc/150?img=5', streak: 3 },
    { name: 'David', points: 1900, avatar: 'https://i.pravatar.cc/150?img=6', streak: 7 },
    { name: 'Alex', points: 1800, avatar: 'https://i.pravatar.cc/150?img=7', streak: 4 },
    { name: 'Sophie', points: 1750, avatar: 'https://i.pravatar.cc/150?img=8', streak: 9 },
    { name: 'James', points: 1600, avatar: 'https://i.pravatar.cc/150?img=9', streak: 6 },
  ];

  const renderStreak = (streak: number) => {
    return (
      <View style={styles.streakContainer}>
        <Text style={styles.streakText}>🔥 {streak}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tabItem, activeTab === 'Leaderboard' && styles.activeTab]}
          onPress={() => setActiveTab('Leaderboard')}
        >
          <Text style={[styles.tabText, activeTab === 'Leaderboard' && styles.activeTabText]}>
            Leaderboard
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tabItem, activeTab === 'Events' && styles.activeTab]}
          onPress={() => setActiveTab('Events')}
        >
          <Text style={[styles.tabText, activeTab === 'Events' && styles.activeTabText]}>
            Events
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'Leaderboard' ? (
          <>
            <View style={styles.podiumContainer}>
              {/* Second Place */}
              <View style={styles.podiumItem}>
                <Image source={{ uri: topPlayers[1].avatar }} style={styles.avatar} />
                <Text style={styles.playerName}>{topPlayers[1].name}</Text>
                {renderStreak(topPlayers[1].streak)}
                <View style={[styles.podium, styles.secondPlace]}>
                  <Text style={styles.podiumNumber}>2</Text>
                </View>
              </View>

              {/* First Place */}
              <View style={styles.podiumItem}>
                <Image source={{ uri: topPlayers[0].avatar }} style={styles.avatar} />
                <Text style={styles.playerName}>{topPlayers[0].name}</Text>
                {renderStreak(topPlayers[0].streak)}
                <View style={[styles.podium, styles.firstPlace]}>
                  <Text style={styles.podiumNumber}>1</Text>
                </View>
              </View>

              {/* Third Place */}
              <View style={styles.podiumItem}>
                <Image source={{ uri: topPlayers[2].avatar }} style={styles.avatar} />
                <Text style={styles.playerName}>{topPlayers[2].name}</Text>
                {renderStreak(topPlayers[2].streak)}
                <View style={[styles.podium, styles.thirdPlace]}>
                  <Text style={styles.podiumNumber}>3</Text>
                </View>
              </View>
            </View>

            <View style={styles.listContainer}>
              {otherPlayers.map((player, index) => (
                <View key={index} style={styles.playerRow}>
                  <Text style={styles.rankNumber}>{index + 4}</Text>
                  <View style={styles.playerInfo}>
                    <Image source={{ uri: player.avatar }} style={styles.listAvatar} />
                    <Text style={styles.listPlayerName}>{player.name}</Text>
                  </View>
                  <View style={styles.pointsAndStreak}>
                    {renderStreak(player.streak)}
                    <View style={styles.pointsContainer}>
                      <IconSymbol name="star.fill" size={16} color="#417F3D" />
                      <Text style={styles.points}>{player.points}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.eventsContainer}>
            {EVENTS.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <Image 
                  source={{ uri: event.imageUrl }}
                  style={styles.eventImage}
                />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventDate}>{event.date}</Text>
                    <View style={styles.participantsContainer}>
                      <Text style={styles.participantsCount}>{event.participants}</Text>
                      <IconSymbol name="person.2.fill" size={12} color="#666" />
                    </View>
                  </View>
                  <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>{event.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

    </SafeAreaView>
  );
}

type Styles = {
  container: ViewStyle;
  tabContainer: ViewStyle;
  tab: ViewStyle;
  activeTab: ViewStyle;
  tabText: TextStyle;
  activeTabText: TextStyle;
  content: ViewStyle;
  podiumContainer: ViewStyle;
  podiumItem: ViewStyle;
  avatar: ImageStyle;
  playerName: TextStyle;
  podium: ViewStyle;
  firstPlace: ViewStyle;
  secondPlace: ViewStyle;
  thirdPlace: ViewStyle;
  podiumNumber: TextStyle;
  listContainer: ViewStyle;
  playerRow: ViewStyle;
  rankNumber: TextStyle;
  playerInfo: ViewStyle;
  listAvatar: ImageStyle;
  listPlayerName: TextStyle;
  pointsContainer: ViewStyle;
  points: TextStyle;
  bottomNav: ViewStyle;
  plusButton: ViewStyle;
  communityContainer: ViewStyle;
  comingSoon: TextStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  tabBar: ViewStyle;
  tabItem: ViewStyle;
  eventsContainer: ViewStyle;
  eventCard: ViewStyle;
  eventImage: ImageStyle;
  eventInfo: ViewStyle;
  eventTitle: TextStyle;
  eventDetails: ViewStyle;
  eventDate: TextStyle;
  participantsContainer: ViewStyle;
  participantsCount: TextStyle;
  statusContainer: ViewStyle;
  statusText: TextStyle;
  goingStatus: ViewStyle;
  fullStatus: ViewStyle;
  cancelledStatus: ViewStyle;
  streakContainer: ViewStyle;
  streakText: TextStyle;
  pointsAndStreak: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#417F3D',
  },
  tabText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 20,
    gap: 10,
  },
  podiumItem: {
    alignItems: 'center',
    width: 100,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
  },
  playerName: {
    marginVertical: 8,
    fontSize: 14,
  },
  podium: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstPlace: {
    height: 140,
    backgroundColor: '#FFD700',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  secondPlace: {
    height: 110,
    backgroundColor: '#C0C0C0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  thirdPlace: {
    height: 80,
    backgroundColor: '#CD7F32',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  podiumNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rankNumber: {
    width: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#417F3D',
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  listPlayerName: {
    fontSize: 16,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  points: {
    fontSize: 16,
    fontWeight: '500',
    color: '#417F3D',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  plusButton: {
    backgroundColor: '#2B5522',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  communityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  comingSoon: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    backgroundColor: '#2B5522',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 4,
    margin: 16,
    borderRadius: 8,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  eventsContainer: {
    padding: 16,
    gap: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F5F5F5',
  },
  eventInfo: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  participantsCount: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  goingStatus: {
    backgroundColor: '#417F3D',
  },
  fullStatus: {
    backgroundColor: '#FFA500',
  },
  cancelledStatus: {
    backgroundColor: '#DC3545',
  },
  streakContainer: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
  },
  streakText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
  },
  pointsAndStreak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});