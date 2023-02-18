const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 1500); // fake async to send a request on server
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 500);
  },
};

export const signin = (newUser: string, callback: VoidFunction) => {
  return fakeAuthProvider.signin(() => {
    localStorage.setItem("user", newUser);
    callback();
    
  });
};

export const signout = (callback: VoidFunction) => {
  return fakeAuthProvider.signout(() => {
    localStorage.clear();
    callback();
  });
};

