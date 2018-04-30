import React, { createContext, Component } from "react"
import firebase from "firebase"

const Context = createContext()
const { Provider } = Context

export default class Connected extends Component {
  state = { load: false }

  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(() => {
        this.setState({
          load: true,
        })
      })
      .bind(this)
  }

  render() {
    if (!this.state.load) {
      return null
    }

    return (
      <Provider
        value={{
          auth: this.props.auth,
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export const Consumer = Context.Consumer
