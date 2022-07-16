import React, {Fragment} from 'react';

export  function TodoItem({todo,eliminarTareas}){
    const {id,task,desc} = todo;

    const fneliminarTareas = () => {
        eliminarTareas(id);
    }  

    return (
        <Fragment>
            <div className='row'>
                <div className='col'>
                    <ul>
                        <li>
                            <a href="#">
                                    <button className='botonX' onClick={fneliminarTareas}>x</button>
                                <h2>{task}</h2>
                                <p>{desc}</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}