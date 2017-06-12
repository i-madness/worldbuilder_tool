import React, { Component } from 'react'
import store from '../store'
import {
  FormControl, FormGroup, HelpBlock, Navbar, NavItem, Nav, InputGroup, Button,
  OverlayTrigger, Tooltip, ButtonGroup, Panel
} from 'react-bootstrap'
import Quenta from '../model/quenta'
import { Alignment, alignmentClass } from '../model/alignment'
import { Genders, getRandomName } from '../logic/name-generator'
import './styles/NewProfile.css'

const tooltip = text => (<Tooltip id="tooltip">{text}</Tooltip>)

const initialComponentState = () => ({
  name: '',
  description: '',
  age: 20,
  gender: Genders.MALE,
  alignment: Alignment.TRUE_NEUTRAL,

  saveDisabled: true
})

/**
 * Компонент для создания новых квент
 */
export default class NewProfile extends Component {
  constructor(props) {
    super(props)
    this.state = initialComponentState()
    this.saveProfile = this.saveProfile.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.selectGender = this.selectGender.bind(this)
    this.selectAlignment = this.selectAlignment.bind(this)
  }

  /**
   * Сохранить квенту
   */
  saveProfile() {
    let { name, gender, age, description, alignment } = this.state
    store.dispatch({ type: 'QUENTA_CREATED', payload: new Quenta(name, gender, age, description, alignment) })
    this.clearState()
  }

  /**
   * Валидация формы
   */
  getValidationState() {
    const length = this.state.name.length;
    if (length) {
      let state = this.state
      this.state.saveDisabled = false
      return 'success'
    } else {
      let state = this.state
      this.state.saveDisabled = true
      return 'error'
    }
  }

  /**
   * Обработка изменений на форме и сохранение в локальное состояние
   * @param {Event} e 
   */
  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
  }

  /**
   * Генерирует случайное имя персонажа
   */
  randomizeName() {
    this.setState({
      ...this.state,
      name: getRandomName(this.state.gender),
      saveDisabled: false
    })
  }

  selectGender(e) {
    this.setState({
      ...this.state,
      gender: ({
        maleGender: Genders.MALE,
        femaleGender: Genders.FEMALE,
        otherGender: Genders.OTHER
      })[e.target.id]
    })
  }

  selectAlignment(e) {
    this.setState({
      ...this.state,
      alignment: ({
        alLG: Alignment.LAWFUL_GOOD,
        alNG: Alignment.NEUTRAL_GOOD,
        alCG: Alignment.CHAOTIC_GOOD,
        alLN: Alignment.LAWFUL_NEUTRAL,
        alTN: Alignment.TRUE_NEUTRAL,
        alCN: Alignment.CHAOTIC_NEUTRAL,
        alLE: Alignment.LAWFUL_EVIL,
        alNE: Alignment.NEUTRAL_EVIL,
        alCE: Alignment.CHAOTIC_EVIL
      })[e.target.id]
    })
  }

  clearState() {
    this.setState(initialComponentState())
  }

  render() {
    let alignments = Object.keys(Alignment)
      .map((al, i) => {
        let alSelected = Alignment[al]
        return (
          <OverlayTrigger placement="bottom" overlay={tooltip(alSelected[1])} key={i}>
            <Button className={this.state.alignment === alSelected ? 'btn btn-' + alignmentClass(Alignment[al]) : 'btn'}
              id={'al' + alSelected[0]} onClick={this.selectAlignment}>
              {alSelected[0]}
            </Button>
          </OverlayTrigger>)
      })

    return (
      <div>
        <Navbar collapseOnSelect className="editor-nav">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Создание профиля</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <OverlayTrigger placement="bottom" overlay={tooltip('Сохранить')}>
                <NavItem eventKey={1} href="#" onClick={this.saveProfile} className="save-btn bg-success" disabled={this.state.saveDisabled}>
                  <span className="glyphicon glyphicon-floppy-disk"></span>
                </NavItem>
              </OverlayTrigger>
              <OverlayTrigger placement="bottom" overlay={tooltip('Отмена')}>
                <NavItem eventKey={2} href="#" className="cancel-btn bg-danger" onClick={() => this.clearState()}>
                  <span className="glyphicon glyphicon-ban-circle"></span>
                </NavItem>
              </OverlayTrigger>
              <OverlayTrigger placement="bottom" overlay={tooltip('Случайная генерация квенты')}>
                <NavItem eventKey={2} href="#" className="quenta-rnd-btn bg-info">
                  <span className="glyphicon glyphicon-random"></span>
                </NavItem>
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <ButtonGroup className="gender-selectgroup" justified>
          <Button id="maleGender" href="#" onClick={this.selectGender} className={this.state.gender === 'M' ? 'btn-primary' : ''}>Мужской</Button>
          <Button id="femaleGender" href="#" onClick={this.selectGender} className={this.state.gender === 'F' ? 'btn-primary' : ''}>Женский</Button>
          <Button id="otherGender" href="#" onClick={this.selectGender} className={this.state.gender === 'O' ? 'btn-primary' : ''}>Другой</Button>
        </ButtonGroup>
        <FormGroup controlId="name" validationState={this.getValidationState()}>
          <InputGroup>
            <InputGroup.Addon>Имя</InputGroup.Addon>
            <FormControl type="text" value={this.state.name} placeholder="Имя персонажа" onChange={this.handleChange} />
            <FormControl.Feedback />
            <InputGroup.Button>
              <OverlayTrigger placement="bottom" overlay={tooltip('Случайная генерация')}>
                <Button onClick={() => this.randomizeName()}><span className="glyphicon glyphicon-retweet"></span></Button>
              </OverlayTrigger>
            </InputGroup.Button>
          </InputGroup>
          <HelpBlock style={this.getValidationState() === 'error' ? { display: 'block' } : { display: 'none' }}>Имя персонажа не должно быть пустым</HelpBlock>
        </FormGroup>
        <FormGroup controlId="age">
          <InputGroup>
            <InputGroup.Addon>Возраст</InputGroup.Addon>
            <FormControl type="number" value={this.state.age} min="1" placeholder="1 ... ∞" onChange={this.handleChange} />
          </InputGroup>
        </FormGroup>
        <Panel header="Описание">
          <p className="panel-title-horizontal"></p>
          <textarea className="form-control" id="description" onChange={this.handleChange} value={this.state.description} rows="3" />
        </Panel>
        <Panel>
          <p className="panel-title">Мировоззрение</p>
          <div className="btn-group">
            {alignments}
          </div>
        </Panel>
      </div>
    )
  }

}