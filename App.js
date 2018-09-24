import React from 'react';
import {
  StatusBar,
  View
} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {Constants} from 'expo';
import DeckMain from './components/DeckMain';
import DeckDetail from './components/DeckDetail';
import AddDeck from './components/AddDeck';
import AddQuestion from './components/AddQuestion';
import QuizMain from './components/QuizMain';
import reducer from './reducers'
import {setLocalNotification} from './utils/helpers';

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar
            backgroundColor="green"
            barStyle="light-content"
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  );
}

const TabsNavigator = createBottomTabNavigator({
  Decks: {
    screen: DeckMain,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="home-circle" size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Feather name="plus-circle" size={30} color={tintColor} />
    }
  }
});

const MainNavigator =  createStackNavigator({
  Home: {
    screen: TabsNavigator,
    navigationOptions: {
      title: "Flashcards",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "green"
      }
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "green"
      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "green"
      }
    }
  },
  QuizMain: {
    screen: QuizMain,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "green"
      }
    }
  }
});