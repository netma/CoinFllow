export function watchlistSkeleton(data) {
  return `
    <section class="watchlist">
      <header>
        <ul id="dropdown1" class="dropdown-content">
          <li><a href="" class="logout">Logout</a></li>
        </ul>
        <nav class="light-blue lighten-3">
          <div class="nav-wrapper">
            <a class="brand-logo left" alt=""><img src="../src/img/CoinFllow.svg">CoinFllow</a>
            <a href="" data-activates="mobile-demo" class="button-collapse right"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li><a class="dropdown-button right" href="" data-activates="dropdown1"><i class="material-icons medium left">person</i>${data.userEmail}</a></li>
            </ul>
            <ul class="side-nav" id="mobile-demo">
              <li><span><i class="material-icons small">person</i><span></li>
              <li><span>${data.userEmail}<span></li>
              <li><a class="logout" href="">Logout</a></li>
            </ul>
          </div>
        </nav>
      </header>
      <div id="content">
        <h1>Watch List</h1>
        <ul id="cryptolist" class="collection with-header"></ul>
      </div>
    </section>
  `;
}
