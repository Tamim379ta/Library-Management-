import React from 'react';

const Hero = () => {
  return (
    <section
      className="w-full min-h-screen overflow-hidden flex items-center"
      style={{
        background: "linear-gradient(135deg, #659287 0%, #88BDA4 50%, #B1D3B9 100%)"
      }}
    >
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }
        @keyframes floatY2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(14px) rotate(-10deg); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.85) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .anim-fadeup { animation: fadeUp 0.8s ease-out forwards; opacity: 0; }
        .anim-popin { animation: popIn 0.8s ease-out forwards; opacity: 0; }
        .float-a { animation: floatY 4s ease-in-out infinite; }
        .float-b { animation: floatY2 5s ease-in-out infinite; }
        .float-c { animation: floatY 3.5s ease-in-out infinite; }
      `}</style>

      {/* Shelf backdrop */}
      <div className="hidden lg:block absolute top-[22%] bottom-0 right-0 w-[42%] bg-[#B1D3B9] rounded-tl-[120px] z-0" />

      {/* Main content container */}
      <div className="relative z-20 container mx-auto px-6 lg:px-20 pt-32 pb-16 lg:py-0 flex flex-col lg:flex-row justify-between items-center gap-12 w-full">

        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col gap-6 max-w-xl text-center lg:text-left">
          <h1
            className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight anim-fadeup"
            style={{ animationDelay: '0.1s' }}
          >
            Every Book You Need,
            <span className="block mt-1">Just a Click Away</span>
          </h1>

          <p
            className="text-[#E6F2DD]/90 text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed anim-fadeup"
            style={{ animationDelay: '0.3s' }}
          >
            Browse, reserve, and manage your university's entire library
            collection from one place — no more waiting in line.
          </p>

          <div
            className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2 anim-fadeup"
            style={{ animationDelay: '0.5s' }}
          >
            <button className="bg-white text-[#3F5F53] font-semibold px-8 py-3.5 rounded-full hover:bg-[#E6F2DD] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-md">
              Browse Books
            </button>
            <button className="border-2 border-white/60 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
              Sign In
            </button>
          </div>
        </div>

        {/* Right: Static Text Card with floating emojis */}
        <div className="flex-1 flex justify-center lg:justify-end lg:self-end w-full lg:mb-16 relative">

          {/* Floating animated emojis — z-30 so they sit above the card (z-10) */}
          <span className="hidden sm:block absolute -top-2 left-30  text-4xl float-a select-none z-30">📚</span>
          <span className="hidden sm:block absolute top-2 right-2 text-3xl float-b select-none z-30">✨</span>
          <span className="hidden sm:block absolute -bottom-6 left-40 text-3xl float-c select-none z-30">🔖</span>
          <span className="hidden sm:block absolute bottom-16 -right-6 text-4xl float-b select-none z-30">🎓</span>

          <div
            className="relative z-10 w-full max-w-sm bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 text-left anim-popin hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="text-[#3F5F53] font-bold text-xs uppercase tracking-wider bg-[#88BDA4]/20 px-2.5 py-1 rounded-md">
              New Arrivals 🆕
            </span>

            <h3 className="text-[#2C443B] font-bold text-xl mt-3 mb-2">
              200+ Titles Added This Week
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              From bestselling novels to research journals, freshly stocked shelves
              are ready to explore. Reserve online and pick up at your nearest
              campus counter — often within the hour.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;