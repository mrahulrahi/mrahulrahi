import { useState } from 'react';

export default function LoginForm() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (userName === 'manjeet') {
      if (password === '123456') {
        alert('You Are Logged In Successfully');
      } else {
        alert('Sorry Your Password Is Wrong');
      }
    } else {
      alert('Sorry Your User Name Is Wrong');
    }
  };

  return (
    <>
      <input
        type="text"
        name="user"
        placeholder="Enter User Name"
        className="form-input mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        className="form-input mt-1 block w-full rounded-md bg-white/25 border-transparent focus:border-accent focus:bg-white/25 focus:ring-0 text-white/50 placeholder:text-white/50"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="btn" type="button" onClick={handleLogin}>
        Click
      </button>
    </>
  );
}
