import React, {useState, useEffect} from 'react'
import Board from './components/Board';
import Card from './components/Card';
import DragNDrop from './components/DragNDrop';
import Table from './components/Table';
import DayPicker from './components/DayPicker';
import SelectComponent from './components/SelectComponent';
import './App.css';
import './styles/Table.css';
import './styles/Modal.css';
import './styles/DayPicker.css';
import './styles/Weather.css';
import { DisplayWeatherContainer } from './containers/DisplayWeather.container';

const defaultData = [
    {title: 'To Do', items: ['1', '2', '3']},
    {title: 'Development', items: ['4', '5']},
    {title: 'Done', items: ['6', '7', '8', '9']},
    {title: 'Test', items: ['10', '11']}
]

const tableData = {
    headers: [
        'Name', 'E-post', 'Telefon', 'Klass'
     ],
     students: [
         {
             name: 'Hanna',
             email: 'hanna@test.se',
             phone: 123456,
             class: 'Klass1'
         },
         {
             name: 'Nisse',
             email: 'nisse@test.se',
             phone: 123456,
             class: 'Klass3'
         },
         {
             name: 'Johan',
             email: 'johan@test.se',
             phone: 123456,
             class: 'Klass2'
         }
     ]
};

function App() {
    const [data, setData] = useState(defaultData);  

    useEffect(() => {
        if (localStorage.getItem('List')) {
            setData(JSON.parse(localStorage.getItem('List')))
        }
        else {
            setData(defaultData)
        }
    }, [setData])
    
    return (
        <>
            <div className="App">
                <SelectComponent/>
            </div>
            <div className="App">
                <DayPicker />
            </div>
            <div className="App">
                <Table tableData={tableData}/>
            </div>
            {/* Drag and Drop 1 */}
            <div className="App">
                <header className="App-header">
                    <DragNDrop data={data}/>
                </header>
            </div>
            {/* Drag and Drop 2 */}
            <main className="flexbox">
                <Board id="board-1" className="board">
                    <Card id="card-1" className="card" isDraggable="true">
                        <p>Card one</p>
                    </Card>
                </Board>

                <Board id="board-2" className="board">
                    <Card id="card-2" className="card" isDraggable="true">
                        <p>Card two</p>
                    </Card>
                </Board>
            </main>
            {/* Weather */}
            <DisplayWeatherContainer/>
        </>
    );
}

export default App;
