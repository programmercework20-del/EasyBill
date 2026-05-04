import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Home, Package, Users, Settings, LogOut, User } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { clearAuth } from '../utils/authStorage';

const CustomDrawerContent = (props: any) => {

  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    await clearAuth();
  };

  return (
    <View style={styles.container}>
      {/* Header Section with Curved Design */}
      <View style={styles.header}>
        {/* Top curved background */}
        <View style={styles.headerCurve} />
        
        {/* Profile Container */}
        <View style={styles.profileWrapper}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User color="#1A73E8" size={32} />
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>EasyBill</Text>
            <Text style={styles.userEmail}>Billing Management</Text>
          </View>
        </View>
      </View>

      {/* Drawer Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <DrawerItemList 
          {...props} 
          labelStyle={styles.drawerLabel}
          activeTintColor="#ffffff"
          inactiveTintColor="#e0e7ff"
          activeBackgroundColor="rgba(255,255,255,0.2)"
          inactiveBackgroundColor="transparent"
        />
      </DrawerContentScrollView>

      {/* Footer Section */}
      <View style={styles.footer}>
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => <LogOut color="#ef4444" size={size} />}
          labelStyle={styles.logoutLabel}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A73E8',
  },
  header: {
    backgroundColor: '#1A73E8',
    paddingBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  headerCurve: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#1A73E8',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  profileWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    zIndex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#14b8a6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    color: '#e0e7ff',
    fontSize: 14,
    fontWeight: '500',
  },
  drawerContent: {
    paddingTop: 20,
    backgroundColor: '#1A73E8',
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: -8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    backgroundColor: '#1A73E8',
  },
  logoutLabel: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CustomDrawerContent;
