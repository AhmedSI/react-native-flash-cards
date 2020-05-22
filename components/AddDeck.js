import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import {createAddDeckAction} from '../actions'
import { generateUID, submitDeck } from './api'

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
        alignSelf:'center',
        marginTop:10
    }
})

class AddDeck extends Component {
    state = {
        title:''
    }

    render(){
        
        const {dispatch, navigation} = this.props
        const addDeck =()=>{
            const title = this.state.title
            const id = generateUID()
            dispatch(createAddDeckAction({id,title,questions:[]},id))
            submitDeck({deck:{id,title,questions:[]},id})
            navigation.navigate('Deck',{deckId:id})
        }

        const goHome=()=>{
            navigation.navigate('Home')
        }


        return(
            <View style={styles.container}>
                <Text style={[styles.centerText,styles.mainHeader]}>Here you can more decks as much as you want</Text>
                <View style={styles.row}>
                    <Text>Deck Title: </Text>
                    <TextInput style={styles.inputText} value={this.state.title} onChangeText={title => this.setState({title})} />
                    </View>
                <TouchableOpacity onPress={addDeck} style={styles.buttonDefault}>
                    <Text style={[styles.centerText,{color:'white'}]}> Add this deck now!</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goHome} style={styles.buttonDefault}>
                    <Text style={[styles.centerText,{color:'white'}]}> Back To Home!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const ConnectedAddDeck = connect()(AddDeck)

export default ConnectedAddDeck

