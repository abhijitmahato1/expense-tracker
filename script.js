
/* =================================
   1. GET HTML ELEMENTS
================================= */

const transactionForm = document.getElementById("transaction-form");

const SUPABASE_URL = "https://wpfvtzsbpjnhvlvvzswe.supabase.co";
const SUPABASE_KEY = "sb_publishable_LFPpIatXKh0_w8Ju7LXrmA_v-ySFfll";

const rememberMe = document.getElementById("remember-me");


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    }
);

const submitButton = document.getElementById("submit-btn");
const cancelEditButton = document.getElementById("cancel-edit");

const formTitle = document.getElementById("form-title");
const editingIndicator = document.getElementById("editing-indicator");

const successMessage = document.getElementById("success-message");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const customCategoryInput = document.getElementById("custom-category");
const dateInput = document.getElementById("date");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");

const transactionCountElement = document.getElementById("transaction-count");

const transactionList = document.getElementById("transaction-list");

const clearAllButton = document.getElementById("clear-all-btn");

const searchInput = document.getElementById("search");
const filterType = document.getElementById("filter-type");
const filterCategory = document.getElementById("filter-category");

const clearSearchButton = document.getElementById("clear-search");
const resetFiltersButton = document.getElementById("reset-filters");

const chart = document.getElementById("expense-chart");

const authEmail = document.getElementById("auth-email");
const authPassword = document.getElementById("auth-password");

const confirmPasswordWrapper =
    document.getElementById("confirm-password-wrapper");

const confirmPassword =
    document.getElementById("confirm-password");

const passwordMatchMessage = document.getElementById("password-match-message");

const passwordStrength =
    document.getElementById("password-strength");

const passwordStrengthText =
    document.getElementById("password-strength-text");

const passwordRequirements =
    document.getElementById("password-requirements");

const userCard = document.getElementById("user-card");
const userEmail = document.getElementById("user-email");

const signupButton = document.getElementById("signup-btn");
const loginButton = document.getElementById("login-btn");

const createAccountAction =
    document.getElementById("create-account-action");

const backToLoginButton = document.getElementById("back-to-login-btn");

const newUserSection = document.getElementById("new-user-section");
const logoutButton = document.getElementById("logout-btn");

const forgotPasswordButton = document.getElementById("forgot-password-btn");

const resetPasswordSection =
    document.getElementById("reset-password-section");

const newPassword =
    document.getElementById("new-password");

const confirmNewPassword =
    document.getElementById("confirm-new-password");

const updatePasswordButton =
    document.getElementById("update-password-btn");

const authMessage = document.getElementById("auth-message");


    signupButton.addEventListener("click", function() {

        document.getElementById("auth-title").textContent =
            "Create Your Account";

        document.getElementById("auth-mode-text").textContent =
            "Sign up to start managing your transactions.";

        loginButton.style.display = "none";
        forgotPasswordButton.style.display = "none";
        

        signupButton.style.display = "none";

        createAccountAction.style.display = "inline-block";

        backToLoginButton.style.display = "inline-block";

        confirmPasswordWrapper.style.display = "block";
        passwordStrength.style.display = "flex";

        passwordRequirements.style.display = "block";

        authMessage.textContent = "";

    });


        backToLoginButton.addEventListener("click", function() {

        document.getElementById("auth-title").textContent =
            "Welcome Back";

        document.getElementById("auth-mode-text").textContent =
            "Login to manage your transactions securely.";

        loginButton.style.display = "inline-block";
        forgotPasswordButton.style.display = "block";

        signupButton.style.display = "inline-block";

        createAccountAction.style.display = "none";

        backToLoginButton.style.display = "none";

        confirmPasswordWrapper.style.display = "none";
        confirmPassword.value = "";

        passwordStrength.style.display = "none";
        passwordStrengthText.textContent = "Weak";
        passwordRequirements.style.display = "none";

        passwordMatchMessage.style.display = "none";
        passwordMatchMessage.textContent = "";

        newUserSection.style.display = "block";

        authMessage.textContent = "";

        authEmail.value = "";
        authPassword.value = "";
        confirmPassword.value = "";

        passwordMatchMessage.style.display = "none";
        passwordMatchMessage.textContent = "";

        passwordStrength.style.display = "none";
        passwordStrengthText.textContent = "Weak";
        passwordStrengthText.style.color = "#f87171";

    });


