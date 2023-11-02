import {Dimensions, StyleSheet} from 'react-native';
import {mode} from '../utils';
import colors from './colors';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  nearbyAndPlayContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors[mode].bgColor,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors[mode].fgColor,
    paddingBottom: 0,
  },
  subHeading: {
    fontSize: 14,
    color: colors[mode].fgColor,
    paddingBottom: 25,
    fontWeight: 'bold'
  },
  songName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors[mode].fgColor,
    paddingBottom: 0,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  locationHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors[mode].fgColor,
    paddingBottom: 6,
  },
  playButton: {
    backgroundColor: colors[mode].fgColor,
    color: colors[mode].bgColor,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  locationIcon: {
    width: 35,
    height: 105,
  },
  currentLocation: {
    marginBottom: 10,
  },
  ratingComponent: {
    paddingTop: 15,
  },
  profileContainer: {
    padding: 20,
    backgroundColor: colors[mode].bgColor,
    flex: 1,
    paddingBottom: 50,
  },
  inputEmpty: {
    marginTop: height / 4.0,
    backgroundColor: colors[mode].fgColorLighter,
    color: colors[mode].fgColor,
    borderRadius: 5,
    textAlign: 'center',
    height: 40,
  },
  input: {
    marginTop: 50,
    backgroundColor: colors[mode].fgColorLighter,
    color: colors[mode].fgColor,
    borderRadius: 5,
    textAlign: 'center',
    height: 40,
  },
  photoEmptyView: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors[mode].fgColorLighter,
    borderStyle: 'dashed',
    height: height / 1.625,
  },
  photoFullImage: {
    width: '100%',
    borderRadius: 10,
    height: height / 1.625,
  },
  addPhoto: {
    backgroundColor: colors[mode].fgColor,
    color: colors[mode].bgColor,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    width: '50%',
    marginLeft: '25%',
    marginTop: -(height / 3.25),
  },
  changePhoto: {
    backgroundColor: colors[mode].fgColor,
    color: colors[mode].bgColor,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    width: '50%',
    marginLeft: '25%',
    marginTop: -(height / 9),
  },
  userRow: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'left',
    gap: 10,
    alignItems: 'center',
  },
  profileImage: {
    borderRadius: 100, // A large value to create a circle
    borderColor: colors[mode].fgColor,
    borderWidth: 3, // You can adjust the border width as needed
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  tabIconView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 50,
  },
  currentUserContainer: {
    marginHorizontal: 10,
  },
  userProfile: {
    borderRadius: 100, // A large value to create a circle
    borderColor: colors[mode].fgColor,
    borderWidth: 3, // You can adjust the border width as needed
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: 10,
    width: 70,
    height: 70,
  },
  usersText: {
    color: colors[mode].fgColor,
  },
  headerImage: {
    width: 70,
    height: 70,
    marginVertical: 20,
  },
  noSampleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sampleCardDatetime: {
    color: colors[mode].fontColor,
  },
  sampleCardContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    marginVertical: 5,
  },
  sampleCardText: {
    marginBottom: 5,
    color: colors[mode].fontColor,
  },
  container: {
    flex: 1,
  },
  nearbyLocationSafeAreaView: {
    backgroundColor: 'black',
  },
  nearbyLocationView: {
    padding: 20,
  },
  nearbyLocationText: {
    color: 'white',
    lineHeight: 25,
  },
  screenPadding: {
    padding: 10,
  },
  playMusicSongName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors[mode].fgColor,
    paddingBottom: 20,
  },
  sampleCardRating: {
    paddingVertical: 10,
  },
});
