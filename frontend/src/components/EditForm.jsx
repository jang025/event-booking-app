function EditForm() {
  return (
    <form>
      <div>
        <label>New Username: </label>
        <input type="text" placeholder="Enter new username" />
      </div>

      <div>
        <label>New Password: </label>
        <input type="password" placeholder="Enter new password" />
      </div>

      <div>
        <label>Confirm Passwordz: </label>
        <input type="password" placeholder="Confirm new password" />
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditForm;
