// app/screens/forum.tsx

import { Ionicons } from '@expo/vector-icons'
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants'
import { forumData, ForumPost } from '../../script/forumData'
import AddPostModal from './AddPostModal'

const C = Colors.light

export default function Forum(props: any) {
  const navigation = useNavigation()
  const route = props.route
  const router = useRouter()
  const [input, setInput] = useState('')
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [filters, setFilters] = useState<any>(null)

  useEffect(() => {
    setPosts([...forumData])
  }, [forumData])

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.filters) {
        setFilters(route.params.filters)
      }
    }, [route?.params?.filters])
  )

  const closeModal = () => {
    setIsModalVisible(false)
    setPosts([...forumData])
  }

  const clearFilters = () => setFilters(null)

  const filteredPosts = posts.filter((post) => {
    const query = input.trim().toLowerCase()
    if (query && !(
      post.message.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query) ||
      post.sport.toLowerCase().includes(query) ||
      post.location.toLowerCase().includes(query) ||
      post.needed.toLowerCase().includes(query)
    )) return false
    if (filters) {
      if (filters.sport !== 'All' && post.sport !== filters.sport) return false
      if (filters.location && post.location !== filters.location) return false
      if (filters.skill && post.needed !== filters.skill) return false
    }
    return true
  })

  const sportColor = (sport: string) => {
    const map: Record<string, string> = {
      Basketball: C.accent,
      Tennis: C.success,
      Pickleball: C.warning,
    }
    return map[sport] ?? C.primary
  }

  const renderPost = ({ item: post }: { item: ForumPost }) => (
    <TouchableOpacity
      style={styles.postCard}
      activeOpacity={0.7}
      onPress={() => router.push('/screens/otherProfile')}
    >
      <Image
        source={require('../../assets/images/profile.png')}
        style={styles.avatar}
      />
      <View style={styles.postBody}>
        <Text style={styles.postTitle} numberOfLines={2}>{post.message}</Text>
        <Text style={styles.postMeta}>
          {post.author}  ·  {post.time}  ·  {post.needed}
        </Text>
        <View style={styles.tagRow}>
          <View style={[styles.sportBadge, { backgroundColor: sportColor(post.sport) + '20' }]}>
            <Text style={[styles.sportBadgeText, { color: sportColor(post.sport) }]}>{post.sport}</Text>
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={13} color={C.textSecondary} />
            <Text style={styles.locationText}>{post.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Ionicons name="menu" size={26} color={C.headerText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forum</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={26} color={C.headerText} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchArea}>
        {filters && (
          <View style={styles.filterChips}>
            {filters.sport !== 'All' && (
              <View style={styles.chip}>
                <Text style={styles.chipText}>{filters.sport}</Text>
              </View>
            )}
            {!!filters.location && (
              <View style={styles.chip}>
                <Text style={styles.chipText}>{filters.location}</Text>
              </View>
            )}
            {!!filters.skill && (
              <View style={styles.chip}>
                <Text style={styles.chipText}>{filters.skill}</Text>
              </View>
            )}
            <TouchableOpacity onPress={clearFilters} style={styles.clearChip}>
              <Ionicons name="close-circle" size={18} color={C.accent} />
              <Text style={styles.clearChipText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <Ionicons name="search" size={18} color={C.placeholder} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              onChangeText={setInput}
              value={input}
              placeholder="Search posts..."
              placeholderTextColor={C.placeholder}
            />
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => navigation.navigate('FilterScreen' as never)}
            activeOpacity={0.7}
          >
            <Ionicons name="options-outline" size={20} color={C.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="chatbubble-ellipses-outline" size={48} color={C.border} />
            <Text style={styles.emptyText}>No posts found</Text>
          </View>
        }
      />

      <AddPostModal visible={isModalVisible} onClose={closeModal} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.headerBg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerTitle: {
    color: C.headerText,
    fontSize: FontSize.xl,
    fontWeight: '700',
  },
  searchArea: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  chip: {
    backgroundColor: C.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  chipText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: C.primary,
  },
  clearChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  clearChipText: {
    fontSize: FontSize.xs,
    color: C.accent,
    fontWeight: '600',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  searchInputWrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: Spacing.md,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: C.inputBg,
    height: 42,
    borderRadius: BorderRadius.xl,
    paddingLeft: 40,
    paddingRight: Spacing.lg,
    fontSize: FontSize.md,
    color: C.text,
    borderWidth: 1,
    borderColor: C.border,
  },
  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: BorderRadius.xl,
    backgroundColor: C.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  postCard: {
    flexDirection: 'row',
    backgroundColor: C.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: C.border,
    gap: Spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
  },
  postBody: {
    flex: 1,
  },
  postTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: C.text,
    marginBottom: Spacing.xs,
  },
  postMeta: {
    fontSize: FontSize.xs,
    color: C.textSecondary,
    marginBottom: Spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sportBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  sportBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  locationText: {
    fontSize: FontSize.xs,
    color: C.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl * 2,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: C.textSecondary,
  },
})
