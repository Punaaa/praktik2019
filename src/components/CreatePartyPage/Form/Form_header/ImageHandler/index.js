import React from 'react'
import { Image, ArrowDownCircle } from 'react-feather'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


class ImageHandler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      imgSrc: '',
      dropdownOpen: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }
  test = (e) => {
    console.log(e.target.src);

    this.setState({
      selected: true,
      imgSrc: e.target.src
    })

  }

  render() {
    let imgs = ["cake", "camo", "heart", "blue", "leaf", "navy"]
    return (
      <div className="imagehandler-container">
        <div className="image-pick-container" style={this.state.selected ? {background: 'url(' + this.state.imgSrc + ')'} : {background: '#fff'}}>
          
          {!this.state.selected ?
            <div>
              <p className="image-text">Ladda upp egen bild</p> 
              <Image className="img-icon container-image" />
            </div>
            : null
          }
        </div>
        <Dropdown className="image-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{border: 'none', padding: '0'}}>
          <DropdownToggle color="primary" className="w-100">
            Välj bild <ArrowDownCircle />
          </DropdownToggle>
          <DropdownMenu style={{width: '100%', padding: '5px'}}>
            {imgs.map((img, i) => {
              return (
                <DropdownItem key={"dditem_"+i} onClick={this.test} className="dd-item"><img className="dd-image" src={"/images/patterns/" + img + ".jpg"} alt={img} /></DropdownItem>
              )
            })}
            <DropdownItem className="dd-item"><img className="dd-image" src="/images/add-img.jpg" alt="add new" /></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}
export default ImageHandler


