const PORT = 8080;

// Sign In handler
export async function handleSignIn(email, password) {
    try {
        email = email.trim();
        password = password.trim();
        
        const response = await fetch(`http://localhost:${PORT}/signIn?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        const data = await response.json();
      
        if (!response.ok) {
            alert("Sign in failed: " + data.error || data);
            return null;
        }
        return data.userId 

    } catch (error) {
        console.error("Sign in error:", error);
        alert(`Something went wrong! \n ${error.message}`);
    }
};

export async function handleSignUp(fname, mname, lname, email, password) {
    try {
        fname = fname.trim();
        mname = mname.trim();
        lname = lname.trim();
        email = email.trim();
        password = password.trim();

        const response = await fetch(`http://localhost:${PORT}/signUp`, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ fname, mname, lname, type: 'user', email, pword: password }), 
        }); 
        const data = await response.json();

        if (!response.ok) {
            alert("Sign up failed: " + data.error || data);
            return null;
        }
        return data.userId;

    } catch (error) {
        console.error("Sign in error:", error);
        alert(`Something went wrong! \n ${error.message}`);
    }
};


export async function handleEmailExists(email) {
    try {
        email = email.trim();

        const response = await fetch(`http://localhost:${PORT}/checkEmailExists?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        return data.exists;

    } catch (error) {
        console.error("Sign in error:", error);
        alert(`Something went wrong! \n ${error.message}`);
    }
};

export async function handleGetUser(uid) {
    try {
        //  app.get('/getUserById', controller.getUserById); // input: uid, output: user objec
        const response = await fetch(`http://localhost:${PORT}/getUserById?id=${encodeURIComponent(uid)}`);
        const user = await response.json();
        return user
    } catch (error) {
        console.error("Sign in error:", error);
        alert(`Something went wrong! \n ${error.message}`);
    }
};
