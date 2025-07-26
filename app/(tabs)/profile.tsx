import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Phone, Mail, MapPin, Calendar, Car, FileText, Star, Award } from 'lucide-react-native';

interface DriverInfo {
  name: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  licenseNumber: string;
  licenseExpiry: string;
  joinDate: string;
  assignedCar: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    color: string;
  };
  stats: {
    totalTrips: number;
    rating: number;
    totalEarnings: number;
    yearsOfService: number;
  };
}

const driverInfo: DriverInfo = {
  name: 'Alex Thompson',
  age: 32,
  phone: '+1 (555) 123-4567',
  email: 'alex.thompson@email.com',
  address: '123 Maple Street, Springfield, IL 62701',
  licenseNumber: 'DL123456789',
  licenseExpiry: '2026-08-15',
  joinDate: '2022-03-15',
  assignedCar: {
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    licensePlate: 'ABC-1234',
    color: 'Silver'
  },
  stats: {
    totalTrips: 1248,
    rating: 4.8,
    totalEarnings: 28750.50,
    yearsOfService: 2
  }
};

export default function DriverProfile() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Driver Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <User size={60} color="#6B7280" />
          </View>
          <Text style={styles.driverName}>{driverInfo.name}</Text>
          <Text style={styles.joinDate}>
            Driver since {formatDate(driverInfo.joinDate)}
          </Text>
          
          <View style={styles.ratingContainer}>
            <Star size={20} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{driverInfo.stats.rating.toFixed(1)}</Text>
            <Text style={styles.ratingSubtext}>({driverInfo.stats.totalTrips} trips)</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Award size={24} color="#10B981" />
            <Text style={styles.statValue}>{driverInfo.stats.totalTrips}</Text>
            <Text style={styles.statLabel}>Total Trips</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${driverInfo.stats.totalEarnings.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Earnings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{driverInfo.stats.yearsOfService}</Text>
            <Text style={styles.statLabel}>Years of Service</Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoRow}>
            <User size={20} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{driverInfo.name}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Calendar size={20} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{driverInfo.age} years old</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Phone size={20} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>{driverInfo.phone}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Mail size={20} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{driverInfo.email}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MapPin size={20} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Home Address</Text>
              <Text style={styles.infoValue}>{driverInfo.address}</Text>
            </View>
          </View>
        </View>

        {/* License Information */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>License Information</Text>
          
          <View style={styles.infoRow}>
            <FileText size={20} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>License Number</Text>
              <Text style={styles.infoValue}>{driverInfo.licenseNumber}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Calendar size={20} color="#6B7280" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Expiry Date</Text>
              <Text style={styles.infoValue}>{formatDate(driverInfo.licenseExpiry)}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.documentButton}>
            <FileText size={20} color="#2563EB" />
            <Text style={styles.documentButtonText}>View License Document</Text>
          </TouchableOpacity>
        </View>

        {/* Assigned Vehicle */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Assigned Vehicle</Text>
          
          <View style={styles.vehicleHeader}>
            <Car size={32} color="#2563EB" />
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>
                {driverInfo.assignedCar.year} {driverInfo.assignedCar.make} {driverInfo.assignedCar.model}
              </Text>
              <Text style={styles.vehicleDetails}>
                {driverInfo.assignedCar.color} • {driverInfo.assignedCar.licensePlate}
              </Text>
            </View>
          </View>

          <View style={styles.vehicleSpecs}>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Make</Text>
              <Text style={styles.specValue}>{driverInfo.assignedCar.make}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Model</Text>
              <Text style={styles.specValue}>{driverInfo.assignedCar.model}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Year</Text>
              <Text style={styles.specValue}>{driverInfo.assignedCar.year}</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>License Plate</Text>
              <Text style={styles.specValue}>{driverInfo.assignedCar.licensePlate}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  editButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  driverName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  ratingSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
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
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  documentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  documentButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  vehicleInfo: {
    marginLeft: 16,
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  vehicleDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  vehicleSpecs: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  specLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  specValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
  actionButtons: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});