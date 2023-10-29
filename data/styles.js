import {Appearance, Dimensions, StyleSheet} from 'react-native';
const mode = Appearance.getColorScheme();
import colors from './theme';

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
});
