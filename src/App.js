import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faImage, faVolumeUp, faAlignLeft, faTimes, faTrash, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import CardStructureCreate from "./Components/CardStructure/CardStructureCreate";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

library.add(faImage, faVolumeUp, faAlignLeft, faTimes, faTrash, faSyncAlt)

function App() {
  return (
    <CardStructureCreate/>
  );
}

export default App;
