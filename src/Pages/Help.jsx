import React from "react";
import logo from "../assets/logo/check-mark-button-svgrepo-com (1).svg";

const Help = () => {
  return (
    <div className="mx-10 xl:mx-18 border border-[#A1A3AB] h-full rounded-2xl p-5">
      <div className="flex justify-center items-center gap-3 mb-10">
        <img src={logo} alt="Check SVG" className="w-10 h-10" />
        <p className="text-center text-4xl">
          <span className="font-semibold text-[#FF6767]">To-</span>
          Do
        </p>
      </div>
      <div className="w-full px-24">
        <p className="text-xl mb-2">
          <span className="font-semibold">Version:</span> 1.0.0
        </p>

        <p className="text-xl mb-2">
          <span className="font-semibold">Design By:</span> To-do List Web App
          Design (Community) - Figma
        </p>

        <p className="text-xl mb-2">
          <span className="font-semibold">Developed By:</span> Nischay K. Gadher
        </p>

        <p>
          About [Your App Name] A Simple Way to Stay Organized ✨ [Your App
          Name] is a minimal To-Do app built to help you manage your daily tasks
          without the clutter. It’s fast, easy to use, and designed to keep you
          focused on what actually matters.{" "}
        </p>
        <p>
          Why This App Exists We’ve all been there — writing tasks on sticky
          notes, losing track of reminders, or switching between too many apps
          just to stay organized. That frustration is what gave birth to [Your
          App Name]. The idea was simple: 👉 Make a task manager that’s
          lightweight, personal, and actually enjoyable to use.{" "}
        </p>
        <p>
          What Makes It Different Unlike most “big productivity tools,” [Your
          App Name] doesn’t try to do everything. It keeps things simple: ✅ Add
          & manage tasks quickly ✅ Set deadlines & reminders that actually help
          ✅ Organize with categories or tags ✅ Sync across devices No learning
          curve, no distractions — just a tool you can rely on every day.{" "}
        </p>
        <p>
          The Journey So Far This app started as a small side project and
          quickly became a daily habit. Over time, it has grown into something
          that’s not just for me, but for anyone who wants a clean and friendly
          way to stay on top of their tasks.{" "}
        </p>
        <p>
          Looking Ahead The vision for [Your App Name] is simple: 👉 Stay
          minimal, but keep getting better. Future updates will bring smarter
          reminders, collaboration features, and integrations — but the focus
          will always stay on simplicity.{" "}
        </p>
        <p>
          About Me 👋 Hi, I’m Nischay Gadher — a MERN Stack Developer who loves
          creating tools that make life simpler and more productive. This app
          started as a personal project during my development journey, but it’s
          become something I use every day — and now I’m excited to share it
          with you. When I’m not coding, you’ll probably find me exploring new
          tech, working on side projects, or thinking of ways to make everyday
          problems easier to solve through software. 📧
          nischaygadher15@gmail.com 📱 8141409448{" "}
        </p>
        <p>
          👉 Give [Your App Name] a try — and let’s make productivity simple
          together.
        </p>
      </div>
    </div>
  );
};

export default Help;
