import React from "react"
import Slider from "react-slick"
import Checkout from "../Form_footer/Checkout/index"
import REST from "../../../../REST"


class Fundraiser extends REST { }

class Form_footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      charitySelected: false,
      sliderContent: ""
    }
    this.allFundraisersData = []
    this.allFundraisers = []
    this.loadFundraisersAndMount()
    this.fundraiserId = ""
    this.selectedFundraiser = ""
  }

  charityToggle = () => {
    this.setState({ charitySelected: !this.state.charitySelected })
  }

  async loadFundraisersAndMount() {
    this.allFundraisersData = await Fundraiser.find()
    this.allFundraisers = this.allFundraisersData.map((fundraiser, i) => {
      return (
        <div className="slider-div" key={"fundraiser_" + i}>
          <div className="charity-overlay" />
          <div className="charity-checkmark" />
          <img
            className="charImg"
            src={fundraiser.image}
            alt={fundraiser.name}
            id={fundraiser._id}
            onClick={this.findFundraisersId}
          />
        </div>
      )
    })
    this.setState({ sliderContent: this.allFundraisers })
  }

  selected = () => {
    let fundraisers = this.state.sliderContent
    for (let fundraiser of fundraisers) {
      console.log(fundraiser.props);
    }

  }

  findFundraisersId = (e) => {
    console.log("I am selected", e.target.id)
    const selectedId = e.target.id
    this.fundraiserId = selectedId
    console.log(selectedId, "this is the id");

    this.getSelectedFundraiser()
  }

  async getSelectedFundraiser() {
    this.selectedFundraiser = await Fundraiser.find(`.find({_id: '${this.fundraiserId}'})`)
    console.log(this.selectedFundraiser);

  }



  render() {
    const settings = {
      dots: true,
      focusOnSelect: true,
      infinite: true,
      speed: 400,
      slidesToShow: 4,
      slidesToScroll: 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 595,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        }
      ]
    }

    return (
      <div className="form-footer-container">
        <div className="box-container">
          <div className="box align-left">
            <div className="form">
              <h2 className="form-headline text-center">
                Vill du stödja en välgörenhet?
              </h2>
              <div className="input-group">
                <input
                  className="radio-input"
                  id="radio1"
                  name="radio"
                  type="radio"
                  onClick={
                    !this.state.charitySelected ? this.charityToggle : null
                  }
                />
                <label className="radio-label" htmlFor="radio1">
                  Ja, det vill jag
                </label>
              </div>
              <div className="input-group">
                <input
                  className="radio-input"
                  id="radio2"
                  name="radio"
                  type="radio"
                  onClick={
                    this.state.charitySelected ? this.charityToggle : null
                  }
                />
                <label className="radio-label" htmlFor="radio2">
                  Nej tack, inte intresserad
                </label>
              </div>
            </div>
          </div>
        </div>
        {this.state.charitySelected ? (
          <div>
            <h2 className="form-headline charity-headline text-center">
              Välj välgörenhet
            </h2>
            <div className="slider-container">
              <div className="slider-content" onClick={this.selected()}>
                <Slider {...settings}>{this.state.sliderContent}</Slider>
              </div>
            </div>
          </div>
        ) : null}
        <Checkout />
      </div>
    )
  }
}

export default Form_footer
