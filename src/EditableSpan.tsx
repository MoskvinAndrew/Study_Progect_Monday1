import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";



type EditableSpanType={
    title:string,
    saveTitle:(newTitle:string)=>void,
}



function EditableSpan(props:EditableSpanType){
    let [editMode,setEditMode]=useState(false);

   let [title,settitle]=useState(props.title)

    const onEditMode = ()=>{
        setEditMode(true);
    }
    const offEditMode = ()=>{
        setEditMode(false);
        props.saveTitle(title);
        settitle("");

    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>)=>{
        settitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField
            variant={"outlined"}
            value={title}
            autoFocus={true}
            onBlur={offEditMode}
            onChange={changeTitle}/>:
        <span onDoubleClick={onEditMode}>{props.title}</span>


}
export default EditableSpan;