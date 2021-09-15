export default function ({ store, redirect }) {
  if (store.state.token === "user") {
    return redirect("/");
  }

  if (!store.state.token) {
    return redirect("/login?message=login");
  }
}
