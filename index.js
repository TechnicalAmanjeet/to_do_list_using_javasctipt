// will start with javascript.

let todoArray = [];
let idCount = 0;
let countTodo = 0;



// get data from local storage.
let getDataFromLocalStorage = () => {
    let data = localStorage.getItem("todoArray");
    todoArray = JSON.parse(data);
    return todoArray;
}


// set data to local storage.
let setDataToLocalStorage = (taskArray) => {
    let stringifyData = JSON.stringify(taskArray);
    console.log(stringifyData);
    localStorage.setItem("todoArray",stringifyData);
}

// add todo list to local storage and array.
let addTodoList = () => {

    todoArray = getDataFromLocalStorage("todoArray");

    let currentListData = document.getElementById("todoText").value;
    // alert("ramji")
    // alert(currentListData)
    if(currentListData.length == 0) alert("Empty task can't be todo!!")
    else{
        document.getElementById("todoText").value = "";
    // alert(currentListData);

    // alert(todoList);

    todoArray.push(
        {
            id: ++idCount,
            status: 0,
            list: currentListData
        }
    )
    
    setDataToLocalStorage(todoArray)
    showTodoList();
    }

    
    // console.log(todoArray);
    return false;

}




// show todo list code.
let showTodoList = () =>{
    
    // alert("refreshed page.")
    if(getDataFromLocalStorage("todoArray")){
        todoArray = getDataFromLocalStorage("todoArray");
    }
    else{
        setDataToLocalStorage([])
    }

    let numberofTodo = 1;

    let todoListContainer = document.getElementById("todoListContainer");

    todoListContainer.innerHTML = "";

    todoArray.forEach( todolist =>{
        todoArray[numberofTodo-1].id = numberofTodo;
        console.log(todoArray[numberofTodo-1]);
        if(todolist.status === 0){
            todoListContainer.innerHTML += `
            <div class="card m-3 p-2" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Todo ${numberofTodo++}</h5>
              <p class="card-text" id="${todolist.id}" >${todolist.list}</p>
        
              <a href="#" onclick="doneTodoList(${todolist.id})"  class="btn btn-success ">Done</a>
              <a href="#" onclick="editList(${todolist.id})" class="btn btn-primary">Edit</a>
              <a href="#" class="btn btn-danger" onclick="deleteList(${todolist.id})">Delete</a>
              
              
            </div>
        </div>
            `
        }
        else{
            todoListContainer.innerHTML += `
            <div class="card m-3 p-2" style="width: 18rem;">
            <div class="card-body bg-success">
              <del>
              <h5 class="card-title">Todo ${numberofTodo++}</h5>
              <p class="card-text">${todolist.list}</p>
              </del>
              <p> </p>
              <a href="#" onclick="doneTodoList(${todolist.id})"  class="btn btn-success ">Done</a>
              <a href="#" onclick="editList(${todolist.id})" class="btn btn-primary">Edit</a>
              <a href="#" class="btn btn-danger" onclick="deleteList(${todolist.id})">Delete</a>
              
              
            </div>
        </div>
            `
        }
    })
    

    
}


// functionality for delete todo list.

let deleteList = (id) => {
    let newTodoList = [];

    if(window.confirm("Do You Want to delete the task?")){
        todoArray.forEach( (list) => {
            if(id !== list.id ) newTodoList.push(list);
        });
        setDataToLocalStorage(newTodoList);
        console.log(newTodoList);
    }


    showTodoList();

    // setDataToLocalStorage(todoArray.filter( (list) => list.id === id));
    // showTodoList();
}

// fucntionality for done todo list.

let doneTodoList = (id) => {
    // let updatedTodoList = [];
    todoArray.map( (list) => {
        if(list.id === id){
            if(list.status === 0) return list.status = 1;
            return list.status = 0;
        }
    })

    setDataToLocalStorage(todoArray);
    showTodoList();
}

// edit todoList functionality

let editList = (id) => {
    // alert("clicked " + id)
    let updatedTodoList = window.prompt("Change List");
    // alert(updatedTodoList);
    todoArray.map( (list) => {
        if(list.id === id){
            return list.list = updatedTodoList;
        }
    
    })

    setDataToLocalStorage(todoArray);
    showTodoList();
}




// reset todoList
function resetTodoList(){
    todoArray = [];
    setDataToLocalStorage(todoArray);
    showTodoList();
    idCount = 1;
}











showTodoList();