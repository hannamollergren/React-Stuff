import React, {useState, useRef, useEffect} from 'react'

const DragNDrop = ({ data }) => {
    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef();

    useEffect(() => {
        setList(data);
    }, [setList, data])


    const handleDragStart = (e, params) => {
        console.log('drag stating...', params)
        // Specific direction to each item
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true);
        }, 0)
    }

    const handleDragEnter = (e, params) => {
        console.log('entering drag..', params)
        const currentItem = dragItem.current;

        if(e.target !== dragNode.current) {
            console.log('target is not the same')
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                console.log('newList[params.grpIndex]')
                newList[params.grpIndex].items.splice(params.itemIndex, 0, newList[currentItem.grpIndex].items.splice(currentItem.itemIndex, 1)[0])
                dragItem.current = params;
                localStorage.setItem('List', JSON.stringify(newList));
                return newList;
            })
        }
    }

    const handleDragEnd = () => {
        console.log('ending drag..')
        setDragging(false);
        
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current;

        if(currentItem.grpIndex === params.grpIndex && currentItem.itemIndex === params.itemIndex) {
            return 'current dnd-item';
        }
        return 'dnd-item';
    }

    return (
        <div className="drag-n-drop">
            {list.map((grp, grpIndex) => (
                <div className="dnd-group" 
                    key={grpIndex}
                    onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, {grpIndex, itemIndex: 0}) : null}>
                    <div className="group-title">{grp.title}</div>
                    {grp.items.map((item, itemIndex) => (
                        <div 
                            draggable 
                            onDragStart={(e) => handleDragStart(e, {grpIndex, itemIndex})} 
                            onDragEnter={dragging ? (e) => handleDragEnter(e, {grpIndex, itemIndex}) : null}
                            className={`${dragging ? getStyles({grpIndex, itemIndex}) : 'dnd-item'}`} 
                            key={itemIndex}>
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default DragNDrop;
