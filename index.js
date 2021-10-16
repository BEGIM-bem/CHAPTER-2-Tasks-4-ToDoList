const SentBtn = document.querySelector('.ToDoList_btn-sent')
const inputToListDo = document.querySelector('#ToDoList__input')
const ToDoList__content_ul = document.querySelector(".ToDoList__content_ul")


let array = []
let todoItemElems = []

if (localStorage.getItem('todo')) {
    array = JSON.parse(localStorage.getItem('todo'))
    displayMessage1()
}


function add() {
    if (!inputToListDo.value) return

    let newlistToDo = {
        todo: inputToListDo.value,
        checked: false
    }


    array.unshift(newlistToDo)
    displayMessage1()

    localStorage.setItem('todo', JSON.stringify(array))
    inputToListDo.value = '';

}

function displayMessage1() {

    let displayMessage = '';
    array.forEach((item, i) => {
        displayMessage += `
       <li class ='li' ${item.checked ? 'checked' : ''}>
       <input onclick ='Check_checkbox(${i})' type = 'checkbox' id = 'item_${i}' ${item.checked ? 'checked' : ''} >
       <label  for ='item_${i}'> ${item.todo}</label >
    <div class='button'>
        <button onclick='delete_Tasks(${i})' class='delete_btn'>Delete</button>
        <button onclick='edit_Tasks(${i})' class='egit_btn'>Edit</button>
    </div>
       </li > `
        ToDoList__content_ul.innerHTML = displayMessage

    })
    todoItemElems = document.querySelectorAll('.li')

}

SentBtn.addEventListener("click", add)

let li = document.querySelectorAll('.li')



function Check_checkbox(i) {
    console.log("i: ", i)
    array[i].checked = !array[i].checked
    if (array[i].checked) {
        todoItemElems[i].classList.add('checked')
    }
    else {
        todoItemElems[i].classList.remove('checked')
    }
    localStorage.setItem('todo', JSON.stringify(array))

}






let delete_Tasks = item => {
    let check = confirm(`                              Вы уверены что хотите удалить ? `)
    if (check == true) {
        array.splice(item, 1)
        localStorage.setItem('todo', JSON.stringify(array))


        if (array.length == 0) {
            ToDoList__content_ul.innerHTML = array
        }
        displayMessage1()
    }
    else {
        return
    }
}

function edit_Tasks(i) {

    let edit = prompt("Введите изменения. ")


    if (edit) {
        let forLabel1 = ToDoList__content_ul.querySelector('[for=item_' + i + ']');

        forLabel1.innerHTML = edit;

        for (let item = 0; item < array.length; item++) {
            if (item == i) {
                array[i].todo = edit
                localStorage.setItem('todo', JSON.stringify(array))

            }
        }

    }


}













