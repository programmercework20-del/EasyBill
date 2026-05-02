import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

const salesData = [
  { id: 522, name: 'RAMZAN', amount: 3600 },
  { id: 521, name: 'Fuzail Hussain', amount: 3500 },
  { id: 520, name: 'Fuzail Hussain', amount: 1650 },
  { id: 519, name: 'Fuzail Hussain', amount: 2100 },
  { id: 518, name: 'Fuzail Hussain', amount: 2600 },
];

import { useNavigation } from '@react-navigation/native';

export default function SaleList() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>

      {/* 🔥 Date Filter (NEW ADDED) */}
      <View style={{ padding: 10 }}>

        {/* Today Dropdown */}
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{ fontSize: 16 }}>Today</Text>
          <Text>▼</Text>
        </TouchableOpacity>

        {/* Date Range */}
        <View style={{ flexDirection: 'row', gap: 10 }}>

          {/* From Date */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#ddd',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text>24/04/26</Text>
            <Text>▼</Text>
          </TouchableOpacity>

          {/* To Date */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#ddd',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text>01/05/26</Text>
            <Text>▼</Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* Top Summary */}
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          
          <View style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'green'
          }}>
            <Text>Amount</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              ₹ 219299.51
            </Text>
          </View>

          <View style={{
            width: 100,
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#4F46E5'
          }}>
            <Text>Count</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              94
            </Text>
          </View>

        </View>
      </View>

      {/* List */}
      <ScrollView style={{ padding: 10 }}>
        {salesData.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: '#ddd'
            }}
          >
            {/* Top Row */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                padding: 5,
                borderRadius: 5
              }}>
                {item.name}
              </Text>

              <Text>{item.id} | 30/04/26</Text>
            </View>

            {/* Amount */}
            <Text style={{
              marginTop: 5,
              color: '#2563eb',
              fontSize: 16
            }}>
              ₹ {item.amount} | <Text style={{ color: 'green' }}>Paid</Text>
            </Text>

            <Text style={{ color: '#888', marginTop: 3 }}>
              Created by Admin
            </Text>

            {/* Button */}
            <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#1A73E8',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 6
                }}
              >
                <Text style={{ color: '#1A73E8' }}>
                  Sale Return
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        ))}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }}>
        <TouchableOpacity style={{
          backgroundColor: '#1A73E8',
          padding: 15,
          borderRadius: 25,
          width: '40%',
          alignItems: 'center'
        }}>
          <Text style={{ color: '#fff' }}>VISUALIZE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          backgroundColor: '#1A73E8',
          padding: 15,
          borderRadius: 25,
          width: '40%',
          alignItems: 'center'
        }}>
          <Text style={{ color: '#fff' }}>NEW SALE</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}