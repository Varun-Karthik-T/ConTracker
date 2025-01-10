
import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {router } from 'expo-router';
import { View } from 'react-native';



const Home = () => (

  <View>
  <Card onPress={() => router.push('/contractBottom')} style={{margin: 10}}>
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
  </Card>
  <Card onPress={()=> router.push('/peopleBottom')}>
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
  </Card></View>
  
);

export default Home;