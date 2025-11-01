// import { motion } from "framer-motion";
// import { User, Mail, Lock } from "lucide-react";

// export default function AuthForm({ type }) {
//   const isLogin = type === "login";

//   return (
//     <motion.div
//       className="w-[350px] p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-700 shadow-2xl"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="text-2xl font-bold text-white mb-6 text-center">
//         {isLogin ? "Login" : "Sign Up"}
//       </h2>

//       {!isLogin && (
//         <div className="relative mb-4">
//           <User className="absolute left-3 top-3 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full pl-10 p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
//           />
//         </div>
//       )}

//       <div className="relative mb-4">
//         <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
//         <input
//           type="email"
//           placeholder="Email Address"
//           className="w-full pl-10 p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
//         />
//       </div>

//       <div className="relative mb-6">
//         <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full pl-10 p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
//         />
//       </div>

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold p-2 rounded-lg shadow-lg"
//       >
//         {isLogin ? "Login Now" : "Create Account"}
//       </motion.button>

//       <div className="flex items-center mt-4 space-x-2 text-sm text-gray-400">
//         <input type="checkbox" />
//         <span>Agree to the terms of use & privacy policy.</span>
//       </div>

//       <div className="text-center text-sm mt-3 text-gray-400">
//         {isLogin ? (
//           <>
//             Create an account?{" "}
//             <a href="/register" className="text-purple-400 hover:underline">
//               Click here
//             </a>
//           </>
//         ) : (
//           <>
//             Already have an account?{" "}
//             <a href="/login" className="text-purple-400 hover:underline">
//               Login here
//             </a>
//           </>
//         )}
//       </div>
//     </motion.div>
//   );
// }

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login', form);
    } else {
      console.log('Register', form);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-black via-indigo-950 to-black relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#5b21b6_0%,_transparent_70%)]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      <div className="flex flex-col items-center relative z-10">
        <motion.div className="mb-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-purple-500 p-3 rounded-xl">
              <span className="text-white text-xl">💬</span>
            </div>
            <h1 className="text-3xl font-bold text-white">QuickChat</h1>
          </div>
        </motion.div>

        <motion.div
          key={isLogin ? 'login' : 'register'}
          className="w-[350px] p-6 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-700 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative mb-4">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-10 p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            )}

            <div className="relative mb-4">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-10 p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div className="relative mb-6">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold p-2 rounded-lg shadow-lg"
            >
              {isLogin ? 'Login Now' : 'Create Account'}
            </motion.button>

            <div className="flex items-center mt-4 space-x-2 text-sm text-gray-400">
              <input type="checkbox" />
              <span>Agree to the terms of use & privacy policy.</span>
            </div>

            <div className="text-center text-sm mt-3 text-gray-400">
              {isLogin ? (
                <>Create an account? <button type="button" onClick={() => setIsLogin(false)} className="text-purple-400 hover:underline">Click here</button></>
              ) : (
                <>Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="text-purple-400 hover:underline">Login here</button></>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
