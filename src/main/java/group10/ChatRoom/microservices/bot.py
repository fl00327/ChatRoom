from transformers import AutoModelForCausalLM, AutoTokenizer
import torch


tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

name = "created"
mentalhealth = "Mental"
stag = "Stag"

def get_chat_response(text):
    # Let's chat for 5 lines
    text = str(text).replace("_", " ")
    if name in text:
        var1 = "I was created by Midnight Coders at the University Of Surrey"
        return var1
    elif mentalhealth in text:
        var2 = "You should contact your GP or NHS (111)\nIf You need to talk to someone in the night, there is a nightline service provided by the University Of Surrey's SU."
        return var2
    elif stag in text:
        var3 = "Stag Hill Campus is found in the centre of the University Of Surrey, GU2 7XH"
        return var3
    else:
        for step in range(1):
            # encode the new user input, add the eos_token and return a tensor in Pytorch
            new_user_input_ids = tokenizer.encode(str(text) + tokenizer.eos_token, return_tensors='pt')

            # append the new user input tokens to the chat history
            bot_input_ids = torch.cat([chat_history_ids, new_user_input_ids], dim=-1) if step > 0 else new_user_input_ids

            # generated a response while limiting the total chat history to 1000 tokens, 
            chat_history_ids = model.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)

            # pretty print last ouput tokens from bot
            return tokenizer.decode(chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)