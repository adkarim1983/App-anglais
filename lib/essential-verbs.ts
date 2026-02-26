// Verbes essentiels et très courants en anglais
// Ces verbes sont toujours affichés et ne font pas partie de la rotation quotidienne

import { Verb } from './verbs'

export const ESSENTIAL_VERBS: Omit<Verb, 'id'>[] = [
  // Verbes être et avoir
  {
    english: 'Be',
    french: 'Être',
    present: 'is/are',
    past: 'was/were',
    future: 'will be',
    presentPerfect: 'has been',
    example: 'I am a student.',
    exampleFr: 'Je suis étudiant.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'been',
    synonyms: ['exist', 'remain', 'stay'],
    businessContext: 'We are committed to excellence in our services.'
  },
  {
    english: 'Have',
    french: 'Avoir',
    present: 'has',
    past: 'had',
    future: 'will have',
    presentPerfect: 'has had',
    example: 'She has a beautiful house.',
    exampleFr: 'Elle a une belle maison.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'had',
    synonyms: ['possess', 'own', 'hold'],
    businessContext: 'We have a meeting scheduled for tomorrow.'
  },
  
  // Verbes de mouvement
  {
    english: 'Go',
    french: 'Aller',
    present: 'goes',
    past: 'went',
    future: 'will go',
    presentPerfect: 'has gone',
    example: 'I go to work every day.',
    exampleFr: 'Je vais au travail tous les jours.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'gone',
    synonyms: ['move', 'travel', 'proceed'],
    idioms: [
      { english: 'Go ahead', french: 'Allez-y, continuez' },
      { english: 'Go for it', french: 'Fonce, vas-y' }
    ],
    businessContext: 'Let\'s go forward with this proposal.'
  },
  {
    english: 'Come',
    french: 'Venir',
    present: 'comes',
    past: 'came',
    future: 'will come',
    presentPerfect: 'has come',
    example: 'They come to visit us often.',
    exampleFr: 'Ils viennent nous rendre visite souvent.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'come',
    synonyms: ['arrive', 'approach', 'reach'],
    idioms: [
      { english: 'Come on', french: 'Allez, viens' },
      { english: 'Come up with', french: 'Trouver, proposer' }
    ]
  },
  
  // Verbes de base quotidiens
  {
    english: 'Do',
    french: 'Faire',
    present: 'does',
    past: 'did',
    future: 'will do',
    presentPerfect: 'has done',
    example: 'What do you do for a living?',
    exampleFr: 'Que faites-vous dans la vie?',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'done',
    synonyms: ['perform', 'execute', 'accomplish'],
    businessContext: 'We need to do our best to meet the deadline.'
  },
  {
    english: 'Make',
    french: 'Faire/Fabriquer',
    present: 'makes',
    past: 'made',
    future: 'will make',
    presentPerfect: 'has made',
    example: 'She makes delicious cakes.',
    exampleFr: 'Elle fait de délicieux gâteaux.',
    category: 'creation',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'made',
    synonyms: ['create', 'produce', 'build'],
    idioms: [
      { english: 'Make up your mind', french: 'Se décider' },
      { english: 'Make sense', french: 'Avoir du sens' }
    ],
    businessContext: 'Let\'s make a decision on this matter today.'
  },
  {
    english: 'Get',
    french: 'Obtenir/Devenir',
    present: 'gets',
    past: 'got',
    future: 'will get',
    presentPerfect: 'has gotten',
    example: 'I get up at 7 AM every day.',
    exampleFr: 'Je me lève à 7h tous les jours.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'gotten',
    synonyms: ['obtain', 'receive', 'acquire'],
    idioms: [
      { english: 'Get along', french: 'S\'entendre avec' },
      { english: 'Get over', french: 'Surmonter' }
    ]
  },
  {
    english: 'Take',
    french: 'Prendre',
    present: 'takes',
    past: 'took',
    future: 'will take',
    presentPerfect: 'has taken',
    example: 'Take your time.',
    exampleFr: 'Prenez votre temps.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'taken',
    synonyms: ['grab', 'seize', 'capture'],
    idioms: [
      { english: 'Take care', french: 'Prendre soin' },
      { english: 'Take place', french: 'Avoir lieu' }
    ],
    businessContext: 'We need to take action immediately.'
  },
  {
    english: 'Give',
    french: 'Donner',
    present: 'gives',
    past: 'gave',
    future: 'will give',
    presentPerfect: 'has given',
    example: 'She gives great advice.',
    exampleFr: 'Elle donne de bons conseils.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'given',
    synonyms: ['provide', 'offer', 'present'],
    idioms: [
      { english: 'Give up', french: 'Abandonner' },
      { english: 'Give in', french: 'Céder' }
    ]
  },
  
  // Verbes de perception et cognition
  {
    english: 'See',
    french: 'Voir',
    present: 'sees',
    past: 'saw',
    future: 'will see',
    presentPerfect: 'has seen',
    example: 'I see what you mean.',
    exampleFr: 'Je vois ce que tu veux dire.',
    category: 'thinking',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'seen',
    synonyms: ['observe', 'watch', 'notice'],
    idioms: [
      { english: 'See eye to eye', french: 'Être d\'accord' },
      { english: 'See you later', french: 'À plus tard' }
    ]
  },
  {
    english: 'Know',
    french: 'Savoir/Connaître',
    present: 'knows',
    past: 'knew',
    future: 'will know',
    presentPerfect: 'has known',
    example: 'I know the answer.',
    exampleFr: 'Je connais la réponse.',
    category: 'thinking',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'known',
    synonyms: ['understand', 'recognize', 'realize']
  },
  {
    english: 'Think',
    french: 'Penser',
    present: 'thinks',
    past: 'thought',
    future: 'will think',
    presentPerfect: 'has thought',
    example: 'I think it\'s a good idea.',
    exampleFr: 'Je pense que c\'est une bonne idée.',
    category: 'thinking',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'thought',
    synonyms: ['believe', 'consider', 'reflect'],
    businessContext: 'Let\'s think about the best strategy.'
  },
  
  // Verbes de communication
  {
    english: 'Say',
    french: 'Dire',
    present: 'says',
    past: 'said',
    future: 'will say',
    presentPerfect: 'has said',
    example: 'What did you say?',
    exampleFr: 'Qu\'as-tu dit?',
    category: 'communication',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'said',
    synonyms: ['tell', 'speak', 'state']
  },
  {
    english: 'Tell',
    french: 'Dire/Raconter',
    present: 'tells',
    past: 'told',
    future: 'will tell',
    presentPerfect: 'has told',
    example: 'Tell me the truth.',
    exampleFr: 'Dis-moi la vérité.',
    category: 'communication',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'told',
    synonyms: ['inform', 'notify', 'relate']
  },
  {
    english: 'Ask',
    french: 'Demander',
    present: 'asks',
    past: 'asked',
    future: 'will ask',
    presentPerfect: 'has asked',
    example: 'Can I ask you a question?',
    exampleFr: 'Puis-je vous poser une question?',
    category: 'communication',
    difficulty: 'easy',
    synonyms: ['inquire', 'question', 'request']
  },
  
  // Verbes de vie quotidienne
  {
    english: 'Want',
    french: 'Vouloir',
    present: 'wants',
    past: 'wanted',
    future: 'will want',
    presentPerfect: 'has wanted',
    example: 'I want to learn English.',
    exampleFr: 'Je veux apprendre l\'anglais.',
    category: 'thinking',
    difficulty: 'easy',
    synonyms: ['desire', 'wish', 'need']
  },
  {
    english: 'Need',
    french: 'Avoir besoin',
    present: 'needs',
    past: 'needed',
    future: 'will need',
    presentPerfect: 'has needed',
    example: 'We need more time.',
    exampleFr: 'Nous avons besoin de plus de temps.',
    category: 'thinking',
    difficulty: 'easy',
    synonyms: ['require', 'want', 'must have'],
    businessContext: 'We need to improve our customer service.'
  },
  {
    english: 'Like',
    french: 'Aimer',
    present: 'likes',
    past: 'liked',
    future: 'will like',
    presentPerfect: 'has liked',
    example: 'I like chocolate.',
    exampleFr: 'J\'aime le chocolat.',
    category: 'thinking',
    difficulty: 'easy',
    synonyms: ['enjoy', 'love', 'appreciate']
  },
  {
    english: 'Love',
    french: 'Aimer (beaucoup)',
    present: 'loves',
    past: 'loved',
    future: 'will love',
    presentPerfect: 'has loved',
    example: 'I love traveling.',
    exampleFr: 'J\'adore voyager.',
    category: 'thinking',
    difficulty: 'easy',
    synonyms: ['adore', 'cherish', 'treasure']
  },
  {
    english: 'Live',
    french: 'Vivre/Habiter',
    present: 'lives',
    past: 'lived',
    future: 'will live',
    presentPerfect: 'has lived',
    example: 'Where do you live?',
    exampleFr: 'Où habitez-vous?',
    category: 'action',
    difficulty: 'easy',
    synonyms: ['reside', 'dwell', 'inhabit']
  },
  {
    english: 'Work',
    french: 'Travailler',
    present: 'works',
    past: 'worked',
    future: 'will work',
    presentPerfect: 'has worked',
    example: 'She works in a hospital.',
    exampleFr: 'Elle travaille dans un hôpital.',
    category: 'business',
    difficulty: 'easy',
    synonyms: ['labor', 'toil', 'function'],
    businessContext: 'Let\'s work together on this project.'
  },
  {
    english: 'Play',
    french: 'Jouer',
    present: 'plays',
    past: 'played',
    future: 'will play',
    presentPerfect: 'has played',
    example: 'Children play in the park.',
    exampleFr: 'Les enfants jouent dans le parc.',
    category: 'action',
    difficulty: 'easy',
    synonyms: ['perform', 'compete', 'participate']
  },
  {
    english: 'Eat',
    french: 'Manger',
    present: 'eats',
    past: 'ate',
    future: 'will eat',
    presentPerfect: 'has eaten',
    example: 'We eat dinner at 7 PM.',
    exampleFr: 'Nous dînons à 19h.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'eaten',
    synonyms: ['consume', 'dine', 'feed']
  },
  {
    english: 'Drink',
    french: 'Boire',
    present: 'drinks',
    past: 'drank',
    future: 'will drink',
    presentPerfect: 'has drunk',
    example: 'I drink coffee every morning.',
    exampleFr: 'Je bois du café tous les matins.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'drunk',
    synonyms: ['sip', 'consume', 'gulp']
  },
  {
    english: 'Sleep',
    french: 'Dormir',
    present: 'sleeps',
    past: 'slept',
    future: 'will sleep',
    presentPerfect: 'has slept',
    example: 'I sleep 8 hours every night.',
    exampleFr: 'Je dors 8 heures chaque nuit.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'slept',
    synonyms: ['rest', 'slumber', 'doze']
  },
  {
    english: 'Wake',
    french: 'Se réveiller',
    present: 'wakes',
    past: 'woke',
    future: 'will wake',
    presentPerfect: 'has woken',
    example: 'I wake up at 6 AM.',
    exampleFr: 'Je me réveille à 6h.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'woken',
    synonyms: ['awaken', 'rouse', 'stir']
  },
  
  // Verbes d'action courante
  {
    english: 'Put',
    french: 'Mettre/Poser',
    present: 'puts',
    past: 'put',
    future: 'will put',
    presentPerfect: 'has put',
    example: 'Put your books on the table.',
    exampleFr: 'Mets tes livres sur la table.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'put',
    synonyms: ['place', 'set', 'position'],
    idioms: [
      { english: 'Put off', french: 'Reporter, remettre à plus tard' },
      { english: 'Put up with', french: 'Supporter, tolérer' }
    ]
  },
  {
    english: 'Find',
    french: 'Trouver',
    present: 'finds',
    past: 'found',
    future: 'will find',
    presentPerfect: 'has found',
    example: 'I can\'t find my keys.',
    exampleFr: 'Je ne trouve pas mes clés.',
    category: 'action',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'found',
    synonyms: ['discover', 'locate', 'detect'],
    idioms: [
      { english: 'Find out', french: 'Découvrir, apprendre' }
    ]
  },
  {
    english: 'Look',
    french: 'Regarder',
    present: 'looks',
    past: 'looked',
    future: 'will look',
    presentPerfect: 'has looked',
    example: 'Look at this beautiful sunset!',
    exampleFr: 'Regarde ce magnifique coucher de soleil!',
    category: 'action',
    difficulty: 'easy',
    synonyms: ['watch', 'observe', 'view'],
    idioms: [
      { english: 'Look forward to', french: 'Avoir hâte de' },
      { english: 'Look after', french: 'S\'occuper de' }
    ]
  },
  {
    english: 'Use',
    french: 'Utiliser',
    present: 'uses',
    past: 'used',
    future: 'will use',
    presentPerfect: 'has used',
    example: 'I use my phone every day.',
    exampleFr: 'J\'utilise mon téléphone tous les jours.',
    category: 'action',
    difficulty: 'easy',
    synonyms: ['utilize', 'employ', 'apply'],
    businessContext: 'We use the latest technology in our operations.'
  },
  {
    english: 'Try',
    french: 'Essayer',
    present: 'tries',
    past: 'tried',
    future: 'will try',
    presentPerfect: 'has tried',
    example: 'Try your best!',
    exampleFr: 'Fais de ton mieux!',
    category: 'action',
    difficulty: 'easy',
    synonyms: ['attempt', 'endeavor', 'test']
  },
  {
    english: 'Feel',
    french: 'Sentir/Ressentir',
    present: 'feels',
    past: 'felt',
    future: 'will feel',
    presentPerfect: 'has felt',
    example: 'I feel happy today.',
    exampleFr: 'Je me sens heureux aujourd\'hui.',
    category: 'thinking',
    difficulty: 'easy',
    isIrregular: true,
    pastParticiple: 'felt',
    synonyms: ['sense', 'experience', 'perceive']
  }
]

// Ajouter les IDs aux verbes essentiels (commencer à 10000 pour éviter les conflits)
export const ESSENTIAL_VERBS_WITH_IDS: Verb[] = ESSENTIAL_VERBS.map((verb, index) => ({
  ...verb,
  id: 10000 + index
}))
