export function cryptodetailsSkeleton(data) {
  return `
    <section class="cryptodetails">
      <header>
        <ul id="dropdown1" class="dropdown-content">
          <li>Connected as ${data.userEmail}</li>
          <li><a href="" class="logout">Logout</a></li>
        </ul>
        <nav class="light-blue lighten-3">
          <div class="nav-wrapper">
            <a href="" class="brand-logo left" alt=""><img src="../src/img/CoinFllow.svg">CoinFllow</a>
            <a href="" data-activates="mobile-demo" class="button-collapse right"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li><a href="" class="watchlist">Watch List</a></li>
              <li><a href="" class="portfolio">Portfolio</a></li>
              <li><a class="dropdown-button right" href="" data-activates="dropdown1"><i class="material-icons medium right">person</i></a></li>
            </ul>
            <ul class="side-nav" id="mobile-demo">
              <li><span><i class="material-icons small">person</i><span></li>
              <li><span>${data.userEmail}<span></li>
              <li><a class="logout" href="">Logout</a></li>
              <li class="divider"></li>
              <li><a href="" class="watchlist">Watch List</a></li>
              <li><a href="" class="portfolio">Portfolio</a></li>
            </ul>
          </div>
        </nav>
      </header>
      <div id="content">
        <a href="" id="cryptodetails-close" class="right"><i class="material-icons">clear</i><a>
        <ul id="cryptodetails" class="collection with-header"></ul>
        <div id="cryptochart"></div>
      </div>
    </section>
  `;
}