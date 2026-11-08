
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import journiqLogo from '../assets/journiq-logo.jpeg'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const displayName =
    user?.name || user?.emailOrUsername || 'Traveler'

  return (
    <div className="min-h-screen bg-[#f3f7fb] text-[#173653]">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 flex-col bg-[#102d4e] p-7 text-white md:flex">

        <div className="mb-14 flex flex-col items-center">
  <img
    src={journiqLogo}
    alt="Journiq Logo"
    className="h-20 w-20 rounded-full object-contain bg-white p-1"
  />

  <p className="mt-3 text-center text-xs tracking-[0.2em] text-sky-200">
    JOURNEY SMART, TRAVEL UNIQUE
  </p>
</div>

        <nav>
          <div className="rounded-xl bg-white/15 px-5 py-4 font-medium">
            <span className="mr-3">⌂</span>
            Dashboard
          </div>
        </nav>

        <div className="mt-auto">
          <div className="mb-5 border-t border-white/20 pt-5">
            <p className="text-sm text-sky-200">Logged in as</p>
            <p className="mt-1 break-words font-medium">{displayName}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/30 px-5 py-3 text-left text-sm transition hover:bg-white/10"
          >
            ↪ Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-h-screen md:ml-64">

        {/* Top navigation */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 md:px-10">
          <div>
            <h2 className="font-serif text-xl font-semibold md:text-2xl">
              Dashboard
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Your personal travel space
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-[#102d4e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1b466d] md:hidden"
          >
            Log Out
          </button>

          <div className="hidden h-11 w-11 items-center justify-center rounded-full bg-sky-100 font-semibold text-[#173e62] md:flex">
            {displayName.charAt(0).toUpperCase()}
          </div>
        </header>

        <div className="p-5 md:p-10">

          {/* Welcome banner */}
          <section
            className="relative overflow-hidden rounded-3xl bg-cover bg-center p-8 text-white shadow-lg md:p-12"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(7,29,54,0.88), rgba(7,29,54,0.35)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85')"
            }}
          >
            <p className="mb-3 text-sm font-medium tracking-widest text-sky-200">
              WELCOME TO JOURNIQ
            </p>

            <h1 className="max-w-xl font-serif text-3xl font-bold leading-tight md:text-5xl">
              Welcome back, {displayName}!
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-white/85 md:text-base">
              Your journey begins with a dream.
              Explore your personal travel space and get ready
              for your next adventure.
            </p>
          </section>

          {/* Overview cards */}
          <section className="mt-9">
            <h2 className="font-serif text-2xl font-semibold">
              Your Overview
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              A quick look at your travel activities.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-2xl">
                  ✈
                </div>
                <p className="text-sm text-slate-500">Active Trips</p>
                <h3 className="mt-2 text-3xl font-bold">0</h3>
                <p className="mt-2 text-xs text-slate-400">
                  Your ongoing journeys
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                  📅
                </div>
                <p className="text-sm text-slate-500">Future Trips</p>
                <h3 className="mt-2 text-3xl font-bold">0</h3>
                <p className="mt-2 text-xs text-slate-400">
                  Adventures coming up
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                  📷
                </div>
                <p className="text-sm text-slate-500">Travel Memories</p>
                <h3 className="mt-2 text-3xl font-bold">0</h3>
                <p className="mt-2 text-xs text-slate-400">
                  Moments to remember
                </p>
              </div>

            </div>
          </section>

          {/* Recent activity */}
          <section className="mt-9 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm md:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-semibold">
                  Your Travel Space
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Your travel activities will appear here.
                </p>
              </div>

              <span className="rounded-full bg-sky-50 px-4 py-2 text-xs font-medium text-[#315d80]">
                Getting started
              </span>
            </div>

            <div className="mt-7 rounded-xl border border-dashed border-slate-200 bg-[#f8fbfe] px-5 py-12 text-center">
              <div className="text-4xl">🌊</div>
              <h3 className="mt-4 font-serif text-xl font-semibold">
                Your journey starts here!
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Once your travel activities are connected,
                you will be able to see your journeys and
                memories in this space.
              </p>
            </div>
          </section>

          <footer className="py-8 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Journiq. All rights reserved.
          </footer>

        </div>
      </main>
    </div>
  )
}

export default Dashboard
