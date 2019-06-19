import React from 'react';

const list = props => {
    return <ul>
    {props.items.map(todo => (
        <li key={todo} onClick={props.onClick.bind(this, todo.id)}>
            {todo}
        </li>
    ))}
</ul>
}

export default list;