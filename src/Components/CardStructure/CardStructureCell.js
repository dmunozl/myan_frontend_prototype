import React from "react";


class CardStructureCell extends React.Component {
    render() {
        return <div className="d-flex card-cell justify-content-center align-items-center">
            {this.props.position[0]} , {this.props.position[1]}
        </div>
    }
}

export default CardStructureCell