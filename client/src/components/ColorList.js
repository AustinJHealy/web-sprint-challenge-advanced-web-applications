import React, { useState } from "react";
import  { axiosWithAuth }  from "../utils/axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" },
};
const col = {
  color: "",
  code: { hex: "" },
  id: 0
}

const ColorList = ({ colors, getColors }) => {
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(col);
  let newID = parseInt(colors.length);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?

    let id = colorToEdit.id;
    
    axiosWithAuth()
     .put(`/api/colors/${id}`, colorToEdit)
     .then(() => {
       getColors();
       setEditing(false);
     })
     .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    // console.log(color);
    let id = color.id;
    // console.log(id);
    axiosWithAuth()
     .delete(`/api/colors/${id}`)
     .then(() => {
       setEditing(false);
       getColors();
     })
     .catch(err => console.log(err))
  };

  const addColor = e => {
    e.preventDefault();

    // console.log(newID);
    setNewColor({ ...newColor, id: newID })
    console.log(newColor);


    axiosWithAuth()
      .post("/api/colors", newColor)
      .then(() => {
        setNewColor(col);
        getColors();
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />

     
       <div className="add" >
        <form onSubmit = {addColor}>
          <h3>Add Color</h3>
          <label>
            Color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            Hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <button>Add</button>
        </form>
      </div>
     </div>
  );
}; 

export default ColorList;