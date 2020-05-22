import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
    secondaryHeader:{
        fontSize:20
    },
    row:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"center"
    },
    buttonSuccess:{
        backgroundColor:'green',
        padding:5,
        width:200,
        alignSelf:'center',
        marginTop:10
    },
    btnDanger:{
        backgroundColor:'red',
        padding:5,
        width:200,
        alignSelf:'center',
        marginTop:10
    }

})

class Quiz extends Component{
    
    
    static navigationOptions = ({navigation})=>{
        // const {deckId}  = navigation.state.params
        return{
            title:2020
        }
    }

    state = {
        side:"front"
    }
    
    render(){
        const {navigation, deck, counter,score} = this.props
        const questions = deck.questions
        const {side} = this.state
        const handleAnswer=(answer)=>{
            let newScore = score
            if(answer==='correct'){
                newScore = newScore + 1
            }
            if(counter === questions.length-1){
                navigation.navigate('Score',{deckId:deck.id,score:newScore})
            }
            else
                navigation.navigate('Quiz',{deckId:deck.id,counter:counter+1,score:newScore})
        }

        if(deck.questions.length ===0)
            return(
                <View style={styles.container}>
                    <Text style={[styles.mainHeader,styles.centerText]}>no quetions yet in this deck</Text>
                </View>
            )
        if(side=='back')
            return(
                <View style={styles.container}>
                    <Text style={[styles.mainHeader,styles.centerText]}>Question: {counter+1} / {questions.length}</Text>
                    <Text style={[styles.secondaryHeader,styles.centerText]}> Answer: {questions[counter].answer}</Text>
                    <TouchableOpacity onPress={()=>this.setState({side:'front'})} style={styles.buttonDefault} >
                        <Text style={[{color:'white'},styles.centerText]}> show the card front </Text>
                    </TouchableOpacity>
                </View>
            )
        return(
            <View style={styles.container}>
                <Text style={[styles.centerText,styles.mainHeader]}>Welcome to the Quiz page of {deck.title} deck!😀😀😀</Text>
                <Text style={[styles.centerText,styles.mainHeader]}>Question: {counter+1} / {questions.length}</Text>
                <Text style={[styles.centerText,styles.secondaryHeader]}>{questions[counter].title}</Text>
                <TouchableOpacity onPress={()=>this.setState({side:'back'})} style={styles.buttonDefault}>
                    <Text style={[{color:'white'},styles.centerText]}> show the card back </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleAnswer('correct')} style={styles.buttonSuccess}>
                    <Text style={[{color:'white'},styles.centerText]}> Correct </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleAnswer('incorrect')} style={styles.btnDanger}>
                    <Text style={[{color:'white'},styles.centerText]}> Incorrect </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (decks,{route})=>{
    const deckId=route.params.deckId
    const deck = decks[deckId]
    const counter = route.params.counter
    const score = route.params.score
    return{
        deck,
        counter,
        score
    }
}

const ConnectedQuiz = connect(mapStateToProps)(Quiz)

export default ConnectedQuiz