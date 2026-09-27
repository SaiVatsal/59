import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  BookOpen,
  Search,
  Bookmark,
  Clock,
  AlertCircle,
  PlusCircle,
  Trash2,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
  Filter,
  Bell,
  Library,
  FileText,
  UserCheck
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedGenre,
    setSelectedGenre,
    searchQuery,
    setSearchQuery,
    currentUser,
    books,
    loans,
    reservations,
    notifications,
    borrowBook,
    returnBook,
    payFine,
    reserveBook,
    cancelReservation,
    addBook,
    retireBook,
    sendOverdueNotice
  } = useStore();

  const [selectedBookModal, setSelectedBookModal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newIsbn, setNewIsbn] = useState('');
  const [newGenre, setNewGenre] = useState('Classical History');
  const [newCallNumber, setNewCallNumber] = useState('');
  const [newCopies, setNewCopies] = useState(3);
  const [newPublisher, setNewPublisher] = useState('');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newCover, setNewCover] = useState('');

  const genres = ['All', 'Classical History', 'Astrophysics & History', 'Natural Sciences', 'Law & Governance', 'Geography & Exploration'];

  const filteredBooks = books.filter(b => {
    const matchesGenre = selectedGenre === 'All' || b.genre === selectedGenre;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.isbn.includes(searchQuery) ||
                          b.callNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const activeLoans = loans.filter(l => l.status === 'Active' || l.status === 'Overdue');
  const historyLoans = loans.filter(l => l.status === 'Returned');
  const totalFinesDue = activeLoans.reduce((sum, l) => sum + (l.finePaid ? 0 : l.fineAmount), 0);

  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    addBook({
      title: newTitle,
      author: newAuthor,
      isbn: newIsbn || `978-0-${Math.floor(100000000 + Math.random() * 900000000)}`,
      genre: newGenre,
      callNumber: newCallNumber || `AC.${Math.floor(10 + Math.random() * 90)} .L${Math.floor(100 + Math.random() * 900)} 2026`,
      totalCopies: Number(newCopies),
      publisher: newPublisher || 'Athenaeum University Press',
      publicationYear: 2026,
      synopsis: newSynopsis || 'Archival preservation copy for academic research and scholarly reference.',
      coverImage: newCover.trim() || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    });

    setNewTitle('');
    setNewAuthor('');
    setNewIsbn('');
    setNewCallNumber('');
    setNewPublisher('');
    setNewSynopsis('');
    setNewCover('');
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-900 flex flex-col font-sans">
      {/* Top Archival Header */}
      <header className="border-b border-amber-900/15 bg-[#fbf7ee] shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('catalog')}>
              <div className="w-12 h-12 rounded-lg bg-[#451a03] text-amber-200 flex items-center justify-center shadow-md border border-amber-800">
                <Library className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold font-mono">Founded MDCCXCIV</span>
                <h1 className="text-2xl font-serif font-black tracking-tight text-[#451a03]">The Athenaeum</h1>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all flex items-center space-x-2 ${
                  activeTab === 'catalog'
                    ? 'bg-[#451a03] text-amber-100 shadow-sm'
                    : 'text-stone-700 hover:bg-amber-900/10'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Card Catalog</span>
              </button>

              <button
                onClick={() => setActiveTab('my-loans')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all flex items-center space-x-2 relative ${
                  activeTab === 'my-loans'
                    ? 'bg-[#451a03] text-amber-100 shadow-sm'
                    : 'text-stone-700 hover:bg-amber-900/10'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>My Circulation ({activeLoans.length})</span>
                {totalFinesDue > 0 && (
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 absolute top-2 right-2 animate-pulse" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('librarian')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all flex items-center space-x-2 ${
                  activeTab === 'librarian'
                    ? 'bg-[#451a03] text-amber-100 shadow-sm'
                    : 'text-stone-700 hover:bg-amber-900/10'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Curator Desk</span>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all flex items-center space-x-2 ${
                  activeTab === 'reports'
                    ? 'bg-[#451a03] text-amber-100 shadow-sm'
                    : 'text-stone-700 hover:bg-amber-900/10'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Archival Reports</span>
              </button>
            </nav>

            {/* Member Badge */}
            <div className="hidden md:flex items-center space-x-3 pl-4 border-l border-amber-900/20">
              <div className="text-right">
                <p className="text-xs font-serif font-bold text-[#451a03]">{currentUser.name}</p>
                <p className="text-[11px] font-mono text-amber-800">{currentUser.memberId}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-amber-200 text-amber-900 border border-amber-400 flex items-center justify-center font-bold text-xs">
                AP
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Banner */}
      {notifications.length > 0 && (
        <div className="bg-[#fcf3e0] border-b border-amber-300/80 px-4 py-2.5 text-xs text-amber-950 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center space-x-2">
            <Bell className="w-3.5 h-3.5 text-amber-800 shrink-0" />
            <span className="font-semibold font-mono text-amber-900">[Dispatch]:</span>
            <span className="truncate">{notifications[0].text}</span>
            <span className="text-[10px] text-amber-700 font-mono ml-auto shrink-0">{notifications[0].time}</span>
          </div>
        </div>
      )}

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: CARD CATALOG */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Search & Genre Bar */}
            <div className="bg-[#fdf9f0] p-5 rounded-xl border border-amber-900/15 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-800/60" />
                  <input
                    type="text"
                    placeholder="Search by Title, Author, ISBN, or Call Number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent font-sans"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
                  <Filter className="w-4 h-4 text-amber-800 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Genre:</span>
                  {genres.map(g => (
                    <button
                      key={g}
                      onClick={() => setSelectedGenre(g)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        selectedGenre === g
                          ? 'bg-[#451a03] text-amber-100 shadow-xs'
                          : 'bg-amber-100/70 text-amber-950 hover:bg-amber-200/80 border border-amber-900/10'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-[#fffdfa] rounded-xl border border-amber-900/15 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="p-5 flex gap-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-24 h-36 object-cover rounded-md shadow-md border border-amber-900/20 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-900/10 font-bold">
                          {book.genre}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 ${
                          book.availableCopies > 0
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border border-rose-300'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${book.availableCopies > 0 ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                          <span>{book.availableCopies > 0 ? `${book.availableCopies} in Stock` : 'Reserved'}</span>
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-[#3b1d0c] leading-snug line-clamp-2">
                        {book.title}
                      </h3>

                      <p className="text-xs text-stone-700 italic">
                        {book.author}
                      </p>

                      <div className="pt-2 border-t border-amber-900/10 flex flex-col space-y-0.5 text-[11px] text-stone-600 font-mono">
                        <div>LOC: <span className="font-semibold text-amber-950">{book.callNumber}</span></div>
                        <div>ISBN: {book.isbn}</div>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-amber-900/10 bg-[#faf6ed]">
                    <button
                      onClick={() => setSelectedBookModal(book)}
                      className="text-xs font-semibold text-amber-900 hover:text-amber-950 underline underline-offset-2"
                    >
                      View Accession Dossier
                    </button>

                    {book.availableCopies > 0 ? (
                      <button
                        onClick={() => borrowBook(book.id)}
                        className="px-3.5 py-1.5 bg-[#451a03] hover:bg-[#5c2406] text-amber-100 text-xs font-bold rounded shadow-sm transition-colors flex items-center space-x-1.5"
                      >
                        <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                        <span>Borrow Copy</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => reserveBook(book.id)}
                        className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded shadow-sm transition-colors flex items-center space-x-1.5"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Place Hold</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MY CIRCULATION & LOANS */}
        {activeTab === 'my-loans' && (
          <div className="space-y-8">
            {/* Top Stat Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-[#fffdfa] border border-amber-900/15 p-5 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">Active Borrowings</span>
                  <BookOpen className="w-5 h-5 text-amber-800" />
                </div>
                <div className="text-3xl font-serif font-black text-[#451a03] mt-2">
                  {activeLoans.length} <span className="text-xs font-sans text-stone-500 font-normal">/ 5 max allowance</span>
                </div>
              </div>

              <div className="bg-[#fffdfa] border border-amber-900/15 p-5 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">Accrued Overdue Fines</span>
                  <DollarSign className="w-5 h-5 text-rose-700" />
                </div>
                <div className="text-3xl font-serif font-black text-rose-700 mt-2">
                  ${totalFinesDue.toFixed(2)}
                  <span className="text-xs font-sans text-stone-500 font-normal ml-2">(@ $0.50 / day overdue)</span>
                </div>
              </div>

              <div className="bg-[#fffdfa] border border-amber-900/15 p-5 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">Active Hold Reserves</span>
                  <Clock className="w-5 h-5 text-amber-800" />
                </div>
                <div className="text-3xl font-serif font-black text-amber-900 mt-2">
                  {reservations.length} <span className="text-xs font-sans text-stone-500 font-normal">Waitlisted volumes</span>
                </div>
              </div>
            </div>

            {/* Active Loans Table */}
            <div className="bg-[#fffdfa] border border-amber-900/15 rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 border-b border-amber-900/10 bg-[#faf5ea] flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-serif font-bold text-[#451a03]">Currently Checked-Out Volumes</h2>
                  <p className="text-xs text-stone-600">14-day standard circulation period with automatic renewal options.</p>
                </div>
              </div>

              <div className="divide-y divide-amber-900/10">
                {activeLoans.length === 0 ? (
                  <div className="p-8 text-center text-stone-500 italic">
                    You have no active book loans checked out from the collection.
                  </div>
                ) : (
                  activeLoans.map((loan) => (
                    <div key={loan.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                            {loan.id}
                          </span>
                          <span className="font-mono text-xs text-stone-600">LOC: {loan.callNumber}</span>
                          {loan.status === 'Overdue' ? (
                            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded border border-rose-300 flex items-center space-x-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>OVERDUE ({loan.daysOverdue} Days)</span>
                            </span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded border border-emerald-300">
                              Active Circulation
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#3b1d0c]">{loan.bookTitle}</h4>
                        <p className="text-xs text-stone-600 italic">{loan.author}</p>
                        <div className="flex items-center space-x-4 text-xs font-mono text-stone-500 pt-1">
                          <span>Checked: {loan.borrowDate}</span>
                          <span className={loan.status === 'Overdue' ? 'text-rose-700 font-bold' : 'text-stone-700 font-bold'}>
                            Due: {loan.dueDate}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {loan.fineAmount > 0 && !loan.finePaid && (
                          <div className="text-right mr-2">
                            <span className="text-xs text-rose-700 font-bold block">Fine: ${loan.fineAmount.toFixed(2)}</span>
                            <button
                              onClick={() => payFine(loan.id)}
                              className="text-[11px] font-bold text-amber-900 underline hover:text-amber-950"
                            >
                              Settle Fine
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => returnBook(loan.id)}
                          className="px-4 py-2 bg-[#451a03] hover:bg-[#5e2305] text-amber-100 text-xs font-bold rounded-md shadow-sm transition-colors flex items-center space-x-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Return to Stacks</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Hold Reservations & Historical Loans Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hold Reservations */}
              <div className="bg-[#fffdfa] border border-amber-900/15 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-amber-900/10 bg-[#faf5ea]">
                  <h3 className="font-serif font-bold text-sm text-[#451a03]">Active Hold Reservations Queue</h3>
                </div>
                <div className="p-4 divide-y divide-amber-900/10">
                  {reservations.length === 0 ? (
                    <p className="text-xs text-stone-500 italic">No waitlisted holds placed.</p>
                  ) : (
                    reservations.map(res => (
                      <div key={res.id} className="py-3 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[10px] bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-bold">
                            Position #{res.queuePosition} in Queue
                          </span>
                          <h5 className="font-serif font-bold text-sm text-[#3b1d0c] mt-1">{res.bookTitle}</h5>
                          <p className="text-xs text-stone-600">{res.author}</p>
                        </div>
                        <button
                          onClick={() => cancelReservation(res.id)}
                          className="text-xs text-rose-700 hover:text-rose-900 font-semibold"
                        >
                          Cancel Hold
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Borrowing History */}
              <div className="bg-[#fffdfa] border border-amber-900/15 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-amber-900/10 bg-[#faf5ea]">
                  <h3 className="font-serif font-bold text-sm text-[#451a03]">Historical Circulation Archive</h3>
                </div>
                <div className="p-4 divide-y divide-amber-900/10">
                  {historyLoans.length === 0 ? (
                    <p className="text-xs text-stone-500 italic">No previous loans recorded.</p>
                  ) : (
                    historyLoans.map(loan => (
                      <div key={loan.id} className="py-3 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[10px] text-emerald-800 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            Returned on {loan.returnDate}
                          </span>
                          <h5 className="font-serif font-bold text-sm text-[#3b1d0c] mt-1">{loan.bookTitle}</h5>
                          <p className="text-xs text-stone-600">{loan.author}</p>
                        </div>
                        <span className="font-mono text-xs text-stone-500">{loan.id}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIBRARIAN CURATOR CONSOLE */}
        {activeTab === 'librarian' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#fdf9f0] p-5 rounded-xl border border-amber-900/15">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#451a03]">Librarian & Inventory Custodian Console</h2>
                <p className="text-xs text-stone-600">Accession new volumes, retire damaged manuscripts, and manage catalog classification.</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-[#451a03] hover:bg-[#5c2306] text-amber-100 font-bold text-xs rounded-lg shadow-sm flex items-center space-x-2"
              >
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>Accession New Volume</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-[#fffdfa] border border-amber-900/15 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf5ea] border-b border-amber-900/10 text-amber-950 uppercase font-mono tracking-wider">
                    <tr>
                      <th className="p-4">Accession ID</th>
                      <th className="p-4">Volume & Author</th>
                      <th className="p-4">Classification (LOC)</th>
                      <th className="p-4">Stock & Circulation</th>
                      <th className="p-4">Borrow Stats</th>
                      <th className="p-4 text-right">Custodian Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-900/10">
                    {books.map((b) => (
                      <tr key={b.id} className="hover:bg-amber-50/40">
                        <td className="p-4 font-mono font-bold text-amber-900">{b.id}</td>
                        <td className="p-4">
                          <div className="font-serif font-bold text-sm text-[#3b1d0c]">{b.title}</div>
                          <div className="text-stone-600 italic text-[11px]">{b.author}</div>
                          <div className="text-[10px] text-stone-400 font-mono">ISBN: {b.isbn}</div>
                        </td>
                        <td className="p-4 font-mono text-stone-700">
                          <div>{b.callNumber}</div>
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-sans font-bold">
                            {b.genre}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-stone-900">{b.availableCopies}</span> / {b.totalCopies} Copies
                        </td>
                        <td className="p-4 font-mono text-amber-900 font-bold">
                          {b.borrowCount} All-Time
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => retireBook(b.id)}
                            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded font-semibold text-[11px] transition-colors"
                          >
                            Retire Volume
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ARCHIVAL REPORTS & OVERDUE ANALYTICS */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            <div className="bg-[#fdf9f0] p-5 rounded-xl border border-amber-900/15">
              <h2 className="text-xl font-serif font-bold text-[#451a03]">Archival Metrics & Circulation Intelligence</h2>
              <p className="text-xs text-stone-600">Institutional loan volume statistics, patron overdue tracking, and fine recovery ledger.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Most Borrowed Leaderboard */}
              <div className="bg-[#fffdfa] border border-amber-900/15 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
                  <h3 className="font-serif font-bold text-base text-[#451a03]">Top Borrowed Titles (All-Time)</h3>
                  <TrendingUp className="w-4 h-4 text-amber-800" />
                </div>

                <div className="space-y-3">
                  {[...books].sort((a, b) => b.borrowCount - a.borrowCount).map((b, i) => (
                    <div key={b.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-serif font-bold text-stone-900">
                          #{i + 1} {b.title}
                        </span>
                        <span className="font-mono font-bold text-amber-900">{b.borrowCount} Loans</span>
                      </div>
                      <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#451a03] h-full rounded-full"
                          style={{ width: `${Math.min(100, (b.borrowCount / 70) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overdue Delinquency Log */}
              <div className="bg-[#fffdfa] border border-amber-900/15 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
                  <h3 className="font-serif font-bold text-base text-rose-900">Active Overdue Recalls & Violations</h3>
                  <AlertCircle className="w-4 h-4 text-rose-700" />
                </div>

                <div className="space-y-3">
                  {loans.filter(l => l.status === 'Overdue').length === 0 ? (
                    <p className="text-xs text-stone-500 italic">No overdue loans currently outstanding.</p>
                  ) : (
                    loans.filter(l => l.status === 'Overdue').map(l => (
                      <div key={l.id} className="p-3 bg-rose-50/60 rounded-lg border border-rose-200 flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-bold text-rose-900">{l.id}</span>
                            <span className="text-xs font-serif font-bold text-stone-900">{l.bookTitle}</span>
                          </div>
                          <div className="text-[11px] text-stone-600">Patron: {l.memberName} ({l.memberId})</div>
                          <div className="text-[11px] font-mono text-rose-700 font-bold">
                            {l.daysOverdue} Days Late • Fine: ${l.fineAmount.toFixed(2)}
                          </div>
                        </div>

                        <button
                          onClick={() => sendOverdueNotice(l.id)}
                          className="px-3 py-1.5 bg-rose-800 hover:bg-rose-900 text-white text-[11px] font-bold rounded shadow-xs transition-colors"
                        >
                          Send Recall Notice
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Book Detail Modal */}
      {selectedBookModal && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#fdfbf7] border border-amber-900/20 max-w-xl w-full rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setSelectedBookModal(null)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex gap-5">
              <img
                src={selectedBookModal.coverImage}
                alt={selectedBookModal.title}
                className="w-32 h-48 object-cover rounded-lg shadow-lg border border-amber-900/20 shrink-0"
              />
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
                  {selectedBookModal.genre}
                </span>
                <h3 className="font-serif font-bold text-xl text-[#3b1d0c]">{selectedBookModal.title}</h3>
                <p className="text-xs text-stone-700 italic">{selectedBookModal.author}</p>
                <div className="text-xs text-stone-600 font-mono space-y-0.5 pt-1">
                  <div>Publisher: {selectedBookModal.publisher} ({selectedBookModal.publicationYear})</div>
                  <div>Library of Congress: {selectedBookModal.callNumber}</div>
                  <div>ISBN: {selectedBookModal.isbn}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-amber-900/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 font-mono mb-1">Archival Synopsis</h4>
              <p className="text-xs text-stone-700 leading-relaxed">{selectedBookModal.synopsis}</p>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedBookModal(null)}
                className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100"
              >
                Close
              </button>
              {selectedBookModal.availableCopies > 0 ? (
                <button
                  onClick={() => {
                    borrowBook(selectedBookModal.id);
                    setSelectedBookModal(null);
                  }}
                  className="px-4 py-2 bg-[#451a03] hover:bg-[#5e2305] text-amber-100 text-xs font-bold rounded-lg shadow-sm"
                >
                  Borrow Volume
                </button>
              ) : (
                <button
                  onClick={() => {
                    reserveBook(selectedBookModal.id);
                    setSelectedBookModal(null);
                  }}
                  className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  Place Hold Reservation
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Accession Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#fdfbf7] border border-amber-900/20 max-w-lg w-full rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="font-serif font-bold text-xl text-[#3b1d0c] mb-1">Accession New Volume</h3>
            <p className="text-xs text-stone-600 mb-4">Add a new publication to the Athenaeum permanent collection.</p>

            <form onSubmit={handleAddBookSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Book Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Treatise on Roman Aqueducts"
                  className="w-full p-2.5 rounded-lg border border-amber-900/20 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Author / Scholar</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Marcus Vitruvius"
                    className="w-full p-2.5 rounded-lg border border-amber-900/20 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Genre / Field</label>
                  <select
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-amber-900/20 bg-white"
                  >
                    {genres.filter(g => g !== 'All').map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Call Number (LOC)</label>
                  <input
                    type="text"
                    value={newCallNumber}
                    onChange={(e) => setNewCallNumber(e.target.value)}
                    placeholder="e.g. TA.710 .V58 2026"
                    className="w-full p-2.5 rounded-lg border border-amber-900/20 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Initial Copies</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newCopies}
                    onChange={(e) => setNewCopies(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-amber-900/20 bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Publisher & Press</label>
                <input
                  type="text"
                  value={newPublisher}
                  onChange={(e) => setNewPublisher(e.target.value)}
                  placeholder="e.g. Oxford Clarendon Folios"
                  className="w-full p-2.5 rounded-lg border border-amber-900/20 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Archival Synopsis</label>
                <textarea
                  rows="2"
                  value={newSynopsis}
                  onChange={(e) => setNewSynopsis(e.target.value)}
                  placeholder="Brief scholarly overview..."
                  className="w-full p-2.5 rounded-lg border border-amber-900/20 bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#451a03] hover:bg-[#5c2406] text-amber-100 font-bold rounded-lg shadow-sm"
                >
                  Accession Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Archival Footer */}
      <footer className="border-t border-amber-900/15 bg-[#fbf7ee] py-6 text-center text-xs text-stone-600 font-serif">
        <p className="font-bold text-[#451a03]">The Athenaeum Archival & Library Custodial System</p>
        <p className="text-[11px] text-stone-500 font-sans mt-0.5">Automated Overdue Tracking • Library of Congress Classification • Scholar Lending Protocol</p>
      </footer>
    </div>
  );
}
