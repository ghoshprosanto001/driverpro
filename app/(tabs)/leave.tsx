import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, FileText, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  note?: string;
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    reason: 'Family emergency',
    status: 'approved',
    submittedDate: '2024-01-15',
    note: 'Approved by supervisor'
  },
  {
    id: '2',
    startDate: '2024-01-28',
    endDate: '2024-01-28',
    reason: 'Medical appointment',
    status: 'pending',
    submittedDate: '2024-01-16'
  },
  {
    id: '3',
    startDate: '2024-01-10',
    endDate: '2024-01-11',
    reason: 'Personal leave',
    status: 'rejected',
    submittedDate: '2024-01-05',
    note: 'Insufficient notice period'
  }
];

export default function LeaveApplication() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [showForm, setShowForm] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={20} color="#10B981" />;
      case 'rejected':
        return <XCircle size={20} color="#EF4444" />;
      case 'pending':
        return <AlertCircle size={20} color="#F59E0B" />;
      default:
        return <Clock size={20} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10B981';
      case 'rejected': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSubmit = () => {
    if (!startDate || !endDate || !reason) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    Alert.alert(
      'Success',
      'Leave request submitted successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            setStartDate('');
            setEndDate('');
            setReason('');
            setShowForm(false);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leave Management</Text>
        <TouchableOpacity 
          style={styles.newRequestButton}
          onPress={() => setShowForm(!showForm)}
        >
          <Text style={styles.newRequestButtonText}>
            {showForm ? 'Cancel' : 'New Request'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>New Leave Request</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Start Date</Text>
              <View style={styles.inputContainer}>
                <Calendar size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={startDate}
                  onChangeText={setStartDate}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>End Date</Text>
              <View style={styles.inputContainer}>
                <Calendar size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  value={endDate}
                  onChangeText={setEndDate}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Reason</Text>
              <View style={styles.textAreaContainer}>
                <FileText size={20} color="#6B7280" />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Please specify reason for leave..."
                  value={reason}
                  onChangeText={setReason}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.requestsSection}>
          <Text style={styles.sectionTitle}>Previous Requests</Text>
          
          {mockLeaveRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <View style={styles.statusContainer}>
                  {getStatusIcon(request.status)}
                  <Text style={[styles.statusText, { color: getStatusColor(request.status) }]}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Text>
                </View>
                <Text style={styles.submittedDate}>
                  Submitted {formatDate(request.submittedDate)}
                </Text>
              </View>

              <View style={styles.dateRange}>
                <View style={styles.dateItem}>
                  <Text style={styles.dateLabel}>From</Text>
                  <Text style={styles.dateValue}>{formatDate(request.startDate)}</Text>
                </View>
                <View style={styles.dateSeparator} />
                <View style={styles.dateItem}>
                  <Text style={styles.dateLabel}>To</Text>
                  <Text style={styles.dateValue}>{formatDate(request.endDate)}</Text>
                </View>
              </View>

              <View style={styles.reasonContainer}>
                <Text style={styles.reasonLabel}>Reason:</Text>
                <Text style={styles.reasonText}>{request.reason}</Text>
              </View>

              {request.note && (
                <View style={styles.noteContainer}>
                  <Text style={styles.noteLabel}>Note:</Text>
                  <Text style={styles.noteText}>{request.note}</Text>
                </View>
              )}
            </View>
          ))}
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
  newRequestButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newRequestButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  textAreaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  requestsSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  requestCard: {
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
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  submittedDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  dateRange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateItem: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  dateSeparator: {
    width: 20,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  reasonContainer: {
    marginBottom: 12,
  },
  reasonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  noteContainer: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#D1D5DB',
  },
  noteLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});