loginButton.addEventListener("click", async function() {

    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (!email || !password) {
        authMessage.textContent =
            "Please enter email and password.";
        return;
    }

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        console.error("Login error:", error);
        authMessage.textContent = error.message;
        return;
    }

        document.getElementById("auth-title").textContent = "Welcome back 👋";
    
        authMessage.textContent = "";

        authEmail.value = "";
        authPassword.value = "";

        authEmail.style.display = "none";
        authPassword.parentElement.style.display = "none";

        loginButton.style.display = "none";
        signupButton.style.display = "none";
        forgotPasswordButton.style.display = "none";
        newUserSection.style.display = "none";

        logoutButton.style.display = "inline-block";

        const { data: { user } } =
            await supabaseClient.auth.getUser();

        if (user) {

            userEmail.textContent = user.email;
            userCard.style.display = "flex";

            const emailName =
                user.email.split("@")[0];

            const displayName =
                emailName.charAt(0).toUpperCase() +
                emailName.slice(1);

            document.getElementById("auth-title").textContent =
                `Welcome back, ${displayName} 👋`;
        }
});

updatePasswordButton.addEventListener("click", async function() {

    const password = newPassword.value;
    const confirmPasswordValue = confirmNewPassword.value;

    if (!password || !confirmPasswordValue) {
        authMessage.textContent =
            "Please fill in both password fields.";
        return;
    }

    if (password !== confirmPasswordValue) {
        authMessage.textContent =
            "Passwords do not match.";
        return;
    }

    if (password.length < 8) {
        authMessage.textContent =
            "Password must be at least 8 characters.";
        return;
    }

    updatePasswordButton.disabled = true;
    updatePasswordButton.textContent = "Updating...";

    const { error } =
        await supabaseClient.auth.updateUser({
            password: password
        });

    if (error) {
        console.error("Password update error:", error);

        authMessage.textContent =
            error.message;

        updatePasswordButton.disabled = false;
        updatePasswordButton.textContent = "Update Password";

        return;
    }

    authMessage.textContent =
        "✅ Password updated successfully!";

    newPassword.value = "";
    confirmNewPassword.value = "";

    updatePasswordButton.disabled = false;
    updatePasswordButton.textContent = "Update Password";
});


forgotPasswordButton.addEventListener("click", async function() {

    const email = authEmail.value.trim();

    if (!email) {
        authMessage.textContent =
            "Please enter your email address first.";
        return;
    }

    const { error } =
        await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin
        });

    if (error) {
        console.error("Password reset error:", error);
        authMessage.textContent = error.message;
        return;
    }

    authMessage.textContent =
        "✅ Password reset link sent. Check your email.";
});


    logoutButton.addEventListener("click", async function() {

        const confirmed = confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmed) {
        return;
    }

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        console.error("Logout error:", error);
        authMessage.textContent = error.message;
        return;
    }

    document.getElementById("auth-title").textContent = "Welcome Back";

    authMessage.textContent = "✅ Logged out successfully!";

    authEmail.style.display = "block";
    authPassword.parentElement.style.display = "block";
    forgotPasswordButton.style.display = "block";

    authPassword.value = "";
    authPassword.type = "password";
    togglePassword.textContent = "Show";

    loginButton.style.display = "inline-block";
    signupButton.style.display = "inline-block";
    logoutButton.style.display = "none";

    userCard.style.display = "none";
    userEmail.textContent = "";
});

    const togglePassword = document.getElementById("toggle-password");

    const toggleConfirmPassword =
        document.getElementById("toggle-confirm-password");

    togglePassword.addEventListener("click", function() {

        if (authPassword.type === "password") {
            authPassword.type = "text";
            togglePassword.textContent = "Hide";
        } else {
            authPassword.type = "password";
            togglePassword.textContent = "Show";
        }

    });


    authPassword.addEventListener("input", function() {

    const password = authPassword.value;

    passwordStrengthText.style.color = "#f87171";

    if (!password) {
        passwordStrengthText.textContent = "Weak";

        passwordRequirements.textContent =
            "Use at least 8 characters, including an uppercase letter, a number, and a special character.";

        return;
    }

    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    passwordRequirements.textContent =
        `${hasLength ? "✓" : "○"} 8+ characters • ` +
        `${hasUppercase ? "✓" : "○"} Uppercase • ` +
        `${hasNumber ? "✓" : "○"} Number • ` +
        `${hasSpecial ? "✓" : "○"} Special character`;

    let score = 0;

    if (hasLength) {
        score++;
    }

    if (hasUppercase) {
        score++;
    }

    if (hasNumber) {
        score++;
    }

    if (hasSpecial) {
        score++;
    }

    if (score <= 1) {

        passwordStrengthText.textContent = "Weak";
        passwordStrengthText.style.color = "#f87171";

    } else if (score <= 3) {

        passwordStrengthText.textContent = "Medium";
        passwordStrengthText.style.color = "#fbbf24";

    } else {

        passwordStrengthText.textContent = "Strong";
        passwordStrengthText.style.color = "#4ade80";

    }

});


