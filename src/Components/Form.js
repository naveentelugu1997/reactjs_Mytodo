import React, {Component}  from 'react'
import 'date-fns';
import { makeStyles }        from '@material-ui/core/styles';
import TextField             from '@material-ui/core/TextField';
import DateFnsUtils          from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,}     from '@material-ui/pickers';
import { Button }            from '@material-ui/core';
import './Form.css';
import List                  from './List';
import {db}                  from './Firebase';
import firebase              from 'firebase';


class Form extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             selectedDate: new Date(),
             whatToDo: '',
             rows: []
        }
        this.HandleDateChange = this.HandleDateChange.bind(this)
        this.HandlewhatToDoChange = this.HandlewhatToDoChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    HandleDateChange(event){
        this.setState ({
            selectedDate: event,
        })
    }

    
    HandlewhatToDoChange(e) {
        this.setState({
            whatToDo: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (firebase.auth().currentUser !== null){
                const userid = firebase.auth().currentUser.uid;

                const userRef = db.collection('users').doc(userid)
                userRef.collection('todos').add({
                    progress: true,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    todo: this.state.whatToDo,
                    date: this.state.selectedDate.toLocaleDateString(),
                    time: this.state.selectedDate.toLocaleTimeString(),
                }).catch((err) =>{
                    console.log(err);
                })

        }
        
        
        
    }
    
    render() {
        return (
            <div>
            <form className="form_container"
            onSubmit={this.handleSubmit}>
                <div className="whatToDo">
                    <TextField  
                    label="What to do" 
                    variant="filled" 
                    value={this.whatToDo}
                    onChange={this.HandlewhatToDoChange}
                    />
                </div>
                
                <div className="WhenToDo">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            id="Date-selector"
                            lable="Date"
                            format="dd/MM/yyyy"
                            value={this.state.selectedDate}
                            onChange={this.HandleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className="time_selector">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            id="Time-selector"
                            lable="Time"
                            value={this.state.selectedDate}
                            onChange={this.HandleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    
                </div>
                <div>
                    <Button type="submit" 
                    variant="contained" 
                    color="primary" 
                    size="small"
                    >Add</Button>
                </div>
            </form>
            
            <List /> 
            </div>
        )
    }
}

export default Form
