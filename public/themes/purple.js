import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

const purple = () => {
  let overwrites = {
    "palette": {
        "primary1Color": Colors.deepPurpleA100,
        "primary2Color": Colors.purple600,
        "accent1Color": Colors.deepOrangeA400,
        "pickerHeaderColor": Colors.purple700,
        "clockCircleColor": fade(Colors.black, 0.09),
        "shadowColor": Colors.purple900
    }
};
  return getMuiTheme(baseTheme, overwrites);
}

export default purple