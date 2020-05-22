import React , { Component }  from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import {createReceiveDecksAction} from '../actions'
import { fetchDecks, setNotification } from './api'
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:"center"
    },
    inputText:{
        borderWidth:1,
        borderColor:'crimson',
        borderRadius:5,
        width:240,
        marginVertical:5,
        marginLeft:5
    },
    deckItem:{
        borderWidth:2,
        borderColor:'crimson',
        marginVertical:10,
        width:500,
        flexDirection:'column',
        justifyContent:"center",
        alignSelf:'center',
        borderRadius:10,
        paddingVertical:10
    },
    centerText:{
        textAlign:'center'
    },
    buttonDefault:{
        backgroundColor:'navy',
        padding:5,
        width:200,
        alignSelf:'center',
        marginTop:10
    },
    mainHeader:{
        fontSize:25,
        fontWeight:'bold'
    }
})

class Home extends Component {
    
    state = {
        cardText:''
    }

    componentDidMount (){
        const {dispatch} = this.props
        fetchDecks().then((results)=> {
            dispatch(createReceiveDecksAction(JSON.parse(results)))
        })
        setNotification()
    }

    onTextChange = (text)=>{
        console.log(text)

    }

    render(){ 
        const {navigation, decks} = this.props
        const renderDeck = ({item})=>{
            return(
                <View key={item.id} style={styles.deckItem}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Deck',{deckId:item.id})}>
                        <View>
                            <Text style={styles.centerText}>Deck title: {item.title}</Text>
                            <Text style={styles.centerText}>Number of questions: {item.questions.length}</Text>
                        </View>
                    </TouchableOpacity>
                </View> 
            )
        }

        return(
            <View>
                <Text style={[styles.centerText,styles.mainHeader]}>Welcome to UdaciCards</Text>
                <Text style={[styles.centerText,styles.mainHeader]}>Total number of decks: {decks.length}</Text>
               <FlatList data={decks} renderItem={renderDeck} />
               
               <TouchableOpacity style={styles.buttonDefault} onPress={()=>navigation.navigate('Add Deck')}>
                   <Text style={[styles.centerText,{color:'white'}]}>
                       Add New Deck!
                   </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (decks)=>{
    const decksArray = Object.keys(decks).map(deck=>decks[deck])
    return{
        decks:decksArray
    }
}

const ConnectedHome = connect(mapStateToProps)(Home)

export default withNavigation(ConnectedHome)