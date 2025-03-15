import renderToDOM from '../../utils/renderToDom';

const navBar = () => {
  const domString = `
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark mb-5">
    <div class="container-fluid">
        <a class="navbar-brand title" href="#"><span class="logo-span">STICKY</span>WORDS</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="#" id="all-words"> Words <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" id="all-languages">Languages</a>
            </li>
            <div class="dropdown">
              <button class="btn dropdown-toggle" id="wordFilterDropdown" data-bs-toggle="dropdown" aria-expanded="false">Filter Words</button>
              <ul class="dropdown-menu" id="dropdown-options">
                <li><a class="dropdown-item" id="view-pinned">📌 Pinned Words</a></li>
                <li><hr class="dropdown-divider"></li>
                <li>Sort By:</li>
                <li><a class="dropdown-item" id="view-alphabetical"><i class="fa-solid fa-arrow-up-a-z"></i> A to Z </a></li>
                <li><a class="dropdown-item" id="view-newest">Newest</a></li>
                <li><a class="dropdown-item" id="view-oldest">Oldest</a></li>
                <li><hr class="dropdown-divider"></li>
                <li>Language:</li>
                <li id="select-language-dropdown"></li>
              </ul>
            </div>
          </ul>
          <input
              class="form-control mr-sm-2"
              id="search"
              placeholder="Search Words"
              aria-label="Search"
            />
          <span class="navbar-text">            
            <div id="logout-button"></div>
          </span>
        </div>
        </div>
      </nav>`;

  renderToDOM('#navigation', domString);
};

export default navBar;
