import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Platform } from 'react-native';

// ---------------------- AUTH SCREEN -----------------------

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.bg,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },

  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollview_style: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 0,
  },

  scrollview_content_container: {
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1, // all the available vertical space will be occupied by it
    justifyContent: 'space-between', // will create the gutter between body and footer
  },

  auth_text_view: {
    marginTop: Platform.OS === 'ios' ? 80 : 40,
    padding: 15,
    minHeight: '30%',
  },

  auth_text_container: {
    width: '100%',
  },

  auth_text_big: {
    color: Colors.white,
    fontSize: 40,
    fontWeight: 'bold',
  },

  auth_text_small: {
    color: Colors.white,
    fontSize: 28,
  },

  auth_input_container: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    width: '100%',
    padding: 20,
    paddingVertical: '7%',
  },

  auth_loader_container: {
    marginVertical: 30,
    padding: 3,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },

  auth_button_container: {
    marginVertical: 30,
    padding: 3,
    flexDirection: 'row',
    width: '100%',
    height: 44,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  auth_text_button: {
    color: '#4A4A4A',
    fontSize: Platform.OS === 'ios' ? 15 : 10,
  },
});