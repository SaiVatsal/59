import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'catalog', // 'catalog' | 'my-loans' | 'librarian' | 'reports'
  selectedGenre: 'All',
  searchQuery: '',

  currentUser: {
    name: 'Dr. Arthur Pendelton',
    memberId: 'LIB-84920',
    email: 'arthur.p@oxford-archive.org',
    tier: 'Scholar Fellow (Max 5 Borrows)'
  },

  books: [
    {
      id: 'BK-101',
      title: 'The Principles of Classical Antiquity',
      author: 'Prof. Julian Vance, D.Phil',
      isbn: '978-0-19-853421-2',
      genre: 'Classical History',
      callNumber: 'DE.84 .V36 2021',
      totalCopies: 4,
      availableCopies: 2,
      publicationYear: 2021,
      publisher: 'Oxford Clarendon Press',
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      synopsis: 'A comprehensive treatise on Mediterranean trade corridors, Roman jurisprudence, and Hellenistic architectural philosophy.',
      borrowCount: 38,
      status: 'Available'
    },
    {
      id: 'BK-102',
      title: 'Astronomia Nova & Celestial Mechanics',
      author: 'Johannes Kepler (Annotated by Dr. E. Thorne)',
      isbn: '978-0-26-203492-9',
      genre: 'Astrophysics & History',
      callNumber: 'QB.361 .K47 2019',
      totalCopies: 3,
      availableCopies: 0,
      publicationYear: 2019,
      publisher: 'Cambridge Folio Editions',
      coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd7?auto=format&fit=crop&w=600&q=80',
      synopsis: 'Elliptical planetary orbits and mathematical reductions of Tycho Brahe’s Mars observations.',
      borrowCount: 64,
      status: 'Out of Stock'
    },
    {
      id: 'BK-103',
      title: 'Codex Botanica: Rare Alpine Herbals',
      author: 'Lady Eleanor Montagu',
      isbn: '978-1-84-368102-1',
      genre: 'Natural Sciences',
      callNumber: 'QK.99 .M65 2022',
      totalCopies: 2,
      availableCopies: 1,
      publicationYear: 2022,
      publisher: 'Royal Horticultural Society',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      synopsis: 'Engravings and phytochemical classifications of high-altitude flora of the Swiss and Austrian Alps.',
      borrowCount: 22,
      status: 'Available'
    },
    {
      id: 'BK-104',
      title: 'Structural Jurisprudence & Constitutional Theory',
      author: 'Sir Marcus Holloway, KC',
      isbn: '978-0-40-694821-4',
      genre: 'Law & Governance',
      callNumber: 'K.3154 .H65 2023',
      totalCopies: 5,
      availableCopies: 4,
      publicationYear: 2023,
      publisher: 'Lexis Heritage Publications',
      coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
      synopsis: 'A foundational enquiry into common law doctrines, separation of powers, and judicial review mechanisms.',
      borrowCount: 51,
      status: 'Available'
    },
    {
      id: 'BK-105',
      title: 'The Cartographer’s Guild: Maps of the Silk Road',
      author: 'Dr. Tariq Al-Mansoor',
      isbn: '978-0-50-051934-8',
      genre: 'Geography & Exploration',
      callNumber: 'GA.108 .A46 2020',
      totalCopies: 3,
      availableCopies: 1,
      publicationYear: 2020,
      publisher: 'Thames & Hudson Rare Library',
      coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
      synopsis: 'Manuscript charts, navigational astrolabe coordinates, and caravan routes across Samarkand and Dunhuang.',
      borrowCount: 45,
      status: 'Available'
    }
  ],

  loans: [
    {
      id: 'LN-7741',
      bookId: 'BK-101',
      bookTitle: 'The Principles of Classical Antiquity',
      author: 'Prof. Julian Vance, D.Phil',
      callNumber: 'DE.84 .V36 2021',
      borrowDate: '2026-09-10',
      dueDate: '2026-09-24',
      returnDate: null,
      status: 'Overdue',
      daysOverdue: 3,
      fineRate: 0.50,
      fineAmount: 1.50,
      finePaid: false,
      memberName: 'Dr. Arthur Pendelton',
      memberId: 'LIB-84920'
    },
    {
      id: 'LN-7688',
      bookId: 'BK-104',
      bookTitle: 'Structural Jurisprudence & Constitutional Theory',
      author: 'Sir Marcus Holloway, KC',
      callNumber: 'K.3154 .H65 2023',
      borrowDate: '2026-09-20',
      dueDate: '2026-10-04',
      returnDate: null,
      status: 'Active',
      daysOverdue: 0,
      fineRate: 0.50,
      fineAmount: 0.00,
      finePaid: true,
      memberName: 'Dr. Arthur Pendelton',
      memberId: 'LIB-84920'
    },
    {
      id: 'LN-7502',
      bookId: 'BK-105',
      bookTitle: 'The Cartographer’s Guild: Maps of the Silk Road',
      author: 'Dr. Tariq Al-Mansoor',
      callNumber: 'GA.108 .A46 2020',
      borrowDate: '2026-08-15',
      dueDate: '2026-08-29',
      returnDate: '2026-08-28',
      status: 'Returned',
      daysOverdue: 0,
      fineRate: 0.50,
      fineAmount: 0.00,
      finePaid: true,
      memberName: 'Dr. Arthur Pendelton',
      memberId: 'LIB-84920'
    }
  ],

  reservations: [
    {
      id: 'RSV-301',
      bookId: 'BK-102',
      bookTitle: 'Astronomia Nova & Celestial Mechanics',
      author: 'Johannes Kepler',
      callNumber: 'QB.361 .K47 2019',
      reserveDate: '2026-09-22',
      queuePosition: 1,
      status: 'Waitlisted',
      memberName: 'Dr. Arthur Pendelton',
      memberId: 'LIB-84920'
    }
  ],

  notifications: [
    { id: 'NOTIF-1', text: 'Overdue notice: "The Principles of Classical Antiquity" is 3 days past due date.', time: 'Today 09:00' }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  borrowBook: (bookId) => set((state) => {
    const book = state.books.find(b => b.id === bookId);
    if (!book || book.availableCopies <= 0) return state;

    const today = new Date().toISOString().split('T')[0];
    const due = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newLoan = {
      id: `LN-${Math.floor(7800 + Math.random() * 2000)}`,
      bookId: book.id,
      bookTitle: book.title,
      author: book.author,
      callNumber: book.callNumber,
      borrowDate: today,
      dueDate: due,
      returnDate: null,
      status: 'Active',
      daysOverdue: 0,
      fineRate: 0.50,
      fineAmount: 0,
      finePaid: true,
      memberName: state.currentUser.name,
      memberId: state.currentUser.memberId
    };

    const updatedBooks = state.books.map(b => {
      if (b.id === bookId) {
        const newAvailable = b.availableCopies - 1;
        return {
          ...b,
          availableCopies: newAvailable,
          borrowCount: b.borrowCount + 1,
          status: newAvailable === 0 ? 'Out of Stock' : newAvailable === 1 ? 'Low Stock' : 'Available'
        };
      }
      return b;
    });

    return {
      books: updatedBooks,
      loans: [newLoan, ...state.loans],
      activeTab: 'my-loans',
      notifications: [{ id: `N-${Date.now()}`, text: `Loan confirmed for "${book.title}". Due date: ${due}.`, time: 'Just now' }, ...state.notifications]
    };
  }),

  returnBook: (loanId) => set((state) => {
    const loan = state.loans.find(l => l.id === loanId);
    if (!loan || loan.status === 'Returned') return state;

    const today = new Date().toISOString().split('T')[0];

    const updatedLoans = state.loans.map(l => {
      if (l.id === loanId) {
        return {
          ...l,
          status: 'Returned',
          returnDate: today
        };
      }
      return l;
    });

    const updatedBooks = state.books.map(b => {
      if (b.id === loan.bookId) {
        const newAvailable = b.availableCopies + 1;
        return {
          ...b,
          availableCopies: newAvailable,
          status: newAvailable > 0 ? 'Available' : 'Out of Stock'
        };
      }
      return b;
    });

    return {
      loans: updatedLoans,
      books: updatedBooks,
      notifications: [{ id: `N-${Date.now()}`, text: `Book "${loan.bookTitle}" returned successfully to circulation.`, time: 'Just now' }, ...state.notifications]
    };
  }),

  payFine: (loanId) => set((state) => ({
    loans: state.loans.map(l => l.id === loanId ? { ...l, finePaid: true, fineAmount: 0 } : l),
    notifications: [{ id: `N-${Date.now()}`, text: `Overdue fine cleared via academic balance. Receipt issued.`, time: 'Just now' }, ...state.notifications]
  })),

  reserveBook: (bookId) => set((state) => {
    const book = state.books.find(b => b.id === bookId);
    if (!book) return state;

    const newReservation = {
      id: `RSV-${Math.floor(400 + Math.random() * 500)}`,
      bookId: book.id,
      bookTitle: book.title,
      author: book.author,
      callNumber: book.callNumber,
      reserveDate: new Date().toISOString().split('T')[0],
      queuePosition: 1,
      status: 'Waitlisted',
      memberName: state.currentUser.name,
      memberId: state.currentUser.memberId
    };

    return {
      reservations: [newReservation, ...state.reservations],
      notifications: [{ id: `N-${Date.now()}`, text: `Hold reservation placed on "${book.title}". You will be notified when returned.`, time: 'Just now' }, ...state.notifications]
    };
  }),

  cancelReservation: (resId) => set((state) => ({
    reservations: state.reservations.filter(r => r.id !== resId)
  })),

  addBook: (newBookData) => set((state) => {
    const book = {
      id: `BK-${Math.floor(106 + Math.random() * 900)}`,
      borrowCount: 0,
      status: 'Available',
      availableCopies: Number(newBookData.totalCopies || 1),
      coverImage: newBookData.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      ...newBookData
    };
    return {
      books: [book, ...state.books],
      activeTab: 'catalog',
      notifications: [{ id: `N-${Date.now()}`, text: `New accession "${book.title}" added to Athenaeum catalog.`, time: 'Just now' }, ...state.notifications]
    };
  }),

  retireBook: (bookId) => set((state) => ({
    books: state.books.filter(b => b.id !== bookId),
    notifications: [{ id: `N-${Date.now()}`, text: `Accession ${bookId} retired from circulation.`, time: 'Just now' }, ...state.notifications]
  })),

  sendOverdueNotice: (loanId) => set((state) => {
    const loan = state.loans.find(l => l.id === loanId);
    return {
      notifications: [{ id: `N-${Date.now()}`, text: `Automated recall email & SMS sent to ${loan?.memberName || 'patron'} for loan #${loanId}.`, time: 'Just now' }, ...state.notifications]
    };
  })
}));