confirmPassword.addEventListener("input", function() {

    const password = authPassword.value;
    const confirmValue = confirmPassword.value;

    if (!confirmValue) {
        passwordMatchMessage.style.display = "none";
        return;
    }

    passwordMatchMessage.style.display = "block";

    if (password === confirmValue) {
        passwordMatchMessage.textContent = "✓ Passwords match";
        passwordMatchMessage.style.color = "#4ade80";
    } else {
        passwordMatchMessage.textContent = "✕ Passwords do not match";
        passwordMatchMessage.style.color = "#f87171";
    }

});


confirmPassword.addEventListener("input", function() {

    const password = authPassword.value;
    const confirmValue = confirmPassword.value;

    if (!confirmValue) {
        passwordMatchMessage.style.display = "none";
        return;
    }

    passwordMatchMessage.style.display = "block";

    if (password === confirmValue) {
        passwordMatchMessage.textContent = "✓ Passwords match";
        passwordMatchMessage.style.color = "#4ade80";
    } else {
        passwordMatchMessage.textContent = "✕ Passwords do not match";
        passwordMatchMessage.style.color = "#f87171";
    }

});

    createAccountAction.addEventListener("click", async function() {

    const email = authEmail.value.trim();
    const password = authPassword.value;
    const confirmPasswordValue = confirmPassword.value;

    if (!email || !password || !confirmPasswordValue) {
        authMessage.textContent =
            "Please fill in all fields.";
        return;
    }

    if (password !== confirmPasswordValue) {
        authMessage.textContent =
            "Passwords do not match.";
        return;
    }

    authMessage.textContent = "Creating your account...";

    const { error } = await supabaseClient.auth.signUp({
    email: email,
    password: password
});

if (error) {
    console.error("Signup error:", error);

    authMessage.textContent =
        error.message;

    return;
}

authMessage.textContent =
    "✅ Signup request submitted. Check your email if confirmation is required.";

    authEmail.value = "";
    authPassword.value = "";
    confirmPassword.value = "";

    passwordStrengthText.textContent = "Weak";
    passwordStrengthText.style.color = "#f87171";

});

    toggleConfirmPassword.addEventListener("click", function() {

        if (confirmPassword.type === "password") {
            confirmPassword.type = "text";
            toggleConfirmPassword.textContent = "Hide";
        } else {
            confirmPassword.type = "password";
            toggleConfirmPassword.textContent = "Show";
        }

    });


