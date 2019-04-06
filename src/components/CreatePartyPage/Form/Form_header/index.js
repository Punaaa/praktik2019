import React, { Component } from 'react'
import { formHeaderData } from '../../../../staticData'
import ImageHandler from './ImageHandler/index'
import { connect } from 'react-redux'
import { updateBirthday } from '../../../../store/Birthday/BirthdayActions'
import Input from '../../../Input/index'

class Form_header extends Component {

  /**
   * An advanced simple action
   */
  simpleAction = (event) => {
    this.props.updateBday(event.target.value);
  }

  /**
   * Render birthday date
   */
  renderBirthdayDate = () => this.props.birthdayDate
    ? <span>{this.props.birthdayDate}</span>
    : ''

  renderInputs = () => this.props.birthdayEvent
    ? Object.keys(this.props.birthdayEvent).map(this.renderInput)
    : null;

  renderInput = key => (
    <label className="birthday-label" key={key}>
      {formHeaderData[key].text}
      <Input
        className={formHeaderData[key].className}
        keyVal={key}
        val={this.props.birthdayEvent[key]}
        callback={this.callback}
        placeholder={formHeaderData[key].defaultValue}
      />
    </label>
  )

  callback = (value, key) => this.props.updateBday({ [key]: value });

  render() {
    return (
      <div className="form-header-container">
        <div className="box-container">
          <div className="box">
            <h2 className="form-headline">Skapa Kalas</h2>
            <form>
              {/* {(staticData.formHeaderData.map(this.renderLabels))} */}
              {this.renderInputs()}
              {this.renderBirthdayDate()}
            </form>
          </div>
          <div className="box">
            <ImageHandler />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    birthdayEvent: state.birthday.birthdayEvent
  }
}

const mapDispatchToProps = dispatch => ({
  updateBday: (data) => dispatch(updateBirthday(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form_header)