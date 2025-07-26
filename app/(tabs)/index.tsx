import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react-native';

interface Trip {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  status: 'pending' | 'in-progress' | 'completed';
  customerName: string;
  customerPhone: string;
  fare: number;
  distance: string;
}

const mockTrips: Trip[] = [
  {
    id: '2',
    pickupLocation: '789 Pine Rd, City Center',
    dropoffLocation: '321 Elm St, Suburbs',
    pickupTime: '2:15 PM',
    status: 'in-progress',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 (555) 987-6543',
    fare: 32.75,
    distance: '12.5 km'
  },
];

export default function CurrentTrips() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'in-progress': return '#10B981';
      case 'completed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Current Trip</Text>
        <Text style={styles.headerSubtitle}>Active trip in progress</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {mockTrips.map((trip) => (
          <View key={trip.id} style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(trip.status) }]}>
                <Text style={styles.statusText}>{getStatusText(trip.status)}</Text>
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

            {trip.status === 'in-progress' && (
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.completeButton}>
                  <Text style={styles.completeButtonText}>Complete Trip</Text>
                </TouchableOpacity>
              </View>
            )}
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
    marginBottom: 16,
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
  actionButtons: {
    marginTop: 8,
  },
  completeButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});