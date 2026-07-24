const fs = require('fs');

const data = fs.readFileSync('C:\\Users\\rs652\\.gemini\\antigravity-ide\\brain\\bdbb4544-f373-4642-9aec-4e886746e814\\.system_generated\\logs\\transcript_full.jsonl', 'utf-8');
const lines = data.split('\n');
for (const line of lines) {
  if (line.includes('add this animation as a background')) {
    const obj = JSON.parse(line);
    fs.writeFileSync('C:\\Users\\rs652\\.gemini\\antigravity-ide\\scratch\\isaac-ai\\iridescence_prompt.txt', obj.content);
    console.log('Found it!');
    break;
  }
}
