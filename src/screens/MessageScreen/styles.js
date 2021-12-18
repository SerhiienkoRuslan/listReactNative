import { StyleSheet } from 'react-native'

export const PINK = '#ff5dc8'

export default StyleSheet.create({
  wrap: {
    flex: 1
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  header: {
    fontWeight: 'bold',
  },
  subheader: {
    paddingTop: 10,
  },
  sendWrap: {
    flexDirection: 'row'
  },
  sendBtn: {
    width:"20%",
    backgroundColor:"#fb5b5a",
    height:50,
    alignItems:"center",
    justifyContent:"center"
  },
  sendText: {
    color:"white"
  }
})
