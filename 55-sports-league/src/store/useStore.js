import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'standings', // 'standings' | 'matches' | 'referee-console' | 'stats' | 'tickets' | 'teams'
  selectedSeason: '2026/2027',
  activeMatchId: 'M-101',

  teams: [
    {
      id: 'TM-01',
      name: 'Titan City FC',
      short: 'TCF',
      stadium: 'Skyline Arena (62,500)',
      color: '#3b82f6',
      logo: '🛡️',
      manager: 'Julian Vance',
      founded: 1898,
      squad: [
        { name: 'Gabriel Sterling', number: 9, pos: 'FWD', goals: 18, assists: 7, rating: 8.9 },
        { name: 'Mateo De Bruyne', number: 17, pos: 'MID', goals: 8, assists: 14, rating: 8.7 },
        { name: 'Virgil Van Dyke', number: 4, pos: 'DEF', goals: 2, assists: 1, rating: 8.4 },
        { name: 'Alisson Becker', number: 1, pos: 'GK', goals: 0, assists: 0, cleanSheets: 9, rating: 8.2 }
      ]
    },
    {
      id: 'TM-02',
      name: 'Valhalla United',
      short: 'VUN',
      stadium: 'Viking Fortress (54,000)',
      color: '#f59e0b',
      logo: '⚡',
      manager: 'Erik Lindqvist',
      founded: 1904,
      squad: [
        { name: 'Erling Storm', number: 9, pos: 'FWD', goals: 21, assists: 4, rating: 9.1 },
        { name: 'Lars Odegard', number: 10, pos: 'MID', goals: 9, assists: 11, rating: 8.6 },
        { name: 'Sven Kjaer', number: 5, pos: 'DEF', goals: 1, assists: 0, rating: 7.9 },
        { name: 'Kasper Schmeichel', number: 1, pos: 'GK', goals: 0, assists: 0, cleanSheets: 7, rating: 7.8 }
      ]
    },
    {
      id: 'TM-03',
      name: 'Dynamo Bavaria',
      short: 'DBA',
      stadium: 'Olympia Park (70,000)',
      color: '#ef4444',
      logo: '🦅',
      manager: 'Hans-Peter Schmidt',
      founded: 1900,
      squad: [
        { name: 'Lucas Musiala', number: 42, pos: 'MID', goals: 12, assists: 9, rating: 8.8 },
        { name: 'Harry King', number: 9, pos: 'FWD', goals: 19, assists: 5, rating: 9.0 }
      ]
    },
    {
      id: 'TM-04',
      name: 'Paris Étoile',
      short: 'PET',
      stadium: 'Parc des Princes (48,000)',
      color: '#8b5cf6',
      logo: '⚜️',
      manager: 'Laurent Blanc',
      founded: 1970,
      squad: [
        { name: 'Kylian Vance', number: 7, pos: 'FWD', goals: 17, assists: 8, rating: 8.9 },
        { name: 'Ousmane Dembele', number: 11, pos: 'FWD', goals: 6, assists: 12, rating: 8.3 }
      ]
    },
    {
      id: 'TM-05',
      name: 'Milan Knights',
      short: 'MKN',
      stadium: 'San Siro (80,000)',
      color: '#10b981',
      logo: '⚔️',
      manager: 'Roberto Mancini',
      founded: 1899,
      squad: [
        { name: 'Rafael Leao', number: 10, pos: 'FWD', goals: 14, assists: 6, rating: 8.4 }
      ]
    },
    {
      id: 'TM-06',
      name: 'Blaugrana FC',
      short: 'BFC',
      stadium: 'Camp Nou (99,000)',
      color: '#ec4899',
      logo: '👑',
      manager: 'Xavi Hernandez',
      founded: 1899,
      squad: [
        { name: 'Lamine Yamal', number: 19, pos: 'FWD', goals: 11, assists: 13, rating: 8.8 }
      ]
    }
  ],

  standings: [
    { rank: 1, teamId: 'TM-02', name: 'Valhalla United', mp: 24, w: 18, d: 4, l: 2, gf: 58, ga: 19, gd: 39, pts: 58, form: ['W', 'W', 'W', 'D', 'W'] },
    { rank: 2, teamId: 'TM-01', name: 'Titan City FC', mp: 24, w: 17, d: 5, l: 2, gf: 54, ga: 18, gd: 36, pts: 56, form: ['W', 'W', 'D', 'W', 'W'] },
    { rank: 3, teamId: 'TM-03', name: 'Dynamo Bavaria', mp: 24, w: 16, d: 4, l: 4, gf: 51, ga: 22, gd: 29, pts: 52, form: ['W', 'L', 'W', 'W', 'D'] },
    { rank: 4, teamId: 'TM-04', name: 'Paris Étoile', mp: 24, w: 14, d: 5, l: 5, gf: 46, ga: 26, gd: 20, pts: 47, form: ['L', 'W', 'W', 'D', 'W'] },
    { rank: 5, teamId: 'TM-06', name: 'Blaugrana FC', mp: 24, w: 13, d: 6, l: 5, gf: 42, ga: 28, gd: 14, pts: 45, form: ['W', 'D', 'L', 'W', 'W'] },
    { rank: 6, teamId: 'TM-05', name: 'Milan Knights', mp: 24, w: 11, d: 5, l: 8, gf: 35, ga: 31, gd: 4, pts: 38, form: ['D', 'L', 'W', 'L', 'D'] }
  ],

  fixtures: [
    {
      id: 'M-101',
      round: 'Matchday 25',
      homeTeamId: 'TM-01',
      awayTeamId: 'TM-02',
      homeTeam: 'Titan City FC',
      awayTeam: 'Valhalla United',
      stadium: 'Skyline Arena',
      date: 'Today · 20:00 GMT',
      status: 'Live',
      homeScore: 2,
      awayScore: 1,
      minute: 74,
      events: [
        { minute: 18, type: 'goal', player: 'Gabriel Sterling', team: 'home', score: '1 - 0' },
        { minute: 42, type: 'goal', player: 'Erling Storm', team: 'away', score: '1 - 1' },
        { minute: 61, type: 'goal', player: 'Mateo De Bruyne', team: 'home', score: '2 - 1' },
        { minute: 68, type: 'yellow_card', player: 'Sven Kjaer', team: 'away', note: 'Tactical foul' }
      ]
    },
    {
      id: 'M-102',
      round: 'Matchday 25',
      homeTeamId: 'TM-03',
      awayTeamId: 'TM-04',
      homeTeam: 'Dynamo Bavaria',
      awayTeam: 'Paris Étoile',
      stadium: 'Olympia Park',
      date: 'Tomorrow · 18:30 GMT',
      status: 'Upcoming',
      homeScore: null,
      awayScore: null,
      minute: 0,
      events: []
    },
    {
      id: 'M-103',
      round: 'Matchday 25',
      homeTeamId: 'TM-06',
      awayTeamId: 'TM-05',
      homeTeam: 'Blaugrana FC',
      awayTeam: 'Milan Knights',
      stadium: 'Camp Nou',
      date: 'Sunday · 21:00 GMT',
      status: 'Upcoming',
      homeScore: null,
      awayScore: null,
      minute: 0,
      events: []
    }
  ],

  topScorers: [
    { rank: 1, name: 'Erling Storm', team: 'Valhalla United', goals: 21, assists: 4, matches: 23, penGoals: 3 },
    { rank: 2, name: 'Harry King', team: 'Dynamo Bavaria', goals: 19, assists: 5, matches: 24, penGoals: 4 },
    { rank: 3, name: 'Gabriel Sterling', team: 'Titan City FC', goals: 18, assists: 7, matches: 22, penGoals: 2 },
    { rank: 4, name: 'Kylian Vance', team: 'Paris Étoile', goals: 17, assists: 8, matches: 21, penGoals: 1 },
    { rank: 5, name: 'Rafael Leao', team: 'Milan Knights', goals: 14, assists: 6, matches: 24, penGoals: 0 }
  ],

  userTickets: [
    {
      id: 'TCK-8821',
      matchId: 'M-101',
      fixture: 'Titan City FC vs Valhalla United',
      stadium: 'Skyline Arena',
      stand: 'East Grandstand (Row 14, Seat 82)',
      tier: 'VIP Premium Club',
      date: 'Today · 20:00 GMT',
      quantity: 2,
      totalPaid: 180,
      qrCode: 'APEX-8821-VANCE-SKY'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveMatchId: (id) => set({ activeMatchId: id }),

  recordLiveGoal: (matchId, scoringTeam, playerName) => set((state) => {
    const updatedFixtures = state.fixtures.map((f) => {
      if (f.id === matchId) {
        const newHomeScore = scoringTeam === 'home' ? f.homeScore + 1 : f.homeScore;
        const newAwayScore = scoringTeam === 'away' ? f.awayScore + 1 : f.awayScore;
        const currentMin = f.minute || 75;

        const newEvent = {
          minute: currentMin,
          type: 'goal',
          player: playerName || 'Striker',
          team: scoringTeam,
          score: `${newHomeScore} - ${newAwayScore}`
        };

        return {
          ...f,
          homeScore: newHomeScore,
          awayScore: newAwayScore,
          events: [...f.events, newEvent]
        };
      }
      return f;
    });

    return { fixtures: updatedFixtures };
  }),

  recordLiveCard: (matchId, cardTeam, playerName, cardColor = 'yellow') => set((state) => ({
    fixtures: state.fixtures.map((f) => {
      if (f.id === matchId) {
        return {
          ...f,
          events: [
            ...f.events,
            {
              minute: f.minute || 80,
              type: cardColor === 'red' ? 'red_card' : 'yellow_card',
              player: playerName || 'Player',
              team: cardTeam,
              note: cardColor === 'red' ? 'Violent conduct' : 'Reckless challenge'
            }
          ]
        };
      }
      return f;
    })
  })),

  updateMatchMinute: (matchId, newMin) => set((state) => ({
    fixtures: state.fixtures.map(f => f.id === matchId ? { ...f, minute: newMin } : f)
  })),

  bookTicket: (matchId, standName, tierName, price, quantity = 1) => set((state) => {
    const match = state.fixtures.find(f => f.id === matchId) || state.fixtures[0];
    const newTicket = {
      id: `TCK-${Math.floor(8822 + Math.random() * 1000)}`,
      matchId,
      fixture: `${match.homeTeam} vs ${match.awayTeam}`,
      stadium: match.stadium,
      stand: `${standName} (Row ${Math.floor(5 + Math.random() * 20)}, Seat ${Math.floor(10 + Math.random() * 80)})`,
      tier: tierName,
      date: match.date,
      quantity,
      totalPaid: price * quantity,
      qrCode: `APEX-${Math.floor(1000 + Math.random() * 9000)}-MATCH-PASS`
    };

    return {
      userTickets: [newTicket, ...state.userTickets],
      activeTab: 'tickets'
    };
  })
}));
