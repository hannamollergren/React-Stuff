import React, {useState} from 'react'

const Modal = ({ 
    setDisplayModal, 
    list, 
    setList, 
    displayModalEdit, 
    setDisplayModalEdit, 
    choosenStudent, 
    setChoossenStudent 
}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState()
    const [schoolClass, setSchoolClass] = useState('')

    
    let student = {
        name,
        email,
        phone,
        class: schoolClass
    }

    // om choosen gör en kopisa av objectet
    // student = kopian
    // ersätt 

    const handleAddedStudent = () => {
        setDisplayModal(false)
        let studentList = list;
        studentList.students.push(student)
        setList(studentList)
        localStorage.setItem('Students', JSON.stringify(list));
    }

    const handleEditStudent = () => {
        setDisplayModalEdit(false)
    }

    const handleCloseAdd = () => {
        setDisplayModal(false)
    }

    const handleCloseEdit = () => {
        setDisplayModalEdit(false)
    }

    const handleChanges = (change) => {
        choosenStudent.student.name = change;
    }

    return (
        <div className="modal__container">
            <div className="modal">
                {!displayModalEdit ? <a href="true" className="modal__icon" onClick={() => handleCloseAdd()}><img alt="close" src="https://img.icons8.com/material-outlined/24/000000/multiply--v1.png"/></a> : <a href="true" className="modal__icon" onClick={() => handleCloseEdit()}><img alt="close" src="https://img.icons8.com/material-outlined/24/000000/multiply--v1.png"/></a>}
                
                {!displayModalEdit ? <h1>Lägg till ny elev</h1> : <h1>Ändra elev</h1>}
                <div>
                    <input type="text" placeholder="Namn" onChange={!displayModalEdit ? (event) => setName(event.target.value) : (event) => handleChanges(event.target.value)} defaultValue={!displayModalEdit ? '' : choosenStudent.student.name}/>
                    <input type="email" placeholder="E-post" onChange={event => setEmail(event.target.value)} defaultValue={!displayModalEdit ? '' : choosenStudent.student.email}/>
                    <input type="text" placeholder="Telefon" onChange={event => setPhone(event.target.value)} defaultValue={!displayModalEdit ? '' : choosenStudent.student.phone}/>
                    <label>Välj klass</label>
                    <select onChange={(event) => setSchoolClass(event.target.value)} defaultValue={!displayModalEdit ? '' : choosenStudent.student.class} >
                        <option value="Tillhör ingen ännu" key=""></option>
                        <option value="Klass1" key="Klass1">Klass1</option>
                        <option value="Klass2" key="Klass2">Klass2</option>
                        <option value="Klass3" key="Klass3">Klass3</option>
                    </select> 
                </div>
                {!displayModalEdit ? <button onClick={() => handleAddedStudent()} disabled={!name || !email || !phone || !schoolClass}>Spara</button> : <button onClick={() => handleEditStudent()}>Spara ändringar</button>}
                
            </div>
        </div>
    )
}

export default Modal
