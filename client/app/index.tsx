
import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {router } from 'expo-router';
import { View } from 'react-native';



const Home = () => (

  <View>
  <Card onPress={() => router.push('/contractBottom')} style={{margin: 10}}>
    <Card.Content>
      <Text variant="titleLarge">Contractor</Text>
      <Text variant="bodyMedium">Contractor login</Text>
    </Card.Content>
  </Card>
  <Card onPress={()=> router.push('/peopleBottom')} style={{margin:10}}>
    <Card.Content>
      <Text variant="titleLarge">People</Text>
      <Text variant="bodyMedium">People Login</Text>
    </Card.Content>
  </Card>
  <Card onPress={()=> router.push('/gov')} style={{margin :10}}>
    <Card.Content>
      <Text variant="titleLarge">Government </Text>
      <Text variant="bodyMedium">Governmenent login</Text>
    </Card.Content>
  </Card>
  </View>
  
);

export default Home;