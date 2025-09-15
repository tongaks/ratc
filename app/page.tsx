'use client'

export default function Home() {
  function handleSubmit() {
    alert(1);
  }

  return (
    <>
      <div className="h-screen w-screen bg-stone-300 flex items-center justify-center">
        
        <form onSubmit={handleSubmit} className="rounded-xl p-10 bg-stone-100 shadow-lg">
          <input
            className="p-2 mt-2 w-full border-2 border-black text-black rounded"
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            className="p-2 mt-2 w-full border-2 border-black text-black rounded"
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
            className="mt-4 p-2 w-full bg-green-500 text-white font-semibold rounded cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>

      </div>
    </>
  );
}
