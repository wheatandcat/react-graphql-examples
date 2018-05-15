import React, { createContext, Component } from "react"

const Context = createContext()
const { Provider } = Context

export default class Connected extends Component {
  render() {
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
