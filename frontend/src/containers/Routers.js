import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Users from "components/pages/Users/Connected"
import User from "components/pages/User/Connected"

export default () => (
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/user/:key" component={User} />
        <Route component={Users} />
      </Switch>
    </BrowserRouter>
  </div>
)
