import React, { useState } from 'react';

function NameItem() {
  let [name, changeName] = useState("Thầy lộc ");
  return ( <div>
    <p style={{color: name.color}}>{name.value}</p>
    <button 
        style={{color: name.value === 'Thuận' ? 'red' : ''}}
        onClick={() => changeName({ value: 'Thuận', color: 'red'})}>
      Đây là Thuận
    </button>
    <button   
        style={{color: name.value === 'Thành' ? 'red' : ''}}
        onClick={() => changeName({ value: 'Thành', color: 'red'})}>
      Đây là Thành
    </button>
    <button   
        style={{color: name.value === 'Toàn' ? 'red' : ''}}
        onClick={() => changeName({ value: 'Toàn', color: 'red'})}>
      Đây là Toàn
    </button>
    <button   
        style={{color: name.value === 'Trường' ? 'red' : ''}}
        onClick={() => changeName({ value: 'Trường', color: 'red'})}>
      Đây là Trường
    </button>
    </div>

  );
}
export default NameItem;