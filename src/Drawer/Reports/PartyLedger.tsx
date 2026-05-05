import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronLeft, ChevronRight, Share2, Download } from 'lucide-react-native';

export default function PartyLedger() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.dateSelectorContainer}>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Last Week</Text>
            <ChevronDown color="#333" size={20} />
          </TouchableOpacity>
          <View style={styles.dateRangeRow}>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={styles.dateText}>25/04/26</Text>
              <ChevronDown color="#333" size={16} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateInput}>
              <Text style={styles.dateText}>02/05/26</Text>
              <ChevronDown color="#333" size={16} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.reportTitleCard}>
          <Text style={styles.reportTitle}>Party Ledger</Text>
          <Text style={styles.reportDateRange}>25-04-26 to 02-05-26</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.placeholderText}>Party Ledger content will be displayed here</Text>
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navButton}>
          <ChevronLeft color="#1A73E8" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <ChevronRight color="#1A73E8" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.actionButton}>
          <Download color="#1A73E8" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 color="#1A73E8" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  scrollView: { flex: 1 },
  dateSelectorContainer: { backgroundColor: '#fff', padding: 16, marginBottom: 8 },
  dropdown: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 12 },
  dropdownText: { fontSize: 14, color: '#333' },
  dateRangeRow: { flexDirection: 'row', gap: 8 },
  dateInput: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  dateText: { fontSize: 14, color: '#333' },
  reportTitleCard: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#1A73E8', alignItems: 'center' },
  reportTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  reportDateRange: { fontSize: 14, color: '#666' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  placeholderText: { fontSize: 16, color: '#6B7280' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  navButton: { padding: 8, borderWidth: 1, borderColor: '#1A73E8', borderRadius: 4, marginRight: 8 },
  actionButton: { padding: 8, borderWidth: 1, borderColor: '#1A73E8', borderRadius: 4, marginLeft: 8 },
});
