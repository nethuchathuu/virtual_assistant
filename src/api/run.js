let controller = null;

async function run(prompt) {
  if (controller) {
    controller.abort(); // Abort previous request if any
  }
  controller = new AbortController();

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt, {
      signal: controller.signal, // <-- Attach abort controller
    });
    return result.response.text();
  } catch (error) {
    if (error.name === 'AbortError') {
      return "⛔ Response stopped.";
    }
    throw error;
  }
}

// Allow external stop
export function stopAIResponse() {
  if (controller) controller.abort();
}

export default run;
