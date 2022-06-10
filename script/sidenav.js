const sidenavItems = `
  <div id="features" class="features" onclick="openSidenavFeatures()">
    <span>Features</span>
    <img id="sidenav-features-arrow-down" class="arrow-down" src="images/icon-arrow-down.svg" alt="arrow down">
    <img id="sidenav-features-arrow-up" class="arrow-up hide" src="images/icon-arrow-up.svg" alt="arrow up">
  </div>
  <div id="features-section" class="features-section collapsible">
    <div class="dropdown-item">
      <img class="icon" src="images/icon-todo.svg" alt="arrow down">
      <a class="label" href="#">Todo List</a>
    </div>
    <div class="dropdown-item">
      <img class="icon" src="images/icon-calendar.svg" alt="arrow down">
      <a class="label" href="#">Calendar</a>
    </div>
    <div class="dropdown-item">
      <img class="icon" src="images/icon-reminders.svg" alt="arrow down">
      <a class="label" href="#">Reminders</a>
    </div>
    <div class="dropdown-item">
      <img class="icon" src="images/icon-planning.svg" alt="arrow down">
      <a class="label" href="#">Planning</a>
    </div>
  </div>

  <div id="company" class="company" onclick="openSidenavCompanies()">
    <span>Company</span>
    <img id="sidenav-company-arrow-down" class="arrow-down" src="images/icon-arrow-down.svg" alt="arrow down">
    <img id="sidenav-company-arrow-up" class="arrow-up hide" src="images/icon-arrow-up.svg" alt="arrow up">
  </div>
  <div id="company-section" class="company-section collapsible">
    <a class="label" href="#">History</a>
    <a class="label" href="#">Our Team</a>
    <a class="label" href="#">Blog</a>
  </div>

  <div id="careers" class="careers">Careers</div>
  <div id="about" class="about">About</div>
`;

function renderSidenav() {
    if (screen.width <= 400) {
        const userActionsElement = document.getElementById('sidepanel-user-actions');
        userActionsElement.innerHTML = userActions;

        const featuresExpandableDivElement = document.createElement('div');
        featuresExpandableDivElement.classList.add('sidenav-menu-container');
        featuresExpandableDivElement.id = 'sidenav-menu-container';
        featuresExpandableDivElement.innerHTML = sidenavItems;
        const sectionsElement = document.getElementById('sidepanel-menu-items');
        sectionsElement.appendChild(featuresExpandableDivElement)

        const featureExpansionElement = document.getElementById('features-section');
        featureExpansionElement.style.height = '0';
        featureExpansionElement.style.marginTop = '5%';
        featureExpansionElement.style.marginBottom = '5%';
        featureExpansionElement.setAttribute('data-collapsed', 'true');

        const companyExpansionElement = document.getElementById('company-section');
        companyExpansionElement.style.height = '0';
        companyExpansionElement.style.marginTop = '5%';
        companyExpansionElement.style.marginBottom = '5%';
        companyExpansionElement.setAttribute('data-collapsed', 'true');
    }
}

function expandSection(element) {
    // get the height of the element's inner content, regardless of its actual size
    const sectionHeight = element.scrollHeight;

    // have the element transition to the height of its inner content
    element.style.height = sectionHeight + 'px';

    // when the next css transition finishes (which should be the one we just triggered)
    element.addEventListener('transitionend', function(e) {
        // remove this event listener so it only gets triggered once
        element.removeEventListener('transitionend', arguments.callee);

        // remove "height" from the element's inline styles, so it can return to its initial value
        element.style.height = null;
    });

    // mark the section as "currently not collapsed"
    element.setAttribute('data-collapsed', 'false');
}

function collapseSection(element) {
    // get the height of the element's inner content, regardless of its actual size
    const sectionHeight = element.scrollHeight;

    // temporarily disable all css transitions
    const elementTransition = element.style.transition;
    element.style.transition = '';

    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we
    // aren't transitioning out of 'auto'
    requestAnimationFrame(function() {
        element.style.height = sectionHeight + 'px';
        element.style.transition = elementTransition;

        // on the next frame (as soon as the previous style change has taken effect),
        // have the element transition to height: 0
        requestAnimationFrame(function() {
            element.style.height = 0 + 'px';
        });
    });

    // mark the section as "currently collapsed"
    element.setAttribute('data-collapsed', 'true');
}

function openSidenavFeatures() {
    document.getElementById('sidenav-features-arrow-up').classList.toggle('hide');
    document.getElementById('sidenav-features-arrow-down').classList.toggle('hide');

    const section = document.querySelector('.features-section.collapsible');
    const isCollapsed = section.getAttribute('data-collapsed') === 'true';

    this.handleCollapse(section, isCollapsed);
}

function openSidenavCompanies() {
    document.getElementById('sidenav-company-arrow-up').classList.toggle('hide');
    document.getElementById('sidenav-company-arrow-down').classList.toggle('hide');

    const section = document.querySelector('.company-section.collapsible');
    const isCollapsed = section.getAttribute('data-collapsed') === 'true';

    this.handleCollapse(section, isCollapsed);
}

function handleCollapse(section, isCollapsed) {
    if(isCollapsed) {
        expandSection(section);
        section.setAttribute('data-collapsed', 'false');
        section.style.marginTop = '10%';
        section.style.marginBottom = '10%';
    } else {
        collapseSection(section);
        section.style.marginTop = '5%';
        section.style.marginBottom = '5%';
    }
}

renderSidenav();
window.addEventListener('resize', () => renderSidenav());
