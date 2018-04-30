import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Users from "components/pages/Users/Connected"
import User from "components/pages/User/Connected"
import SignIn from "components/pages/SignIn/Connected"
import SignOut from "components/pages/SignOut/Connected"
import Auth from "./Auth"
import App from "./App"
import Provider from "./Provider"
import Header from "components/molecules/Header/Bar"

const auth = new Auth()

export default () => (
  <div>
    <BrowserRouter>
      <Provider auth={auth}>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <App auth={auth}>
            <div>
              <Header />
              <Switch>
                <Route path="/user/:key" component={User} />
                <Route path="/signout" component={SignOut} />
                <Route component={Users} />
              </Switch>
            </div>
          </App>
        </Switch>
      </Provider>
    </BrowserRouter>
  </div>
)
