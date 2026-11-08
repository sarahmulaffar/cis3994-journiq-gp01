
import journiqLogo from '../assets/journiq-logo.jpg'

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#071d36]/55" />

      {/* Authentication panel */}
      <section className="relative z-10 w-full max-w-md rounded-2xl border border-white/50 bg-white/90 p-8 shadow-2xl backdrop-blur-md sm:p-10">

        <div className="mb-8 text-center">
          <img
            src={journiqLogo}
            alt="Journiq Logo"
            className="mx-auto mb-3 h-20 w-auto object-contain"
          />

          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#64839e]">
            Journey smart, travel unique
          </p>

          <div className="mx-auto my-5 h-px w-16 bg-[#8baac2]" />

          <h2 className="font-serif text-2xl font-semibold text-[#173653]">
            {title}
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            {subtitle}
          </p>
        </div>

        {children}

        <div className="mt-7 text-center">
          {footer}
        </div>
      </section>
    </main>
  )
}

export default AuthLayout