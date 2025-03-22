import { StyleSheet, View, TextInput, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getChatResponse } from '@/services/chatService';

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

type TabType = 'Actions' | 'Chat';

const PenguinIcon = () => (
  <Image 
    source={require('@/assets/images/happy-penguin.png')} 
    style={styles.penguinIcon}
  />
);

export default function SearchScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('Actions');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    
    // Add user message to chat
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    setIsLoading(true);
    try {
      const response = await getChatResponse(userMessage);
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting right now. Please try again later! 🐧" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Actions' && styles.activeTab]}
          onPress={() => setActiveTab('Actions')}
        >
          <Text style={[styles.tabText, activeTab === 'Actions' && styles.activeTabText]}>
            Actions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Chat' && styles.activeTab]}
          onPress={() => setActiveTab('Chat')}
        >
          <Text style={[styles.tabText, activeTab === 'Chat' && styles.activeTabText]}>
            Talk to Penguin
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Actions' ? (
        <>
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
          </ScrollView>
        </>
      ) : (
        <View style={styles.chatContainer}>
          <ScrollView style={styles.chatMessages}>
            {chatMessages.map((message, index) => (
              <View 
                key={index} 
                style={[
                  styles.messageContainer,
                  message.role === 'user' ? styles.userMessage : styles.assistantMessage
                ]}
              >
                {message.role === 'assistant' && <PenguinIcon />}
                <Text style={[
                  styles.messageText,
                  message.role === 'assistant' ? styles.assistantMessageText : styles.userMessageText
                ]}>
                  {message.content}
                </Text>
              </View>
            ))}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Penguin is thinking...</Text>
              </View>
            )}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.chatInput}
              placeholder="Ask the penguin for eco-friendly advice..."
              value={chatInput}
              onChangeText={setChatInput}
              multiline
              returnKeyType="send"
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={handleSendMessage}
              disabled={isLoading}
            >
              <IconSymbol name="arrow.up.circle.fill" size={32} color="#417F3D" />
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  activeTab: {
    backgroundColor: '#417F3D',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  chatMessages: {
    flex: 1,
    marginBottom: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 8,
    padding: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#417F3D',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
    paddingLeft: 8,
    marginLeft: 36,
  },
  messageText: {
    fontSize: 16,
    flex: 1,
  },
  userMessageText: {
    color: '#fff',
  },
  assistantMessageText: {
    color: '#417F3D',
  },
  penguinIcon: {
    width: 32,
    height: 32,
    position: 'absolute',
    left: -36,
    top: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 8,
  },
  chatInput: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 8,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    fontStyle: 'italic',
  },
});
