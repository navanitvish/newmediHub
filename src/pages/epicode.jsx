import { useState } from 'react';
import { Bell, Film } from 'lucide-react';

export default function EpisodesWithVideo() {
    const [selectedEpisode, setSelectedEpisode] = useState(1);

    const episodes = [
        { id: 1, title: 'GIDEON ARMSTRONG', emoji: '🧠' },
        { id: 2, title: 'HAWKTUAH', emoji: '🧦 💦' },
        { id: 3, title: 'FIELD OF CHAOS', emoji: '🎪 🌪️ 📱' },
        { id: 4, title: 'FREE ROGER', emoji: '👨 👮' },
        { id: 5, title: 'THE BORING TUNNEL', emoji: '🚧' },
        { id: 6, title: 'ELON\'S BUNKER', emoji: '📉 🚗 🔥' },
        { id: 7, title: 'BRAD VS GENSLER', emoji: '🚗 🏢' },
        { id: 8, title: 'SAYLOR, TRUMP, GENSLER & BITCOIN', emoji: '📉 🪙' },
        { id: 9, title: '$TRUMP VS $BTC', emoji: '💰 💼' },
        { id: 10, title: 'TATE & COACH JV', emoji: '🦁 💨' },
    ];

    const extras = [
        "Full House",
        "EP6 Teaser - Elon's Bunker",
        "EP7 Teaser - Brad / XRP",
        "EP7 Teaser - Gensler & XRP",
        "MAGA: Mission Reinstated (80s TV Show)",
        "EP8 Teaser - Saylor",
        "EP8 Teaser - Trump vs Gensler",
        "The Office",
        "EP11 Teaser - Ross Ulbricht",
        "Cheers",
        "Robert F Kennedy Jr - MAHA",
        "Andrew Tate's Valentine's Day",
        "Kim Jong Un",
        "Snow White & Seven Crypto Bros - Part 1"
    ];

    return (
        <div>
            <div className="flex flex-row md:flex-row gap-8 p-8 bg-gray-100 min-h-screen">
                {/* Video Player Section */}
                <div className="w-full md:w-1/2 lg:w-2/5">
                    <div className="bg-black rounded-lg overflow-hidden shadow-lg">
                        <div className="relative">
                            <video
                            
                                controls
                                muted

                                
                                src="/api/placeholder/600/400"
                                alt={`Episode ${selectedEpisode} thumbnail`}
                                className="w-full h-[600px]"

                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="bg-white bg-opacity-20 rounded-full p-4 hover:bg-opacity-30 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <h3 className="text-white text-xl font-bold">
                                    EP{selectedEpisode} - {episodes[selectedEpisode - 1].title}
                                </h3>
                                <div className="flex items-center mt-2">
                                    <div className="bg-gray-600 h-1 flex-grow rounded-full overflow-hidden">
                                        <div className="bg-red-500 h-full w-1/3"></div>
                                    </div>
                                    <span className="text-white ml-2 text-sm">12:34</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Film className="text-purple-600" size={24} />
                            <span className="text-xl font-semibold">EPISODE ONE</span>
                            <span className="text-orange-500">🔥 🔥 🔥</span>
                            <span className="text-yellow-500">👍</span>
                        </div>
                        <p className="text-gray-700 text-lg">
                            In a world overrun by scammer zombies, Gideon fights to rescue beloved memes.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                        <Bell className="text-yellow-500" size={20} />
                        <span>Follow us on our socials for more episodes.</span>
                    </div>
                </div>
            </div>

            {/* Main Episodes List Section */}
            <div className="w-full mx-auto md:w-3/4 lg:w-3/5 px-8 py-10">
                <h1 className="text-4xl font-bold text-black text-center mb-2">EPISODES</h1>
                <p className="text-center text-green-800 mb-6">The main story</p>

                <div className="space-y-3 mb-12">
                    {episodes.map(episode => (
                        <button
                            key={episode.id}
                            className={`w-full p-4 border-2 rounded-md text-center transition hover:bg-gray-200 ${
                                selectedEpisode === episode.id ? 'border-gray-500' : 'border-gray-300'
                            }`}
                            onClick={() => setSelectedEpisode(episode.id)}
                        >
                            <span className="text-gray-700 font-medium">
                                EP{episode.id} - {episode.title} <span className="ml-1">{episode.emoji}</span>
                            </span>
                        </button>
                    ))}
                </div>

                {/* Extras Worth Viewing Section */}
                <div className="mt-10">
                    <h2 className="text-3xl font-bold text-center mb-6">Extras Worth Viewing</h2>
                    <p className="text-center text-gray-600 mb-8">Special Editions and Teasers</p>

                    <div className="grid grid-cols-1 gap-3">
                        {extras.map((extra, index) => (
                            <button
                                key={index}
                                className="p-3 border-2 border-gray-300 rounded-md text-center transition hover:bg-gray-200"
                            >
                                <span className="text-gray-700 font-medium">{extra}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}