const getAssignments = (req, res) => {
  const assignments = [
    {
      id: 1,
      title: "Select All Students",
      difficulty: "Easy",
      description: "Write a query to fetch all students from the students table."
    },
    {
      id: 2,
      title: "Students Above 80 Marks",
      difficulty: "Medium",
      description: "Fetch students who scored more than 80 marks."
    }
  ];

  res.json(assignments);
};

module.exports = { getAssignments };