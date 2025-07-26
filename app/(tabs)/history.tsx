import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Star, Calendar } from 'lucide-react-native';

interface HistoryTrip {
  id: string;
  date: string;
  pickupLocation: string;
  dropoffLocation: string;
  customerName: string;
  fare: number;
  rating: number;
  duration: string;
  distance: string;
}

const mockHistory: HistoryTrip[] = [
  {
    id: '1',
    date: '2024-01-15',
    pickupLocation: '123 Main St, Downtown',
    dropoffLocation: '456 Oak Ave, Uptown',
    customerName: 'John Smith',
    fare: 25.50,
    rating: 4.8,
    duration: '28 min',
    distance: '8.2 km'
  },
  {
    id: '2',
    date: '2024-01-15',
    pickupLocation: '789 Pine Rd, City Center',
    dropoffLocation: '321 Elm St, Suburbs',
    customerName: 'Sarah Johnson',
    fare: 32.75,
    rating: 5.0,
    duration: '35 min',
    distance: '12.5 km'
  },
  {
    id: '3',
    date: '2024-01-14',
    pickupLocation: '555 Beach Blvd, Waterfront',
    dropoffLocation: '777 Hill Top Dr, Heights',
    customerName: 'Mike Davis',
    fare: 18.25,
    rating: 4.5,
    duration: '22 min',
    distance: '6.1 km'
  },
  {
    id: '4',
    date: '2024-01-14',
    pickupLocation: '888 Commerce Way, Business District',
    dropoffLocation: '999 Residential Ln, Suburbs',
    customerName: 'Emily Wilson',
    fare: 41.00,
    rating: 4.9,
    duration: '42 min',
    distance: '15.8 km'
  },
  {
    id: '5',
    date: '2024-01-13',
    pickupLocation: '111 Airport Rd, Terminal',
    dropoffLocation: '222 Hotel Plaza, Downtown',
    customerName: 'Robert Brown',
    fare: 55.25,
    rating: 4.7,
    duration: '38 min',
    distance: '22.3 km'
  }
];

export default function TripHistory() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const getTotalEarnings = () => {
    return mockHistory.reduce((total, trip) => total + trip.fare, 0);
  };

  const getAverageRating = () => {
    const totalRating = mockHistory.reduce((total, trip) => total + trip.rating, 0);
    return totalRating / mockHistory.length;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trip History</Text>
        <View style={styles.periodSelector}>
          {['week', 'month', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextActive
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${getTotalEarnings().toFixed(2)}</Text>
          <Text style={styles.statLabel}>Total Earnings</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{mockHistory.length}</Text>
          <Text style={styles.statLabel}>Completed Trips</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.statValue}>{getAverageRating().toFixed(1)}</Text>
          </View>
          <Text style={styles.statLabel}>Average Rating</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {mockHistory.map((trip) => (
          <View key={trip.id} style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <View style={styles.dateContainer}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.dateText}>{formatDate(trip.date)}</Text>
              </View>
              <Text style={styles.fareText}>${trip.fare.toFixed(2)}</Text>
            </View>

            <View style={styles.locationContainer}>
              <View style={styles.locationRow}>
                <MapPin size={18} color="#10B981" />
                <Text style={styles.locationText} numberOfLines={1}>
                  {trip.pickupLocation}
                </Text>
              </View>
              
              <View style={styles.locationDivider} />
              
              <View style={styles.locationRow}>
                <MapPin size={18} color="#EF4444" />
                <Text style={styles.locationText} numberOfLines={1}>
                  {trip.dropoffLocation}
                </Text>
              </View>
            </View>

            <View style={styles.tripDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.customerName}>{trip.customerName}</Text>
                <View style={styles.ratingRow}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.ratingText}>{trip.rating.toFixed(1)}</Text>
                </View>
              </View>
              
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.metaText}>{trip.duration}</Text>
                </View>
                <Text style={styles.metaText}>•</Text>
                <Text style={styles.metaText}>{trip.distance}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  periodButtonTextActive: {
    color: '#2563EB',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  fareText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
  locationContainer: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
    flex: 1,
  },
  locationDivider: {
    height: 16,
    width: 2,
    backgroundColor: '#E5E7EB',
    marginLeft: 9,
    marginVertical: 2,
  },
  tripDetails: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
  },
});