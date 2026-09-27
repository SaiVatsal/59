import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'campaigns', // 'campaigns' | 'ledger' | 'my-donations' | 'create-campaign'
  selectedCategory: 'All',

  campaigns: [
    {
      id: 'CAMP-101',
      title: 'Emergency Pediatric Cardiac Surgery Fund',
      organization: 'Global Children Heart Foundation',
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
      raised: 48500,
      goal: 60000,
      donorsCount: 342,
      daysLeft: 12,
      verified501c3: true,
      description: 'Funding lifesaving open-heart operations and post-op ICU care for 15 children with congenital heart defects from underserved regions.',
      updates: [
        { date: '2 days ago', text: 'Three successful valve repair surgeries completed at Central Hospital!' }
      ]
    },
    {
      id: 'CAMP-102',
      title: 'Solar Water Filtration Wells in Drought Basins',
      organization: 'AquaTerra Clean Water Alliance',
      category: 'Environment',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
      raised: 28900,
      goal: 35000,
      donorsCount: 189,
      daysLeft: 18,
      verified501c3: true,
      description: 'Installing deep-aquifer solar pumps and reverse osmosis purification kiosks providing 12,000 villagers with lifetime clean drinking water.',
      updates: [
        { date: 'Last week', text: 'Drilling rig arrived on site in Turkana North sector.' }
      ]
    },
    {
      id: 'CAMP-103',
      title: 'STEM Robotics & Coding Kits for Title-1 Classrooms',
      organization: 'EqualAccess Education Initiative',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      raised: 14200,
      goal: 20000,
      donorsCount: 114,
      daysLeft: 24,
      verified501c3: true,
      description: 'Equipping 40 underprivileged public elementary classrooms with micro:bit robotics boards, sensors, and structured programming curriculum.',
      updates: [
        { date: 'Yesterday', text: 'First batch of 150 kits dispatched to Austin Unified District.' }
      ]
    }
  ],

  donations: [
    {
      id: 'DON-9821',
      campaignId: 'CAMP-101',
      campaignTitle: 'Emergency Pediatric Cardiac Surgery Fund',
      amount: 150,
      donorName: 'Eleanor Vance',
      isAnonymous: false,
      date: 'Today, 2:15 PM',
      taxReceiptId: 'TAX-2026-8819',
      txHash: '0x8f2d...4a91',
      allocatedTo: 'Direct Surgery Escrow'
    },
    {
      id: 'DON-9820',
      campaignId: 'CAMP-102',
      campaignTitle: 'Solar Water Filtration Wells in Drought Basins',
      amount: 250,
      donorName: 'Anonymous Supporter',
      isAnonymous: true,
      date: 'Yesterday',
      taxReceiptId: 'TAX-2026-8818',
      txHash: '0x3c11...99e2',
      allocatedTo: 'Solar Pump Hardware'
    }
  ],

  ledgerEntries: [
    {
      id: 'TX-501',
      date: 'Sep 26, 2026',
      campaign: 'Emergency Pediatric Cardiac Surgery Fund',
      recipient: 'Central Pediatric Surgical Hospital',
      amountSpent: 12500,
      purpose: 'Cardiopulmonary bypass supplies & perfusionist fees',
      receiptUrl: 'INV-SURG-4420.pdf',
      auditStatus: 'Audited & Verified'
    },
    {
      id: 'TX-502',
      date: 'Sep 24, 2026',
      campaign: 'Solar Water Filtration Wells in Drought Basins',
      recipient: 'SolarPumps International BV',
      amountSpent: 8400,
      purpose: '4x Submersible solar DC brushless pump units',
      receiptUrl: 'INV-SOLAR-1092.pdf',
      auditStatus: 'Audited & Verified'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  makeDonation: (donationData) => set((state) => {
    const campaign = state.campaigns.find(c => c.id === donationData.campaignId);
    const newDonation = {
      id: `DON-${Math.floor(9822 + Math.random() * 9000)}`,
      campaignId: donationData.campaignId,
      campaignTitle: campaign?.title || 'General Relief Fund',
      amount: donationData.amount,
      donorName: donationData.isAnonymous ? 'Anonymous Supporter' : donationData.donorName || 'Supporter',
      isAnonymous: donationData.isAnonymous,
      date: 'Just now',
      taxReceiptId: `TAX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      allocatedTo: 'Direct Relief Escrow'
    };

    const updatedCampaigns = state.campaigns.map(c => {
      if (c.id === donationData.campaignId) {
        return {
          ...c,
          raised: c.raised + donationData.amount,
          donorsCount: c.donorsCount + 1
        };
      }
      return c;
    });

    return {
      campaigns: updatedCampaigns,
      donations: [newDonation, ...state.donations],
      activeTab: 'my-donations'
    };
  }),

  createCampaign: (campaignData) => set((state) => {
    const newCamp = {
      id: `CAMP-${Math.floor(104 + Math.random() * 900)}`,
      raised: 0,
      donorsCount: 0,
      daysLeft: 30,
      verified501c3: true,
      updates: [],
      image: campaignData.image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
      ...campaignData
    };
    return {
      campaigns: [newCamp, ...state.campaigns],
      activeTab: 'campaigns'
    };
  })
}));
