import { Dimensions } from 'react-native'

const Params = {
    blockSize: 30,
    borderSize: 5,
    headerRatio: 0.15,
    difficultLevel: 0.1,
    getColumnAmount() {
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    }
}

export default Params