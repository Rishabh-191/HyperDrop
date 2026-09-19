import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  background: '#101312',
  panel: '#171c1b',
  panelRaised: '#1d2422',
  border: '#2a3330',
  text: '#f1f5ef',
  muted: '#8d9993',
  lime: '#c9f36a',
  orange: '#ffad66',
  blue: '#7fd7ed',
};

const orders = [
  { id: '#HD-8421', address: '48 Mercer St, Soho', items: '6 items', time: '08 min', status: 'Packing', icon: 'cube-outline', color: colors.lime },
  { id: '#HD-8420', address: '12 Orchard Ave, Lower East', items: '3 items', time: '14 min', status: 'Rider assigned', icon: 'bicycle-outline', color: colors.blue },
  { id: '#HD-8419', address: '5 W 18th St, Chelsea', items: '9 items', time: '22 min', status: 'Picking', icon: 'basket-outline', color: colors.orange },
];

function Icon({ name, size = 20, color = colors.text }) {
  return <Ionicons color={color} name={name} size={size} />;
}

function Metric({ label, value, change, positive = true }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <View style={styles.changeRow}>
        <Icon name={positive ? 'arrow-up' : 'arrow-down'} size={12} color={positive ? colors.lime : colors.orange} />
        <Text style={[styles.change, { color: positive ? colors.lime : colors.orange }]}>{change}</Text>
      </View>
    </View>
  );
}

