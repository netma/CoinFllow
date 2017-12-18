export function loginSkeleton(data) {
  return `
    <section class="login">
      <div class="login">
        <h1><img class="logo" src="../src/img/CoinFllow_v2.svg">${data.title}</h1>
        <form id="loginForm">
          <input class="" type="email" name="email" placeholder="Email address">
          <input type="password" name="password" placeholder="Password">
          <button class="btn waves-effect waves-light light-blue lighten-2" type="submit" id="email-sign">Log In</button>
        </form>
        <button class="btn waves-effect waves-light light-blue lighten-2" id="google-sign">Sign in with Google</button>
        <p>
          <a href="" id="switchForm">No account? Sign up here!</a>
        </p>
      <div>
    </section>
  `;
}
