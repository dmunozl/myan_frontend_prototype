import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class CardStructureElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    onMouseEnter = () => {
        this.setState({
            hover: true
        })
    }

    onMouseLeave = () => {
        this.setState({
            hover:false
        })
    }


    render() {
        const element = this.props.element;
        const start = element.start.split(',');
        const end = element.end.split(',');

        const marginLeft = start[0]*50;
        const marginTop = start[1]*50;
        const width = (end[0]-start[0]+1)*50;
        const height = (end[1]-start[1]+1)*50;

        const iconDict = {
            'Imagen': 'image',
            'Audio': 'volume-up',
            'Texto': 'align-left'
        }

        const style = {
            position: 'absolute',
            width: `${width}px`,
            height: `${height}px`,
            marginLeft: `${marginLeft}px`,
            marginTop: `${marginTop}px`,
            color: 'white',
        }

        return <div className="d-flex card-element justify-content-center align-items-center"
                    onClick={() => {this.props.remove(element.id)}} style={style}
                    onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            {this.state.hover? <FontAwesomeIcon icon="trash"/> : <FontAwesomeIcon icon={iconDict[element.type]}/>}
        </div>
    }

}

export default CardStructureElement