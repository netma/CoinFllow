export function watchlistSkeleton(data) {
  return `
    <section class="watchlist">
      <header>
        <ul id="dropdown1" class="dropdown-content">
          <li><a href="" class="logout">Logout</a></li>
        </ul>
        <nav class="light-blue lighten-3">
          <div class="nav-wrapper">
            <a class="brand-logo left" alt=""><img src="./src/img/CoinFllow.svg">CoinFllow</a>
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
        <div><a class="left" id="addCryptoList" href=""><i class="material-icons">add</i></a><span class="cryptoListCurrency right">${data.currency}</span></div>
        <ul id="cryptolist" class="collection with-header"></ul>
      </div>
      <div id="modal1" class="modal modal-fixed-footer">
        <div id="add-crypto-content" class="modal-content">
          <i class="material-icons left prefix">attach_money</i>
          <input type="text" id="autocomplete-input" class="autocomplete-coinlist autocomplete" placeholder="Search crypto currency to add">
          <p class="status-msg"></p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
        </div>
      </div>
    </section>
  `;
}
