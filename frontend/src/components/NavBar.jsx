function NavBar() {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">SignIn</a></li>
        <li><a href="/signup">SignUp</a></li>
        <li><a href="/users/:userId">Profile </a></li>
      </ul>
    </nav>
  )
}

export default NavBar;
