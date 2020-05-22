import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:"center"
    },
    inputText:{
        borderWidth:1,
        borderColor:'crimson',
        borderRadius:2,
        width:240,
        height:50,
        alignSelf:'center',
        marginVertical:5,
        marginLeft:5,
        paddingHorizontal:10,
        marginLeft:5,
        fontSize:20
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
    },
    row:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"center"
    },
    buttonSuccess:{
        backgroundColor:'green',
        padding:5,
        width:300,
        alignSelf:'center'
    }
})

class Deck extends Component{

    static navigationOptions = ({navigation})=>{
        // const {deckId}  = navigation.state.params
        return{
            title:2020
        }
    }
    
    render(){
        const {deck, navigation} = this.props
        
        return(
            <View style={styles.container}>
                <Text style={[styles.centerText,styles.mainHeader]}> Welcome to the {deck.title} Deck page!😀😀😀 </Text>
                <Text style={[styles.centerText,styles.mainHeader]}> Questions Number : {deck && deck.questions.length} </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Add Question',{deckId:deck.id})} style={styles.buttonDefault}>
                    <Text style={[{color:'white'},styles.centerText]}> Add Question! </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Quiz',{deckId:deck.id,counter:0,score:0})} style={styles.buttonDefault}>
                    <Text style={[{color:'white'},styles.centerText]}> Take Quiz! </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.buttonDefault}>
                    <Text style={[{color:'white'},styles.centerText]}> Go Home </Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const mapStateToProps = (decks,{route})=>{
    const deckId=route.params.deckId
    const deck = decks[deckId]
    return{
        deck
    }
}

const ConnetedDeck = connect(mapStateToProps)(Deck)

ConnetedDeck.navigationOptions = () => ({headerTitle: 'whatever', })

export default ConnetedDeck

