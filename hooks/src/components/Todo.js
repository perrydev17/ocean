import React, { useState, useEffect , useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import List from './Todo';
import { useFormInput }  from '../hooks/forms';

const todo = props => {
    const [ inputIsValid, setInputIsValid ] = useState(false);
    const [ todoName, setTodoName ] = useState('');  //is an array , first element is currentState, second element is a function
    const [ submittedTodo, setSubmittedTodo ] = useState(null);
    const [ todoList, setTodoList ] = useState([]);
    const todoInputRef = useRef();
    const todoInput = useFormInput();

    //const [todoState, setTodoState] = useState({ userInput: '', todoList:[]});
    
    //need to put in useEffect because it will call after rendering is done
    useEffect(() => {
        axios.get('').then(result =>{
            const todoData = result.data;
            const todos = [];
            for(const key in todoData) {
                todos.push({id: key, name:todoData[key].name})
            }
            setTodoList(todos);
            dispatch({type: 'SET', payload: todos});
        });

        //if want to unmount like componentUnmount, add below return, react will run it like clean up
        // return () => {

        // }
    }, [todoName]);  //only when todoName change here will run again (like componentDidMount and componentDidUpdate)
    //if want to do something like componentDidMount, put [] instead

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY)
    };

    //will always receive the latest state which handle by React
    const todoListReducer = (state, action) => {
        switch(action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter((todo) => todo.id !== action.payload);
            default:
                return state;
        }
    }

    //3rd argument could be the initial function that want to be executed.
    const [todoList, dispatch] = useReducer(todoListReducer, []);

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, []);

    // useEffect(() => {
    //     if(submittedTodo){
    //         dispatch({type: 'ADD', payload:submittedTodo});
    //         //setTodoList(todoList.concat(submittedTodo));  
    //     }
    // }, [submittedTodo]);

    //if using ref with useRef, then don't neeed line 69 setstate with value
    const todoName = todoInputRef.current.value;

    const inputChangeHandler = (event) => {
        //setTodoState({userInput: event.target.value, todoList: todoState.todoList});

        setTodoName(event.target.value);
    };

    const todoAddHandler = () => {
        //setTodoState({userInput: todoState.userInput, todoList: todoState.todoList.concat(todoName));
        setTodoList(todoList.concat(todoName));
        axios.post('', {name: todoName})
            .then(res => {
                setTimeout(() => {
                    const todoItem = {id: res.data.name, name: todoName};
                    dispatch({type: "ADD", payload: todoItem});
                    //setSubmittedTodo(todoItem);
                    //setTodoList(todoList.concat(todoItem));
                }, 3000);
            })
            .catch(err => {

            })
    }

    const todoRemoveHandler = todoId => {
        axios.delete('').then(res => {
            dispatch({type: 'REMOVE', payload: todoId});
        }).catch(err => console.log(err));
       
    }

    const inputValidationHandler = event => {
        if(event.target.value.trim() === '') {
            setInputIsValid(false);
        } else {
            setInputIsValid(true);
        }
    }

    return  <React.Fragment>
        <input  type="text" 
                placeholder=""
                ref={todoInputRef} 
                onChange={inputChangeHandler}
                value={todoName}
            
        />
        /* If use customize hooks */
        <input onChange={todoInput.onChange}
                value = {todoInput.value}
        />
        <button type="button" onClick={todoAddHandler}>Add</button>
        /* Memorize if todoList doesn't change, don't rendering, pass it inside the [] in second argument
        whichever you want to keep or change */
        {userMemo(() => (<List items={todoList} onClick={todoRemoveHandler}/>, [todoList]))}
    </React.Fragment>
};

export default todo;