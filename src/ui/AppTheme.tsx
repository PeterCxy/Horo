import {pink500, pink700, amber500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin()

export const AppTheme = getMuiTheme({
    palette: {
        primary1Color: pink500,
        accent1Color: amber500
    }
})