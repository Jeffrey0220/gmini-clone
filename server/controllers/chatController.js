const { runChat } = require('../services/chatService');

const postChat = async (req, res) => {
  const { prompt } = req.body;
  console.log('00000',prompt);
  try {
    const response = await runChat(prompt);
    console.log('11111',response);
    res.json({ success: true, response });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to generate chat response');
  }
};

module.exports = { postChat };