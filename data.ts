
import { CarModel } from './types';

export const CAR_MODELS: CarModel[] = [
  {
    id: '33GA',
    name: '2026 MINI JCW Countryman ALL4',
    description: 'The adventurer with John Cooper Works performance.',
    baseMsrp: 55990,
    categories: [
      {
        id: 'exterior',
        title: 'Exterior Colour',
        type: 'single',
        options: [
          { id: 'C74', code: 'C74', name: 'Chili Red II', price: 0 }
        ]
      },
      {
        id: 'roof',
        title: 'Roof & Mirrors',
        type: 'single',
        options: [
          { id: '3B5', code: '3B5', name: 'Black Roof & Mirrors', price: 0, incompatibleWith: ['C4R'] }
        ]
      },
      {
        id: 'wheels',
        title: 'Wheels',
        type: 'single',
        options: [
          { id: '1K9', code: '1K9', name: '19" JCW Runway Spoke Black A/S', price: 0 }
        ]
      },
      {
        id: 'interior',
        title: 'Interior Upholstery',
        type: 'single',
        options: [
          { id: 'TDJ3', code: 'TDJ3', name: 'Vescin/cord combination JCW Black', price: 0 }
        ]
      },
      {
        id: 'packages',
        title: 'Packages',
        type: 'multiple',
        options: [
          { id: 'ZXC', code: 'ZXC', name: 'Premier + Line', price: 0, description: 'Includes Comfort Access, Auto Dimming Mirrors, Parking Assistant Plus, Head-Up Display, Wireless Charging, Nav AR, Drive Recorder' },
          { id: 'ZYU', code: 'ZYU', name: 'Advanced Driver Assistance Package', price: 2000, description: 'Driving Assistant Pro, Traffic Jam Asst, Lane Control, etc.' },
          { id: 'ZZ0', code: 'ZZ0', name: 'Interior Protection Package', price: 300, description: 'Contents must return with vehicle' }
        ]
      }
    ]
  },
  {
    id: '33GD',
    name: '2026 MINI Cooper JCW 3-Door',
    description: 'The iconic go-kart feeling with JCW power.',
    baseMsrp: 51990,
    categories: [
      {
        id: 'exterior',
        title: 'Exterior Colour',
        type: 'single',
        options: [
          { id: 'C74', code: 'C74', name: 'Chili Red II', price: 0 }
        ]
      },
      {
        id: 'roof',
        title: 'Roof & Mirrors',
        type: 'single',
        options: [
          { id: '381', code: '381', name: 'Body Colour Roof', price: 0 }
        ]
      },
      {
        id: 'wheels',
        title: 'Wheels',
        type: 'single',
        options: [
          { id: '1KN', code: '1KN', name: '17" JCW Sprint Spoke Black', price: 0 }
        ]
      },
      {
        id: 'interior',
        title: 'Interior Upholstery',
        type: 'single',
        options: [
          { id: 'TDJ3', code: 'TDJ3', name: 'Vescin/cord combination JCW Black', price: 0 }
        ]
      },
      {
        id: 'packages',
        title: 'Packages',
        type: 'multiple',
        options: [
          { id: 'ZXC', code: 'ZXC', name: 'Premier +', price: 0, description: 'Includes Comfort Access, Auto Mirrors, Parking Asst Plus, Head-Up Display, Wireless Charging, Nav AR, Drive Recorder' }
        ]
      },
      {
        id: 'options',
        title: 'Stand Alone Options',
        type: 'multiple',
        options: [
          { id: '386', code: '386', name: 'Roof Rails', price: 250 },
          { id: '5AT', code: '5AT', name: 'Driving Assistant Plus (Stop-and-Go)', price: 800 }
        ]
      }
    ]
  },
  {
    id: '23GA',
    name: '2026 MINI Countryman S ALL4',
    description: 'Versatile and spacious for every journey.',
    baseMsrp: 45990,
    categories: [
      {
        id: 'style',
        title: 'Style',
        type: 'single',
        options: [
          { id: '7EA', code: '7EA', name: 'Classic Style', price: 0, description: 'Heated Steering Wheel, Standard Roofliner' },
          { id: '7EP', code: '7EP', name: 'Favoured Style', price: 2000, description: 'JCW Sport Seats, Black Roofliner, Full Vescin Interior' }
        ]
      },
      {
        id: 'exterior',
        title: 'Exterior Colour',
        type: 'single',
        options: [
          { id: 'C74', code: 'C74', name: 'Chili Red II', price: 0 }
        ]
      },
      {
        id: 'roof',
        title: 'Roof & Mirrors',
        type: 'single',
        options: [
          { id: '381', code: '381', name: 'Body Colour Roof & Black Mirrors', price: 0 }
        ]
      },
      {
        id: 'wheels',
        title: 'Wheels',
        type: 'single',
        options: [
          { id: '1K3', code: '1K3', name: '18" Asteroid A/S', price: 0, requires: ['7EA'] }
        ]
      },
      {
        id: 'interior',
        title: 'Interior Upholstery',
        type: 'single',
        options: [
          { id: 'TCB2', code: 'TCB2', name: 'Vescin/cloth combination | Black/Blue', price: 0, requires: ['7EA'] }
        ]
      },
      {
        id: 'line',
        title: 'Premier Line',
        type: 'single',
        options: [
          { id: 'ZBB', code: 'ZBB', name: 'Premier Line', price: 0, description: 'Comfort Access, Auto Mirrors, Wireless Charging' },
          { id: 'ZBC', code: 'ZBC', name: 'Premier+ Line', price: 2750, description: 'Includes Premier content + Parking Asst Plus, Harman/Kardon, Head-Up Display, Nav AR' }
        ]
      },
      {
        id: 'packages',
        title: 'Additional Packages',
        type: 'multiple',
        options: [
          { id: 'ZYU', code: 'ZYU', name: 'Advanced Driver Assistance Package', price: 2000, incompatibleWith: ['5AT'] }
        ]
      },
      {
        id: 'options',
        title: 'Stand Alone Options',
        type: 'multiple',
        options: [
          { id: '223', code: '223', name: 'Adaptive Suspension', price: 600 },
          { id: '3AC', code: '3AC', name: 'Trailer Tow Hitch', price: 750, requires: ['7EP'] },
          { id: '4NR', code: '4NR', name: 'Interior Camera', price: 300 },
          { id: '5AT', code: '5AT', name: 'Driving Assistant Plus', price: 800, incompatibleWith: ['ZYU'] },
          { id: '6AD', code: '6AD', name: 'MINI Head-Up Display', price: 900, includedIn: ['ZBC'] }
        ]
      }
    ]
  },
  {
    id: '23GD',
    name: '2026 MINI Cooper S 3-Door',
    description: 'The original icon, reinvented.',
    baseMsrp: 39990,
    categories: [
      {
        id: 'style',
        title: 'Style',
        type: 'single',
        options: [
          { id: '7EA', code: '7EA', name: 'Classic Style', price: 0 },
          { id: '7EP', code: '7EP', name: 'Favoured Style', price: 2000 }
        ]
      },
      {
        id: 'exterior',
        title: 'Exterior Colour',
        type: 'single',
        options: [
          { id: 'C74', code: 'C74', name: 'Chili Red II', price: 0 }
        ]
      },
      {
        id: 'roof',
        title: 'Roof & Mirrors',
        type: 'single',
        options: [
          { id: '381', code: '381', name: 'Body Colour Roof & Black Mirror Caps', price: 0 }
        ]
      },
      {
        id: 'wheels',
        title: 'Wheels',
        type: 'single',
        options: [
          { id: '1KC', code: '1KC', name: '17" U-Spoke Grey A/S', price: 0 }
        ]
      },
      {
        id: 'interior',
        title: 'Interior Upholstery',
        type: 'single',
        options: [
          { id: 'TCB2', code: 'TCB2', name: 'Vescin/cloth combination | Black/Blue', price: 0, requires: ['7EA'] }
        ]
      },
      {
        id: 'line',
        title: 'Premier Line',
        type: 'single',
        options: [
          { id: 'ZBB', code: 'ZBB', name: 'Premier Line', price: 0 },
          { id: 'ZFC', code: 'ZFC', name: 'Premier+ Line', price: 2750 }
        ]
      },
      {
        id: 'options',
        title: 'Stand Alone Options',
        type: 'multiple',
        options: [
          { id: '223', code: '223', name: 'Adaptive Suspension', price: 600 },
          { id: '386', code: '386', name: 'Roof Rails', price: 250 },
          { id: '459', code: '459', name: 'Power Front Seats w/ Driver Memory', price: 1000, requires: ['7EP'] },
          { id: '4NR', code: '4NR', name: 'Interior Camera', price: 300 },
          { id: '5AT', code: '5AT', name: 'Driving Assistant Plus', price: 800 },
          { id: '6AD', code: '6AD', name: 'MINI Head-Up Display', price: 900, includedIn: ['ZFC'] }
        ]
      }
    ]
  },
  {
    id: '53GD',
    name: '2026 MINI Cooper S 5-Door',
    description: 'More doors, more space, same go-kart feeling.',
    baseMsrp: 40990,
    categories: [
      {
        id: 'style',
        title: 'Style',
        type: 'single',
        options: [
          { id: '7EA', code: '7EA', name: 'Classic Style', price: 0 },
          { id: '7EP', code: '7EP', name: 'Favoured Style', price: 2000 }
        ]
      },
      {
        id: 'exterior',
        title: 'Exterior Colour',
        type: 'single',
        options: [
          { id: 'C74', code: 'C74', name: 'Chili Red II', price: 0 }
        ]
      },
      {
        id: 'roof',
        title: 'Roof & Mirrors',
        type: 'single',
        options: [
          { id: '381', code: '381', name: 'Body Colour Roof & Black Mirror Caps', price: 0 }
        ]
      },
      {
        id: 'wheels',
        title: 'Wheels',
        type: 'single',
        options: [
          { id: '1KC', code: '1KC', name: '17" U-Spoke Grey A/S', price: 250 }
        ]
      },
      {
        id: 'interior',
        title: 'Interior Upholstery',
        type: 'single',
        options: [
          { id: 'TCB2', code: 'TCB2', name: 'Vescin/cloth combination | Black/Blue', price: 0, requires: ['7EA'] }
        ]
      },
      {
        id: 'line',
        title: 'Premier Line',
        type: 'single',
        options: [
          { id: 'ZBB', code: 'ZBB', name: 'Premier Line', price: 0 },
          { id: 'ZFC', code: 'ZFC', name: 'Premier+ Line', price: 2750 }
        ]
      },
      {
        id: 'options',
        title: 'Stand Alone Options',
        type: 'multiple',
        options: [
          { id: '223', code: '223', name: 'Adaptive Suspension', price: 600 },
          { id: '386', code: '386', name: 'Roof Rails', price: 250 },
          { id: '459', code: '459', name: 'Power Front Seats w/ Driver Memory', price: 1000, requires: ['7EP'] },
          { id: '4NR', code: '4NR', name: 'Interior Camera', price: 300 },
          { id: '5AT', code: '5AT', name: 'Driving Assistant Plus', price: 800 },
          { id: '6AD', code: '6AD', name: 'MINI Head-Up Display', price: 900, includedIn: ['ZFC'] }
        ]
      }
    ]
  }
];
