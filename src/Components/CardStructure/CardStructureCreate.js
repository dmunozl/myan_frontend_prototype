import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { Container, Form, FormGroup, Input, Label, Button } from "reactstrap";
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

    onChange = (key, value) => {
        const formValues = {...this.state.formValues}
        formValues[key] = value;
        this.setState({
            formValues
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
                cells.push(<CardStructureCell key={`${i}-${j}`} position={[i, j]}/>)
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
                                <Input id={item.id} autoComplete="off" type={item.type} value={this.state.formValues[item.id] || ''} placeholder={item.placeholder} onChange={e => {this.onChange(item.id, e.target.value)}}/>
                            </FormGroup>
                        })}
                        <Button color="success" type="button" onClick={this.addElement}>Agregar</Button>
                    </Form>
                </div>
                <div className="d-flex flex-column card-view-container align-items-center">
                    <div className="pb-3">{this.state.isFlipped? 'Reverso' : 'Anverso'}</div>
                    <ReactCardFlip isFlipped={this.state.isFlipped}>
                        <div className="d-flex card-outline flex-wrap justify-content-between">
                            {cells}
                            {this.state.frontElements.map(element => <CardStructureElement key={element.id} element={element} remove={this.removeElement}/>)}
                        </div>
                        <div className="d-flex card-outline flex-wrap justify-content-between">
                            {cells}
                            {this.state.backElements.map(element => <CardStructureElement key={element.id} element={element} remove={this.removeElement}/>)}
                        </div>
                    </ReactCardFlip>
                    <Button className="mt-3" color="success" onClick={this.toggleFlipped}>Flip</Button>
                </div>
            </div>
        </Container>
    }
}

export default CardStructureCreate