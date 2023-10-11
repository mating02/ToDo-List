import './style.css';
import './toDo.js';
import './DOMloader.js';
import './project.js';
import { loadCurrentArr, formHandler } from './DOMloader.js';


/* TO DO:
- factory for todos (to do DOM)
- project adding func (projectDOM module)
- to do adding func (to do DOM)
- loading DOM func for each area (own modules)
- note factory func (note DOM)
- adding nodes func (note DOM)
- clicking func, so all of the modules can get called
 */
export const interactWithDOM = (() => {
    function dropDownMenu() {
        const button = document.getElementById('menu');
        const sidebar = document.getElementById('sidebar');
        const container = document.getElementById('content-container');
        const menuButton = document.querySelector('.menu-icon');
        button.addEventListener('click', () => {
            if (menuButton.classList.contains('active')) {
                setTimeout(() => {
                    sidebar.style.width = "0";
                    container.style.width = "100%";
                    sidebar.classList.toggle('sm:h-0');
                }, 300);
                setTimeout(() => {
                    sidebar.style.opacity = "0";
                }, 300);
            }
            else {
                setTimeout(() => {
                    sidebar.style.width = "30%";
                    container.minWidth = "70%";
                    sidebar.classList.toggle('sm:h-0');
                    sidebar.style.opacity = "1";
                }, 100);
            }
            sidebar.classList.toggle('lg:translate-x-negX');
            sidebar.classList.toggle('sm:translate-y-negY');
            sidebar.classList.toggle('z-under');
            sidebar.classList.toggle('clicked');
            menuButton.classList.toggle('active');
        });

    }

    function lightSwitch() {
        const input = document.getElementById('mode');
        const ball = document.querySelector('.blueBall');
        const picture = document.querySelector('.fillerPic');
        const root = document.documentElement;
        const newTheme = root.className === 'light' ? 'dark' : 'light';
        root.className = newTheme;
        input.addEventListener('click', () => {
            ball.classList.toggle('clicked');
            if (root.className === 'light') {
                root.className = 'dark';
                picture.src = "https://img.freepik.com/vektoren-kostenlos/architekt-der-projektkarikaturbuerokomposition-mit-mann-an-seinem-arbeitsplatz-entwirft-der-flache-illustration-der-ueberstunden-arbeitet_1284-65147.jpg?w=1380&t=st=1696727488~exp=1696728088~hmac=5eaf60ac02e4c06ffccf5909c7b20503af497a78dbe40dc5e332ec243c588599";
            }
            else if (root.className === 'dark') {
                root.className = 'light';
                picture.src = "https://img.freepik.com/vektoren-kostenlos/kollegen-arbeiten-gemeinsam-am-projekt_74855-6308.jpg?w=1380&t=st=1696724950~exp=1696725550~hmac=01c54d31701a77739eed2e68906dbd37e5d776705496149733817de27e1895b8";
            }
        });
    }

    function switchPages() {
        const sideText = document.querySelectorAll('.sideText');
        const underlinerTexts = document.querySelectorAll('.underlinerText');
        sideText.forEach(element => {
            element.addEventListener('click', () => {
                const underliner = element.querySelector('.underlinerText');
                switch (element.id) {
                    case "hometoDo": loadCurrentArr.loadHome().manipulateDOM();
                        break;
                    case "today": loadCurrentArr.loadToday().manipulateDOM();
                        break;
                    case "week": loadCurrentArr.loadWeek().manipulateDOM();
                        break;
                    case "important": loadCurrentArr.loadImportant().manipulateDOM();
                        break;
                    case "projects": loadCurrentArr.loadProjects().manipulateDOM();
                        break;
                    default: loadCurrentArr.loadNewProject(element.projectElement).manipulateDOM();
                }
                underlinerTexts.forEach(el => {
                    el.classList.add('translate-x-ultNegX');
                });
                underliner.classList.remove('translate-x-ultNegX');
            });
        });
    }
    return { dropDownMenu, lightSwitch, switchPages };
})();
window.addEventListener('DOMContentLoaded', () => {
    interactWithDOM.dropDownMenu();
    interactWithDOM.lightSwitch();
    interactWithDOM.switchPages();
    loadCurrentArr.loadHome().manipulateDOM();
    loadCurrentArr.loadSidebar();
    //loadCurrentArr.loadData();
});

//window.addEventListener('beforeunload', loadCurrentArr.saveData());
formHandler().displayForm();



