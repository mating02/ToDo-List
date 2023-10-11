export const ToDo = (title, description, dueDate, prio) => {
    const Title = title;
    const Description = description;
    const DueDate = dueDate;
    const Prio = prio;
    return { Title, Description, DueDate, Prio };
}

    export function displayToDos(arr) {
        const todoContainer = document.getElementById('toDoContainer');
        const projectContainer = document.getElementById('projectContainer');
        projectContainer.innerHTML ='';
        todoContainer.innerHTML = '';
        let index = 0;
        arr.forEach((todo) => {
            const toDoEntry = document.createElement('div');
            toDoEntry.classList.add('todoEntry', 'max-w-full');    
            const todoObject = arr[index]; // Assuming yourArray is an array of objects
            toDoEntry.todoObject = todoObject; // Attach the object to the DOM element    
        toDoEntry.innerHTML = `
        <div class="flex gap-7 md:gap-4 sm:gap-2 items-center justify-center md:text-sm sm:text-xs" id="firstToDo">
            <div id="todoTitle">
                <input class="checkBox" type="checkbox" name="title" id="title">
                <label for="title">${todo.Title}</label>
            </div>
            <div class="whitespace-nowrap text-ellipsis min-w-fit">${todo.DueDate}</div>
        </div>
        <div class="flex flex-row gap-4 md:gap-2 sm:gap-1 md:text-sm sm:text-xs items-center justify-center" id="secondToDo">
            <div class="mr-4 ml-2 md:mr-1 sm:mr-0 rounded-lg px-3 md:px-2 font-semibold cursor-pointer details">Details</div>
            <svg class="w-8 h-8 md:w-6 md:h-6 sm:w-4 sm:h-4 cursor-pointer exclam" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--text-color)"><title>exclamation-thick</title><path d="M10 3H14V14H10V3M10 21V17H14V21H10Z" /></svg>
            <svg class="w-8 h-8 md:w-6 md:h-6 sm:w-4 sm:h-4 cursor-pointer pencil" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil-box-multiple-outline</title><path fill="rgb(37, 99, 235)" d="M4 6H2V20C2 21.11 2.9 22 4 22H18V20H4V6M18.7 7.35L17.7 8.35L15.65 6.3L16.65 5.3C16.86 5.08 17.21 5.08 17.42 5.3L18.7 6.58C18.92 6.79 18.92 7.14 18.7 7.35M9 12.94L15.06 6.88L17.12 8.94L11.06 15H9V12.94M20 4L20 4L20 16L8 16L8 4H20M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" /></svg>
            <svg class="w-8 h-8 md:w-6 md:h-6 sm:w-4 sm:h-4 cursor-pointer deleteTrash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path fill="rgb(37, 99, 235)" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>
        </div>
        `;

            todoContainer.appendChild(toDoEntry);
            index++;
        });

    }


export const Checklist = ((arr) => {
    function add(todo) {
        let index = 0;
        let isFirst = true;
        if (arr.length > 0) {
            arr.forEach((element) => {
                const parts = todo.DueDate.split('-');
                const yearToDo = parseInt(parts[0]);
                const monthToDo = parseInt(parts[1]);
                const dayToDo = parseInt(parts[2]);
                const partsEl = element.DueDate.split('-');
                const yearEl = parseInt(partsEl[0]);
                const monthEl = parseInt(partsEl[1]);
                const dayEl = parseInt(partsEl[2]);
                if (yearToDo < yearEl && isFirst || monthToDo < monthEl && yearEl >= yearToDo &&isFirst || dayToDo < dayEl && monthToDo <= monthEl && yearEl >= yearToDo && isFirst) {
                    arr.splice(index, 0, todo);
                    isFirst = false;
                }
                else {
                    index++;
                }
            });
            if(isFirst){arr.splice(index, 0, todo);}
        }
        else {
            arr.push(todo);
        }
    }
    function remove(todo) {
        arr.splice(arr.indexOf(todo), 1);
    }
    return { add, remove };
});