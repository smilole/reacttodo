import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { legacy_createStore} from "redux";
import {Provider} from "react-redux";

const defaultState = []


const reducer = (state=defaultState, action) => {
    switch(action.type){

        case "CREATE_TASK":
            let newID = state.length
            return [...state, {ID:newID, description:action.taskInfo, isDone: false}]
        case "DELETE_TASK":
            const newState = state.filter(obj => obj.ID != action.ID)
            return [...newState]
        case "UPDATE_TASK":
            state.forEach(el => {
                if(el.ID==action.ID){
                    el.description = action.description
                }
            })
            return [...state]
        case "UPDATE_STATUS":
            state.forEach(el => {
                if(el.ID==action.ID){
                    el.isDone = !el.isDone
                }
            })
            return [...state]
        case "FILE_UPLOAD":
            return [...action.payload]


        default:
            return [...state]
    }
}

const store = legacy_createStore(reducer)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>,
)
