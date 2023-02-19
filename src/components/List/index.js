import React from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { users } from './ListUsers.js';


const { width, height } = Dimensions.get('window');

export function List() {
  const navigation = useNavigation();

  const UserComponent = ({ user }) => {
    return (
      <View style={styles.userContainer}>
        <Image source={{ uri: `https://i.pravatar.cc/150?img=${user.id}` }} style={styles.avatar} />
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.userScore}>{0}</Text>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" delay={700} style={styles.containerForm}>
        <SafeAreaView>
          <FlatList
            numColumns={3}
            data={users}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <UserComponent user={item} />}
          />
        </SafeAreaView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#014987',
  },
  userContainer: {
    backgroundColor: '#014987',
    width: (width * 0.9 - 12) / 3,
    height: (width * 0.9 - 12) / 3 + 40,
    margin: 2,
  },
  avatar: {
    width: (width * 0.9 - 12) / 3,
    height: (width * 0.9 - 12) / 3,
  },
  username: {
    color: '#fff',
    fontSize: 12,
    marginHorizontal: 5,
  },
  userScore: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 5,
    fontWeight: 'bold',
  },

  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingStart: '2%',
    paddingEnd: '2%',
  },

});
