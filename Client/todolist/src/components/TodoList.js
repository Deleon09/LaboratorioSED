import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/Todo.css';

const TodoList = () => {

    const [thing, setThing] = useState('');
    const [thingsList, setThingsList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:5013/things/all').then((response) => {
            setThingsList(response.data);
        })
    }, [])

    const addToList = () => {
        Axios.post("http://localhost:5013/things/create", {
            name: thing,
        })
    }

    return (
        <>
            <div className="wrapper">
                <div className="iBox">
                    <input 
                    type="text" 
                    placeholder="To do" 
                    onChange = {(event) => {
                        setThing(event.target.value);
                    }} />
                </div>
                <button onClick={addToList} className="ButtonBody" href="#">
                    <span className="ButtonContent">Agregar</span>
                </button>
            </div>

            <div className="serviceWrapper">
                <div className="Servicecontainer">
                    {thingsList.map((thing, index) => {
                        return (
                            <div className="serviceBox" key={index} >
                                <div className="serviceIcon" style={{'--i':'#4eb7ff'}}>
                                    <ion-icon name="folder-outline"></ion-icon>
                                </div>
                                <div className="serviceContent">
                                    <h2>{thing.name}</h2>
                                    <input type="text" placeholder="New Value" />
                                    <button className="btn-editar" >Editar</button>
                                    <br></br>
                                    <button className="btn-eliminar"><ion-icon name="trash-outline"></ion-icon></button>
                                </div>
                            </div>
                        ); 
                    })} 
                </div>
            </div>
        </>
    )
}

export default TodoList
