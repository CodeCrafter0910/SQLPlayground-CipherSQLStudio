const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.getHint = async (req, res) => {
  try {
    const { question, userQuery } = req.body;

    const prompt = `
You are a SQL tutor helping a student.

Rules:
- Do NOT provide the full SQL solution.
- Do NOT write the complete query.
- Only give conceptual hints.
- Suggest which SQL clause to think about.

Assignment:
${question}

Student's Current Query:
${userQuery || "No query written yet."}

Give a short helpful hint:
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    res.json({
      success: true,
      hint: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Failed to generate hint",
    });
  }
};