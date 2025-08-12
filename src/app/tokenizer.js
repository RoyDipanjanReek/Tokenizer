export class customTokenizer {
  constructor() {
    this.vocab = {};
    this.reverseVocab = {};
    this.specialTokens = {
      "<PAD>": 0, //Padding Token
      "<UNK>": 1, // Unknown Token
      "<BOS>": 2, //Beginning of Sequence
      "<EOS>": 3, //End of Sequence 
    };
    this.nextId = Object.keys(this.specialTokens).length;

    // To add special tokens into vocab
    for (const [token, id] of Object.entries(this.specialTokens)) {
      this.vocab[token] = id;
      this.reverseVocab[id] = token;
    }
  }
  fitOnText(text) {
    const words = text
      .split(/\s+/) // split by whitespace
      .map((w) => w.trim())
      .filter(Boolean);

    for (const word of words) {
      if (!this.vocab[word]) {
        this.vocab[word] = this.nextId;
        this.reverseVocab[this.nextId] = word;
        this.nextId++;
      }
    }
  }

  // Encode text to  token IDs
  encode(text) {
    const words = text.split(/\s+/).filter(Boolean);
    const tokens = [this.specialTokens["<BOS>"]];

    for (const word of words) {
      if (this.vocab[word] !== undefined) {
        tokens.push(this.vocab[word]);
      } else {
        tokens.push(this.specialTokens["<UNK>"]);
      }
    }

    tokens.push(this.specialTokens["<EOS>"]);
    return tokens;
  }

  // Decode token IDs to text
  decode(tokenIds) {
    let words = [];
    for (const id of tokenIds) {
      if (
        id === this.specialTokens["<BOS>"] ||
        id === this.specialTokens["<EOS>"]
      ) {
        continue; 
      }
      words.push(this.reverseVocab[id] || "<UNK>");
    }
    return words.join(" ");
  }

  // View vocabulary
  getVocab() {
    return this.vocab;
  }
}
