import logo from "../assets/logo/check-mark-button-svgrepo-com (1).svg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Help = () => {
  return (
    <div className="mx-10 xl:mx-18 border border-[#A1A3AB] h-full rounded-2xl p-7">
      <div className="flex justify-center items-center gap-3 mb-10">
        <img src={logo} alt="Check SVG" className="w-10 h-10" />
        <p className="text-center text-4xl">
          <span className="font-semibold text-[#FF6767]">To-</span>
          Do
        </p>
      </div>
      <div className="w-full mb-5">
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
      </div>
      <ul className="ps-14 w-full px-7 flex flex-col gap-5 list-disc">
        <li>
          <b>Todo-master</b> is a minimal To-Do app built to help you manage
          your daily tasks without the clutter. It’s fast, easy to use, and
          designed to keep you focused on what actually matters.
        </li>
        <li>
          Why This App Exists We’ve all been there — writing tasks on sticky
          notes, losing track of reminders, or switching between too many apps
          just to stay organized. That frustration is what gave birth to
          Todo-master. The idea was simple:{" "}
          <u>
            Make a task manager that’s lightweight, personal, and actually
            enjoyable
          </u>{" "}
          to use.{" "}
        </li>
        <li>
          What Makes It Different Unlike most “big productivity tools,”
          Todo-master doesn’t try to do everything. It keeps things simple:
          <p>✅ Add & manage tasks quickly </p>
          <p>✅ Set deadlines & reminders that actually help </p>
          <p>✅ Organize with categories or tags </p>
          <p>✅ Sync across devices</p>
          No learning curve, no distractions — just a tool you can rely on every
          day.
        </li>
        <li>
          The Journey So Far This app started as a small side project and
          quickly became a daily habit. Over time, it has grown into something
          that’s not just for me, but for anyone who wants a clean and friendly
          way to stay on top of their tasks.
        </li>
        <li>
          Looking Ahead The vision for Todo-master is simple: 👉 Stay minimal,
          but keep getting better. Future updates will bring smarter reminders,
          collaboration features, and integrations — but the focus will always
          stay on simplicity.{" "}
        </li>
        <li>
          <p className="mb-2">
            About Me 👋 Hi, I’m <b>Nischay Gadher</b> — a MERN Stack Developer
            who loves creating tools that make life simpler and more productive.
            This app started as a personal project during my development
            journey, but it’s become something I use every day — and now I’m
            excited to share it with you. When I’m not coding, you’ll probably
            find me exploring new tech, working on side projects, or thinking of
            ways to make everyday problems easier to solve through software.
          </p>
          <p className="flex items-center gap-1 mb-1">
            <FaGithub className="text-lg" />:
            <a
              href="https://github.com/nischaygadher15/todoapp-nkg-frontend"
              className="font-semibold"
            >
              Todo-master
            </a>
          </p>
          <p className="flex items-center gap-1 mb-1">
            <FaLinkedin className="text-lg text-blue-700" />:
            <a
              href="https://www.linkedin.com/in/nischay-gadher/"
              className="text-blue-500 font-semibold"
            >
              Gadher Nischay
            </a>
          </p>
          <a href="mail:nischaygadher15@gmail.com" className="block mb-1">
            📧 : nischaygadher15@gmail.com
          </a>
          <a href="tel:+918141409448" className="block mb-1">
            📱 : 8141409448
          </a>
        </li>
        <li>
          👉 Give <b>Todo-master</b> a try — and let’s make productivity simple
          together.
        </li>
      </ul>
    </div>
  );
};

export default Help;
