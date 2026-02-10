import { createInterface } from "readline";

type Todo = {
  id: number;
  text: string;
  priority: "high" | "medium" | "low";
};

let todos: Todo[] = [];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Add a new todo
const addTodo = (): void => {
  rl.question("Enter task: ", (text: string) => {
    if (text.trim() === "") {
      console.log("Task cannot be empty!\n");
      showMenu();
    } else {
      rl.question("Priority (high/medium/low): ", (priorityInput: string) => {
        const priority = priorityInput.trim().toLowerCase();

        // Validate priority
        if (!["high", "medium", "low"].includes(priority)) {
          console.log("Invalid priority! Using 'low' as default.\n");
        }

        const newTodo: Todo = {
          id: Date.now(),
          text: text.trim(),
          priority: (["high", "medium", "low"].includes(priority)
            ? priority
            : "low") as "high" | "medium" | "low",
        };

        todos.push(newTodo);
        console.log("Task added successfully!\n");
        showMenu();
      });
    }
  });
};

// List all todos
const listTodos = (): void => {
  console.clear();
  console.log("\n=== Todo List App ===");
  console.log("Commands: add, list, remove, exit\n");

  if (todos.length === 0) {
    console.log("No todos yet!\n");
  } else {
    console.log("Your Todos:");
    todos.forEach((todo: Todo) => {
      console.log(`${todo.id}. ${todo.text}`);
    });
    console.log("");
  }

  process.stdout.write("> ");
  rl.question("", (command: string) => {
    handleCommand(command);
  });
};

// Update a todo
const updateTodo = (): void => {
  rl.question("Enter task ID to update: ", (input: string) => {
    const id: number = parseInt(input);

    // Find the todo with matching ID
    const todoToUpdate = todos.find((todo: Todo) => todo.id === id);

    if (!todoToUpdate) {
      console.log("Task not found!\n");
      showMenu();
    } else {
      console.log(`Current task: ${todoToUpdate.text}`);
      rl.question("Enter new task text: ", (newText: string) => {
        if (newText.trim() === "") {
          console.log("Task cannot be empty!\n");
        } else {
          todoToUpdate.text = newText.trim();
          console.log("Task updated successfully!\n");
        }
        showMenu();
      });
    }
  });
};

// Remove a todo
const removeTodo = (): void => {
  rl.question("Enter task ID to remove: ", (input: string) => {
    const id: number = parseInt(input);

    // Use filter to create new array without the todo
    const updatedTodos: Todo[] = todos.filter((todo: Todo) => todo.id !== id);

    if (updatedTodos.length === todos.length) {
      console.log("Task not found!\n");
    } else {
      todos = updatedTodos;
      console.log("Task removed successfully!\n");
    }

    showMenu();
  });
};

// Handle command logic
const handleCommand = (command: string): void => {
  switch (command.trim().toLowerCase()) {
    case "add":
      addTodo();
      break;
    case "list":
      listTodos();
      break;
    case "update":
      updateTodo();
      break;
    case "remove":
      removeTodo();
      break;
    case "exit":
      console.log("Goodbye!");
      rl.close();
      break;
    default:
      console.log("Unknown command\n");
      showMenu();
  }
};

// Show menu and handle commands
const showMenu = (): void => {
  console.clear();
  console.log("\n=== Todo List App ===");
  console.log("Commands: add, list, update, remove, exit\n");
  process.stdout.write("> ");
  rl.question("", (command: string) => {
    handleCommand(command);
  });
};

// Start the app
console.log("\n=== Todo List App ===");
console.log("Commands: add, list, update, remove, exit\n");
showMenu();
