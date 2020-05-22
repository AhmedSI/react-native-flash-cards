import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
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

class Score extends Component{
    render(){
        const {deck, score, navigation} = this.props
        return(
            <View style={styles.container}>
                <Text style={[styles.centerText,styles.mainHeader]}>You got {score}/{deck.questions.length} in {deck.title} deck quiz!</Text>
                <TouchableOpacity style={styles.buttonDefault} onPress={()=>navigation.navigate('Quiz',{deckId:deck.id,counter:0,score:0})}>
                    <Text style={[{color:'white'},styles.centerText]}> Retake this quiz! </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDefault} onPress={()=>navigation.navigate('Home')}>
                    <Text style={[{color:'white'},styles.centerText]}> Go back to home! </Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const mapStateToProps = (decks,{route})=>{
    const deckId=route.params.deckId
    const deck = decks[deckId]
    const score = route.params.score
    return{
        deck,
        score
    }
}

const ConnectedScore = connect(mapStateToProps)(Score)

export default ConnectedScore