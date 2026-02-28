require("dotenv").config();
const mongoose = require("mongoose");
const Assignment = require("./models/Assignment");

const assignments = [
    {
        title: "Select All Students",
        difficulty: "Easy",
        description:
            "Retrieve every record from the students table to get a full overview of enrolled students.",
        question:
            "Write a SQL query to fetch all students from the students table. Return all columns.",
        tables: [
            {
                tableName: "students",
                columns: [
                    { name: "id", type: "INTEGER" },
                    { name: "name", type: "VARCHAR" },
                    { name: "marks", type: "INTEGER" },
                    { name: "grade", type: "CHAR(1)" },
                ],
                sampleRows: [
                    { id: 1, name: "Rahul Sharma", marks: 92, grade: "A" },
                    { id: 2, name: "Priya Singh", marks: 75, grade: "B" },
                    { id: 3, name: "Anil Kumar", marks: 61, grade: "C" },
                    { id: 4, name: "Sneha Patel", marks: 88, grade: "A" },
                    { id: 5, name: "Pooja Yadav", marks: 54, grade: "D" },
                ],
            },
        ],
    },
    {
        title: "Students Above 80 Marks",
        difficulty: "Easy",
        description:
            "Filter the students table to find high-performers who scored more than 80 marks.",
        question:
            "Write a SQL query to fetch all students who scored more than 80 marks. Return their name, marks, and grade.",
        tables: [
            {
                tableName: "students",
                columns: [
                    { name: "id", type: "INTEGER" },
                    { name: "name", type: "VARCHAR" },
                    { name: "marks", type: "INTEGER" },
                    { name: "grade", type: "CHAR(1)" },
                ],
                sampleRows: [
                    { id: 1, name: "Rahul Sharma", marks: 92, grade: "A" },
                    { id: 2, name: "Priya Singh", marks: 75, grade: "B" },
                    { id: 3, name: "Anil Kumar", marks: 61, grade: "C" },
                    { id: 4, name: "Sneha Patel", marks: 88, grade: "A" },
                    { id: 5, name: "Pooja Yadav", marks: 54, grade: "D" },
                ],
            },
        ],
    },
    {
        title: "Count Orders Per Customer",
        difficulty: "Medium",
        description:
            "Use GROUP BY and COUNT to find how many orders each customer has placed.",
        question:
            "Write a SQL query to count the number of orders placed by each customer. Display customer_id and the count of their orders, ordered from highest to lowest.",
        tables: [
            {
                tableName: "customers",
                columns: [
                    { name: "id", type: "INTEGER" },
                    { name: "name", type: "VARCHAR" },
                    { name: "city", type: "VARCHAR" },
                ],
                sampleRows: [
                    { id: 1, name: "Arjun Mehta", city: "Mumbai" },
                    { id: 2, name: "Kavita Joshi", city: "Delhi" },
                    { id: 3, name: "Vikram Nair", city: "Bangalore" },
                ],
            },
            {
                tableName: "orders",
                columns: [
                    { name: "id", type: "INTEGER" },
                    { name: "customer_id", type: "INTEGER" },
                    { name: "amount", type: "NUMERIC(10,2)" },
                    { name: "order_date", type: "DATE" },
                ],
                sampleRows: [
                    { id: 1, customer_id: 1, amount: 1500.0, order_date: "2024-01-10" },
                    { id: 2, customer_id: 2, amount: 800.5, order_date: "2024-01-12" },
                    { id: 3, customer_id: 1, amount: 2200.0, order_date: "2024-01-15" },
                    { id: 4, customer_id: 3, amount: 450.75, order_date: "2024-01-18" },
                    { id: 5, customer_id: 2, amount: 999.0, order_date: "2024-01-20" },
                ],
            },
        ],
    },
    {
        title: "Find Products in a Price Range",
        difficulty: "Easy",
        description:
            "Use the BETWEEN clause to retrieve products that fall within a specific price range.",
        question:
            "Write a SQL query to find all products whose price is between 200 and 1000 (inclusive). Return product name and price, sorted by price ascending.",
        tables: [
            {
                tableName: "products",
                columns: [
                    { name: "id", type: "INTEGER" },
                    { name: "name", type: "VARCHAR" },
                    { name: "category", type: "VARCHAR" },
                    { name: "price", type: "NUMERIC(10,2)" },
                    { name: "stock", type: "INTEGER" },
                ],
                sampleRows: [
                    { id: 1, name: "Notebook", category: "Stationery", price: 150.0, stock: 200 },
                    { id: 2, name: "USB Hub", category: "Electronics", price: 750.0, stock: 45 },
                    { id: 3, name: "Desk Lamp", category: "Furniture", price: 499.0, stock: 30 },
                    { id: 4, name: "Webcam", category: "Electronics", price: 1800.0, stock: 12 },
                    { id: 5, name: "Pen Pack", category: "Stationery", price: 200.0, stock: 500 },
                ],
            },
        ],
    },
    {
        title: "Join Employees and Departments",
        difficulty: "Medium",
        description:
            "Use INNER JOIN to combine the employees and departments tables and show each employee's department name.",
        question:
            "Write a SQL query to retrieve the employee's name, their salary, and the department name they belong to. Use a JOIN between the employees and departments tables.",
        tables: [
            {
                tableName: "departments",
                columns: [
                    { name: "id", type: "INTEGER" },
                    { name: "dept_name", type: "VARCHAR" },
                ],
                sampleRows: [
                    { id: 1, dept_name: "Engineering" },
                    { id: 2, dept_name: "Marketing" },
                    { id: 3, dept_name: "Finance" },
                ],
            },
            {
                tableName: "employees",
                columns: [
                    { name: "id", type: "INTEGER" },
                    { name: "name", type: "VARCHAR" },
                    { name: "dept_id", type: "INTEGER" },
                    { name: "salary", type: "NUMERIC(10,2)" },
                ],
                sampleRows: [
                    { id: 1, name: "Ravi Kumar", dept_id: 1, salary: 85000.0 },
                    { id: 2, name: "Anita Desai", dept_id: 2, salary: 62000.0 },
                    { id: 3, name: "Sameer Bose", dept_id: 1, salary: 91000.0 },
                    { id: 4, name: "Meena Iyer", dept_id: 3, salary: 74000.0 },
                ],
            },
        ],
    },
    {
        title: "Average Salary by Department",
        difficulty: "Hard",
        description:
            "Combine GROUP BY, AVG, and HAVING to find departments where the average salary exceeds a certain threshold.",
        question:
            "Write a SQL query to find the average salary per department. Only include departments where the average salary is greater than 70000. Display department_id and the average salary rounded to 2 decimal places.",
        tables: [
            {
                tableName: "employees",
                columns: [
                    { name: "id", type: "INTEGER" },
                    { name: "name", type: "VARCHAR" },
                    { name: "dept_id", type: "INTEGER" },
                    { name: "salary", type: "NUMERIC(10,2)" },
                ],
                sampleRows: [
                    { id: 1, name: "Ravi Kumar", dept_id: 1, salary: 85000.0 },
                    { id: 2, name: "Anita Desai", dept_id: 2, salary: 62000.0 },
                    { id: 3, name: "Sameer Bose", dept_id: 1, salary: 91000.0 },
                    { id: 4, name: "Meena Iyer", dept_id: 3, salary: 74000.0 },
                    { id: 5, name: "Deepak Rao", dept_id: 2, salary: 58000.0 },
                    { id: 6, name: "Sunita Verma", dept_id: 3, salary: 80000.0 },
                ],
            },
        ],
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding...");

        await Assignment.deleteMany({});
        console.log("Cleared existing assignments.");

        const inserted = await Assignment.insertMany(assignments);
        console.log(`Seeded ${inserted.length} assignments successfully.`);

        await mongoose.disconnect();
        console.log("Done! MongoDB disconnected.");
    } catch (err) {
        console.error("Seed failed:", err.message);
        process.exit(1);
    }
}

seed();
