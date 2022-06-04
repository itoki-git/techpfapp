db.createUser({
  user: "foo",
  pwd: "foo-password",
  roles: [{ role: "readWrite", db: "app1" }],
});
