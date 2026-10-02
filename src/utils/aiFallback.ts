import { AgeGroup } from '../types';
import { ALL_WORDS } from '../data/allWords';

// Client-side AI fallback tutor for offline / static GitHub Pages deployment
export function getLocalTutorReply(query: string, ageGroup: AgeGroup): string {
  const q = query.toLowerCase().trim();

  // Try matching directly in our 300+ words database
  const matchedWord = ALL_WORDS.find(
    (w) =>
      q.includes(w.word.toLowerCase()) ||
      (w.synonym && w.synonym.some((s) => q.includes(s.toLowerCase())))
  );

  if (q.includes('maksud') || q.includes('apa itu') || q.includes('erti')) {
    if (matchedWord) {
      if (ageGroup === '3-5') {
        return `${matchedWord.word} bermaksud ${matchedWord.meaning.split('.')[0]}. Contohnya: "${matchedWord.exampleSentence}" ${matchedWord.image}⭐`;
      }
      return `Maksud ${matchedWord.word} ialah: "${matchedWord.meaning}" ${matchedWord.image}\n\nContoh ayat: "${matchedWord.exampleSentence}"`;
    }

    if (q.includes('besar')) {
      return ageGroup === '3-5'
        ? 'Besar bermaksud saiz yang luas dan tinggi, seperti gajah! 🐘'
        : 'Besar ialah kata adjektif yang menerangkan ukuran atau saiz sesuatu yang lebih daripada biasa. Contohnya: "Rumah itu sangat besar." 🏠';
    }
    if (q.includes('rajin') || q.includes('gigih')) {
      return 'Rajin atau gigih bermaksud bersungguh-sungguh melakukan sesuatu kerja tanpa mudah putus asa! Adik memang anak yang rajin! ⭐💪';
    }
    if (q.includes('gembira') || q.includes('ceria')) {
      return 'Gembira bermaksud rasa seronok, suka hati, dan riang! Macam senyuman adik sekarang! 😊🌸';
    }
    if (q.includes('sopan') || q.includes('adab')) {
      return 'Sopan bermaksud berbudi bahasa, menghormati orang tua, dan berkata-kata dengan lemah lembut. 🌸';
    }
    return `Perkataan yang menarik! Maksudnya berkait rapat dengan kebaikan dan ilmu. Teruskan bertanya kepada Cikgu Ceri ya! 🦉✨`;
  }

  if (q.includes('eja') || q.includes('bagaimana nak eja') || q.includes('cara eja')) {
    if (matchedWord) {
      const letters = matchedWord.word.toUpperCase().split('').join(' - ');
      const syl = matchedWord.syllables.join(' - ');
      return `Ejaan bagi ${matchedWord.word} ialah: ${letters} (${syl})! ${matchedWord.image} Pintarnya adik!`;
    }
    if (q.includes('kucing')) return 'Ejaan kucing ialah: K - U - C - I - N - G (Ku-cing)! Meow! 🐱';
    if (q.includes('epal')) return 'Ejaan epal ialah: E - P - A - L (E-pal)! Sedapnya buah epal manis! 🍎';
    if (q.includes('rama')) return 'Ejaan rama-rama ialah: R-A-M-A, R-A-M-A (Ra-ma-ra-ma)! Terbang tinggi di taman! 🦋';
    return `Jom kita eja suku kata demi suku kata ya! Adik pasti boleh kuasai ejaan ini dengan cemerlang! 🔤⭐`;
  }

  if (q.includes('ayat') || q.includes('contoh')) {
    if (matchedWord) {
      return `Boleh! Contoh ayat ceria: "${matchedWord.exampleSentence}" ${matchedWord.image} Cubalah buat ayat adik pula!`;
    }
    return 'Boleh! Contoh ayat ceria: "Adik dan Cikgu Ceri seronok membaca buku bersama di sekolah." Cubalah adik bina ayat sendiri pula! 📚✨';
  }

  if (q.includes('haiwan') || q.includes('ceritakan') || q.includes('tentang')) {
    if (matchedWord) {
      return `${matchedWord.word} ${matchedWord.image} ialah ${matchedWord.meaning} Contoh ayat: "${matchedWord.exampleSentence}" ${matchedWord.funFact ? `\n\n💡 Fakta Menarik: ${matchedWord.funFact}` : ''}`;
    }
    return 'Dunia haiwan sungguh menakjubkan! Ada yang tinggal di darat, berenang di air, dan terbang tinggi di langit. Haiwan kegemaran adik apa? 🐾';
  }

  return `Wah, soalan yang sangat bagus daripada adik! Cikgu Ceri sangat bangga dengan semangat adik meneroka Bahasa Melayu. Jom kita terus belajar kosa kata baharu hari ini! Hoot-hoot! 🦉⭐`;
}

// Client-side fallback object recognizer
export function getLocalObjectResult(sampleName?: string) {
  if (sampleName) {
    const s = sampleName.toLowerCase();
    const matched = ALL_WORDS.find((w) => w.word.toLowerCase().includes(s));
    if (matched) {
      return {
        word: matched.word.toUpperCase(),
        category: matched.category.toUpperCase(),
        syllables: matched.syllables,
        meaning: matched.meaning,
        exampleSentence: matched.exampleSentence,
        cheer: `Ini ialah ${matched.word.toUpperCase()}! ${matched.image} Hebatnya adik mengecam objek ini! 🦉⭐`,
      };
    }
  }

  // General cheerful fallback
  return {
    word: 'OBJEK PINTAR',
    category: 'PERKATAAN HARIAN',
    syllables: ['Ob', 'jek', 'Pin', 'tar'],
    meaning: 'Sesuatu benda menarik yang baru adik terokai dalam pembelajaran hari ini!',
    exampleSentence: 'Cikgu Ceri sangat seronok melihat gambar yang adik kongsikan.',
    cheer: 'Wah, gambar yang sangat jelas dan cantik! Jom terus belajar lebih banyak perkataan bersama Cikgu Ceri! 🦉✨',
  };
}
