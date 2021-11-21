import { Button, makeStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import { connect } from 'react-redux'
import { addNote } from './redux/notes/create/action'
import { getNotes } from './redux/notes/get/action'
const useStyle = makeStyles({
     header: {
          display: 'flex',
          gap: '100px',
          alignItems: 'flex-end',
          padding: '10px 50px'
     },
     form: {
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-end'
     },
     input: {
          padding: '0'
     },
     button: {
          height: '36px',
          width: '150px',
     },
     loadingIcon: {
          position: 'absolute',
          transform: 'scale(.5)',
     }
})

function App(props) {
     const classes = useStyle()
     const MyButton = props => (
          <Button
               type={props.type}
               onClick={props.onClick}
               classes={{ root: classes.button, label: classes.label }}
               variant='contained' color='primary'>
               {
                    props.loading ? (
                         <span className={classes.loadingIcon}>
                              <CircularProgress color='secondary' />
                         </span>
                    ) : <span >{props.children}</span>
               }

          </Button>
     )
     const submitHandler = e => {
          e.preventDefault()
          const title = e.target.title.value
          const onSuccess = () => {
               props.getNotes()
               e.target.reset()
          }
          props.addNote(title, { onSuccess })
     }
     return (
          <div>
               <div className={classes.header} >
                    <MyButton loading={props.getNotesLoading} onClick={props.getNotes}>fetch notes</MyButton>
                    <form className={classes.form} onSubmit={submitHandler}>
                         <TextField name='title' classes={{ root: classes.input }} label='title' />
                         <MyButton loading={props.addNoteLoading} type='submit'>Submit</MyButton>
                    </form>
               </div>
               <hr style={{ margin: '0' }} />
               <ul>
                    {
                         props.notes?.map(item => (
                              <li className={classes.li} key={item.id}>
                                   <span>{item.title}</span>
                              </li>
                         ))
                    }
               </ul>
          </div>
     )
}
const mapStateToProps = state => {
     return {
          notes: state.notes.getAll?.data?.notes,
          getNotesLoading: state.notes.getAll?.loading,
          addNoteLoading: state.notes.createNote?.loading
     }
}
export default connect(mapStateToProps, {
     getNotes,
     addNote,
})(App)
