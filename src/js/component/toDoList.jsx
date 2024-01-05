import React, { useState, useEffect} from 'react';

function ToDoList () {
    const [taskList, setTaskList] = useState([]);
    const [inputPlaceholder, setInputPlaceholder] = useState("You have zero tasks currently");
    
    CreateUser();
    
    useEffect(() => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/WesleyCrosslin')
        .then((response) => response.json())
        .then(data => setTaskList(data))
      }, []);


    return(
        <div>
            <div className="card rounded-0">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item px-5">
                        <input
                            type="text" className="toDoListInput w-100" placeholder={inputPlaceholder}
                            onKeyUp={(e) =>{
                            if (e.key === "Enter" && e.target.value != ""){
                                let listingTasks = taskList.concat({ label: e.target.value, done: false});
                                setTaskList(listingTasks);
                                UpdateList(listingTasks);
                                setInputPlaceholder("What tasks do you have today?");
                            }
                            }}
                        />
                    </li>
                    {
                        taskList.map(t => (
                        <li className="list-group-item px-5 d-flex">
                            <div className="w-100">
                                {t.label}
                            </div>
                            <span className="img-show-on-hover" onClick={(e)=>{
                                let listingTasks = DeleteTask(t, taskList);
                                setTaskList(listingTasks);
                                UpdateList(listingTasks);
                                if(taskList.length == 1){
                                    setInputPlaceholder("Add a task!");
                                };
                            }}>&times;</span>
                        </li>))
                    }
                    <li className="list-group-item list-item-counter"><small>{taskList.length} item left</small></li>
                </ul>
            </div>
            <div className="rounded-0 card list-bottom-deco-1 m-auto"></div>
            <div className="rounded-0 card list-bottom-deco-2 m-auto"></div>
            <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-danger my-3" onClick={() => {
                setTaskList([]);
                UpdateList([{label: "example", done: false}]); 
            }}>Delete all tasks</button>
            </div>
        </div>
    );
}

function DeleteTask (task, listTasks) {
    let newListTasks = [];
        for (let item of listTasks){
            if (item != task){
                newListTasks.push(item);
            }
        }
        return newListTasks;

}

async function UpdateList (todos) {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/WesleyCrosslin', {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
          console.log(resp.ok); 
          console.log(resp.status); 
          console.log(resp.text()); 
          return resp.json(); 
      })
      .then(data => {
          
          console.log(data); 
      })
      .catch(error => {
          
          console.log(error);
      });
};

async function CreateUser () {
    await fetch('https://playground.4geeks.com/apis/fake/todos/user/WesleyCrosslin', {
        method: "POST",
        body: JSON.stringify([]),
        headers: new Headers({
          "Content-Type": "application/json"
        })
    })
    .then (response => {
        console.log(response.ok);
        console.log(response.status);
        console.log(response.text);
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })

};

export default ToDoList;