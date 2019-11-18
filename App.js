import React, {Component} from 'react'
import {StyleSheet, Text, View, Alert} from 'react-native'
import Params from './src/Params'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import LevelSelection from './src/screens/LevelSelection'
import { createMinedBoard,
         cloneBoard,
         openField,
         hadExplosion,
         wonGame,
         showMines,
         invertFlag,
         flagsUsed } from './src/Functions'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
    this.onSelectField = this.onSelectField.bind(this)
  }

  minesAmount = () => {
    const cols = Params.getColumnsAmount()
    const rows = Params.getRowsAmount()
    return Math.ceil(cols * rows * Params.difficultLevel)
  }

  createState = () => {
    const cols = Params.getColumnsAmount()
    const rows = Params.getRowsAmount()
    return { 
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lose: false,
      showLevelSelection: false
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Você perdeu o jogo!', 'HaHaHa')
    }

    if (won) {
      Alert.alert('Você venceu!','Parabéns!')
    }

    this.setState({ board, lost, won })
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Você venceu!','Parabéns!')
    }

    this.setState({ board, won })
  }

  onLevelSelected = level => {
    Params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
      <View style={styles.container}>
        <LevelSelection isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({ showLevelSelection: false })} />
        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} 
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({ showLevelSelection: true })}/>
        <View style={styles.board}>
          <MineField board={this.state.board}
          onOpenField={this.onOpenField}
          onSelectField={this.onSelectField}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
})
