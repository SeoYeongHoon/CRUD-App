import React, { useState, useEffect } from 'react';
import MyForm from './MyForm';
import firebaseDb from "../firebase";

const Home = () => {

    var [homeObjects, setHomeObjects] = useState({})
    var [currentId, setCurrentId] = useState('')

    useEffect(() => {
        firebaseDb.child('home').on('value', snapshot => {
            if (snapshot.val() != null)
            setHomeObjects({
                ...snapshot.val()
            })
            else
                setHomeObjects({})
        })
    }, []) // componentDidMount랑 비슷

    const addOrEdit = obj => {
        if (currentId === '')
            firebaseDb.child('home').push(
                obj,
                err => {
                    if(err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        else
            firebaseDb.child(`home/${currentId}`).set(
                obj,
                err => {
                    if(err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
    }

    const onDelete = key => {
        if(window.confirm('Are you sure?')) {
            firebaseDb.child(`home/${key}`).remove(
                err => {
                    if(err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
        <>
            <div className="jumbotron jubotron-fluid">
            <div className="container">
                <h1 className="display-4 text-center">Home</h1>
            </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <MyForm {...({addOrEdit, currentId, homeObjects})} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Context</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(homeObjects).map(id => {
                                    return <tr key={id}>
                                        <td>{homeObjects[id].fullName}</td>
                                        <td>{homeObjects[id].phone}</td>
                                        <td>{homeObjects[id].email}</td>
                                        <td>
                                            <a className="btn text-primary" onClick={ () => {setCurrentId(id)} }>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={ () => {onDelete(id)} }>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
        
    );
}

export default Home;