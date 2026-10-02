import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize GoogleGenAI server-side client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. API: Cikgu Ceri AI Tutor Chat
app.post('/api/ai/ask-cikgu', async (req, res) => {
  try {
    const { message, ageGroup = '6-8' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mesej diperlukan' });
    }

    if (!ai) {
      // Smart offline fallback response
      const fallbackReply = generateFallbackCikguReply(message, ageGroup);
      return res.json({ reply: fallbackReply, source: 'offline-tutor' });
    }

    let ageGuideline = '';
    if (ageGroup === '3-5') {
      ageGuideline = 'Kanak-kanak berumur 3 hingga 5 tahun. Jawab dengan sangat ringkas (1-2 ayat sahaja), gunakan perkataan yang amat mudah difahami, letakkan emoji ceria 🦉⭐, dan sebut dengan nada mesra dan manja.';
    } else if (ageGroup === '6-8') {
      ageGuideline = 'Kanak-kanak berumur 6 hingga 8 tahun (tahap sekolah rendah awal). Beri jawapan mesra dalam 2-3 ayat, jelaskan maksud dengan contoh ayat atau situasi harian yang seronok.';
    } else {
      ageGuideline = 'Kanak-kanak berumur 9 hingga 12 tahun. Terangkan maksud dengan jelas dan tepat (tatabahasa Bahasa Melayu), boleh berikan sinonim atau antonim jika berkaitan, serta contoh ayat menarik.';
    }

    const systemPrompt = `Anda adalah "Cikgu Ceri", seekor burung hantu kartun yang comel, pintar, ceria, dan mesra kanak-kanak dari aplikasi pembelajaran "Kamus Ceria AI".
Tugasan anda adalah menjawab soalan kanak-kanak tentang perkataan, ejaan, maksud, ayat, dan dunia bahasa Melayu secara positif, membina, dan menggembirakan.
Panduan Umur: ${ageGuideline}
Peraturan:
1. Sentiasa bercakap dalam Bahasa Melayu standard Malaysia yang mesra (contoh: "Wah!", "Hebatnya!", "Jom Cikgu Ceri terangkan ya!").
2. Jangan beri jawapan berbentuk esei yang membosankan.
3. Selitkan dorongan positif ("Kamu anak yang bijak!", "Teruskan berusaha!").
4. Gunakan maskot identiti burung hantu sesekali ("Hoot-hoot! 🦉").`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Wah, soalan yang bagus! Jom kita terus belajar kosa kata bersama Cikgu Ceri! 🦉⭐';
    return res.json({ reply, source: 'gemini' });
  } catch (error: any) {
    console.error('Error in ask-cikgu:', error);
    const fallbackReply = generateFallbackCikguReply(req.body.message || '', req.body.ageGroup || '6-8');
    return res.json({ reply: fallbackReply, source: 'fallback' });
  }
});

// 2. API: Image-to-Word AI ("Apa Benda Ini?")
app.post('/api/ai/identify-object', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', ageGroup = '6-8' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Imej diperlukan' });
    }

    if (!ai) {
      return res.json({
        word: 'Objek Istimewa',
        category: 'Perkataan Harian',
        syllables: ['Ob', 'jek'],
        meaning: 'Sesuatu benda yang menarik untuk kita pelajari bersama Cikgu Ceri!',
        exampleSentence: 'Adik melihat objek ini dengan penuh rasa ingin tahu.',
        cheer: 'Wah, gambar yang sangat cantik! Hebatnya adik meneroka dunia sekeliling! 🦉⭐',
        source: 'offline-vision',
      });
    }

    // Clean base64 if it has data URL prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: `Kenal pasti objek utama dalam gambar ini untuk kanak-kanak berumur ${ageGroup} tahun dalam aplikasi pembelajaran Bahasa Melayu "Kamus Ceria AI".
