import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react-native';

interface Trip {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  status: 'pending';
  customerName: string;
  customerPhone: string;
  fare: number;
  distance: string;
}

const upcomingTrips: Trip[] = [
  {
    id: '1',
    pickupLocation: '123 Main St, Downtown',
    dropoffLocation: '456 Oak Ave, Uptown',
    pickupTime: '10:30 AM',
    status: 'pending',
    customerName: 'John Smith',
    customerPhone: '+1 (555) 123-4567',
    fare: 25.50,
    distance: '8.2 km'
  },
  {
    id: '3',
    pickupLocation: '555 Beach Blvd, Waterfront',
    dropoffLocation: '777 Hill Top Dr, Heights',
    pickupTime: '4:45 PM',
    status: 'pending',
    customerName: 'Mike Davis',
    customerPhone: '+1 (555) 456-7890',
    fare: 18.25,
    distance: '6.1 km'
  },
  {
    id: '4',
    pickupLocation: '888 Commerce Way, Business District',
    dropoffLocation: '999 Residential Ln, Suburbs',
    pickupTime: '6:15 PM',
    status: 'pending',
    customerName: 'Emily Wilson',
    customerPhone: '+1 (555) 234-5678',
    fare: 41.00,
    distance: '15.8 km'
  }
];

export default function UpcomingTrips() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming Trips</Text>
        <Text style={styles.headerSubtitle}>Scheduled for today</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {upcomingTrips.map((trip) => (
          <View key={trip.id} style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Scheduled</Text>
              </View>
              <Text style={styles.fareText}>${trip.fare.toFixed(2)}</Text>
            </View>

            <View style={styles.locationContainer}>
              <View style={styles.locationRow}>
                <MapPin size={20} color="#10B981" />
                <View style={styles.locationDetails}>
                  <Text style={styles.locationLabel}>Pickup</Text>
                  <Text style={styles.locationText}>{trip.pickupLocation}</Text>
                </View>
              </View>
              
              <View style={styles.locationDivider} />
              
              <View style={styles.locationRow}>
                <MapPin size={20} color="#EF4444" />
                <View style={styles.locationDetails}>
                  <Text style={styles.locationLabel}>Dropoff</Text>
                  <Text style={styles.locationText}>{trip.dropoffLocation}</Text>
                </View>
              </View>
            </View>

            <View style={styles.tripInfo}>
              <View style={styles.infoRow}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.infoText}>{trip.pickupTime}</Text>
              </View>
              <View style={styles.infoRow}>
                <Navigation size={16} color="#6B7280" />
                <Text style={styles.infoText}>{trip.distance}</Text>
              </View>
            </View>

            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{trip.customerName}</Text>
              <TouchableOpacity style={styles.phoneButton}>
                <Phone size={16} color="#2563EB" />
                <Text style={styles.phoneText}>{trip.customerPhone}</Text>
              </TouchableOpacity>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    marginBottom: 16,
  },
  statusBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  fareText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationDetails: {
    marginLeft: 12,
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  locationDivider: {
    height: 20,
    width: 2,
    backgroundColor: '#E5E7EB',
    marginLeft: 10,
    marginVertical: 4,
  },
  tripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  phoneText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
});