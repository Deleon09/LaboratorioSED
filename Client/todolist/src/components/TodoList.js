import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/Todo.css';

const TodoList = () => {

    const [thing, setThing] = useState('');
    const [thingsList, setThingsList] = useState([]);

    const [newThing, setNewThing] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:5015/things/all').then((response) => {
            setThingsList(response.data);
        })
    }, [])

    const addToList = () => {
        Axios.post("http://localhost:5015/things/create", {
            name: thing,
        })
    }

    const updateThing = (id) => {
        Axios.post("http://localhost:5015/things/update", {
            idN: id,
            newName: newThing,
        })
    }

    const deleteThing = (id) => {
        Axios.delete("http://localhost:5015/things/delete", {
            idE: id,
        })
    };

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
                                    <input 
                                        onChange = {(event) => {
                                            setNewThing(event.target.value);
                                        }} 
                                        type="text" 
                                        placeholder="New Value" />
                                    <button className="btn-editar" onClick={() => updateThing(thing._id)} >Editar</button>
                                    <br></br>
                                    <button className="btn-eliminar" onClick={() => deleteThing(thing._id)} ><ion-icon name="trash-outline"></ion-icon></button>
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
