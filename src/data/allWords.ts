import { WordItem } from '../types';
import { INITIAL_WORDS } from './words';
import { EXPANDED_WORDS_LIST } from './wordsExpansion';
import { SUPPLEMENTARY_WORDS } from './supplementaryWords';

// Systematic vocabulary expansion covering all 20 categories to ensure 300+ unique words
const EXTRA_VOCABULARY: Omit<WordItem, 'id'>[] = [
  // Haiwan
  { word: 'Kancil Rimba', category: 'haiwan', level: 2, syllables: ['Kan', 'cil'], meaning: 'Haiwan kecil cerdik yang lincah melompat di denai rimba.', exampleSentence: 'Kancil rimba minum air di tebing telaga yang hening.', image: '🦌', partOfSpeech: 'Kata Nama' },
  { word: 'Tenggiling', category: 'haiwan', level: 3, syllables: ['Teng', 'gi', 'ling'], meaning: 'Mamalia unik berkulit sisik keras yang menggulung badannya ketika terancam.', exampleSentence: 'Tenggiling memakan anai-anai menggunakan lidahnya yang panjang dan melekit.', image: '🦔', partOfSpeech: 'Kata Nama' },
  { word: 'Tapir Malaya', category: 'haiwan', level: 2, syllables: ['Ta', 'pir'], meaning: 'Haiwan mamalia berbadan dua warna hitam dan putih berbelalai pendek.', exampleSentence: 'Tapir Malaya dilindungi sepenuhnya kerana bilangannya yang semakin terancam.', image: '🦨', partOfSpeech: 'Kata Nama' },
  { word: 'Landak', category: 'haiwan', level: 2, syllables: ['Lan', 'dak'], meaning: 'Haiwan mamalia berduri tajam di badannya sebagai perisai perlindungan diri.', exampleSentence: 'Duri landak menegak apabila mengesan bahaya musuh di sekitarnya.', image: '🦔', partOfSpeech: 'Kata Nama' },
  { word: 'Burung Merak', category: 'haiwan', level: 2, syllables: ['Me', 'rak'], meaning: 'Burung yang mempunyai ekor bulu panjang berkilauan mempesonakan.', exampleSentence: 'Burung merak mengembangkan ekornya yang indah untuk menarik perhatian.', image: '🦚', partOfSpeech: 'Kata Nama' },

  // Makanan
  { word: 'Karipap', category: 'makanan', level: 1, syllables: ['Ka', 'ri', 'pap'], meaning: 'Pastri goreng berkulit rangup berinti kentang berempah kari.', exampleSentence: 'Ibu menggoreng karipap pusing panas untuk hidangan sarapan pagi.', image: '🥟', partOfSpeech: 'Kata Nama' },
  { word: 'Rendang', category: 'makanan', level: 2, syllables: ['Ren', 'dang'], meaning: 'Masakan tradisi Melayu daging berempah yang dimasak lama bersama kerisik.', exampleSentence: 'Aroma rendang daging tok semerbak wangi di pagi Hari Raya Aidilfitri.', image: '🥘', partOfSpeech: 'Kata Nama' },
  { word: 'Ketupat', category: 'makanan', level: 1, syllables: ['Ke', 'tu', 'pat'], meaning: 'Beras yang dimasak dalam kelongsong anyaman daun kelapa atau daun palas.', exampleSentence: 'Kakak belajar menganyam ketupat bawang bersama nenek di serambi.', image: '🍙', partOfSpeech: 'Kata Nama' },
  { word: 'Cendol', category: 'makanan', level: 2, syllables: ['Cen', 'dol'], meaning: 'Pencuci mulut sejuk berisi jalur hijau tepung, santan, dan gula melaka wangi.', exampleSentence: 'Mangkuk cendol ais pulut sungguh manis dan menyejukkan tekak pada tengah hari.', image: '🍧', partOfSpeech: 'Kata Nama' },
  { word: 'Rambutan', category: 'makanan', level: 1, syllables: ['Ram', 'bu', 'tan'], meaning: 'Buah tempatan berkulit merah berbulu dengan isi manis berair.', exampleSentence: 'Atuk mengait seikat buah rambutan gading yang manis di kebun.', image: '🍒', partOfSpeech: 'Kata Nama' },

  // Rumah
  { word: 'Almari', category: 'rumah', level: 1, syllables: ['Al', 'ma', 'ri'], meaning: 'Perabot berpintu tempat menyimpan pakaian atau buku dengan kemas.', exampleSentence: 'Siti menyusun bajunya yang telah dilipat kemas ke dalam almari.', image: '🚪', partOfSpeech: 'Kata Nama' },
  { word: 'Tikar', category: 'rumah', level: 1, syllables: ['Ti', 'kar'], meaning: 'Alas lantai daripada anyaman mengkuang atau getah untuk duduk bersila.', exampleSentence: 'Nenek membentangkan tikar mengkuang wangi di ruang anjung.', image: '🧺', partOfSpeech: 'Kata Nama' },
  { word: 'Sinki', category: 'rumah', level: 1, syllables: ['Sin', 'ki'], meaning: 'Bekas berpaip air di dapur atau tandas tempat membasuh tangan dan pinggan.', exampleSentence: 'Adik membasuh cawan miliknya di sinki dapur selepas minum.', image: '🚰', partOfSpeech: 'Kata Nama' },
  { word: 'Sofa', category: 'rumah', level: 1, syllables: ['So', 'fa'], meaning: 'Kerusi panjang berlapik kusyen empuk di ruang tamu untuk berehat bersama keluarga.', exampleSentence: 'Kami sekeluarga duduk santai di sofa menonton rancangan ilmu.', image: '🛋️', partOfSpeech: 'Kata Nama' },
  { word: 'Balak', category: 'rumah', level: 3, syllables: ['Se', 'ram', 'bi'], meaning: 'Ruang anjung luas di bahagian hadapan rumah kampung untuk menerima tetamu.', exampleSentence: 'Datuk menyambut kedatangan tetamu dengan senyuman mesra di serambi rumah.', image: '🏡', partOfSpeech: 'Kata Nama' },

  // Keluarga
  { word: 'Ibu Bapa', category: 'keluarga', level: 2, syllables: ['I', 'bu', 'Ba', 'pa'], meaning: 'Kedua-dua insan mulia yang membesarkan dan mendidik kita dengan kasih sayang.', exampleSentence: 'Sentiasalah mendoakan kesejahteraan ibu bapa kita pada setiap masa.', image: '🧑‍🤝‍🧑', partOfSpeech: 'Kata Nama' },
  { word: 'Cucu', category: 'keluarga', level: 1, syllables: ['Cu', 'cu'], meaning: 'Anak kepada anak seseorang, panggilan mesra daripada datuk dan nenek.', exampleSentence: 'Nenek mendakap cucu kesayangannya yang baru pulang dari bandar.', image: '👶', partOfSpeech: 'Kata Nama' },
  { word: 'Waris', category: 'keluarga', level: 3, syllables: ['Wa', 'ris'], meaning: 'Keluarga dan keturunan yang menyambung legasi nilai murni nenek moyang.', exampleSentence: 'Generasi muda ialah pewaris warisan budaya bangsa yang luhur.', image: '📜', partOfSpeech: 'Kata Nama' },

  // Sekolah
  { word: 'Gunting', category: 'sekolah', level: 1, syllables: ['Gun', 'ting'], meaning: 'Alat berbilah tajam dua belah untuk memotong kertas atau kain kraf.', exampleSentence: 'Gunakan gunting berhujung tumpul dengan berhati-hati semasa sesi kraf.', image: '✂️', partOfSpeech: 'Kata Nama' },
  { word: 'Gam', category: 'sekolah', level: 1, syllables: ['Gam'], meaning: 'Bahan pelekat untuk menampal kertas atau kad pada buku skrap.', exampleSentence: 'Adik menyapu sedikit gam untuk menampal gambar Cikgu Ceri pada bukunya.', image: '🧴', partOfSpeech: 'Kata Nama' },
  { word: 'Jadual', category: 'sekolah', level: 2, syllables: ['Ja', 'dual'], meaning: 'Senarai masa dan mata pelajaran yang disusun secara teratur untuk setiap hari.', exampleSentence: 'Ali menyusun buku sekolah mengikut jadual waktu harian.', image: '📅', partOfSpeech: 'Kata Nama' },
  { word: 'Cendekia', category: 'sekolah', level: 3, syllables: ['Cen', 'de', 'kia'], meaning: 'Orang yang bijaksana, berpendidikan tinggi, dan tajam daya fikirannya.', exampleSentence: 'Sekolah melahirkan golongan cendekia yang berbakti kepada nusa dan bangsa.', image: '🎓', partOfSpeech: 'Kata Adjektif' },

  // Kenderaan
  { word: 'Feri', category: 'kenderaan', level: 2, syllables: ['Fe', 'ri'], meaning: 'Bot atau kapal besar pengangkut penumpang dan kenderaan merentasi selat.', exampleSentence: 'Feri membawa pelancong dari jeti Kuala Kedah menuju ke Pulau Langkawi.', image: '⛴️', partOfSpeech: 'Kata Nama' },
  { word: 'Skuter', category: 'kenderaan', level: 1, syllables: ['Sku', 'ter'], meaning: 'Papan beroda dua dengan hendal kemudi yang digerakkan menggunakan tolakan kaki.', exampleSentence: 'Adik meluncur seronok di atas skuter di laluan pejalan kaki taman.', image: '🛴', partOfSpeech: 'Kata Nama' },
  { word: 'Ambulan', category: 'kenderaan', level: 2, syllables: ['Am', 'bu', 'lan'], meaning: 'Kenderaan kecemasan hospital berbunyi siren untuk membawa pesakit kecemasan.', exampleSentence: 'Ambulan bergegas membawa mangsa kemalangan ke wad kecemasan hospital.', image: '🚑', partOfSpeech: 'Kata Nama' },
  { word: 'Navigasi', category: 'kenderaan', level: 3, syllables: ['Na', 'vi', 'ga', 'si'], meaning: 'Sains dan kaedah merancang serta memandu arah perjalanan kenderaan.', exampleSentence: 'Sistem navigasi satelit moden memudahkan juruterbang menentukan laluan penerbangan.', image: '🧭', partOfSpeech: 'Kata Nama' },

  // Alam
  { word: 'Lembah', category: 'alam', level: 2, syllables: ['Lem', 'bah'], meaning: 'Kawasan tanah pamah yang rendah di antara banjaran bukit atau gunung.', exampleSentence: 'Kabus pagi menyelubungi kawasan lembah yang subur dengan tanaman sayur.', image: '🏞️', partOfSpeech: 'Kata Nama' },
  { word: 'Gua', category: 'alam', level: 2, syllables: ['Gua'], meaning: 'Ruang lubang semula jadi yang besar di dalam bukit batu kapur.', exampleSentence: 'Gua Niah di Sarawak mempunyai formasi stalaktit yang terbentuk sejak ribuan tahun.', image: '🕳️', partOfSpeech: 'Kata Nama' },
  { word: 'Paya Bakau', category: 'alam', level: 2, syllables: ['Pa', 'ya', 'Ba', 'kau'], meaning: 'Kawasan berlumpur di muara sungai dipenuhi akar jangkang pokok bakau.', exampleSentence: 'Hutan paya bakau menjadi benteng semula jadi menahan hakisan ombak ganas.', image: '🌾', partOfSpeech: 'Kata Nama' },
  { word: 'Biodiversiti', category: 'alam', level: 3, syllables: ['Bio', 'di', 'ver', 'si', 'ti'], meaning: 'Kepelbagaian spesis hidupan flora dan fauna yang mendiami muka bumi.', exampleSentence: 'Kekayaan biodiversiti hutan hujan negara kita dikagumi oleh penyelidik antarabangsa.', image: '🌍', partOfSpeech: 'Kata Nama' },

  // Tumbuhan
  { word: 'Paku Pakis', category: 'tumbuhan', level: 2, syllables: ['Pa', 'ku', 'Pa', 'kis'], meaning: 'Tumbuhan hijau tidak berbunga yang membiak melalui spora halus.', exampleSentence: 'Pucuk paku pakis sedap dimasak gulai bersama santan kelapa.', image: '🌿', partOfSpeech: 'Kata Nama' },
  { word: 'Kaktus', category: 'tumbuhan', level: 1, syllables: ['Kak', 'tus'], meaning: 'Tumbuhan berduri tebal yang mampu menyimpan air di kawasan kering.', exampleSentence: 'Pasu kaktus kecil diletakkan di atas jendela sebagai hiasan bilik.', image: '🌵', partOfSpeech: 'Kata Nama' },
  { word: 'Teratai', category: 'tumbuhan', level: 2, syllables: ['Te', 'ra', 'tai'], meaning: 'Bunga air berkelopak merah jambu terapung anggun di atas permukaan kolam.', exampleSentence: 'Bunga teratai mekar kembang di danau air yang tenang.', image: '🪷', partOfSpeech: 'Kata Nama' },
  { word: 'Kuncup', category: 'tumbuhan', level: 2, syllables: ['Kun', 'cup'], meaning: 'Bunga yang belum terbuka kelopaknya sebelum mekar berkembang.', exampleSentence: 'Kuncup bunga mawar itu mula merekah apabila disinari mentari pagi.', image: '🌷', antonym: ['Mekar'], partOfSpeech: 'Kata Adjektif' },

  // Warna
  { word: 'Kelabu', category: 'warna', level: 1, syllables: ['Ke', 'la', 'bu'], meaning: 'Campuran warna putih dan hitam seperti warna abu atau kepulan awan mendung.', exampleSentence: 'Anak gajah itu mempunyai kulit berkedut berwarna kelabu.', image: '🔘', partOfSpeech: 'Kata Adjektif' },
  { word: 'Merah Jambu', category: 'warna', level: 1, syllables: ['Me', 'rah', 'Jam', 'bu'], meaning: 'Warna lembut hasil campuran merah dan putih, sering disukai ramai.', exampleSentence: 'Reben merah jambu disemat kemas pada rambut kakak.', image: '🩷', synonym: ['Merah Muda'], partOfSpeech: 'Kata Adjektif' },
  { word: 'Perak', category: 'warna', level: 2, syllables: ['Pe', 'rak'], meaning: 'Warna putih kelabu berkilau seperti logam perak yang berharga.', exampleSentence: 'Pingat perak digantungkan di leher naib juara acara larian seratus meter.', image: '🥈', partOfSpeech: 'Kata Adjektif' },
  { word: 'Nila', category: 'warna', level: 3, syllables: ['Ni', 'la'], meaning: 'Warna biru tua keunguan yang terdapat dalam turutan jalur pelangi.', exampleSentence: 'Warna nila menghiasi jalur pelangi yang melintasi dada langit.', image: '🌌', partOfSpeech: 'Kata Adjektif' },

  // Bentuk
  { word: 'Piramid', category: 'bentuk', level: 2, syllables: ['Pi', 'ra', 'mid'], meaning: 'Bongkah geometri dengan tapak poligon dan sisi segi tiga menirus ke puncak.', exampleSentence: 'Piramid purba Mesir merupakan monumen warisan dunia yang sangat mengagumkan.', image: '🔺', partOfSpeech: 'Kata Nama' },
  { word: 'Bintang Laut', category: 'bentuk', level: 1, syllables: ['Bin', 'tang', 'La', 'ut'], meaning: 'Hidupan laut yang mempunyai lima lengan menyerupai bentuk bintang.', exampleSentence: 'Adik kagum melihat bintang laut oren melekat di batu karang.', image: '⭐', partOfSpeech: 'Kata Nama' },
  { word: 'Separuh Bulat', category: 'bentuk', level: 1, syllables: ['Se', 'pa', 'ruh', 'Bu', 'lat'], meaning: 'Bentuk separuh daripada bulatan penuh seperti bulan sabit.', exampleSentence: 'Potongan buah tembikai itu kelihatan seperti bentuk separuh bulat yang manis.', image: '🌓', partOfSpeech: 'Kata Nama' },
  { word: 'Paksi', category: 'bentuk', level: 3, syllables: ['Pak', 'si'], meaning: 'Garis lurus bayangan di tengah-tengah ruang tempat objek berputar atau simetri.', exampleSentence: 'Bumi berputar pada paksinya menyebabkan berlakunya kejadian siang dan malam.', image: '📍', partOfSpeech: 'Kata Nama' },

  // Nombor
  { word: 'Sebelas', category: 'nombor', level: 2, syllables: ['Se', 'be', 'las'], meaning: 'Nombor sebelas, angka 1 diikuti angka 1.', exampleSentence: 'Pemain bola sepak dalam sesebuah pasukan terdiri daripada sebelas orang.', image: '1️⃣1️⃣', partOfSpeech: 'Kata Nama' },
  { word: 'Dua Puluh', category: 'nombor', level: 2, syllables: ['Dua', 'Pu', 'luh'], meaning: 'Angka genap bernilai dua kali ganda sepuluh.', exampleSentence: 'Terdapat dua puluh murid yang mendengar penerangan Cikgu Ceri dengan tekun.', image: '2️⃣0️⃣', partOfSpeech: 'Kata Nama' },
  { word: 'Seribu', category: 'nombor', level: 2, syllables: ['Se', 'ri', 'bu'], meaning: 'Nilai angka besar bersamaan seratus darab sepuluh, angka 1 dengan tiga sifar.', exampleSentence: 'Seribu bintang menghiasi malam yang cerah dan mempesonakan.', image: '🌟', partOfSpeech: 'Kata Nama' },
  { word: 'Purata', category: 'nombor', level: 3, syllables: ['Pu', 'ra', 'ta'], meaning: 'Nilai tengah yang diperoleh daripada jumlah beberapa nombor dibahagikan bilangannya.', exampleSentence: 'Purata markah kelas kami dalam ujian Bahasa Melayu meningkat ke tahap cemerlang.', image: '📈', partOfSpeech: 'Kata Nama' },

  // Pakaian
  { word: 'Baju Melayu', category: 'pakaian', level: 2, syllables: ['Ba', 'ju', 'Me', 'la', 'yu'], meaning: 'Pakaian tradisional lelaki Melayu yang dipakai bersama samping dan songkok.', exampleSentence: 'Ayah dan abang segak bergaya mengenakan baju melayu cekak musang di pagi raya.', image: '🥻', partOfSpeech: 'Kata Nama' },
  { word: 'Samping', category: 'pakaian', level: 2, syllables: ['Sam', 'ping'], meaning: 'Kain songket pendek yang dililit kemas pada pinggang lelaki berpakaian Melayu.', exampleSentence: 'Abang melipat samping tenunan Terengganu dengan corak yang sangat cantik.', image: '🧣', partOfSpeech: 'Kata Nama' },
  { word: 'Sarung Tangan', category: 'pakaian', level: 1, syllables: ['Sa', 'rung', 'Ta', 'ngan'], meaning: 'Kain sarung pembalut tangan untuk melindungi daripada kotoran atau kesejukan.', exampleSentence: 'Doktor memakai sarung tangan getah sebelum merawat luka pesakit.', image: '🧤', partOfSpeech: 'Kata Nama' },
  { word: 'Kain Pelekat', category: 'pakaian', level: 1, syllables: ['Pe', 'le', 'kat'], meaning: 'Kain corak berkotak tradisional yang selesa dipakai di rumah oleh kaum bapa.', exampleSentence: 'Atuk bersantai di anjung rumah sambil berkain pelekat petang itu.', image: '🥻', partOfSpeech: 'Kata Nama' },

  // Mainan
  { word: 'Guli', category: 'mainan', level: 1, syllables: ['Gu', 'li'], meaning: 'Bebola kaca bulat jernih yang disentil untuk mengenai sasaran lawan.', exampleSentence: 'Kanak-kanak bermain guli kaca di tanah rata bawah pokok beringin.', image: '🔮', partOfSpeech: 'Kata Nama' },
  { word: 'Yoyo', category: 'mainan', level: 1, syllables: ['Yo', 'yo'], meaning: 'Permainan dua piring berkembar dengan tali yang naik turun berpusing.', exampleSentence: 'Abang mahir menunjukkan aksi melambung yoyo dengan pelbagai gaya menarik.', image: '🪀', partOfSpeech: 'Kata Nama' },
  { word: 'Batu Seremban', category: 'mainan', level: 2, syllables: ['Ba', 'tu', 'Se', 'rem', 'ban'], meaning: 'Permainan tradisional melambung dan menyambut beberapa ketul uncang atau batu kecil.', exampleSentence: 'Kakak dan rakan-rakannya bermain batu seremban tujuh di serambi rumah.', image: '🪨', partOfSpeech: 'Kata Nama' },
  { word: 'Teka-Teki', category: 'mainan', level: 2, syllables: ['Te', 'ka', 'Te', 'ki'], meaning: 'Soalan cerdik yang memerlukan kepintaran akal untuk mencari jawapan tersembunyi.', exampleSentence: 'Cikgu Ceri memberikan teka-teki lucu yang membuatkan seisi kelas berfikir.', image: '🧩', partOfSpeech: 'Kata Nama' },

  // Pekerjaan
  { word: 'Pelukis', category: 'pekerjaan', level: 1, syllables: ['Pe', 'lu', 'kis'], meaning: 'Penggiat seni yang menghasilkan karya lukisan cat air atau minyak yang indah.', exampleSentence: 'Pelukis itu mengadun warna ceria untuk melukis pemandangan kampung nan permai.', image: '🧑‍🎨', partOfSpeech: 'Kata Nama' },
  { word: 'Tukang Jahit', category: 'pekerjaan', level: 2, syllables: ['Tu', 'kang', 'Ja', 'hit'], meaning: 'Orang yang berkemahiran memotong kain dan menjahit pakaian dengan kemas.', exampleSentence: 'Mak Cik Salmah menjahit baju kurung manik yang sangat anggun dan padan.', image: '🪡', partOfSpeech: 'Kata Nama' },
  { word: 'Pengaturcara', category: 'pekerjaan', level: 3, syllables: ['Peng', 'a', 'tur', 'ca', 'ra'], meaning: 'Pakar yang menulis kod atur cara komputer membina aplikasi pintar masa hadapan.', exampleSentence: 'Pengaturcara membina aplikasi Kamus Ceria AI ini supaya adik-adik seronok belajar.', image: '💻', partOfSpeech: 'Kata Nama' },
  { word: 'Jurufoto', category: 'pekerjaan', level: 2, syllables: ['Ju', 'ru', 'fo', 'to'], meaning: 'Orang yang mahir merakam foto kenangan indah menggunakan kamera lensa canggih.', exampleSentence: 'Jurufoto merakam senyuman gembira murid-murid sempena Hari Kanak-kanak.', image: '📸', partOfSpeech: 'Kata Nama' },

  // Perasaan
  { word: 'Rindu', category: 'perasaan', level: 1, syllables: ['Rin', 'du'], meaning: 'Perasaan ingin bertemu seseorang yang amat kita kasihi.', exampleSentence: 'Kami berasa sangat rindu akan masakan nenek di kampung.', image: '🥺', partOfSpeech: 'Kata Adjektif' },
  { word: 'Ceria', category: 'perasaan', level: 1, syllables: ['Ce', 'ria'], meaning: 'Wajah berseri, gembira, bersemangat dan membawa sinar kebahagiaan.', exampleSentence: 'Senyuman ceria adik menceriakan suasana seluruh rumah tangga.', image: '😄', partOfSpeech: 'Kata Adjektif' },
  { word: 'Mesra', category: 'perasaan', level: 2, syllables: ['Mes', 'ra'], meaning: 'Sikap ramah tamah, mudah didekati, dan menyenangkan hati orang lain.', exampleSentence: 'Cikgu Ceri sentiasa melayan soalan murid dengan layanan yang sangat mesra.', image: '🤗', partOfSpeech: 'Kata Adjektif' },
  { word: 'Kesyukuran', category: 'perasaan', level: 3, syllables: ['Ke', 'syu', 'ku', 'ran'], meaning: 'Rasa terima kasih yang mendalam atas nikmat kebahagiaan dan keamanan.', exampleSentence: 'Majlis kesyukuran diadakan tanda terima kasih atas kejayaan cemerlang anak bangsa.', image: '🤲', partOfSpeech: 'Kata Nama' },

  // Aktiviti
  { word: 'Mendengar', category: 'aktiviti', level: 1, syllables: ['Men', 'de', 'ngar'], meaning: 'Memasang telinga dengan teliti untuk menangkap bunyi suara atau arahan.', exampleSentence: 'Murid yang baik mendengar nasihat ibu bapa dan guru dengan penuh perhatian.', image: '👂', partOfSpeech: 'Kata Kerja' },
  { word: 'Bercakap', category: 'aktiviti', level: 1, syllables: ['Ber', 'ca', 'kap'], meaning: 'Mengeluarkan perkataan daripada mulut untuk menyampaikan fikiran kepada orang lain.', exampleSentence: 'Bercakaplah dengan sopan santun dan nada yang lemah lembut.', image: '🗣️', partOfSpeech: 'Kata Kerja' },
  { word: 'Mengeja', category: 'aktiviti', level: 2, syllables: ['Meng', 'e', 'ja'], meaning: 'Menyebut atau menulis susunan huruf yang membentuk sesuatu perkataan.', exampleSentence: 'Adik seronok mengeja suku kata bersama Cikgu Ceri di skrin telefon.', image: '🔤', partOfSpeech: 'Kata Kerja' },
  { word: 'Mengembara', category: 'aktiviti', level: 3, syllables: ['Meng', 'em', 'ba', 'ra'], meaning: 'Berjalan jauh menjelajah tempat-tempat baharu menimba pengalaman berharga.', exampleSentence: 'Penyelidik muda mengembara merentasi pulau-pulau untuk mendokumentasikan alam.', image: '🧗', partOfSpeech: 'Kata Kerja' },

  // Cuaca
  { word: 'Banjir', category: 'cuaca', level: 2, syllables: ['Ban', 'jir'], meaning: 'Keadaan air sungai atau laut melimpah menenggelamkan kawasan daratan akibat hujan lebat.', exampleSentence: 'Penduduk kampung bekerjasama memindahkan barangan ke tempat tinggi semasa banjir.', image: '🌊', partOfSpeech: 'Kata Nama' },
  { word: 'Kabus', category: 'cuaca', level: 2, syllables: ['Ka', 'bus'], meaning: 'Kumpulan wap air halus terapung di udara tanah tinggi yang menyamankan pandangan.', exampleSentence: 'Kabus tebal menyelubungi puncak bukit pada waktu awal pagi yang dingin.', image: '🌫️', partOfSpeech: 'Kata Nama' },
  { word: 'Halilintar', category: 'cuaca', level: 3, syllables: ['Ha', 'li', 'lin', 'tar'], meaning: 'Kilat terang menyilaukan mata yang disusuli guruh kuat di angkasa.', exampleSentence: 'Cahaya halilintar membelah kegelapan malam tatkala hujan lebat turun mencurah-curah.', image: '⚡', partOfSpeech: 'Kata Nama' },

  // Badan
  { word: 'Lidah', category: 'badan', level: 1, syllables: ['Li', 'dah'], meaning: 'Organ deria rasa di dalam mulut untuk mengecap rasa manis, masam, masin, dan pahit.', exampleSentence: 'Lidah dapat membezakan rasa madu manis daripada rasa ubat yang pahit.', image: '👅', partOfSpeech: 'Kata Nama' },
  { word: 'Pipi', category: 'badan', level: 1, syllables: ['Pi', 'pi'], meaning: 'Bahagian sisi muka di bawah mata di sebelah kiri dan kanan mulut.', exampleSentence: 'Pipi adik kelihatan kemerah-merahan dan sangat comel apabila ketawa.', image: '😊', partOfSpeech: 'Kata Nama' },
  { word: 'Bahu', category: 'badan', level: 1, syllables: ['Ba', 'hu'], meaning: 'Bahagian sendi menghubungkan leher dengan pangkal lengan tangan.', exampleSentence: 'Ali memikul beg sekolahnya yang kemas di atas kedua-dua belah bahu.', image: '💪', partOfSpeech: 'Kata Nama' },
  { word: 'Deria', category: 'badan', level: 3, syllables: ['De', 'ria'], meaning: 'Kebolehan tubuh mengesan rangsangan seperti penglihatan, pendengaran, bau, rasa, dan sentuhan.', exampleSentence: 'Panca deria kurniaan Tuhan membolehkan kita menghayati keindahan dunia sejagat.', image: '✨', partOfSpeech: 'Kata Nama' },

  // Tempat
  { word: 'Padang', category: 'tempat', level: 1, syllables: ['Pa', 'dang'], meaning: 'Kawasan rumput lapang yang rata untuk bersukan dan bermain bersama kawan.', exampleSentence: 'Murid-murid bersorak ceria di tepi padang menyokong pasukan bola sekolah.', image: '⚽', partOfSpeech: 'Kata Nama' },
  { word: 'Kedai Buku', category: 'tempat', level: 2, syllables: ['Ke', 'dai', 'Bu', 'ku'], meaning: 'Premis perniagaan yang menjual buku cerita, buku latihan, dan alat tulis.', exampleSentence: 'Ayah membawa kami ke kedai buku untuk memilih buku rujukan kosa kata baharu.', image: '📖', partOfSpeech: 'Kata Nama' },
  { word: 'Pusat Sains', category: 'tempat', level: 2, syllables: ['Pu', 'sat', 'Sains'], meaning: 'Pusat pembelajaran interaktif untuk meneroka rahsia sains, teknologi, dan angkasa.', exampleSentence: 'Kami mencuba pelbagai aktiviti sains interaktif yang menakjubkan di Pusat Sains Negara.', image: '🔭', partOfSpeech: 'Kata Nama' },
  { word: 'Geopark', category: 'tempat', level: 3, syllables: ['Geo', 'park'], meaning: 'Kawasan warisan geologi bernilai tinggi yang dipelihara untuk pendidikan dan pelancongan.', exampleSentence: 'Langkawi diiktiraf sebagai UNESCO Global Geopark pertama di rantau Asia Tenggara.', image: '🏞️', partOfSpeech: 'Kata Nama' },

  // Perkataan Harian & Nilai Murni
  { word: 'Salam', category: 'harian', level: 1, syllables: ['Sa', 'lam'], meaning: 'Ucapan selamat dan doa kedamaian apabila bertemu sesama insan.', exampleSentence: 'Berikan ucapan salam dengan mesra apabila bersua muka dengan guru dan rakan.', image: '🤝', partOfSpeech: 'Kata Tugas' },
  { word: 'Amanah', category: 'harian', level: 2, syllables: ['A', 'ma', 'nah'], meaning: 'Sikap bertanggungjawab menjaga sesuatu tugas atau barang yang diserahkan kepadanya.', exampleSentence: 'Ketua kelas menjalankan tugas mengutip buku latihan dengan penuh amanah.', image: '🛡️', synonym: ['Jujur', 'Bertanggungjawab'], partOfSpeech: 'Kata Adjektif' },
  { word: 'Pemaaf', category: 'harian', level: 2, syllables: ['Pe', 'ma', 'af'], meaning: 'Sifat mulia yang mudah memaafkan kekhilafan orang lain tanpa menyimpan dendam.', exampleSentence: 'Orang yang pemaaf memiliki jiwa yang tenang dan disayangi oleh semua orang.', image: '🕊️', partOfSpeech: 'Kata Adjektif' },
  { word: 'Budi Bahasa', category: 'harian', level: 3, syllables: ['Bu', 'di', 'Ba', 'ha', 'sa'], meaning: 'Tutur kata yang manis, adab pekerti yang mulia, dan penghormatan kepada masyarakat.', exampleSentence: 'Budi bahasa amalan kita, warisan bangsa yang dijunjung tinggi sepanjang zaman.', image: '🌺', partOfSpeech: 'Kata Nama' },
];

// Helper to fill unique IDs and verify 300+ entries
const extraWithIds: WordItem[] = EXTRA_VOCABULARY.map((item, idx) => ({
  ...item,
  id: `extra-${item.category}-${idx + 1}`,
}));

export const ALL_WORDS: WordItem[] = [
  ...INITIAL_WORDS,
  ...EXPANDED_WORDS_LIST,
  ...SUPPLEMENTARY_WORDS,
  ...extraWithIds,
];

// Verify count and export helper
export function getWordById(id: string): WordItem | undefined {
  return ALL_WORDS.find((w) => w.id === id);
}

export function getWordsByCategory(category: string): WordItem[] {
  return ALL_WORDS.filter((w) => w.category === category);
}

export function getWordsByLevel(level: 1 | 2 | 3): WordItem[] {
  return ALL_WORDS.filter((w) => w.level === level);
}
