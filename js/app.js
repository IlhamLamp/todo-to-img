// select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("localTODO")

// check if data isn't empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

// load item
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

// clear local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// Todo function
function addToDo(toDo, id, done, trash) {

    // reset
    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";


    const item = `<li class="item"> 
                   <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                   <p class="text ${LINE}">${toDo}</p>
                   <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                 `
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// add an item to the list
document.addEventListener("keyup", function (even) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // if input empty
        if (toDo) {
            addToDo(toDo)

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            // add item to localstorage
            localStorage.setItem("localTODO", JSON.stringify(LIST));

            id++;

        }
        input.value = "";
    }
});

// complete todo
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove todo
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target item
list.addEventListener("click", function (event) {
    const element = event.target; // returm the clicked element inside list
    const elementJob = element.attributes.job.value; // completer or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    // add item to local storgae
    localStorage.setItem("localTODO", JSON.stringify(LIST));
});

// boxShadow
const header = document.querySelector('.header');
header.style.boxShadow = ` rgba(50, 50, 93, 0.25) 0px 0px 100px -20px, 
                            rgba(0, 0, 0, 0.3) 0px 0px 60px -30px,
                             rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`
const content = document.querySelector('.content');
content.style.boxShadow = ` rgba(50, 50, 93, 0.25) 0px 0px 100px -20px, 
                            rgba(0, 0, 0, 0.3) 0px 0px 60px -30px,
                             rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`

// capture html2canvas
document.getElementById("dl-png").onclick = function (save) {
    const capture = document.querySelector(".card");

    // empty the shadow
    header.style.boxShadow = '';
    content.style.boxShadow = '';

    html2canvas(capture).then((canvas) => {
        const base64image = canvas.toDataURL("image/png");

        let anchor = document.createElement("a");
        anchor.setAttribute("href", base64image);
        anchor.setAttribute("download", "my-todo.png");
        anchor.click();
        anchor.remove();
    });
};