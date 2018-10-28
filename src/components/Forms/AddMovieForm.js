import React, { Component }  from 'react';
import './Forms.css'
import { connect } from 'react-redux';
import { fetchMovie } from '../../store/actions';
import { titleFormat } from '../../utils/validations'
import Input from '../../common/Input/Input';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';


class AddMovieForm extends Component {
    constructor(props) {
        super(props)
        this.title = React.createRef()
        this.year = React.createRef()
        this.genre = React.createRef()
        this.runtime = React.createRef()
        this.director = React.createRef()
    }
    onFormSubmit = (e) => {
        e.preventDefault()
        this.props.handleFormSubmit(this.props.movieInfo)
        if (this.props.error === undefined) {
            this.props.onFormCancel()
        }
    }
    check = (e) => {
        e.preventDefault()
        this.title.current.value = titleFormat(this.title.current.value)
        this.props.dispatch(fetchMovie(this.title.current.value))
    }

    render() {
        return (
            <Modal 
                modalOpen = { this.props.modalOpen } 
                modalClose = { this.props.modalClose }>
                <form>
                    <h1> Add a Movie </h1>
                    <div className = "form-input-fields">
                        <Input handleChange= {(e) => this.check(e) } label = "Title" defaultValue = { this.props.movieInfo.Title } inputRef = { this.title } />
                        <Input label = "Year" defaultValue = { this.props.movieInfo.Year } disabled  inputRef = { this.year }/>
                        <Input label = "Genre" defaultValue = { this.props.movieInfo.Genre } disabled  inputRef = { this.genre }/>
                        <Input label = "Runtime" defaultValue = { this.props.movieInfo.Runtime } disabled  inputRef = { this.runtime }/>
                        <Input label = "Director" defaultValue = { this.props.movieInfo.Director }  disabled  inputRef = { this.director }/>
                        <Input label = "ID"  defaultValue = { this.props.movieInfo.imdbID } disabled/>
                    </div>
                    <span>{this.props.error}</span>
                    <footer className = "form-buttons"> 
                        <Button onClick = { e => this.onFormSubmit(e) } label = "Save"/> 
                        <Button onClick = { e => this.check(e) } label = "Search Online"/> 
                        <Button onClick = { this.props.onFormCancel } label = "Cancel"/> 
                    </footer>
                </form>
            </Modal>
        )
    } 
}
const mapStateToProps = state => ({
    movieInfo: state.movieInfo,
    error: state.errorMessage
})
export default connect(mapStateToProps)(AddMovieForm);