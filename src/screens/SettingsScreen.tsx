import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { User, Settings as SettingsIcon, LogOut, Bell, Shield } from 'lucide-react-native';

const ListItem = ({ title, subtitle, icon, rightLabel, onPress }: any) => (
  <TouchableOpacity 
    activeOpacity={0.7}
    onPress={onPress}
    className="flex-row items-center bg-slate-800 p-4 mb-3 rounded-xl border border-slate-700/50 shadow-sm shadow-black/20"
  >
    <View className="bg-slate-900/50 p-3 rounded-xl mr-4 border border-slate-700/30">
      {icon}
    </View>
    <View className="flex-1">
      <Text className="text-white text-lg font-semibold">{title}</Text>
      {subtitle && <Text className="text-slate-400 mt-1">{subtitle}</Text>}
    </View>
    {rightLabel && <Text className="text-teal-400 font-bold text-lg">{rightLabel}</Text>}
  </TouchableOpacity>
);

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-slate-900">
      <ScrollView contentContainerClassName="p-6">
        <View className="mb-6">
          <ListItem 
            title="Profile" 
            subtitle="Manage your personal information"
            icon={<User color="#14b8a6" size={24} />}
            onPress={() => {}}
          />
          <ListItem 
            title="Account Security" 
            subtitle="Password, 2FA, Security logs"
            icon={<Shield color="#14b8a6" size={24} />}
            onPress={() => {}}
          />
        </View>

        <View className="mb-6">
          <ListItem 
            title="Preferences" 
            subtitle="Theme, Layout, Display"
            icon={<SettingsIcon color="#14b8a6" size={24} />}
            onPress={() => {}}
          />
          <ListItem 
            title="Notifications" 
            subtitle="Push, Email, SMS alerts"
            icon={<Bell color="#14b8a6" size={24} />}
            onPress={() => {}}
          />
        </View>

        <ListItem 
          title="Logout" 
          subtitle="Sign out from this device"
          icon={<LogOut color="#ef4444" size={24} />}
          onPress={() => {}}
        />
      </ScrollView>
    </View>
  );
}
