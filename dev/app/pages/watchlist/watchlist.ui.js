export function watchlistSkeleton(data) {
  return `
    <section class="watchlist">
      <header>
        <nav>
          <div class="nav-wrapper">
            <a href="#!" class="brand-logo">CoinFllow</a>

<a class="dropdown-button right" href="#!" data-activates="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a>

            ${data.userEmail}
            <a id="logout" href="">Logout</a>
          </div>
        </nav>
      </header>


    </section>
  `;
}