async function checkAuthSession() {

    if (window.location.hash.includes("type=recovery")) {
        return;
    }

    const { data: { session } } =
        await supabaseClient.auth.getSession();

    if (session) {

        loginButton.style.display = "none";
        signupButton.style.display = "none";
        logoutButton.style.display = "inline-block";

        authMessage.textContent = "";

        newUserSection.style.display = "none";

        authEmail.style.display = "none";
        authPassword.parentElement.style.display = "none";
        forgotPasswordButton.style.display = "none";

        userEmail.textContent = session.user.email;
        userCard.style.display = "flex";

        const emailName =
            session.user.email.split("@")[0];

        const displayName =
            emailName.charAt(0).toUpperCase() +
            emailName.slice(1);

        document.getElementById("auth-title").textContent =
            `Welcome back, ${displayName} 👋`;

    } else {

        loginButton.style.display = "inline-block";
        signupButton.style.display = "inline-block";
        logoutButton.style.display = "none";

    }
}

checkAuthSession();


supabaseClient.auth.onAuthStateChange(async function(event, session) {

    if (event === "PASSWORD_RECOVERY") {

        resetPasswordSection.style.display = "block";

        loginButton.style.display = "none";
        signupButton.style.display = "none";
        logoutButton.style.display = "none";
        forgotPasswordButton.style.display = "none";
        newUserSection.style.display = "none";

        authEmail.style.display = "none";
        authPassword.parentElement.style.display = "none";
        userCard.style.display = "none";

        document.getElementById("auth-title").textContent =
            "Reset Your Password";

        document.getElementById("auth-mode-text").textContent =
            "Enter your new password below.";

        authMessage.textContent = "";

        return;
    }

    if (session) {

        loginButton.style.display = "none";
        signupButton.style.display = "none";
        logoutButton.style.display = "inline-block";

        authMessage.textContent = "✅ You are logged in.";

        await loadTransactions();

    } else {

        loginButton.style.display = "inline-block";
        signupButton.style.display = "inline-block";
        logoutButton.style.display = "none";

        newUserSection.style.display = "block";

        authEmail.style.display = "block";
        authPassword.parentElement.style.display = "block";
        forgotPasswordButton.style.display = "block";

        userCard.style.display = "none";
        userEmail.textContent = "";

        document.getElementById("auth-title").textContent =
            "Welcome Back";

        authMessage.textContent = "";

        transactions = [];
        updateTracker();
    }
});

/* =================================
   CUSTOM CATEGORY
================================= */

categoryInput.addEventListener("change", function() {

    if (categoryInput.value === "Other") {

        customCategoryInput.style.display = "block";
        customCategoryInput.focus();

    } else {

        customCategoryInput.style.display = "none";
        customCategoryInput.value = "";
    }
});



/* =================================
   2. SET DEFAULT DATE
================================= */

function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

dateInput.value = getTodayDate();


/* =================================
   3. LOAD SAVED TRANSACTIONS
================================= */

    let transactions = [];

    async function loadTransactions() {

        const { data: { user } } =
            await supabaseClient.auth.getUser();

        if (!user) {
            transactions = [];
            updateTracker();
            return;
        }
        const { data, error } = await supabaseClient
            .from("transactions")
            .select("*")
            .order("date", { ascending: false });

        if (error) {
            console.error("Error loading transactions:", error);
            return;
        }

        transactions = data || [];

        updateTracker();
    }


/* =================================
   4. SAVE TRANSACTIONS
================================= */

    async function saveTransactionToSupabase(transaction) {
        const { data, error } = await supabaseClient
            .from("transactions")
            .insert([{
                description: transaction.description,
                amount: transaction.amount,
                type: transaction.type,
                category: transaction.category,
                date: transaction.date,
                user_id: transaction.user_id
            }])
            .select()
            .single();

        if (error) {
            console.error("Error saving transaction:", error);
            alert("Failed to save transaction to cloud.");
            return null;
        }

        return data;
    }


/* =================================
   5. ADD TRANSACTION
================================= */

transactionForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    let category = categoryInput.value;

    if (category === "Other") {

    const customCategory = customCategoryInput.value.trim();

    if (customCategory === "") {
        alert("Please enter your custom category.");
        customCategoryInput.focus();
        return;
    }

    category = customCategory;
    }

    const date = dateInput.value;
    if (description === "") {
        alert("Please enter a description.");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid amount greater than zero.");
        return;
    }

    if (!date) {
        alert("Please select a transaction date.");
        return;
    }

const editingId = transactionForm.dataset.editingId;

if (editingId) {

    const transaction = transactions.find(function(transaction) {
        return transaction.id === Number(editingId);
    });

    if (transaction) {

        const { data, error } = await supabaseClient
            .from("transactions")
            .update({
                description: description,
                amount: amount,
                type: type,
                category: category,
                date: date
            })
            .eq("id", Number(editingId))
            .select()
            .single();

        if (error) {
            console.error("Error updating transaction:", error);
            alert("Failed to update transaction.");
            return;
        }

        transaction.description = data.description;
        transaction.amount = data.amount;
        transaction.type = data.type;
        transaction.category = data.category;
        transaction.date = data.date;
    }

    delete transactionForm.dataset.editingId;

    submitButton.textContent = "Add Transaction";
    submitButton.classList.remove("update-mode");

    cancelEditButton.style.display = "none";

    formTitle.textContent = "Add Transaction";
    editingIndicator.style.display = "none";
}

else {

const { data: { user } } =
    await supabaseClient.auth.getUser();

if (!user) {
    alert("Please login before adding a transaction.");
    return;
}

const newTransaction = {
    description: description,
    amount: amount,
    type: type,
    category: category,
    date: date,
    user_id: user.id
};

console.log("NEW TRANSACTION:", newTransaction);
console.log("CURRENT USER ID:", user.id);

const savedTransaction =
    await saveTransactionToSupabase(newTransaction);

if (!savedTransaction) {
    return;
}

transactions.push(savedTransaction);
}


updateTracker();

const wasEditing = editingId;

transactionForm.reset();

if (wasEditing) {
    successMessage.textContent = "✅ Transaction updated successfully!";
} else {
    successMessage.textContent = "✅ Transaction added successfully!";
}

successMessage.style.display = "block";
setTimeout(function() {
    successMessage.style.display = "none";
}, 3000);

    // Restore today's date after resetting the form
    dateInput.value = getTodayDate();

});


/* =================================
   6. UPDATE DASHBOARD
================================= */

