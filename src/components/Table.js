import React, {useState, useEffect} from 'react';
import Modal from './Modal';

const Table = ({ tableData }) => {
    const [list, setList] = useState(tableData);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayModalEdit, setDisplayModalEdit] = useState(false);
    const [choosenStudent, setChoosenStudent] = useState();

    const handleAddStudent = () => {
        setDisplayModal(true)
    }

    const handleEditStudent = (student, index) => {
        console.log('edit student', student, index)
        setDisplayModalEdit(true)
        setChoosenStudent({student, index})
    }

    useEffect(() => {
        if (localStorage.getItem('Students')) {
            setList(JSON.parse(localStorage.getItem('Students')))
        }
    }, [setList])

    return (
        <div className="dynamic-table__wrapper">
            <div className="dynamic-table__intro">
                <h1>Mina elever</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco l</p>
            </div>
            <table className="dynamic-table">
                <thead>
                    <tr className="show-for-large">
                        {list.headers.map((header, index) => (
                            <th key={index} className="dynamic-table__header columns">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {list.students.map((student, index) => (
                        <tr className="dynamic-table__row" key={index}>
                            <td className="dynamic-table__cell">
                                <div className="columns"><span className="dynamic-table__header--mobile">Namn:&nbsp;</span><span>{student.name}</span></div>
                            </td>
                            <td className="dynamic-table__cell">
                                <div className="columns"><span className="dynamic-table__header--mobile">E-post:&nbsp;</span><span>{student.email}</span></div>
                            </td>
                            <td className="dynamic-table__cell">
                                <div className="columns"><span className="dynamic-table__header--mobile">Telefon:&nbsp;</span><span>{student.phone}</span></div>
                            </td>
                            <td className="dynamic-table__cell">
                                <div className="columns"><span className="dynamic-table__header--mobile">Klass:&nbsp;</span><span>{student.class}</span></div>
                            </td>
                            <td className="dynamic-table__cell dynamic-table__cell--icon">
                                <div className="columns" onClick={() => handleEditStudent(student, index)}><span className="dynamic-table__header--mobile">Ändra person:&nbsp;&nbsp;</span><img alt="edit" src="https://img.icons8.com/material-sharp/24/000000/edit--v1.png" width="18"height="18"/></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="dynamic-table__button" onClick={() => handleAddStudent()}>Lägg till</button>
            {displayModal ? <Modal setDisplayModal={setDisplayModal} list={list} setList={setList}/> : null}
            {displayModalEdit ? <Modal displayModalEdit={displayModalEdit} setDisplayModalEdit={setDisplayModalEdit} choosenStudent={choosenStudent} setChoosenStudent={setChoosenStudent} list={list} setList={setList}/> : null }
        </div>
    )
}

export default Table
