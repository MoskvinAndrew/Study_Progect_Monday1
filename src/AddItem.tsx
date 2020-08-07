import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";



type AddItemFormType={
addItem:(title:string)=>void,

}

export const AddItemForm = React.memo((props:AddItemFormType)=> {
    console.log('AddItemFormRead')
    let [error, setError] = useState<string|null>(null);
    let [title, setTitle] = useState<string>('');

    const addItemClick = (title: string) => {
        if(title.trim()!==""){
            props.addItem(title);
            setTitle("");
        }else{setError("title is required")}

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value);setError(null)}

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null)};
        if (e.charCode == 13)  {
            addItemClick(title)}}
  return (

      <div>
        <TextField
            variant={"outlined"}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            label={"title"}
            helperText={error}
            // className={error ? "error" : ""}    //вычисляемый класс если в стейте error значение строка а не null
        />
        <IconButton color={"primary"} onClick={() => {addItemClick(title)}}><AddBox/></IconButton>
    {/*/!*    {error && <div className={"error_message"}>{error}</div>}*!/     //вычисляемый класс если в стейте error значение строка а не null*/}
    </div>)

});
export default AddItemForm;