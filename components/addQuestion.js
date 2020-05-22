import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import {createAddQuestionAction} from '../actions'
import {submitQuestion} from './api'

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

class AddQuestion extends Component{

    state = {
        title:'',
        answer:''
    }

    render(){

        const {dispatch, navigation, deckId} = this.props
        const addQustion =()=>{
            const title = this.state.title
            const answer = this.state.answer
            // Todo: better to make this redirect to the deck itself
            dispatch(createAddQuestionAction({title,answer},deckId))
            navigation.navigate('Deck',{deckId:deckId})
            submitQuestion({question:{title,answer},deckId})
        }

        return(
            <View style={styles.container}>
                <Text style={[styles.centerText,styles.mainHeader]}>Here you can more questions as much as you want</Text>
                <View style={styles.row}>
                    <Text>Question Title: </Text>
                    <TextInput style={styles.inputText} value={this.state.title} onChangeText={title => this.setState({title})} />
                </View>
                <View style={styles.row}>
                    <Text>Question Answer: </Text>
                    <TextInput style={styles.inputText} value={this.state.answer} onChangeText={answer => this.setState({answer})} />
                </View>
                <TouchableOpacity onPress={addQustion} style={styles.buttonDefault}>
                    <Text style={[{color:'white'},styles.centerText]}> Add this questoin now!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (decks,{route})=>{
    const deckId=route.params.deckId
    return{
        decks,
        deckId
    }
}

const ConnectedAddQuestion = connect(mapStateToProps)(AddQuestion)

export default ConnectedAddQuestion