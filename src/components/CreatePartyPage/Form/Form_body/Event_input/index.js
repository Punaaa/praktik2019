import React, { Component } from 'react'
import { eventInputData } from '../../../../../staticData'
import { connect } from 'react-redux'
import InputEvent from './InputEvent'
import {
  FormGroup,
  Label
} from 'reactstrap'

class EventInput extends Component {



  // handleChange = ({ currentTarget: input }) => {
  //   const data = { ...this.state.data };
  //   data[input.name] = input.value;
  //   this.setState({ data });
  // };

  renderInputs = () => this.props.birthdayTimeAndPlace
    ? Object.keys(this.props.birthdayTimeAndPlace).map(this.renderInput)
    : null

  renderInput = key => (
    <FormGroup key={key} className={eventInputData[key].classNameFormGroup}>
      <Label htmlFor={eventInputData[key].name} className={eventInputData[key].classNameLabel}>{eventInputData[key].text}</Label>
      <InputEvent
        name={eventInputData[key].name}
        // value={this.state.data[eventInputData[key].name]}
        type={eventInputData[key].type}
        placeholder={eventInputData[key].placeholder}
        className={eventInputData[key].className}
        onChange={this.handleChange}
      />
    </FormGroup>
  )

  render() {
    return (
      <div className="box-container">
        <div className="box">
          <h2 className="form-headline">Var, när <br /> &amp; hur?</h2>
          <img className="box-img fg-image" src="/images/time-place.png" alt="event" />
        </div>
        <div className="box text-left">
          {this.renderInputs()}
        </div>
      </div >
    )
  }


}
const mapStateToProps = state => {
  return {
    birthdayTimeAndPlace: state.birthday.birthdayTimeAndPlace
  }
}


export default connect(mapStateToProps)(EventInput)