function updateTracker() {

    let totalIncome = 0;
    let totalExpense = 0;

    // Calculate totals using ALL transactions
    transactions.forEach(function(transaction) {

        const amount = Number(transaction.amount) || 0;

        if (transaction.type === "income") {
            totalIncome += amount;
        } else if (transaction.type === "expense") {
            totalExpense += amount;
        }
    });

        // Update summary
        const balance = totalIncome - totalExpense;

        balanceElement.textContent = `₹${balance.toFixed(2)}`;
        incomeElement.textContent = `₹${totalIncome.toFixed(2)}`;
        expenseElement.textContent = `₹${totalExpense.toFixed(2)}`;

        transactionCountElement.textContent = transactions.length;

        // Change balance color based on financial status
        balanceElement.classList.remove("positive-balance", "negative-balance");

        if (balance < 0) {
            balanceElement.classList.add("negative-balance");
        } else {
            balanceElement.classList.add("positive-balance");
        }


    /* =================================
       7. SEARCH AND FILTER
    ================================= */

    const searchText = searchInput.value.trim().toLowerCase();
    const selectedType = filterType.value;
    const selectedCategory = filterCategory.value;

    const filteredTransactions = transactions.filter(
        function(transaction) {

            const description = String(transaction.description || "");

            const matchesSearch = description
                .toLowerCase()
                .includes(searchText);

            const matchesType =
                selectedType === "all" ||
                transaction.type === selectedType;

            const matchesCategory =
                selectedCategory === "all" ||
                (transaction.category || "Other") === selectedCategory;

            return matchesSearch && matchesType && matchesCategory;
        }
    );


    /* =================================
       8. DISPLAY TRANSACTIONS
    ================================= */

    transactionList.innerHTML = "";

if (filteredTransactions.length === 0) {

    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-message";

    const messageIcon = document.createElement("div");
    messageIcon.className = "empty-icon";

    const messageTitle = document.createElement("strong");
    const messageDescription = document.createElement("small");

    if (transactions.length === 0) {

        messageIcon.textContent = "💰";
        messageTitle.textContent = "No transactions yet";
        messageDescription.textContent =
            "Add your first transaction to start tracking your money.";

    } else {

        messageIcon.textContent = "🔎";
        messageTitle.textContent = "No matching transactions";
        messageDescription.textContent =
            "Try changing your search or filters.";
    }

    emptyMessage.append(
        messageIcon,
        messageTitle,
        messageDescription
    );

    transactionList.appendChild(emptyMessage);

} else {

        filteredTransactions.forEach(function(transaction) {

            const listItem = document.createElement("li");

            const sign = transaction.type === "income" ? "+" : "-";
            const category = transaction.category || "Other";
            const date = transaction.date || "Date not set";

            const info = document.createElement("div");
            info.className = "transaction-info";

            const title = document.createElement("strong");
            title.textContent = transaction.description || "Untitled";

            const details = document.createElement("small");

            const categoryBadge = document.createElement("span");
            categoryBadge.className = "category-badge";
            categoryBadge.textContent = category;

            const dateText = document.createElement("span");
            dateText.textContent = ` • ${date}`;

            details.append(categoryBadge, dateText);

            info.append(title, details);

            const right = document.createElement("div");
            right.className = "transaction-right";

            const amount = document.createElement("span");
            amount.className = transaction.type;
            amount.textContent =
                `${sign} ₹${Number(transaction.amount).toFixed(2)}`;

            const editButton = document.createElement("button");
            editButton.className = "edit-btn";
            editButton.textContent = "Edit";

            editButton.addEventListener("click", function() {
                editTransaction(transaction.id);
            });


            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function() {

                const confirmed = confirm(
                    `Are you sure you want to delete "${transaction.description}"?`
                );

                if (confirmed) {
                    deleteTransaction(transaction.id);
                }
            });


            right.append(amount, editButton, deleteButton);
            listItem.append(info, right);

            transactionList.appendChild(listItem);
        });
    }


   /* =================================
   9. EXPENSE BREAKDOWN CHART
================================= */

chart.innerHTML = "";

const categoryTotals = {};

transactions.forEach(function(transaction) {

    if (transaction.type === "expense") {

        const category = transaction.category || "Other";
        const amount = Number(transaction.amount) || 0;

        categoryTotals[category] =
            (categoryTotals[category] || 0) + amount;
    }
});

const categories = Object.entries(categoryTotals)
    .sort(function(a, b) {
        return b[1] - a[1];
    });

if (categories.length === 0) {

    chart.textContent =
        "No expenses yet. Add an expense to see your chart.";

} else {

    categories.forEach(function(item) {

        const category = item[0];
        const amount = item[1];

        const percentage = totalExpense > 0
            ? (amount / totalExpense) * 100
            : 0;

        const row = document.createElement("div");
        row.className = "chart-row";

        const label = document.createElement("div");
        label.className = "chart-label";

        const name = document.createElement("span");

        const categoryIcons = {
            Food: "🍔",
            Travel: "✈️",
            Shopping: "🛍️",
            Bills: "🧾",
            Education: "🎓",
            Salary: "💰",
            Other: "📦"
        };

        const icon = categoryIcons[category] || "📌";

        // Show category icon, name and percentage
        name.textContent =
            `${icon} ${category} (${percentage.toFixed(1)}%)`;

        const value = document.createElement("strong");

        // Show amount and percentage
        value.textContent =
            `₹${amount.toFixed(2)} · ${percentage.toFixed(1)}%`;

        label.append(name, value);

        const track = document.createElement("div");
        track.className = "chart-track";

        const bar = document.createElement("div");
        bar.className = "chart-bar";

        // Set bar width according to percentage
        bar.style.width = `${percentage}%`;

        track.appendChild(bar);

        row.append(label, track);

        chart.appendChild(row);
    });
}

}

