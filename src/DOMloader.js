import { ToDo, Checklist, displayToDos } from "./toDo.js";
import { displayProjects, project, displayProjectsSidebar } from "./project.js";
import { interactWithDOM } from "./index.js";
import { isThisWeek, isToday } from "date-fns";

function isIncluded(arr, todo2) {
    let toRemoveToDo = null;
    arr.forEach(todo1 => {
        if (todo1.Description === todo2.Description &&
            todo1.Title === todo2.Title &&
            todo1.Prio === todo2.Prio &&
            todo1.DueDate === todo2.DueDate) {
            toRemoveToDo = todo1;
        }
    });
    return toRemoveToDo;
}

function popUpWindow(wholeContent, formContainer) {
    wholeContent.style.filter = 'blur(4px)';
    formContainer.style.zIndex = '2';
    formContainer.style.transform = 'translate(-50%, -50%) scale(1)';
    formContainer.style.opacity = '1';
}

function popDownWindow(wholeContent, formContainer) {
    wholeContent.style.filter = 'blur(0)';
    formContainer.style.zIndex = '-1';
    formContainer.style.transform = 'translate(-50%, -50%) scale(0.8)';
    formContainer.style.opacity = '0';
}

function setSvgHandlers() {
    svgHandler().exclamHandler();
    svgHandler().deleteTrashHandler();
    svgHandler().detailsHandler();
    svgHandler().editHandler();
    svgHandler().deleteProjectTrashHandler();
    svgHandler().editProjectHandler();
    svgHandler().projectDetailsHandler();
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const loadPage = ((arr, containerTitle, nothingToDo, fillerPic) => {
    function manipulateDOM(thisText, projectsArr) {
        if (arr.length !== 0) {
            nothingToDo.classList.add('hidden');
            fillerPic.classList.add('hidden');
        }
        else if (arr.length === 0 && nothingToDo.classList.contains('hidden') && fillerPic.classList.contains('hidden')) {
            nothingToDo.classList.remove('hidden');
            fillerPic.classList.remove('hidden');
        }
        if (thisText !== 'Projects') {
            displayToDos(arr);
        }
        else {
            displayProjects(arr);
        }
        setSvgHandlers();
        containerTitle.textContent = thisText;
    }
    function push(todo) {
        if (arr.length === 0 && !nothingToDo.classList.contains('hidden') && !fillerPic.classList.contains('hidden')) {
            nothingToDo.classList.add('hidden');
            fillerPic.classList.add('hidden');
        }
        Checklist(arr).add(todo);
        loadCurrentArr.saveData();
    }
    function pop(todo) {
        Checklist(arr).remove(todo);
        loadCurrentArr.isAllRemoved();
        loadCurrentArr.saveData();
    }
    return { push, pop, manipulateDOM };
});

export const loadCurrentArr = (() => {
    /*
    let todayArr = [];
    let weekArr = [];
    let importantArr = [];
    let homeArr = [];
    let projectsArr = [];
    */
    let todayArr = JSON.parse(localStorage.getItem('todayArr')) || [];
    let weekArr = JSON.parse(localStorage.getItem('weekArr')) || [];
    let importantArr = JSON.parse(localStorage.getItem('importantArr')) || [];
    let homeArr = JSON.parse(localStorage.getItem('homeArr')) || [];
    let projectsArr = JSON.parse(localStorage.getItem('projectsArr')) || [];

    function saveData() {
        localStorage.setItem('todayArr', JSON.stringify(todayArr));
        localStorage.setItem('weekArr', JSON.stringify(weekArr));
        localStorage.setItem('importantArr', JSON.stringify(importantArr));
        localStorage.setItem('homeArr', JSON.stringify(homeArr));
        localStorage.setItem('projectsArr', JSON.stringify(projectsArr));
    }

    // Define a function to retrieve data from Local Storage
    function loadData() {
        todayArr = JSON.parse(localStorage.getItem('todayArr')) || [];
        weekArr = JSON.parse(localStorage.getItem('weekArr')) || [];
        importantArr = JSON.parse(localStorage.getItem('importantArr')) || [];
        homeArr = JSON.parse(localStorage.getItem('homeArr')) || [];
        projectsArr = JSON.parse(localStorage.getItem('projectsArr')) || [];
    }

    loadData();

    const loadToday = (() => {
        const containerTitle = document.getElementById('containerTitle');
        const nothingToDo = document.querySelector('.nothingToDo');
        const fillerPic = document.querySelector('.fillerPic');
        function manipulateDOM() {
            loadPage(todayArr, containerTitle, nothingToDo, fillerPic).manipulateDOM('Today', projectsArr);
        }
        function push(todo) {
            loadPage(todayArr, containerTitle, nothingToDo, fillerPic).push(todo);
        }
        function pop(todo) {
            loadPage(todayArr, containerTitle, nothingToDo, fillerPic).pop(todo);
        }
        return { push, pop, manipulateDOM };
    });
    // -> Week DOM
    const loadWeek = (() => {
        const containerTitle = document.getElementById('containerTitle');
        const nothingToDo = document.querySelector('.nothingToDo');
        const fillerPic = document.querySelector('.fillerPic');
        function manipulateDOM() {
            loadPage(weekArr, containerTitle, nothingToDo, fillerPic).manipulateDOM('This Week', projectsArr);
        }
        function push(todo) {
            loadPage(weekArr, containerTitle, nothingToDo, fillerPic).push(todo);
        }
        function pop(todo) {
            loadPage(weekArr, containerTitle, nothingToDo, fillerPic).pop(todo);
        }
        return { push, pop, manipulateDOM };
    });

    // Important

    const loadImportant = (() => {
        const containerTitle = document.getElementById('containerTitle');
        const nothingToDo = document.querySelector('.nothingToDo');
        const fillerPic = document.querySelector('.fillerPic');
        function manipulateDOM() {
            loadPage(importantArr, containerTitle, nothingToDo, fillerPic).manipulateDOM('Important', projectsArr);
        }
        function push(todo) {
            loadPage(importantArr, containerTitle, nothingToDo, fillerPic).push(todo);
        }
        function pop(todo) {
            loadPage(importantArr, containerTitle, nothingToDo, fillerPic).pop(todo);
        }
        return { push, pop, manipulateDOM };
    });

    const loadHome = (() => {
        const containerTitle = document.getElementById('containerTitle');
        const nothingToDo = document.querySelector('.nothingToDo');
        const fillerPic = document.querySelector('.fillerPic');
        function manipulateDOM() {
            loadPage(homeArr, containerTitle, nothingToDo, fillerPic).manipulateDOM('Home', projectsArr);
        }
        function push(todo) {
            loadPage(homeArr, containerTitle, nothingToDo, fillerPic).push(todo);
        }
        function pop(todo) {
            loadPage(homeArr, containerTitle, nothingToDo, fillerPic).pop(todo);
        }
        return { push, pop, manipulateDOM };
    });

    // projects DOM

    const loadProjects = (() => {
        const containerTitle = document.getElementById('containerTitle');
        const nothingToDo = document.querySelector('.nothingToDo');
        const fillerPic = document.querySelector('.fillerPic');
        function manipulateDOM() {
            loadPage(projectsArr, containerTitle, nothingToDo, fillerPic).manipulateDOM('Projects', projectsArr);
        }
        function push(project) {
            if (projectsArr.length === 0 && !nothingToDo.classList.contains('hidden') && !fillerPic.classList.contains('hidden')) {
                nothingToDo.classList.add('hidden');
                fillerPic.classList.add('hidden');
            }
            projectsArr.push(project);
            displayProjectsSidebar(projectsArr);
            loadCurrentArr.saveData();
        }
        function pop(project) {
            projectsArr.splice(projectsArr.indexOf(project), 1);
            if (projectsArr.length === 0 && nothingToDo.classList.contains('hidden') && fillerPic.classList.contains('hidden')) {
                nothingToDo.classList.remove('hidden');
                fillerPic.classList.remove('hidden');
            }
            project.todoArr = null;
            loadCurrentArr.saveData();
            displayProjectsSidebar(projectsArr);
        }
        return { push, pop, manipulateDOM };
    });

    const loadNewProject = ((project) => {
        const containerTitle = document.getElementById('containerTitle');
        const nothingToDo = document.querySelector('.nothingToDo');
        const fillerPic = document.querySelector('.fillerPic');
        function manipulateDOM() {
            loadPage(project.todoArr, containerTitle, nothingToDo, fillerPic).manipulateDOM(project.Title, projectsArr);
        }
        function push(todo) {
            loadPage(project.todoArr, containerTitle, nothingToDo, fillerPic).push(todo);
        }
        function pop(todo) {
            loadPage(project.todoArr, containerTitle, nothingToDo, fillerPic).pop(todo);
        }
        return { push, pop, manipulateDOM };
    });

    function loadCurrentPage(newToDo) {
        const containerTitle = document.getElementById('containerTitle');
        if (containerTitle.textContent === 'Home') {
            loadHome().push(newToDo);

            if (isThisWeek(new Date(newToDo.DueDate))) {
                // If the selected date is outside of this week, clear the input
                loadWeek().push(newToDo);
            }
            if (isToday(new Date(newToDo.DueDate))) {
                loadToday().push(newToDo);
            }
            if (newToDo.Prio === true) {
                loadImportant().push(newToDo);
            }
            displayToDos(homeArr);
        }
        else if (containerTitle.textContent === 'Today') {
            loadHome().push(newToDo);
            loadToday().push(newToDo);
            if (newToDo.Prio === true) {
                loadImportant().push(newToDo);
            }
            loadWeek().push(newToDo);
            displayToDos(todayArr);
        }
        else if (containerTitle.textContent === 'This Week') {
            loadHome().push(newToDo);

            loadWeek().push(newToDo);
            if (newToDo.Prio === true) {
                loadImportant().push(newToDo);

            }
            if (isToday(new Date(newToDo.DueDate))) {
                loadToday().push(newToDo);
            }
            displayToDos(weekArr);
        }
        else if (containerTitle.textContent === 'Important') {
            loadHome().push(newToDo);
            if (isToday(new Date(newToDo.DueDate))) {
                loadToday().push(newToDo);
            }
            if (isThisWeek(new Date(newToDo.DueDate))) {
                // If the selected date is outside of this week, clear the input
                loadWeek().push(newToDo);
            }
            loadImportant().push(newToDo);
            displayToDos(importantArr);
        }
        else if (containerTitle.textContent === 'Projects') {
            loadProjects().push(newToDo)
            displayProjects(projectsArr);
        }
        else {
            loadHome().push(newToDo);

            if (isThisWeek(new Date(newToDo.DueDate))) {
                // If the selected date is outside of this week, clear the input
                loadWeek().push(newToDo);
            }
            if (isToday(new Date(newToDo.DueDate))) {
                loadToday().push(newToDo);
            }
            if (newToDo.Prio === true) {
                loadImportant().push(newToDo);
            }
            projectsArr.forEach((element) => {
                if (element.Title === containerTitle.textContent) {
                    loadNewProject(element).push(newToDo);
                    displayToDos(element.todoArr);
                }
            });
        }
        displayProjectsSidebar(projectsArr);
        setSvgHandlers();
    }
    function LoadReferringPage(arr, nothingToDo, fillerPic) {
        if (arr.length === 0 && nothingToDo.classList.contains('hidden') && fillerPic.classList.contains('hidden')) {
            nothingToDo.classList.remove('hidden');
            fillerPic.classList.remove('hidden');
        }
        displayToDos(arr);
    }

    function isAllRemoved() {
        const containerTitle = document.getElementById('containerTitle');
        const nothingToDo = document.querySelector('.nothingToDo');
        const fillerPic = document.querySelector('.fillerPic');
        if (containerTitle.textContent === 'Home') {
            LoadReferringPage(homeArr, nothingToDo, fillerPic);
        }
        else if (containerTitle.textContent === 'Today') {
            LoadReferringPage(todayArr, nothingToDo, fillerPic);
        }
        else if (containerTitle.textContent === 'This Week') {
            LoadReferringPage(weekArr, nothingToDo, fillerPic);
        }
        else if (containerTitle.textContent === 'Important') {
            LoadReferringPage(importantArr, nothingToDo, fillerPic);
        }
        else if (containerTitle.textContent === 'Projects') {
            if (projectsArr.length === 0 && nothingToDo.classList.contains('hidden') && fillerPic.classList.contains('hidden')) {
                nothingToDo.classList.remove('hidden');
                fillerPic.classList.remove('hidden');
            }
            displayProjects(projectsArr);
        }
        else {
            let thisProject;
            projectsArr.forEach((element) => {
                if (element.Title === containerTitle.textContent) {
                    thisProject = element;
                }
            });
            LoadReferringPage(thisProject.todoArr, nothingToDo, fillerPic);
        }
        setSvgHandlers();
    }

    function removeToDoEverywhere(todo) {
        const containerTitle = document.getElementById('containerTitle');
        if (isIncluded(homeArr, todo) !== null) {
            loadHome().pop(isIncluded(homeArr, todo));
        }
        if (isIncluded(todayArr, todo) !== null) {
            loadToday().pop(isIncluded(todayArr, todo));
        }
        if (isIncluded(weekArr, todo) !== null) {
            loadWeek().pop(isIncluded(weekArr, todo));
        }
        if (isIncluded(importantArr, todo) !== null) {
            loadImportant().pop(isIncluded(importantArr, todo));
        }
        projectsArr.forEach((element) => {
            let toRemoveToDo = isIncluded(element.todoArr, todo);
            if (toRemoveToDo !== null) {
                loadNewProject(element).pop(toRemoveToDo);
            }
            if (element.Title === containerTitle.textContent) {
                displayToDos(element.todoArr);
            }
        });
        setSvgHandlers();
    }

    function checkNameExistentProject(title) {
        let isNameExistent = false;
        projectsArr.forEach((element) => {
            if (element.Title === title.value) {
                isNameExistent = true;
            }
        });
        if (title.value.length >= 16) {
            isNameExistent = true;
        }

        return isNameExistent;
    }
    function deleteAndDisplayProjects(pro) {
        loadProjects().pop(pro);
        displayProjects(projectsArr);
        setSvgHandlers();
    }
    function loadSidebar() {
        displayProjectsSidebar(projectsArr);
    }
    function setAllExclam(bool, todo) {
        if (isIncluded(homeArr, todo) !== null) {
            let homeArrExclam = isIncluded(homeArr, todo);
            homeArrExclam.Prio = bool;
        }
        if (isIncluded(todayArr, todo) !== null) {
            let todayArrExclam = isIncluded(todayArr, todo);
            todayArrExclam.Prio = bool;
        }
        if (isIncluded(weekArr, todo) !== null) {
            let weekArrExclam = isIncluded(weekArr, todo);
            weekArrExclam.Prio = bool;
        }
        if (isIncluded(importantArr, todo) !== null) {
            let importantArrExclam = isIncluded(importantArr, todo);
            importantArrExclam.Prio = bool;
        }
        projectsArr.forEach((element) => {
            let toRemoveToDo = isIncluded(element.todoArr, todo);
            if (toRemoveToDo !== null) {
                toRemoveToDo.Prio = bool;
            }
        });
        setSvgHandlers();
    }

    function setAllEdited(todo, title, description, date, prio, newTodo) {
        let homeArrExclam = isIncluded(homeArr, todo);
        let todayArrExclam = isIncluded(todayArr, todo);
        let weekArrExclam = isIncluded(weekArr, todo);
        let importantArrExclam = isIncluded(importantArr, todo);

        if (homeArrExclam !== null) {
            loadHome().pop(homeArrExclam);
            loadHome().push(newTodo);
        }
        if (todayArrExclam !== null && !(isToday(new Date(date)))) {
            loadToday().pop(todayArrExclam);
        }
        else if (todayArrExclam === null && (isToday(new Date(date)))) {
            loadToday().push(newTodo);
        }
        else if (todayArrExclam !== null && (isToday(new Date(date)))) {
            loadToday().pop(todayArrExclam);
            loadToday().push(newTodo);
        }
        if (weekArrExclam !== null && !(isThisWeek(new Date(date)))) {
            loadWeek().pop(weekArrExclam);
        }
        else if (weekArrExclam === null && (isThisWeek(new Date(date)))) {
            loadWeek().push(newTodo);
        }
        else if (weekArrExclam !== null && (isThisWeek(new Date(date)))) {
            loadWeek().pop(weekArrExclam);
            loadWeek().push(newTodo);
        }
        if (importantArrExclam !== null && !prio) {
            loadImportant().pop(importantArrExclam);
        }
        else if (importantArrExclam === null && prio) {
            loadImportant().push(newTodo);
        }
        else if (importantArrExclam !== null && prio) {
            loadImportant().pop(importantArrExclam);
            loadImportant().push(newTodo);
        }
        projectsArr.forEach((element) => {
            let toRemoveToDo = isIncluded(element.todoArr, todo);
            if (toRemoveToDo !== null) {
                loadNewProject(element).pop(toRemoveToDo);
                loadNewProject(element).push(newTodo);
            }
        });
        setSvgHandlers();
    }

    return { loadCurrentPage, loadHome, loadImportant, loadToday, loadWeek, loadProjects, isAllRemoved, removeToDoEverywhere, loadNewProject, checkNameExistentProject, deleteAndDisplayProjects, loadData, saveData, loadSidebar, setAllExclam, projectsArr, setAllEdited }

})();
// -> Today DOM

const svgHandler = (() => {

    function exclamHandler() {
        const ToDos = document.querySelectorAll('.todoEntry');
        ToDos.forEach((todo) => {
            const exclamSvg = todo.querySelector('.exclam');
            if (todo.todoObject.Prio === true) {
                exclamSvg.style.fill = 'red';
            }
            exclamSvg.addEventListener('click', () => {
                if (todo.todoObject.Prio !== true) {
                    exclamSvg.style.fill = 'red';
                    loadCurrentArr.setAllExclam(true, todo.todoObject);
                    loadCurrentArr.loadImportant().push(todo.todoObject);
                }
                else {
                    exclamSvg.style.fill = 'var(--text-color)';
                    loadCurrentArr.setAllExclam(false, todo.todoObject);
                    loadCurrentArr.loadImportant().pop(todo.todoObject);
                }
            });
        });
    }

    function deleteTrashHandler() {
        const ToDos = document.querySelectorAll('.todoEntry');
        ToDos.forEach((todo) => {
            const deleteTrash = todo.querySelector('.deleteTrash');
            deleteTrash.addEventListener('click', () => {
                loadCurrentArr.removeToDoEverywhere(todo.todoObject);
            });
        });
    }
    function deleteProjectTrashHandler() {
        const projects = document.querySelectorAll('.projectEntry');
        projects.forEach((pro) => {
            const deleteTrash = pro.querySelector('.deleteTrash2');
            deleteTrash.addEventListener('click', () => {
                loadCurrentArr.deleteAndDisplayProjects(pro.projectObject);
            });
        });
    }

    function detailsHandler() {
        const ToDos = document.querySelectorAll('.todoEntry');
        const wholeContent = document.getElementById('wholeContent');
        const detailsBox = document.querySelector('.detailsBox');
        const closeBox = document.querySelector('.closeBox');
        const titlePlace = document.getElementById('reservedForTitle');
        const datePlace = document.getElementById('reservedForDate');
        const descriptionPlace = document.getElementById('reservedForDescription');
        const importantPlace = document.getElementById('reservedForImportant');
        ToDos.forEach((todo) => {
            const details = todo.querySelector('.details');
            details.addEventListener('click', () => {
                titlePlace.textContent = todo.todoObject.Title;
                datePlace.textContent = todo.todoObject.DueDate;
                descriptionPlace.textContent = todo.todoObject.Description;
                importantPlace.textContent = todo.todoObject.Prio;

                popUpWindow(wholeContent, detailsBox);
            });
        });
        closeBox.addEventListener('click', () => {
            popDownWindow(wholeContent, detailsBox);
        });
    }

    function editHandler() {
        // für jedes Arr: Gucke ob Eintrag vorhanden
        // -> Falls ja: ändern

        const form = document.querySelector('.formHolder2');
        const formContainer = document.getElementById('formContainer2');
        const wholeContent = document.getElementById('wholeContent');
        const closeForm = document.querySelector('.closeForm2');
        const containerTitle = document.getElementById('containerTitle');
        const ToDos = document.querySelectorAll('.todoEntry');
        const ToDoDateInput = document.getElementById('ToDoDate2');
        const titleInput = document.getElementById('titleToDo2');
        const descriptionInput = document.getElementById('ToDoDescription2');
        const importantInput = document.getElementById('importantToDo2');

        ToDoDateInput.addEventListener('input', () => {
            if (containerTitle.textContent === "This Week" && !(isThisWeek(new Date(ToDoDateInput.value)))) {
                if (ToDoDateInput.value !== '') {
                    ToDoDateInput.value = '';
                    alert('The given date is not within this week.');
                }
            }
        });
        closeForm.addEventListener('click', () => {
            popDownWindow(wholeContent, formContainer);
        });

        ToDos.forEach((todo) => {
            const pencil = todo.querySelector('.pencil');
            const thisTodoObject = todo.todoObject;
            pencil.thisTodoObject = thisTodoObject;
            pencil.addEventListener('click', (event) => {
                titleInput.value = todo.todoObject.Title;
                ToDoDateInput.value = todo.todoObject.DueDate;
                descriptionInput.value = todo.todoObject.Description;
                importantInput.checked = todo.todoObject.Prio;

                popUpWindow(wholeContent, formContainer);

                form.addEventListener('submit', (ev) => {
                    ev.preventDefault();
                    if (event.target === pencil && formContainer.style.opacity === '1') {
                        let date;
                        if (containerTitle.textContent === 'Today') {
                            date = formatDate(new Date());
                        }
                        else {
                            date = ToDoDateInput.value;
                        }
                        todo.todoObject.Title = titleInput.value;
                        todo.todoObject.Description = descriptionInput.value;
                        todo.todoObject.Prio = importantInput.checked;
                        todo.todoObject.DueDate = date;
                        loadCurrentArr.setAllEdited(pencil.thisTodoObject, titleInput.value, descriptionInput.value, date, importantInput.checked, todo.todoObject);
                        
                        loadCurrentArr.saveData();
                        // loadCurrentArr.isAllRemoved();
                        popDownWindow(wholeContent, formContainer);
                    }
                });
            });
        });

    }

    function editProjectHandler() {
        const formEditPro = document.querySelector('.formHolderEditPro');
        const formContainerEditPro = document.getElementById('formContainerEditPro');

        const wholeContent = document.getElementById('wholeContent');
        const closeFormEditPro = document.querySelector('.closeFormEditPro');
        const titleInput = document.getElementById('titleToDoEditPro');
        const projects = document.querySelectorAll('.projectEntry');
        const descriptionInput = document.getElementById('ToDoDescriptionEditPro');
        closeFormEditPro.addEventListener('click', () => {
            popDownWindow(wholeContent, formContainerEditPro);
        });

        projects.forEach((pro) => {
            const pencil = pro.querySelector('.pencil2');
            pencil.addEventListener('click', (event) => {
                titleInput.value = pro.projectObject.Title;
                descriptionInput.value = pro.projectObject.Description;
                formEditPro.addEventListener('submit', (ev) => {
                    ev.preventDefault();
                    if (event.target === pencil) {
                        pro.projectObject.Title = titleInput.value;
                        pro.projectObject.Description = descriptionInput.value;

                        loadCurrentArr.isAllRemoved();
                        displayProjectsSidebar(loadCurrentArr.projectsArr);
                        popDownWindow(wholeContent, formContainerEditPro);
                        loadCurrentArr.saveData();
                        setSvgHandlers();
                    }
                });

                popUpWindow(wholeContent, formContainerEditPro);
            });
        });
    }
    function projectDetailsHandler() {
        const projects = document.querySelectorAll('.projectEntry');
        const wholeContent = document.getElementById('wholeContent');
        const projectDetailsBox = document.getElementById('projectDetailsBox');
        const closeBox = document.querySelector('.projectDetailsClose');
        const titlePlace = document.getElementById('reservedForTitlePro');
        const descriptionPlace = document.getElementById('reservedForDescriptionPro');
        projects.forEach((pro) => {
            const details = pro.querySelector('.details2');
            details.addEventListener('click', () => {
                titlePlace.textContent = pro.projectObject.Title;
                descriptionPlace.textContent = pro.projectObject.Description;

                popUpWindow(wholeContent, projectDetailsBox);
            });
        });
        closeBox.addEventListener('click', () => {
            popDownWindow(wholeContent, projectDetailsBox);
        });
    }

    return { exclamHandler, deleteTrashHandler, detailsHandler, editHandler, deleteProjectTrashHandler, editProjectHandler, projectDetailsHandler };
});


export const formHandler = (() => {

    function displayForm() {
        document.addEventListener('DOMContentLoaded', () => {
            const form = document.querySelector('.formHolder');
            const form3 = document.querySelector('.formHolder3');
            const formContainer = document.getElementById('formContainer');
            const formContainer3 = document.getElementById('formContainer3');

            const wholeContent = document.getElementById('wholeContent');
            const formBtn = document.getElementById('formBtn');
            const closeForm = document.querySelector('.closeForm');
            const closeForm3 = document.querySelector('.closeForm3');
            const containerTitle = document.getElementById('containerTitle');

            const ToDoDateInput = document.getElementById('ToDoDate');
            const titleToDo3 = document.getElementById('titleToDo3');

            ToDoDateInput.addEventListener('input', () => {
                if (containerTitle.textContent = "This Week" && !(isThisWeek(new Date(ToDoDateInput.value)))) {
                    ToDoDateInput.value = '';
                    alert('The given date is not within this week.');
                }
            });

            form.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent the default form submission behavior

                const title = document.getElementById('titleToDo').value;
                let date;
                const description = document.getElementById('ToDoDescription').value;
                const isImportant = document.getElementById('importantToDo').checked;
                if (containerTitle.textContent === 'Today') {
                    date = formatDate(new Date());
                }
                else {
                    date = document.getElementById('ToDoDate').value;
                }
                // Perform your custom actions with the form data here
                const newToDo = ToDo(title, description, date, isImportant);
                loadCurrentArr.loadCurrentPage(newToDo);

                popDownWindow(wholeContent, formContainer);
            });
            form3.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent the default form submission behavior

                if (loadCurrentArr.checkNameExistentProject(titleToDo3)) {
                    titleToDo3.value = '';
                    alert('Invalid name. Make sure to choose a new name with less than 16 letters.');
                }
                else {
                    const title = document.getElementById('titleToDo3').value;
                    const description = document.getElementById('ToDoDescription3').value;
                    // Perform your custom actions with the form data here
                    const newProject = project(title, description);

                    loadCurrentArr.loadCurrentPage(newProject);
                    popDownWindow(wholeContent, formContainer3);
                }
            });
            formBtn.addEventListener('click', () => {
                if (containerTitle.textContent !== 'Projects') {
                    const DateContainer = document.getElementById('DateContainer');
                    const importantToDo = document.getElementById('importantToDo');
                    if (containerTitle.textContent === 'Today') {
                        DateContainer.innerHTML = '';
                    }

                    else if (containerTitle.textContent === 'Important') {
                        importantToDo.checked = true;
                        importantToDo.disabled = true;
                        DateContainer.innerHTML = `
                    <label for="ToDoDate">Due:</label>
                <input type="date" id="ToDoDate" name="date" required>
                    `;
                    }
                    else {
                        importantToDo.checked = false;
                        importantToDo.disabled = false;
                        DateContainer.innerHTML = `
                    <label for="ToDoDate">Due:</label>
                <input type="date" id="ToDoDate" name="date" required>
                    `;
                    }
                    popUpWindow(wholeContent, formContainer);
                }
                else {
                    popUpWindow(wholeContent, formContainer3);
                }
            });

            closeForm.addEventListener('click', () => {
                popDownWindow(wholeContent, formContainer);
            });
            closeForm3.addEventListener('click', () => {
                popDownWindow(wholeContent, formContainer3);
            });

        });
    }
    return { displayForm };
});