import { StyleSheet, View, TextInput, ScrollView, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Static data for sections with real images
const SECTIONS_DATA = [
  {
    title: 'Transport',
    query: 'transport',
    cards: [
      { id: '1', name: 'Electric Bus', imageUrl: 'https://images.unsplash.com/photo-1569230516306-5a8cb5586399?w=500&q=80' },
      { id: '2', name: 'Bike Share', imageUrl: 'https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?w=500&q=80' },
      { id: '3', name: 'Train', imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&q=80' },
    ],
  },
  {
    title: 'Food',
    query: 'food',
    cards: [
      { id: '4', name: 'Local Market', imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&q=80' },
      { id: '5', name: 'Organic Food', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80' },
      { id: '6', name: 'Farmers Market', imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&q=80' },
    ],
  },
  {
    title: 'Energy',
    query: 'energy',
    cards: [
      { id: '7', name: 'Solar Panels', imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80' },
      { id: '8', name: 'Wind Power', imageUrl: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=500&q=80' },
      { id: '9', name: 'Green Energy', imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&q=80' },
    ],
  },
  {
    title: 'Other',
    query: 'other',
    cards: [
      { id: '10', name: 'Recycling', imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80' },
      { id: '11', name: 'Plant Trees', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80' },
      { id: '12', name: 'Clean Beach', imageUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&q=80' },
    ],
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return SECTIONS_DATA;
    }

    const query = searchQuery.toLowerCase().trim();
    
    return SECTIONS_DATA
      .map(section => ({
        ...section,
        cards: section.cards.filter(card => 
          card.name.toLowerCase().includes(query)
        )
      }))
      .filter(section => 
        section.title.toLowerCase().includes(query) || section.cards.length > 0
      );
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.pageTitle}>Actions</Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <IconSymbol 
            name="magnifyingglass" 
            size={20} 
            color="#666"
            style={styles.searchIcon} 
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search actions"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.cardsScrollContainer,
                section.cards.length === 0 && styles.emptyContainer
              ]}
            >
              {section.cards.length > 0 ? (
                section.cards.map((card) => (
                  <View key={card.id} style={styles.card}>
                    <Image 
                      source={{ uri: card.imageUrl }} 
                      style={styles.cardImage}
                    />
                    <Text style={styles.cardText}>{card.name}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noResultsText}>No actions found</Text>
              )}
            </ScrollView>
          </View>
        ))}
        {filteredSections.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No actions found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#417F3D',
    padding: 16,
    paddingBottom: 8,
  },
  searchContainer: {
    padding: 16,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#417F3D',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  cardsScrollContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: 160,
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
  cardImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#E8F5E9',
  },
  cardText: {
    padding: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    justifyContent: 'center',
    minHeight: 100,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});
