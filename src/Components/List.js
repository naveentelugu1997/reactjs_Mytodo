import { Button,
         ListItem,
         ListItemText,
         Card}    from '@material-ui/core'
import { AccessAlarm, 
         ThreeDRotation } from '@material-ui/icons';
import   React            from 'react'
import                         './List.css';
import { db}              from './Firebase';
import   firebase         from 'firebase';
import { useState, 
         useEffect}       from 'react';
import DeleteIcon         from '@material-ui/icons/Delete';

function List() {

    const [todosList, setTodosList] = useState([]);
    useEffect(() => {
        getTodos();
    }, [])

    function getTodos() {
        if (firebase.auth().currentUser !== null){

            const userid = firebase.auth().currentUser.uid

            db.collection("users").doc(userid)
            .collection("todos").onSnapshot(function (querySnapshot){
                setTodosList(
                    querySnapshot.docs.map((doc) => ({
                        id:       doc.id,
                        todo:     doc.data().todo,
                        progress: doc.data().progress,
                        time:     doc.data().time,
                        date:     doc.data().date,
                    }))
                )
                
            })
        }
        
    }

    function upDatestatus(todo){
        if (firebase.auth().currentUser !== null){
            const userid = firebase.auth().currentUser.uid
            db.collection("users").doc(userid)
            .collection('todos').doc(todo.id).update({
                progress: !todo.progress,
            })
        }
    }

    function deleteTodo(todo) {
        if (firebase.auth().currentUser !== null){
            const userid = firebase.auth().currentUser.uid
            db.collection("users").doc(userid)
            .collection("todos").doc(todo.id).delete();
    }
    } 

    return (
        <div >
            <div className="todoList">
                <Card>
                    {
                        todosList.map((todo)=> (
                         <ListItem>
                            <ListItemText primary= {todo.todo} 
                            secondary={todo.progress? 'Inprogress':'Completed'}/>
                            <ListItemText primary= {todo.date} secondary={todo.time}/>
                            <Button onClick={() => upDatestatus(todo)}>{todo.progress? 'Done':  'Undone'}</Button>
                            <DeleteIcon onClick={()=> deleteTodo(todo)} />
                        </ListItem>
                        
                        ))
                    }
                </Card>
                    
            </div>
        </div>
    )
}

export default List
