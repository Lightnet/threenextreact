/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://flexiple.com/react/provider-pattern-with-react-context-api/
// https://kentcdodds.com/blog/how-to-use-react-context-effectively
// https://www.telerik.com/blogs/understand-react-context-api
// https://javascript.plainenglish.io/a-guide-to-react-context-api-with-an-example-b6e7f494f05e
// https://javascript.works-hub.com/learn/building-with-react-context-provider-pattern-1af4b

import React,{ useContext, Component, createContext } from "react";

export const RandomContext = createContext({ user: null });

class RandomProvider extends Component {
  state = {
    user: "Somto"
  };
  
  render() {
    return (
      <RandomContext.Provider value={this.state}>
        {this.props.children}
      </RandomContext.Provider>
    );
  }
 }

 const ComponentTest = () => {
  const { user } = useContext(RandomContext);
  return (
    <div>
      <p>{user}</p>
    </div>
  );
 };

export default function Page() {


  return (<>
    <RandomProvider>
       <ComponentTest />
     </RandomProvider>
    </>);
}