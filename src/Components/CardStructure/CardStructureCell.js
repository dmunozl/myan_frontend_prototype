import React from "react";


class CardStructureCell extends React.Component {
    render() {
        const position = this.props.position;
        const positionStr = `${position[0]},${position[1]}`
        const onClick = this.props.selecting? () => {this.props.selectCoordinate(positionStr)} : () => {}
        const className = this.props.selecting?
            "d-flex card-cell selecting justify-content-center align-items-center" :
            "d-flex card-cell justify-content-center align-items-center"

        return <div className={className} onClick={onClick}>
            {position[0]} , {position[1]}
        </div>
    }
}

export default CardStructureCell