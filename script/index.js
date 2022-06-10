const featuresDropdown = `
<div class="dropdown-item">
    <img class="arrow-down" src="images/icon-todo.svg" alt="arrow down">
    <a href="#">Todo List</a>
</div>
<div class="dropdown-item">
    <img class="arrow-down" src="images/icon-calendar.svg" alt="arrow down">
    <a href="#">Calendar</a>
</div>
<div class="dropdown-item">
    <img class="arrow-down" src="images/icon-reminders.svg" alt="arrow down">
    <a href="#">Reminders</a>
</div>
<div class="dropdown-item">
    <img class="arrow-down" src="images/icon-planning.svg" alt="arrow down">
    <a href="#">Planning</a>
</div>
`

const companiesDropdown = `
<a href="#">History</a>
<a href="#">Our Team</a>
<a href="#">Blog</a>
`

const menuItems = `
<div id="item-features" class="item">
    <a id="features-link" class="link-features" href="#">Features</a>
    <img id="features-arrow-down" class="arrow-down" src="images/icon-arrow-down.svg" alt="arrow down">
    <img id="features-arrow-up" class="arrow-up hide" src="images/icon-arrow-up.svg" alt="arrow up">
</div>
<div id="item-companies" class="item">
    <a id="companies-link" class="link-company" href="#">Company</a>
    <img id="company-arrow-down" class="arrow-down" src="images/icon-arrow-down.svg" alt="arrow down">
    <img id="company-arrow-up" class="arrow-up hide" src="images/icon-arrow-up.svg" alt="arrow up">
</div>
<a class="item-link" href="#">Careers</a>
<a class="item-link" href="#">About</a>
`

const userActions = `
<p class="login">Login</p>
<div class="register"><p>Register</p></div>
`

function createMenu() {
    if (screen.width > 400) {
        const sidenavMenuContainerElement = document.getElementById('sidenav-menu-container');
        if (sidenavMenuContainerElement) {
            sidenavMenuContainerElement.remove();
        }
        const sectionsElement = document.getElementById('menu-items');
        sectionsElement.innerHTML = menuItems;

        const userActionsElement = document.getElementById('user-actions');
        userActionsElement.innerHTML = userActions;

        document.getElementById('features-link').addEventListener('click', () => openFeatures());
        document.getElementById('companies-link').addEventListener('click', () => openCompanies());
    }
}

function openFeatures() {
    this.toggleFeatureArrow();
    const companyDropdownElement = document.getElementById('company-dropdown');
    if (companyDropdownElement) {
        companyDropdownElement.remove();
        this.toggleCompanyArrow();
    }

    const featuresDropdownElement = document.getElementById('features-dropdown');
    if (!featuresDropdownElement) {
        const itemFeaturesElement = document.getElementById('item-features');
        let htmlDivElement = document.createElement('div');
        htmlDivElement.classList.add('dropdown-content');
        htmlDivElement.classList.add('show');
        htmlDivElement.id = 'features-dropdown';
        htmlDivElement.innerHTML = featuresDropdown;
        itemFeaturesElement.appendChild(htmlDivElement);
    } else {
        featuresDropdownElement.remove();
    }
}

function openCompanies() {
    this.toggleCompanyArrow();
    const featuresDropdownElement = document.getElementById('features-dropdown');
    if (featuresDropdownElement) {
        featuresDropdownElement.remove();
        this.toggleFeatureArrow();
    }

    const itemCompanyDropdown = document.getElementById('company-dropdown');
    if (!itemCompanyDropdown) {
        const itemFeaturesElement = document.getElementById('item-companies');
        let htmlDivElement = document.createElement('div');
        htmlDivElement.classList.add('dropdown-content');
        htmlDivElement.classList.add('show');
        htmlDivElement.id = 'company-dropdown';
        htmlDivElement.innerHTML = companiesDropdown;
        itemFeaturesElement.appendChild(htmlDivElement);
    } else {
        itemCompanyDropdown.remove();
    }
}

function toggleFeatureArrow() {
    document.getElementById('features-arrow-up').classList.toggle('hide');
    document.getElementById('features-arrow-down').classList.toggle('hide');
}

function toggleCompanyArrow() {
    document.getElementById('company-arrow-up').classList.toggle('hide');
    document.getElementById('company-arrow-down').classList.toggle('hide');
}

function openSidenav() {
    const sidepanel = document.getElementById("sidepanel");
    sidepanel.style.width = "250px";
    sidepanel.classList.add('sidepanel-shadow');
}

function closeSidenav() {
    const sidepanel = document.getElementById("sidepanel");
    sidepanel.style.width = "0";
    sidepanel.classList.remove('sidepanel-shadow');
}

// Close the dropdown if the user clicks outside it
window.onclick = function(event) {
    if (screen.width <= 400) {
        return;
    }
    const notSections = !event.target.matches('.sections');
    const notItem = !event.target.matches('.item')
    const notLinkFeatures = !event.target.matches('.link-features')
    const notLinkCompany = !event.target.matches('.link-company')
    if (notSections && notItem && notLinkFeatures && notLinkCompany) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].id === 'company-dropdown') {
                this.toggleCompanyArrow();
            }

            if (dropdowns[i].id === 'features-dropdown') {
                this.toggleFeatureArrow();
            }
            dropdowns[i].remove();
        }
    }
}

createMenu()
window.addEventListener('resize', () => createMenu())
