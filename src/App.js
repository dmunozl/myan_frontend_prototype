import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faImage, faVolumeUp, faAlignLeft, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

import CardStructureCreate from "./Components/CardStructure/CardStructureCreate";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

library.add(faCheckSquare, faCoffee, faImage, faVolumeUp, faAlignLeft, faTimes, faTrash)

function App() {
  return (
    <CardStructureCreate/>
  );
}

export default App;
