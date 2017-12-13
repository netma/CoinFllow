export function userSkeleton(data) {
  return `
    <section>
      <header>
        <button id="logout">Logout</button>
      </header>
      <div id="content">
        <h2 id="time"></h2>
        <h1 id="welcome">${data.greeting} ${data.username}!</h1>
        <ul id="links"></ul>
      </div>
      <footer></footer>
    </section>
    <aside>
      <ul id="editableLinks"></ul>
      <form id="addLink">
        <input type="text" name="label" placeholder="Label">
        <input type="text" name="url" placeholder="URL">
        <button type="submit">Save</button>
      </form>
    </aside>
  `;
}
