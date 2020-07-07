import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactCardFlip from 'react-card-flip';

import './CardStructure.css'
import CardStructureCell from "./CardStructureCell";
import CardStructureElement from "./CardStructureElement";
import settings from '../../settings'


class CardStructureCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: 'Imagen',
            isFlipped: false,
            selecting: false,
            selectingKey: undefined,
            formValues: {},
            frontElements: [],
            backElements: []
        }
    }

    changeSelectedType = (e) => {
        this.setState({
            selectedType: e.target.value
        })
    }

    toggleFlipped = () => {
        this.setState({
            isFlipped: !this.state.isFlipped
        })
    }

    startSelecting = (key) => {
        this.setState({
            selecting: true,
            selectingKey: key
        })
    }

    selectCoordinate = (value) => {
        const formValues = {...this.state.formValues}
        formValues[this.state.selectingKey] = value;
        this.setState({
            formValues,
            selecting: false,
            selectingKey: undefined
        })
    }

    addElement = () => {
        const newElement = {...this.state.formValues};
        newElement['type'] = this.state.selectedType;
        newElement['id'] = uuidv4();
        const elementKey = this.state.isFlipped? 'backElements': 'frontElements'
        const cardElements = [...this.state[elementKey], newElement]
        this.setState({
            [elementKey]: cardElements,
            formValues: {}
        })
    }

    removeElement = (id) => {
        const frontElements = this.state.frontElements.filter(element => element.id !== id);
        const backElements = this.state.backElements.filter(element => element.id !== id);
        this.setState({
            frontElements,
            backElements
        })
    }

    render() {
        const cells = [];
        for (let j=0; j<settings.cardHeight; j++){
            for (let i=0; i<settings.cardWidth; i++) {
                cells.push([i, j])
            }
        }

        const elementTypes = ['Imagen', 'Texto', 'Audio'];
        const elementInputs = [
            {id: 'start', label: "Comienzo", type:'input', placeholder:'Ejemplo: 0,0'},
            {id: "end", label: "Final", type:'input', placeholder:'Ejemplo: 4,6'}];

        return <Container>
            <div className="d-flex">
                <div className="d-flex card-form-container align-items-center justify-content-center">
                    <Form autoComplete="nope">
                        <FormGroup>
                            <Label for="type">Tipo</Label>
                            <Input id="type" type="select" value={this.state.selectedType} onChange={this.changeSelectedType}>
                                {elementTypes.map(type => <option key={type} value={type}>{type}</option>)}
                            </Input>
                        </FormGroup>
                        {elementInputs.map(item => {
                            return <FormGroup key={item.id}>
                                <Label for={item.id}>{item.label}</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend"><Button color="info" onClick={() => {this.startSelecting(item.id)}}>Seleccionar</Button></InputGroupAddon>
                                    <Input id={item.id} type={item.type} value={this.state.formValues[item.id] || ''} readOnly placeholder="Not Selected"/>
                                </InputGroup>
                            </FormGroup>
                        })}
                        <div className="d-flex justify-content-end">
                            <Button className="mt-2" color="success" type="button" onClick={this.addElement}>Agregar</Button>
                        </div>
                    </Form>
                </div>
                <div className="d-flex flex-column card-view-container align-items-center">
                    <h4 className="pb-3">{this.state.isFlipped? 'REVERSO' : 'ANVERSO'}</h4>
                    <ReactCardFlip isFlipped={this.state.isFlipped}>
                        <div className="d-flex card-outline flex-wrap justify-content-between">
                            {cells.map(cell =>
                                <CardStructureCell key={`${cell[0]},${cell[1]}`} position={cell} selecting={this.state.selecting} selectCoordinate={this.selectCoordinate}/>
                            )}
                            {this.state.frontElements.map(element => <CardStructureElement key={element.id} element={element} remove={this.removeElement}/>)}
                        </div>
                        <div className="d-flex card-outline flex-wrap justify-content-between">
                            {cells.map(cell =>
                                <CardStructureCell key={`${cell[0]},${cell[1]}`} position={cell} selecting={this.state.selecting} selectCoordinate={this.selectCoordinate}/>
                            )}
                            {this.state.backElements.map(element => <CardStructureElement key={element.id} element={element} remove={this.removeElement}/>)}
                        </div>
                    </ReactCardFlip>
                    <Button className="mt-3" color="success" onClick={this.toggleFlipped}><FontAwesomeIcon icon="sync-alt"/> Flip</Button>
                </div>
            </div>
        </Container>
    }
}

export default CardStructureCreate