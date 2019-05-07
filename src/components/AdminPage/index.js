import React from 'react'
import {
  Gift,
  Heart,
  HelpCircle,
  Folder,
  Plus
} from 'react-feather'
import { Link } from 'react-router-dom'
import Categories from '../FAQ/Categories'
import DataItem from './DataItem/index'
import DataEditor from './DataEditor/index'
import REST from '../../REST'

class Product extends REST { }
class Fundraiser extends REST { }
class Qna extends REST { }
class Event extends REST { }


class AdminPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedId: true,
      currentColl: '',
      editObject: ''
    }
    this.categories = [
      {
        "icon": <Gift />,
        "name": 'produkter',
        "active": false,
        "styling": { backgroundColor: '#4762b7', color: 'white' }
      },
      {
        "icon": <Heart />,
        "name": 'välgörenhet',
        "active": false,
        "styling": { backgroundColor: '#F66E9F', color: 'white' }
      },
      {
        "icon": <HelpCircle />,
        "name": 'frågor',
        "active": false,
        "styling": { backgroundColor: '#FFC263', color: 'white' }
      },
      {
        "icon": <Folder />,
        "name": 'event',
        "active": false,
        "styling": { backgroundColor: '#008A64', color: 'white' }
      }
    ]
    this.editNewObject = this.editNewObject.bind(this)
    this.deleteObject = this.deleteObject.bind(this)
    this.saveObject = this.saveObject.bind(this)
  }
  renderCategoryContent = (category) => {
    if (category === 'produkter') {
      this.renderContentFromDb(Product)
    }
    else if (category === 'välgörenhet') {
      this.renderContentFromDb(Fundraiser)
    }
    else if (category === 'frågor') {
      this.renderContentFromDb(Qna)
    }
    else if (category === 'event') {
      this.renderContentFromDb(Event)
    }
  }
  /**
   * Ja du Pontus, läs vad funktionerna heter och gilla läget.
   * Titta inte i dem.
   */
  renderObjectToEdit = (obj, newObj = false) => {
    if (!this.state.editObject) {
      this.setState({ editObject: <DataEditor newObj={newObj} collection={this.state.currentColl} object={obj} delete={this.deleteObject} save={this.saveObject} /> })
    } else {
      this.setState({ editObject: '' })
    }
  }
  async editNewObject() {
    let object = await this.state.currentColl.find(`.find().limit(1).exec()`)
    this.renderObjectToEdit(object[0], true)
  }
  async deleteObject(obj) {
    await obj.delete()
    this.setState({ editObject: '' })
    this.renderContentFromDb(this.state.currentColl)
  }
  async saveObject(obj) {
    if (this.state.currentColl === Qna && !obj.counter){
      obj.counter = 1
    }
    await obj.save()    
    this.setState({ editObject: '' })
    this.renderContentFromDb(this.state.currentColl)
  }
  async renderContentFromDb(collection) {
    const foundObjectsArr = await collection.find()
    const foundObjects = foundObjectsArr.map((object, i) => {
      return <DataItem object={object} key={i} index={i} clickHandler={this.renderObjectToEdit} />
    })
    this.setState({
      content: <div style={{ textAlign: 'right' }}>
        {collection === Event
          ? <Link className="btn btn-primary" to="/skapa-kalas">Lägg till <Plus /></Link>
          : <button onClick={this.editNewObject} className="btn btn-primary">Lägg till <Plus /></button>
        }
        {foundObjects}
      </div>,
      currentColl: collection,
      editObject: ''
    })
  }

  render() {
    return (
      <div className="admin-wrapper">
        <h2>Admin - Hantering</h2>
        <Categories categories={this.categories} name={this.props.match.params.link} clickHandler={this.renderCategoryContent} />
        <div className="data-editor">
          {this.state.editObject}
        </div>
        {this.state.editObject
          ? <button onClick={this.renderObjectToEdit} className="mt-3 btn btn-outline-danger">Tillbaka</button>
          : <div className="category-content-list">
            {this.state.content}
          </div>}
      </div>
    )
  }
}

export default AdminPage