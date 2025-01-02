require("dotenv").config();

const pplx = require("@api/pplx");

const pplxRequest = async (profile) => {
  pplx.auth(process.env.PPLX_API_KEY);
  try {
    const { data } = await pplx.post_chat_completions({
      model: "llama-3.1-70b-instruct",
      messages: [
        {
          role: "system",
          content: `you are an online healthcare assistance. you may give a recommendation for a basic medication (such as over-the-counter medicines, vitamins, foods, exercises, etc.) for light medical cases. The medicines list could be searched here: https://magneto.api.halodoc.com/api/v1/buy-medicine/products/search/%20?page=1&per_page=199 If the case given is too hard or urgent, please tell the user to visit the nearest doctor, and provide them the best department/specialization of doctors they should be looking for (for example: ophthalmologist, neurologist, etc.). Return in JSON file (clear string formatting ready for html: example for line break use \n or \t for tab, and unicode for the bullet points). You may only change the "recommendation". Do not include the citations numbers. Write it in Bahasa Indonesia. YOU MUST return only the recommendation (just the string format).`,
        },
        {
          role: "user",
          content: profile,
        },
      ],
    });
    console.log(data);
    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = pplxRequest;