function OrderCard({ order }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.orderCard}>
      <View style={[styles.orderIcon, { backgroundColor: `${order.color}18` }]}>
        <Icon name={order.icon} size={21} color={order.color} />
      </View>
      <View style={styles.orderInfo}>
        <View style={styles.orderTitleRow}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={[styles.orderStatus, { color: order.color }]}>{order.status}</Text>
        </View>
        <Text style={styles.orderAddress}>{order.address}</Text>
        <View style={styles.orderMeta}>
          <Text style={styles.metaText}>{order.items}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.metaText}>ETA {order.time}</Text>
        </View>
      </View>
      <Icon name="chevron-forward" size={17} color={colors.muted} />
    </TouchableOpacity>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <View style={styles.brandRow}>
              <View style={styles.brandMark}><View style={styles.brandMarkInner} /></View>
              <Text style={styles.brand}>HYPERDROP</Text>
            </View>
            <Text style={styles.greeting}>Good morning, Alex</Text>
            <Text style={styles.date}>Tuesday, September 19, 2026 <Text style={styles.liveDot}>• LIVE</Text></Text>
          </View>
          <TouchableOpacity style={styles.avatar} activeOpacity={0.8}>
            <Text style={styles.avatarText}>AM</Text>
            <View style={styles.onlineBadge} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Today at a glance</Text>
          <TouchableOpacity><Text style={styles.linkText}>View report <Icon name="arrow-forward" size={13} color={colors.lime} /></Text></TouchableOpacity>
        </View>
        <View style={styles.metricsCard}>
          <Metric label="ORDERS TODAY" value="1,284" change="12.8%" />
          <View style={styles.metricDivider} />
          <Metric label="AVG. DELIVERY" value="18m 42s" change="4.2%" />
          <View style={styles.metricDivider} />
          <Metric label="NET REVENUE" value="$24.8k" change="8.6%" />
        </View>

        <View style={styles.pulseCard}>
          <View style={styles.pulseTop}>
            <View>
              <Text style={styles.eyebrow}>NETWORK PULSE</Text>
              <Text style={styles.pulseTitle}>Fleet is moving fast</Text>
            </View>
            <View style={styles.pulseBadge}><View style={styles.pulseBadgeDot} /><Text style={styles.pulseBadgeText}>98.4%</Text></View>
          </View>
          <View style={styles.chart}>
            {[38, 56, 44, 72, 62, 86, 71, 92, 78, 96, 84, 100].map((height, index) => (
              <View key={index} style={styles.chartBarTrack}><View style={[styles.chartBar, { height: `${height}%`, opacity: 0.45 + index * 0.04 }]} /></View>
            ))}
          </View>
          <View style={styles.pulseFooter}><Text style={styles.pulseFooterText}>Delivery success rate</Text><Text style={styles.pulseFooterValue}>+6.2% <Text style={styles.pulseFooterMuted}>vs last week</Text></Text></View>
        </View>

        <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>Live orders <Text style={styles.count}>· 24 active</Text></Text><TouchableOpacity><Icon name="options-outline" size={21} color={colors.muted} /></TouchableOpacity></View>
        {orders.map((order) => <OrderCard key={order.id} order={order} />)}

        <View style={styles.bottomSpace} />
      </ScrollView>
      <View style={styles.tabBar}>
        {[['Overview', 'grid-outline', 'grid'], ['Orders', 'receipt-outline', 'receipt'], ['Fleet', 'navigate-outline', 'navigate'], ['More', 'ellipsis-horizontal', 'ellipsis-horizontal']].map(([label, icon, activeIcon]) => {
          const isActive = activeTab === label;
          return <TouchableOpacity key={label} onPress={() => setActiveTab(label)} style={styles.tab} activeOpacity={0.7}><Icon name={isActive ? activeIcon : icon} size={22} color={isActive ? colors.lime : colors.muted} /><Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{label}</Text></TouchableOpacity>;
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { paddingHorizontal: 20, paddingTop: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 },
  brandRow: { alignItems: 'center', flexDirection: 'row', marginBottom: 21 },
  brandMark: { alignItems: 'center', backgroundColor: colors.lime, borderRadius: 5, height: 21, justifyContent: 'center', marginRight: 8, transform: [{ rotate: '45deg' }], width: 21 },
  brandMarkInner: { backgroundColor: colors.background, borderRadius: 2, height: 9, width: 9 },
  brand: { color: colors.text, fontSize: 13, fontWeight: '800', letterSpacing: 2.2 },
  greeting: { color: colors.text, fontSize: 25, fontWeight: '700', letterSpacing: -0.5, marginBottom: 7 },
  date: { color: colors.muted, fontSize: 12 },
  liveDot: { color: colors.lime, fontWeight: '700' },
  avatar: { alignItems: 'center', backgroundColor: '#30413b', borderColor: '#52645a', borderRadius: 18, borderWidth: 1, height: 37, justifyContent: 'center', position: 'relative', width: 37 },
  avatarText: { color: colors.lime, fontSize: 11, fontWeight: '800' },
  onlineBadge: { backgroundColor: colors.lime, borderColor: colors.background, borderRadius: 4, borderWidth: 2, bottom: -1, height: 9, position: 'absolute', right: -1, width: 9 },
  sectionHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 13 },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  count: { color: colors.muted, fontSize: 13, fontWeight: '500' },
  linkText: { color: colors.lime, fontSize: 12, fontWeight: '600' },
  metricsCard: { backgroundColor: colors.panel, borderColor: colors.border, borderRadius: 12, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, paddingVertical: 18 },
  metric: { flex: 1, paddingHorizontal: 8 },
  metricDivider: { backgroundColor: colors.border, height: 48, width: 1 },
  metricLabel: { color: colors.muted, fontSize: 9, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 },
  metricValue: { color: colors.text, fontSize: 19, fontWeight: '700', marginBottom: 5 },
  changeRow: { alignItems: 'center', flexDirection: 'row', gap: 2 },
  change: { fontSize: 10, fontWeight: '700' },
  pulseCard: { backgroundColor: colors.panelRaised, borderRadius: 12, marginTop: 27, overflow: 'hidden', padding: 18 },
  pulseTop: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  eyebrow: { color: colors.muted, fontSize: 9, fontWeight: '800', letterSpacing: 1.2, marginBottom: 7 },
  pulseTitle: { color: colors.text, fontSize: 18, fontWeight: '700' },
  pulseBadge: { alignItems: 'center', backgroundColor: '#2b3e2d', borderRadius: 6, flexDirection: 'row', paddingHorizontal: 9, paddingVertical: 6 },
  pulseBadgeDot: { backgroundColor: colors.lime, borderRadius: 3, height: 6, marginRight: 5, width: 6 },
  pulseBadgeText: { color: colors.lime, fontSize: 11, fontWeight: '700' },
  chart: { alignItems: 'flex-end', borderBottomColor: '#344039', borderBottomWidth: 1, flexDirection: 'row', height: 80, justifyContent: 'space-between', marginTop: 18, paddingHorizontal: 2 },
  chartBarTrack: { height: '100%', justifyContent: 'flex-end', width: 12 },
  chartBar: { backgroundColor: colors.lime, borderTopLeftRadius: 3, borderTopRightRadius: 3, minHeight: 8, width: 12 },
  pulseFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  pulseFooterText: { color: colors.muted, fontSize: 11 },
  pulseFooterValue: { color: colors.lime, fontSize: 11, fontWeight: '700' },
  pulseFooterMuted: { color: colors.muted, fontWeight: '400' },
  orderCard: { alignItems: 'center', backgroundColor: colors.panel, borderColor: colors.border, borderRadius: 11, borderWidth: 1, flexDirection: 'row', marginBottom: 9, padding: 13 },
  orderIcon: { alignItems: 'center', borderRadius: 9, height: 42, justifyContent: 'center', marginRight: 12, width: 42 },
  orderInfo: { flex: 1 },
  orderTitleRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  orderId: { color: colors.text, fontSize: 13, fontWeight: '700' },
  orderStatus: { fontSize: 10, fontWeight: '700' },
  orderAddress: { color: colors.muted, fontSize: 12, marginBottom: 7 },
  orderMeta: { alignItems: 'center', flexDirection: 'row' },
  metaText: { color: '#68756e', fontSize: 10 },
  metaDot: { backgroundColor: '#68756e', borderRadius: 2, height: 3, marginHorizontal: 6, width: 3 },
  bottomSpace: { height: 16 },
  tabBar: { backgroundColor: '#151a19', borderTopColor: colors.border, borderTopWidth: 1, bottom: 0, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10, paddingTop: 11 },
  tab: { alignItems: 'center', gap: 4, minWidth: 58 },
  tabLabel: { color: colors.muted, fontSize: 10, fontWeight: '600' },
  tabLabelActive: { color: colors.lime },
});