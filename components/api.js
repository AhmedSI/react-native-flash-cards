import { AsyncStorage } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
const NOTIFICATION_KEY = 'UdaciCards:notifications'
const DECKS_STORAGE_KEY = 'CardsStorage:decks'

export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function fetchDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    
}

export function submitDeck ({ deck, id }) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [id]: deck
  }))
}

export async function submitQuestion ({ question, deckId }) {
  let results = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
  const data = await JSON.parse(results)

  let newData = {
    ...data,
    [deckId]:{
      ...data[deckId],
      questions:data[deckId].questions.concat(question)
    }
  }
  console.log(newData[deckId].questions)
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newData))
}

const createNotification = () => {
  return{
    title:"UdaciDards quizes notifier",
    body:'😀😀 Don\'t forget taking quizes today see you!',
    andriod:{
      sound:true,
      sticky:false,
      vibrate:true,
      priority:'high'
    },
    ios:{
      sound:true
    }
  }
}

export const setNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then((data)=>{
    //console.log('granted '+data)
    if(data === null){
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status})=>{
        if(status==='granted'){
          Notifications.cancelAllScheduledNotificationsAsync()
          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate()+1)
          tomorrow.setHours(15)
          tomorrow.setMinutes(40)
          //console.log('granted '+tomorrow)
          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time:tomorrow,
              repeat:"day",
            }
          )
          //console.log('the notifications are'+JSON.stringify(AsyncStorage.getAllKeys()))
          AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
        }
      })
    }
  })
}