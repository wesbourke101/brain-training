import type { Story, CategorySlug } from '@/types/story'

// ---------------------------------------------------------------------------
// Mock stories for UI development. 2 per category = 16 total.
// Each story has 3–4 paragraphs packed with memorable details
// (names, numbers, colors, locations) that map to the mock questions.
// ---------------------------------------------------------------------------

export const mockStories: Story[] = [

  // ── SCI-FI ────────────────────────────────────────────────────────────────
  {
    id: 'sci-fi-1',
    categorySlug: 'sci-fi',
    title: 'The Callisto Drift',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 198,
    paragraphs: [
      {
        index: 0,
        wordCount: 62,
        text: `Navigator Priya Solan guided the Helix-7 through the debris field at 4,200 kilometres per hour, one hand hovering over the emergency retro-burn switch. The ship's hull bore a long scar from a prior mission — a reminder of the Callisto incident three years ago, when her co-pilot, Declan Marsh, had steered them into an uncharted dust cloud.`,
      },
      {
        index: 1,
        wordCount: 68,
        text: `The cargo manifest listed forty-two canisters of isotope XR-9, destination: Titan Station Delta. Priya had memorised the docking code — 7741-ECHO — before departure, knowing the station's AI would refuse entry without it. She glanced at the fuel gauge: 18 percent remaining. Enough to reach Delta, barely enough to dock safely.`,
      },
      {
        index: 2,
        wordCount: 68,
        text: `A red light pulsed on panel three. Declan leaned over and read the alert aloud: "Proximity warning — object bearing 042, range 600 metres." Priya cut the main engine and let the Helix-7 coast. Outside the viewport, a derelict orange satellite tumbled slowly past, its side panel still displaying the faded logo of the old Meridian Mining Corporation.`,
      },
    ],
  },
  {
    id: 'sci-fi-2',
    categorySlug: 'sci-fi',
    title: 'Signal from Kepler-9',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 185,
    paragraphs: [
      {
        index: 0,
        wordCount: 60,
        text: `The signal arrived at 03:17 station time, a repeating sequence of eleven pulses that Dr. Amara Osei immediately flagged as non-random. She printed the waveform on yellow paper and tacked it above her console in Lab 4, scrawling the word CONFIRM in red marker across the top.`,
      },
      {
        index: 1,
        wordCount: 65,
        text: `Her supervisor, Commander Yusuf Adler, stood in the doorway holding a cold cup of coffee. "Kepler-9b?" he said, squinting at the printout. Amara nodded. The source was 1,200 light-years away, yet the signal had a peculiar quality — each pulse was separated by exactly 3.7 seconds, as if the sender knew the receiver needed time to process each beat.`,
      },
      {
        index: 2,
        wordCount: 60,
        text: `Adler set his coffee on the corner of her desk — beside the small bronze figurine she always kept there, a gift from her mother, shaped like a crane in flight. "Send it up the chain," he said quietly. "Use the Tier-One protocol. No public channels." Amara reached for the encrypted uplink terminal and typed in her twelve-digit clearance code.`,
      },
    ],
  },

  // ── ROMANCE ───────────────────────────────────────────────────────────────
  {
    id: 'romance-1',
    categorySlug: 'romance',
    title: 'The Table by the Window',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 192,
    paragraphs: [
      {
        index: 0,
        wordCount: 63,
        text: `Clara Voss had eaten alone at Café Merlo every Tuesday for six months, always requesting the corner table by the east window. She ordered the same thing each time: a cortado and the almond croissant. The waiter, a young man named Felix, had stopped asking her what she wanted three months ago and simply brought it without a word.`,
      },
      {
        index: 1,
        wordCount: 65,
        text: `On the last Tuesday in March, a man sat down uninvited across from her and said, "You've been reading that same page for eleven minutes." His name, she later learned, was Stefan Holt. He had dark green eyes and a small scar above his left eyebrow. He was holding a battered copy of a Portuguese novel, the title hidden under a yellow sticky note.`,
      },
      {
        index: 2,
        wordCount: 64,
        text: `Clara looked up slowly. "I know," she said. "It's a good page." They sat in silence for a while after that — a comfortable silence that surprised her — until Felix arrived with a second cortado and placed it in front of Stefan without being asked. Clara laughed, which surprised her even more, and Stefan smiled as if he had been waiting for exactly that sound.`,
      },
    ],
  },
  {
    id: 'romance-2',
    categorySlug: 'romance',
    title: 'Seventeen Voicemails',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 178,
    paragraphs: [
      {
        index: 0,
        wordCount: 58,
        text: `Nadia had seventeen unlistened voicemails from the same number — area code 604, a number she had deleted from her phone but not from memory. She had been deleting them unheard every Sunday for two months, a ritual that felt like throwing stones into a lake, each one gone without a splash.`,
      },
      {
        index: 1,
        wordCount: 62,
        text: `On the night of the 14th, a power cut killed her apartment for forty minutes. In the dark, with nothing else to do, she listened to all seventeen. His name was Marco. His voice sounded tired and careful, like a man choosing each word the way you pick footing on ice. The last message was twenty-two seconds long and contained only four words: "I still remember everything."`,
      },
      {
        index: 2,
        wordCount: 58,
        text: `When the lights came back on, Nadia was sitting on her kitchen floor with her back against the fridge. Her dog, a small grey terrier named Biscuit, had climbed into her lap. She pressed call. It rang three times. Then Marco's voice, live and startled, said, "Nadia?" She closed her eyes and said, "Tell me again."`,
      },
    ],
  },

  // ── MODERN LIFE ───────────────────────────────────────────────────────────
  {
    id: 'modern-life-1',
    categorySlug: 'modern-life',
    title: 'The Wrong Coat',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 188,
    paragraphs: [
      {
        index: 0,
        wordCount: 60,
        text: `Tom Bakker grabbed the wrong coat from the rack at Hennessey's Bar — a charcoal wool overcoat that was not his — and only noticed when he reached into the pocket and found a folded receipt from a florist on Decker Street, dated two Saturdays ago, for fourteen white roses.`,
      },
      {
        index: 1,
        wordCount: 68,
        text: `His own coat — a navy parka with a broken zip on the right chest pocket — was still presumably hanging on peg seven, where he always hung it. He thought about going back. It was 11:40 pm and raining. The coat fit well, which made it worse. Inside the collar, a dry-cleaning tag read "R. Moss — 07890 554 312."`,
      },
      {
        index: 2,
        wordCount: 60,
        text: `He texted the number: "I think I have your coat. Got mine by mistake at Hennessey's." The reply came in forty seconds: "Oh god. I've been looking everywhere. The roses were for my mum's birthday. Are you still nearby?" Tom turned around and walked back toward the bar, the rain pattering against the wool of a stranger's coat.`,
      },
    ],
  },
  {
    id: 'modern-life-2',
    categorySlug: 'modern-life',
    title: 'Platform Nine',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 175,
    paragraphs: [
      {
        index: 0,
        wordCount: 57,
        text: `Every morning at 7:52, Lena Brandt stood at the exact same spot on Platform 9 at Margate station — two tiles left of the yellow safety line, level with the second lamp post. She had done this for four years without thinking about why, the way you stop thinking about breathing.`,
      },
      {
        index: 1,
        wordCount: 62,
        text: `On a Thursday in February, a man in a green raincoat stood in her spot. She hesitated, then stood one tile to the right. The man turned, noticed her slight frown, and said, "Sorry — force of habit. I used to catch this train every day. First time back in eight months." His name was James. He had been in Lisbon working on a documentary about tidal erosion.`,
      },
      {
        index: 2,
        wordCount: 56,
        text: `The 7:54 arrived two minutes late. In those two minutes, they had established that they both bought the same brand of coffee from the kiosk near the ticket barriers, both got off at Cannon Street, and that his documentary had won a regional award for environmental journalism. She asked which one. He said, "The Sanderson Prize."`,
      },
    ],
  },

  // ── YOUNG MODERN LIFE ─────────────────────────────────────────────────────
  {
    id: 'young-modern-life-1',
    categorySlug: 'young-modern-life',
    title: 'Read Receipts',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 182,
    paragraphs: [
      {
        index: 0,
        wordCount: 58,
        text: `Zoe had sent the voice note at 11:23 pm on a Wednesday — forty-seven seconds, which she'd replayed three times before hitting send, hating herself the third time. The two grey ticks turned blue immediately. Then nothing. No reply. Just the blue ticks sitting there like a verdict.`,
      },
      {
        index: 1,
        wordCount: 66,
        text: `She put her phone face-down on her desk and opened her laptop to finish the third-year essay she'd been ignoring for six days: "The Ethics of Algorithmic Curation in Social Media Platforms." The irony of writing about algorithms while being psychologically trapped by one was not lost on her. Her flatmate, Priti, knocked on the door at midnight and said, "Stop checking your phone and come eat noodles."`,
      },
      {
        index: 2,
        wordCount: 58,
        text: `The reply came at 12:41 am, while Zoe was eating spicy peanut noodles on the kitchen floor: "Sorry — fell asleep on my phone lol. That was really brave of you to say. Can I call you tomorrow?" She showed Priti the screen. Priti read it, looked up, and said, "He said 'brave.' That's the right word."`,
      },
    ],
  },
  {
    id: 'young-modern-life-2',
    categorySlug: 'young-modern-life',
    title: 'The Group Chat',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 170,
    paragraphs: [
      {
        index: 0,
        wordCount: 55,
        text: `The group chat was called "The Lighthouse Crew" and had been silent for six weeks — since Connor had moved to Edinburgh for his graduate programme and the rest of them had felt the group's centre of gravity shift without anyone saying so out loud.`,
      },
      {
        index: 1,
        wordCount: 60,
        text: `Maya broke the silence at 6:15 pm on a Saturday with a photo: her holding a key with a yellow tag labelled "Flat 3B." Below the photo: "I got it. Moving in March 2nd. Help needed. Will provide pizza and genuine emotional support going forward." Within four minutes, she had three replies — all variations of "I'm coming" — plus a voice note from Connor that was mostly wind noise and him shouting from what sounded like a hill.`,
      },
      {
        index: 2,
        wordCount: 55,
        text: `The chat erupted. By 8pm, they had a date, a time (11am), a pizza place (Franco's on Leigh Road), and a shared spreadsheet titled "Maya's Flat: Who Brings What." Rhys had written "vibes" next to his name and nothing else. Someone added a laughing emoji. The Lighthouse Crew was back.`,
      },
    ],
  },

  // ── ADVENTURE ─────────────────────────────────────────────────────────────
  {
    id: 'adventure-1',
    categorySlug: 'adventure',
    title: 'The Rupa Pass',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 194,
    paragraphs: [
      {
        index: 0,
        wordCount: 64,
        text: `At 4,780 metres, the Rupa Pass was everything the guidebook had understated. Kit Langford stood at the edge of the snowfield and stared at the descent: a 300-metre near-vertical slope of wind-packed ice, no fixed ropes, no markers. His partner, Devi Rana, had already clipped her ice axe to her harness and was studying the angle with the focused stillness of someone doing arithmetic.`,
      },
      {
        index: 1,
        wordCount: 68,
        text: `"The eastern gully," Devi said, pointing left. "It's longer but the gradient's under 40 degrees. We can kick-step the whole thing." Kit checked his altimeter: 4,782 metres, temperature minus 14 Celsius. They had three hours of daylight and enough fuel for one more meal. Their camp was at 3,900 metres, somewhere below the cloud line. He trusted her judgement, the way you trust a compass — not because you check it every minute, but because you built the habit of trusting it.`,
      },
      {
        index: 2,
        wordCount: 62,
        text: `They moved together down the eastern gully, Devi leading, Kit watching her footwork and copying each placement. Twice the snow gave way beneath him and he drove the axe in hard, his forearms burning. An hour and ten minutes later, they stepped off the ice onto moraine and sat down without speaking. Devi pulled a small red thermos from her pack and poured two cups of ginger tea, and they drank in the wind.`,
      },
    ],
  },
  {
    id: 'adventure-2',
    categorySlug: 'adventure',
    title: 'River Dark',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 181,
    paragraphs: [
      {
        index: 0,
        wordCount: 60,
        text: `The Boro River turned grey before noon and churned white by two o'clock. Ben Okafor paddled hard on the left brace, reading the water twenty metres ahead the way his instructor, a sun-weathered woman named Carla Sims, had drilled into him during six weeks of flatwater training in Derbyshire.`,
      },
      {
        index: 1,
        wordCount: 65,
        text: `The rapid was rated Class IV on the map — "technical, powerful, not for beginners" — but the river had been running high for eleven days and technical became something else entirely when the volume doubled. Ben spotted the pourover too late, paddled left three strokes, and took it side-on. The kayak flipped. In the underwater silence, he found the T-grip with his left hand and rolled up on the second attempt.`,
      },
      {
        index: 2,
        wordCount: 56,
        text: `He caught an eddy behind a boulder the size of a van and sat there, breathing. His helmet had a crack above the right temple. The river noise was enormous — the kind that stops language and leaves only the basic vocabulary of the body. He raised his paddle and his kayak partner, Raji, raised hers from fifty metres downstream. Still upright. Both okay.`,
      },
    ],
  },

  // ── TRAVEL ────────────────────────────────────────────────────────────────
  {
    id: 'travel-1',
    categorySlug: 'travel',
    title: 'Guestbook, Room 12',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 186,
    paragraphs: [
      {
        index: 0,
        wordCount: 60,
        text: `The guesthouse was called Casa Linde and sat at the end of a cobbled lane in Évora, Portugal, behind an orange tree so old the owner, a quiet woman named Dona Beatriz, said her grandmother had planted it. Room 12 was small and white with a window that opened onto a courtyard where cats slept on terracotta pots.`,
      },
      {
        index: 1,
        wordCount: 66,
        text: `The guestbook on the windowsill held twelve years of entries. The most recent was from a Dutch couple — Elise and Maarten van Dijk — who had come for four nights and stayed for three weeks. They wrote: "We came for the Roman ruins and left having understood something about slowness." The entry before theirs was from a Japanese architect who had drawn a careful ink sketch of the courtyard, signed with only the initials K.N.`,
      },
      {
        index: 2,
        wordCount: 60,
        text: `On her third morning, the narrator added her own entry in blue ink: two sentences and a small drawing of the orange tree. Dona Beatriz saw her writing as she passed the open doorway, paused, and brought a glass of chilled moscatel without being asked. They sat together for a few minutes in the courtyard, without needing a shared language, watching a grey cat redistribute itself across a terracotta pot.`,
      },
    ],
  },
  {
    id: 'travel-2',
    categorySlug: 'travel',
    title: 'Overnight to Konya',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 179,
    paragraphs: [
      {
        index: 0,
        wordCount: 58,
        text: `The overnight bus from Istanbul to Konya departed from Esenler terminal at 10:45 pm. The seat was reclining, a thin pillow wrapped in a paper sleeve, and a small bottle of lemon cologne had been placed in the cupholder — an unexpected Turkish courtesy that would repeat at every rest stop.`,
      },
      {
        index: 1,
        wordCount: 63,
        text: `At 2 am, somewhere on the Anatolian plateau, the bus stopped at a roadside rest area called Mavi Köy. Passengers shuffled out into cold, dry air thick with the smell of woodsmoke. A man at the tea counter — his name badge said Mehmet — handed out small tulip-shaped glasses of çay without being asked, a reflex born from decades of this exact transaction. The tea cost three lira.`,
      },
      {
        index: 2,
        wordCount: 58,
        text: `Back on the bus, the narrator fell asleep somewhere past Afyonkarahisar and woke to pale gold light spreading over flat farmland. Konya's skyline appeared on the horizon, the green dome of the Mevlana Mausoleum catching the first light. The woman in the next seat, who had not spoken all night, leaned across and said simply, "Beautiful, yes?" And it was.`,
      },
    ],
  },

  // ── MYSTERY ───────────────────────────────────────────────────────────────
  {
    id: 'mystery-1',
    categorySlug: 'mystery',
    title: 'The Aldgate Inheritance',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 196,
    paragraphs: [
      {
        index: 0,
        wordCount: 64,
        text: `Detective Sergeant Fiona Mares arrived at the Aldgate townhouse at 8:15 am, forty minutes after the call came in. The victim was a man named Gerald Vance, 71, found in his study at the top of the house, seated at his desk as if still reading. The desk lamp was on. The window was latched from the inside. The door had been locked.`,
      },
      {
        index: 1,
        wordCount: 68,
        text: `Mares noted three things immediately: a half-full glass of water on the desk beside a bottle of digoxin tablets, a leather-bound journal open to a page dated two weeks prior, and a framed photograph of two men — one of whom was Gerald Vance — standing on what appeared to be a wooden pier, a red lighthouse visible in the background. The other man she did not recognise. The photo was new; she could see the ghost of a different frame outline on the wallpaper behind it.`,
      },
      {
        index: 2,
        wordCount: 64,
        text: `The solicitor, a composed woman named Harriet Dunne, arrived at ten o'clock uninvited and told Mares that Gerald Vance had changed his will five days before his death. The new beneficiary was his estranged nephew, a man named Paul Vance, who had not spoken to Gerald in eleven years. Harriet slid a card across the desk: Paul's number. "He'll be expecting your call," she said. Mares looked at her. "How do you know?" Harriet did not answer.`,
      },
    ],
  },
  {
    id: 'mystery-2',
    categorySlug: 'mystery',
    title: 'Missing from Pier 7',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 188,
    paragraphs: [
      {
        index: 0,
        wordCount: 61,
        text: `The boat — a blue and white 28-foot sloop registered as Cormorant — had been tied to Pier 7 at Saltwick Marina since Thursday. By Sunday morning, the owner, a retired schoolteacher named Alan Greig, had not been seen for sixty-one hours. His car was still in the marina car park, engine cold.`,
      },
      {
        index: 1,
        wordCount: 65,
        text: `Constable Yemi Adeyemi searched the boat on Sunday afternoon and found: a half-eaten meal of cold pasta, a mobile phone with a cracked screen and no battery, a nautical chart with a pencilled circle around a point called Dunwick Bank fourteen miles offshore, and a note — just four words, written in red pen on the back of a fuel receipt: "Ask the harbour master." The harbour master's name was Ingrid Thorne.`,
      },
      {
        index: 2,
        wordCount: 62,
        text: `Ingrid Thorne was a large, careful woman who chose her words the way a surgeon chooses instruments. She told Adeyemi that Alan Greig had asked her on Thursday evening about a vessel called the Mira Luz — whether she had been seen in local waters recently. Ingrid had said no. Alan had gone very quiet, thanked her, and walked back to Pier 7 without looking back.`,
      },
    ],
  },

  // ── FANTASY ───────────────────────────────────────────────────────────────
  {
    id: 'fantasy-1',
    categorySlug: 'fantasy',
    title: 'The Cartographer of Lost Places',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 200,
    paragraphs: [
      {
        index: 0,
        wordCount: 66,
        text: `Every map Sera Vond drew came true. Not immediately, and never precisely — more like a tide, the features arriving slowly, the distances sometimes compressed or stretched — but the places she drew always appeared eventually in the world. She had learned this at seventeen, when the forest she had invented for a school project grew up overnight on the edge of the town of Hallow, three kilometres east of the river.`,
      },
      {
        index: 1,
        wordCount: 70,
        text: `She lived above a print shop in the city of Varn and drew only commissioned work: shipping routes, city surveys, vineyard boundaries. Nothing from her imagination. She kept that under strict lock — an iron box with two separate keys, one worn on a cord around her neck, one hidden inside the spine of a red book on the third shelf of her sitting-room bookcase. The red book was titled "Principles of Land Measurement," and it was hollow.`,
      },
      {
        index: 2,
        wordCount: 64,
        text: `On the morning the trouble began, a woman in grey robes arrived at her shop before it opened. She held a folded piece of paper and would not hand it over until Sera confirmed she was alone. Inside was a rough sketch of a valley that Sera recognised immediately, though she had never drawn it, had never shown it to anyone, had seen it only in a dream — the same dream, recurring since childhood, of a valley with a violet sky and three white towers.`,
      },
    ],
  },
  {
    id: 'fantasy-2',
    categorySlug: 'fantasy',
    title: 'The Debt of Twelve Words',
    generationDate: '2026-04-23',
    isContinuation: false,
    parentStoryId: null,
    wordCount: 190,
    paragraphs: [
      {
        index: 0,
        wordCount: 62,
        text: `In the kingdom of Ashveld, debts were repaid in words. Every contract, every loan, every bargain was settled not in coin but in language — specific words, given over with ceremony, that the creditor could then spend or save as they chose. A new word granted the speaker one use of it, and one use only, before it dissolved.`,
      },
      {
        index: 1,
        wordCount: 66,
        text: `Cade Orrow owed twelve words to a woman named the Velvet Broker, a moneylender who worked from a narrow building on Wick Lane in the capital. He had borrowed them four years ago to close a deal that had since collapsed, leaving him with the debt and none of the profit. The Broker had been patient — unusually so — but last week she had sent a red envelope, which in Ashveld meant: time is up.`,
      },
      {
        index: 2,
        wordCount: 62,
        text: `Cade had nine of the twelve words saved in a small glass bottle corked with wax, the bottle hidden inside a boot in his wardrobe. He needed three more in forty-eight hours. He knew where to get them, but it would require asking a favour from someone he had avoided for two years: his older brother Mace, who owed him nothing and knew it perfectly well.`,
      },
    ],
  },
]

/** Stories indexed by category for quick lookup. */
export const mockStoriesByCategory: Record<CategorySlug, Story[]> = {
  'sci-fi': mockStories.filter(s => s.categorySlug === 'sci-fi'),
  'romance': mockStories.filter(s => s.categorySlug === 'romance'),
  'modern-life': mockStories.filter(s => s.categorySlug === 'modern-life'),
  'young-modern-life': mockStories.filter(s => s.categorySlug === 'young-modern-life'),
  'adventure': mockStories.filter(s => s.categorySlug === 'adventure'),
  'travel': mockStories.filter(s => s.categorySlug === 'travel'),
  'mystery': mockStories.filter(s => s.categorySlug === 'mystery'),
  'fantasy': mockStories.filter(s => s.categorySlug === 'fantasy'),
}

/**
 * Return N mock stories for a session. If count > available stories,
 * cycles through the available ones (development only).
 */
export function getMockStoriesForSession(category: CategorySlug, count: number): Story[] {
  const pool = mockStoriesByCategory[category]
  const result: Story[] = []
  for (let i = 0; i < count; i++) {
    result.push(pool[i % pool.length])
  }
  return result
}
