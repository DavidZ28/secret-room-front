export default function Navbar() {
  return (
    <nav className="w-full py-4 px-8 bg-[#0D1018] flex justify-between items-center flex-shrink-0">
      
      <div className="w-6 h-6 border border-gray-700 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 border border-gray-600 rounded-full"></div>
      </div>

      <span className="text-gray-500 text-xs uppercase tracking-[0.3em] font-light">
        SECURITY
      </span>

    </nav>
  )
}