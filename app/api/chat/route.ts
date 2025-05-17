import { NextResponse } from "next/server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const prompt = `
  Provide a structured list of substitutes for eggs in bread-making.
  Return the response in JSON format following these rules:

  1. Input Validation:
    - If the input is not a food ingredient, fruit, or vegetable:
      * Check for close matches (e.g., common misspellings).
      * If a match exists, return a success response with a correction suggestion.
      * If no match exists, return an error response.

  2. Response Structure:
    - Success Response (valid ingredient):
      {
        "status": "success",
        "correction": "", // Empty if input is correct
        "ingredient": "[requested_ingredient]",
        "substitutes": [
          {
            "name": "[substitute_name]",
            "ratio": "[usage_ratio]",
            "notes": "[additional_notes]"
          }
        ],
        "tips": [
          "[helpful_tip]"
        ]
      }

    - Success Response (corrected ingredient):
      {
        "status": "success",
        "correction": "Did you mean '[corrected_ingredient]'?",
        "ingredient": "[corrected_ingredient]", // Populate with corrected value
        "substitutes": [...],
        "tips": [...]
      }

    - Error Response (invalid input):
      {
        "status": "error",
        "incorrectInput": "[original_input]",
        "message": "[original_input] is not a valid ingredient."
      }

  Examples:
  
  Valid Input (no correction):
  {
    "status": "success",
    "correction": "",
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

  Corrected Input:
  {
    "status": "success",
    "correction": "Did you mean 'yeast'?",
    "ingredient": "yeast",
    "substitutes": [...],
    "tips": [...]
  }

  Invalid Input:
  {
    "status": "error",
    "incorrectInput": "hello",
    "message": "hello is not a valid ingredient."
  }
`;

export async function POST(request: Request) {
  try {
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
          content: "You are a helpful chef assistant. Return data as JSON.",
        },
        {
          role: "user",
          content: prompt.replace("eggs in bread-making", message),
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const responseMessage =
      chatCompletion.choices[0]?.message?.content || "No response from model";
    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your" },
      { status: 500 }
    );
  }
}
