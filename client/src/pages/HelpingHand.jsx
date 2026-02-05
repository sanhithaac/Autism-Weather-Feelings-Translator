import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HelpingHand() {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const [request, setRequest] = useState({
        problem: '',
        need: '',
        space: 'Near me',
        urgency: 'low',
        note: ''
    });

    const problems = [
        { id: 'noise', label: 'Too Loud! 🔊', color: 'bg-red-100 text-red-700' },
        { id: 'light', label: 'Too Bright! ☀️', color: 'bg-yellow-100 text-yellow-700' },
        { id: 'fizzy', label: 'Feeling Fuzzy 🌀', color: 'bg-purple-100 text-purple-700' },
        { id: 'crowd', label: 'Too Crowded 👨‍👩‍👦', color: 'bg-blue-100 text-blue-700' },
        { id: 'itchy', label: 'Itchy Clothes 👕', color: 'bg-orange-100 text-orange-700' },
        { id: 'tired', label: 'Brain is Tired 😴', color: 'bg-indigo-100 text-indigo-700' }
    ];

    const needs = [
        { id: 'hug', label: 'A Big Hug 🤗', icon: '🫂' },
        { id: 'quiet', label: 'Quiet Time 🤫', icon: '☁️' },
        { id: 'snack', label: 'A Snack 🍎', icon: '🥨' },
        { id: 'muffs', label: 'My Ear Muffs 🎧', icon: '👂' },
        { id: 'walk', label: 'A Little Walk 🚶', icon: '🌳' },
        { id: 'weighted', label: 'Heavy Blanket 🛋️', icon: '⚖️' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="max-w-3xl w-full bg-white rounded-[3rem] shadow-2xl p-12 text-center border-t-8 border-primary">
                    <div className="text-8xl mb-8">💌</div>
                    <h2 className="text-5xl font-bold text-gray-800 mb-6">Message Sent!</h2>
                    <p className="text-2xl text-gray-600 mb-10 leading-relaxed">
                        I've sent your <strong>Helping Hand</strong> note to your parent. <br />
                        Stay calm, they are coming to help you soon! 💖
                    </p>
                    <div className="bg-green-50 rounded-3xl p-8 mb-10 text-left border-2 border-primary/10">
                        <p className="text-primary font-bold uppercase tracking-wider text-sm mb-2">Your Request Summary:</p>
                        <p className="text-xl text-emerald-900 italic">
                            "I'm feeling {request.problem} and I need {request.need}. Please stay {request.space}."
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-primary hover:bg-accent text-white px-12 py-5 rounded-full font-bold text-xl shadow-xl transition-all"
                    >
                        Return to Safety →
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-primary mb-4 italic">The Helping Hand 🤝</h1>
                    <p className="text-xl text-gray-600">Sometimes words are hard. Use this to tell us exactly what you need!</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border-b-8 border-primary/20">
                    <div className="p-10 md:p-16 space-y-12">

                        {/* SECTION 1: THE PROBLEM */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-4">
                                <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm">1</span>
                                What's bothering you?
                            </h2>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {problems.map(p => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setRequest({ ...request, problem: p.label })}
                                        className={`p-6 rounded-3xl text-left border-4 transition-all ${request.problem === p.label ? 'border-primary shadow-lg scale-105 ' + p.color : 'border-gray-50 bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                    >
                                        <span className="text-xl font-bold">{p.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 2: THE NEED */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-4">
                                <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm">2</span>
                                What can we do to help?
                            </h2>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                {needs.map(n => (
                                    <button
                                        key={n.id}
                                        type="button"
                                        onClick={() => setRequest({ ...request, need: n.label })}
                                        className={`p-8 rounded-[2rem] flex flex-col items-center gap-4 transition-all border-4 ${request.need === n.label ? 'border-primary bg-green-50 shadow-lg scale-105' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <span className="text-5xl">{n.icon}</span>
                                        <span className="font-bold text-center">{n.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 3: THE SPACE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-4">
                                    <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm">3</span>
                                    Where should I be?
                                </h2>
                                <div className="space-y-4">
                                    {['Right next to me 🫂', 'Across the room 👀', 'In another room 🚪'].map(s => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setRequest({ ...request, space: s })}
                                            className={`w-full p-5 rounded-2xl text-left font-bold border-2 transition-all ${request.space === s ? 'bg-primary text-white border-primary' : 'bg-white border-gray-100'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-4">
                                    <span className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm">4</span>
                                    Any extra notes?
                                </h2>
                                <textarea
                                    className="w-full h-40 bg-gray-50 rounded-3xl p-6 focus:outline-none focus:ring-4 focus:ring-primary/20 text-lg border-2 border-gray-100"
                                    placeholder="Type anything else you'd like us to know..."
                                    value={request.note}
                                    onChange={(e) => setRequest({ ...request, note: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-accent text-white font-bold py-6 rounded-[2rem] text-2xl shadow-2xl transition-all transform hover:-translate-y-2 flex items-center justify-center gap-3"
                        >
                            Send for Help ✨🚀
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}
