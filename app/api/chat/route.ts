import { NextResponse } from "next/server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const prompt = `
  Provide a structured list of substitutes for eggs in bread-making.
  Make sure you return the data in JSON format. 
  Return a JSON object with:
  - "ingredient": The ingredient to replace (e.g., "eggs").
  - "substitutes": An array of objects with "name", "ratio", and "notes".
  - "tips": An array of strings with general advice.

  Example output:
  {
    "ingredient": "eggs",
    "substitutes": [
      {
        "name": "Flaxseed meal",
        "ratio": "1 tbsp + 3 tbsp water",
        "notes": "Let it sit to thicken before use."
      }
    ],
    "tips": [
      "Reduce liquid if using moist substitutes."
    ]
  }
`;

export async function POST(request: Request) {
    try{
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const chatCompletion = await groq.chat.completions.create({
              messages: [
                {
                  role: "system",
                  content: "You are a helpful chef assistant. Return data as JSON."
                },
                {
                  role: "user",
                  content: prompt.replace("eggs in bread-making", message)
                },
              ],
              model: "llama-3.3-70b-versatile",
            });
       

        const responseMessage = chatCompletion.choices[0]?.message?.content || "No response from model";
        return NextResponse.json({ message: responseMessage });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "An error occurred while processing your" },
            { status: 500 }
        );
    }
}