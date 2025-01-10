import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import  Page2  from '../components/gov/page2';


const IssueRoute = () => <Text>hi</Text>;

const ContractRoute = () => <Page2></Page2>;

const ContractBottom = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Issue', title: 'Issues', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'Contract', title: 'Contract', focusedIcon: 'album' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Issue: IssueRoute,
    Contract: ContractRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default ContractBottom;