const API_BASE_URL = "http://localhost:8000/api/predictor";

export const sendChatMessage = async (message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chatbot/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Failed to get chat response");
    }

    const data = await response.json();
    return data.bot_response;
  } catch (error) {
    console.error("Chat service error:", error);
    throw error;
  }
};
