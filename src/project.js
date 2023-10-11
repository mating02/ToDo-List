import { interactWithDOM } from ".";
import { loadCurrentArr } from "./DOMloader";


export const project = ((title, description) => {
    const todoArr = [];
    const Title = title;
    const Description = description;

    return { Title, todoArr, Description };
});

export function displayProjects(arr) {
    const projectContainer = document.getElementById('projectContainer');
    const todoContainer = document.getElementById('toDoContainer');
    todoContainer.innerHTML = '';
    projectContainer.innerHTML = '';
    let index = 0;
    arr.forEach((project) => {
        const projectEntry = document.createElement('div');
        projectEntry.classList.add('projectEntry', 'max-w-full');
        const projectObject = arr[index]; // Assuming yourArray is an array of objects
        projectEntry.projectObject = projectObject; // Attach the object to the DOM element    
        projectEntry.innerHTML = `
        <div class="flex gap-7 md:gap-4 sm:gap-2 items-center justify-center md:text-sm sm:text-xs" id="firstProject">
                                <svg class="w-8 h-8 md:w-6 md:h-6 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><title>bow-arrow</title><path fill="var(--text-color)" d="M19.03 6.03L20 7L22 2L17 4L17.97 4.97L16.15 6.79C10.87 2.16 3.3 3.94 2.97 4L2 4.26L2.5 6.2L3.29 6L10.12 12.82L6.94 16H5L2 19L4 20L5 22L8 19V17.06L11.18 13.88L18 20.71L17.81 21.5L19.74 22L20 21.03C20.06 20.7 21.84 13.13 17.21 7.85L19.03 6.03M4.5 5.78C6.55 5.5 11.28 5.28 14.73 8.21L10.82 12.12L4.5 5.78M18.22 19.5L11.88 13.18L15.79 9.27C18.72 12.72 18.5 17.45 18.22 19.5Z" /></svg>
                                <div id="projectTitle">${project.Title}</div>
                            </div>
                            <div class="flex flex-end gap-4 md:gap-2 sm:gap-1 md:text-sm sm:text-xs items-center justify-center" id="secondProject">
                                <div class="mr-4 ml-2 md:mr-1 sm:mr-0 rounded-lg px-3 md:px-2 font-semibold cursor-pointer details2">Details</div>
                                <svg class="w-8 h-8 md:w-6 md:h-6 sm:w-4 sm:h-4 cursor-pointer pencil2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil-box-multiple-outline</title><path fill="var(--text-color)" d="M4 6H2V20C2 21.11 2.9 22 4 22H18V20H4V6M18.7 7.35L17.7 8.35L15.65 6.3L16.65 5.3C16.86 5.08 17.21 5.08 17.42 5.3L18.7 6.58C18.92 6.79 18.92 7.14 18.7 7.35M9 12.94L15.06 6.88L17.12 8.94L11.06 15H9V12.94M20 4L20 4L20 16L8 16L8 4H20M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" /></svg>
                                <svg class="w-8 h-8 md:w-6 md:h-6 sm:w-4 sm:h-4 cursor-pointer deleteTrash2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path fill="var(--text-color)" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>
                            </div>
        `;
        projectContainer.appendChild(projectEntry);
        projectEntry.addEventListener('dblclick', () => {
            const projectsSidebar = document.querySelectorAll('.newProjectSideBar')
            projectsSidebar.forEach((element) => {
                if(element.projectElement.Title === project.Title){
                    element.click();
                }
            });
        });
        index++;
    });
}

export function displayProjectsSidebar(projectsArr) {
    const allProjects = document.getElementById('allProjects');
    allProjects.innerHTML = `
    <div id="projects" class="flex flex-col items-start justify-center font-bold text-xl sm:text-lg cursor-pointer hover:scale-110 sideText">
    Projects <div class="translate-x-ultNegX bg-white w-20 h-1 underlinerText"></div>
    </div>
    `;
    projectsArr.forEach((project) => {
        const newProject = document.createElement('div');
        newProject.classList.add('sideText', 'newProjectSideBar');
        newProject.innerHTML = `${project.Title} <div class="translate-x-ultNegX bg-white w-20 h-0.5 underlinerText"></div>`;
        const projectElement = project;
        newProject.projectElement = projectElement;
        allProjects.appendChild(newProject);
    });
    interactWithDOM.switchPages();
}