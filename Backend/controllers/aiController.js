const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getAISuggestions = async (req, res) => {
    const { title } = req.body;

    // Debugging ke liye check karein ki key load ho rahi hai ya nahi
    console.log("API Key Check:", process.env.GEMINI_API_KEY ? "Key Found" : "Key MISSING");
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // AI Prompt
        const prompt = `As a study assistant, provide 3 short actionable sub-tasks for the student task: "${title}". 
        Return them as a simple JSON array of strings only. Example: ["Task 1", "Task 2", "Task 3"]`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // JSON clean-up (agar AI extra text bhej de)
        const cleanedText = text.substring(text.indexOf("["), text.lastIndexOf("]") + 1);
        const suggestions = JSON.parse(cleanedText);

        res.json({ suggestions });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ message: "AI failed to suggest. Check API Key." });
    }
};