Balas dalam format JSON yang sah dengan struktur ini SAHAJA:
{
  "word": "Nama objek dalam Bahasa Melayu (huruf besar)",
  "category": "Kategori yang sesuai seperti Haiwan, Makanan, Kenderaan, Mainan, Rumah, Alam, dsb.",
  "syllables": ["Suku", "kata", "pecahan"],
  "meaning": "Penerangan ringkas dan mudah tentang objek ini",
  "exampleSentence": "Contoh ayat ceria dan mudah dalam Bahasa Melayu",
  "cheer": "Kata-kata pujian comel daripada Cikgu Ceri"
}`,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      word: parsed.word || 'Benda Baharu',
      category: parsed.category || 'Perkataan Harian',
      syllables: parsed.syllables || [parsed.word || 'Perkataan'],
      meaning: parsed.meaning || 'Sesuatu yang seronok untuk kita pelajari!',
      exampleSentence: parsed.exampleSentence || `Cikgu Ceri suka melihat ${parsed.word || 'benda ini'}.`,
      cheer: parsed.cheer || 'Wah, hebatnya kamu mencari objek ini! 🦉✨',
      source: 'gemini-vision',
    });
  } catch (error: any) {
    console.error('Error in identify-object:', error);
    return res.json({
      word: 'Sahabat Ceria',
      category: 'Perkataan Harian',
      syllables: ['Sa', 'ha', 'bat'],
      meaning: 'Kawan baik yang selalu bersama-sama kita belajar dan bermain.',
      exampleSentence: 'Cikgu Ceri ialah sahabat ceria adik!',
      cheer: 'Wah, gambar yang hebat! Jom terus belajar lebih banyak perkataan! 🦉🎉',
      source: 'fallback',
    });
  }
});

// Helper for offline Cikgu Ceri responses
function generateFallbackCikguReply(query: string, ageGroup: string): string {
  const q = query.toLowerCase();
  if (q.includes('maksud') || q.includes('apa itu') || q.includes('erti')) {
    if (q.includes('besar')) return ageGroup === '3-5' ? 'Besar bermaksud saiz yang luas dan tinggi, seperti gajah! 🐘' : 'Besar ialah kata adjektif yang menerangkan saiz sesuatu yang lebih daripada biasa. Contohnya: "Rumah itu sangat besar." 🏠';
    if (q.includes('rajin') || q.includes('gigih')) return 'Rajin atau gigih bermaksud bersungguh-sungguh melakukan sesuatu kerja tanpa mudah putus asa! Adik rajin belajar hari ini! ⭐';
    if (q.includes('gembira')) return 'Gembira bermaksud rasa seronok, suka hati, dan riang! Macam senyuman adik sekarang! 😊';
    if (q.includes('sopan')) return 'Sopan bermaksud berbudi bahasa, menghormati orang tua, dan berkata dengan lemah lembut. 🌸';
    return `Maksud perkataan ini sangat indah! Jom kita gunakan dalam ayat yang ceria. Adik suka belajar perkataan ini? 🦉`;
  }
  if (q.includes('eja') || q.includes('bagaimana nak eja')) {
    if (q.includes('kucing')) return 'Ejaan kucing ialah: K - U - C - I - N - G (Ku-cing)! Meow! 🐱';
    if (q.includes('epal')) return 'Ejaan epal ialah: E - P - A - L (E-pal)! Sedapnya epal manis! 🍎';
    if (q.includes('rama')) return 'Ejaan rama-rama ialah: R-A-M-A, R-A-M-A (Ra-ma-ra-ma)! Terbang tinggi di taman! 🦋';
    return `Jom kita eja suku kata demi suku kata ya! Adik pasti boleh kuasai ejaan ini dengan cemerlang! 🔤`;
  }
  if (q.includes('ayat') || q.includes('contoh')) {
    return 'Boleh! Contoh ayat ceria: "Adik dan Cikgu Ceri seronok membaca buku bersama di sekolah." Cubalah buat ayat adik pula! 📚✨';
  }
  if (q.includes('haiwan') || q.includes('kucing') || q.includes('gajah')) {
    return 'Haiwan adalah ciptaan alam yang sangat istimewa! Ada yang berbulu comel, ada yang boleh terbang di udara, dan ada yang suka berenang di air! 🐾';
  }
  return `Hai sayang! Cikgu Ceri sangat bangga dengan semangat kamu bertanya. Teruskan membaca dan meneroka perkataan baharu ya! Hoot-hoot! 🦉⭐`;
}

// Development with Vite vs Production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌈 Kamus Ceria AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
