function AuthForm({
  title,
  buttonText,
  redirectText,
  redirectLink,
  handleSubmit,
  handleChange,
  formData,
}) {
  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {title === "Create Account" && (
          <>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit">{buttonText}</button>
      </form>
      <p>
        {redirectText} <a href={redirectLink}>Click here</a>
      </p>
    </div>
  );
}

export default AuthForm;