/* =================================
   10. DELETE TRANSACTION
================================= */

async function deleteTransaction(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {
        return;
    }

    const { error } = await supabaseClient
        .from("transactions")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting transaction:", error);
        alert("Failed to delete transaction.");
        return;
    }

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    updateTracker();
}

function editTransaction(id) {

    const transaction = transactions.find(function(transaction) {
        return transaction.id === id;
    });

    if (!transaction) {
        return;
    }

    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    typeInput.value = transaction.type;
if (
    ["Salary", "Food", "Travel", "Shopping", "Bills", "Education", "Other"]
        .includes(transaction.category)
) {

    categoryInput.value = transaction.category;

    customCategoryInput.value = "";

    customCategoryInput.style.display = "none";

} else {

    categoryInput.value = "Other";

    customCategoryInput.value = transaction.category;

    customCategoryInput.style.display = "block";
}

dateInput.value = transaction.date;

    transactionForm.dataset.editingId = id;

    // Change button to Update mode
    submitButton.textContent = "Update Transaction";
    submitButton.classList.add("update-mode");

    formTitle.textContent = "Edit Transaction";
    editingIndicator.style.display = "block";

    // Show Cancel Edit button
    cancelEditButton.style.display = "block";

    // Scroll smoothly to the form
    document.querySelector(".form-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    // Focus on description field
    setTimeout(function() {
        descriptionInput.focus();
    }, 500);
}

cancelEditButton.addEventListener("click", function() {

    // Remove editing mode
    delete transactionForm.dataset.editingId;

    // Clear the form
    transactionForm.reset();

    typeInput.value = "";
    categoryInput.value = "";
    customCategoryInput.value = "";
    customCategoryInput.style.display = "none";

    // Restore today's date
    dateInput.value = getTodayDate();

    // Restore Add button
    submitButton.textContent = "Add Transaction";
    submitButton.classList.remove("update-mode");

    formTitle.textContent = "Add Transaction";
    editingIndicator.style.display = "none";

    // Hide Cancel button
    cancelEditButton.style.display = "none";

    // Focus on description
    descriptionInput.focus();
});

/* =================================
   11. SEARCH AND FILTER EVENTS
================================= */

searchInput.addEventListener("input", updateTracker);

filterType.addEventListener("change", updateTracker);

filterCategory.addEventListener("change", updateTracker);


clearSearchButton.addEventListener("click", function() {

    searchInput.value = "";

    updateTracker();

    searchInput.focus();
});


resetFiltersButton.addEventListener("click", function() {

    searchInput.value = "";
    filterType.value = "all";
    filterCategory.value = "all";

    updateTracker();
});

clearAllButton.addEventListener("click", async function() {

    if (transactions.length === 0) {
        alert("There are no transactions to clear.");
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to delete ALL transactions? This action cannot be undone."
    );

    if (!confirmed) {
        return;
    }

    const { data: { user } } =
        await supabaseClient.auth.getUser();

    if (!user) {
        alert("Please login before clearing transactions.");
        return;
    }

    const { error } = await supabaseClient
        .from("transactions")
        .delete()
        .eq("user_id", user.id);

if (error) {
    console.error("Error clearing transactions:", error);
    alert("Failed to clear transactions.");
    return;
}

transactions = [];

updateTracker();

    successMessage.textContent = "✅ All transactions cleared successfully!";
    successMessage.style.display = "block";

    setTimeout(function() {
        successMessage.style.display = "none";
    }, 3000);
});


/* =================================
   12. INITIALIZE APPLICATION
================================= */

loadTransactions();

async function testSupabaseConnection() {
    const { data, error } = await supabaseClient
        .from("transactions")
        .select("*");

    if (error) {
        console.error("Supabase connection error:", error.message);
        console.error("Full error:", error);
    } else {
        console.log("Supabase connected successfully:", data);
    }
}

testSupabaseConnection();