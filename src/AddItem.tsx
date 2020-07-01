import React, {ChangeEvent, KeyboardEvent, useState} from 'react';



type AddItemFormType={
addItem:(title:string)=>void,

}

function AddItemForm(props:AddItemFormType) {
    let [error, setError] = useState<string|null>(null);
    let [title, setTitle] = useState<string>('');

    const addItemClick = (title: string) => {
        if(title.trim()!==""){
            props.addItem(title);

        }else{setError("title is required")}

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value);setError(null)}

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {setError(null); if (e.charCode == 13)  {addItemClick(title)}}
  return (

      <div>
        <input
            type="text"
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? "error" : ""}    //вычисляемый класс если в стейте error значение строка а не null
        />
        <button onClick={() => {addItemClick(title)}}>+</button>
        {error && <div className={"error_message"}>{error}</div>}
    </div>)

}
export default AddItemForm;