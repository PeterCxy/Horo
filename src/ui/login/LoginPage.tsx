import { getString as lang } from "../../util/Lang"
import { ipcRenderer } from "electron"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { AppTheme } from "../AppTheme"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from "material-ui/TextField"
import Checkbox from "material-ui/Checkbox"
import RaisedButton from "material-ui/RaisedButton"
import LinearProgress from "material-ui/LinearProgress"
import { LoginDetails } from "../../util/DataTypes"

interface LoginState extends LoginDetails {
    loggingIn?: boolean
}

export class LoginPage extends React.Component<LoginDetails, LoginState> {
    constructor(props: LoginDetails) {
        super(props)
        this.state = JSON.parse(JSON.stringify(props))
        this.state.loggingIn = false
    }
    login() {
        this.setState((state, props) => {
            state.loggingIn = true
            return state // TODO: Do Login in the next callback
        })
    }
    secureChecked(checked: boolean) {
        this.setState((state, props) => {
            state.secure = checked
            return state
        })
    }
    render() {
        // TODO: Add format check to inputs
        return <div>
            <div id="progress-wrapper" style={{visibility: this.state.loggingIn ? "visible" : "hidden"}}>
                <LinearProgress
                    mode="indeterminate"/>
            </div>
            <div id="content">
                <TextField
                    floatingLabelText={lang("LOGIN_SERVER")}
                    defaultValue={this.state.server}/>
                <TextField
                    floatingLabelText={lang("LOGIN_PORT")}
                    defaultValue={this.state.port}/>
                <div id="checkbox-wrapper">
                    <Checkbox
                        onCheck={(ev, checked) => this.secureChecked(checked)}
                        label={lang("LOGIN_SECURE")}
                        defaultChecked={this.state.secure}/>
                </div>
                <TextField
                    floatingLabelText={lang("LOGIN_NICK")}
                    defaultValue={this.state.nick}/>
                <br/><br/>
                <RaisedButton
                    label={lang("LOGIN_LOGIN")}
                    disabled={this.state.loggingIn}
                    onClick={this.login.bind(this)}
                    primary={true}/>
            </div>
        </div>
    }
}


ipcRenderer.once("LOGIN_REQUEST_DETAILS", (event, details: string) => {
    let login = JSON.parse(details) as LoginDetails
    ReactDOM.render(<MuiThemeProvider muiTheme={AppTheme}>
        <LoginPage {...login} />
    </MuiThemeProvider>, document.getElementById("container"))
})
ipcRenderer.send("LOGIN_REQUEST_DETAILS")