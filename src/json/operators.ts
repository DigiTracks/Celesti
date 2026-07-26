export interface Operator {
  id: string
  name: string
  badge: string
  credentials: string[]
  facilityId: string
  status: 'active' | 'offline' | 'training'
  certifications: string[]
}

const firstNames = ['Aarav', 'Vikram', 'Priya', 'Rajesh', 'Ananya', 'Suresh', 'Deepa', 'Arun', 'Kavita', 'Manoj',
  'Neha', 'Ravi', 'Pooja', 'Sanjay', 'Meera', 'Ajay', 'Sunita', 'Vijay', 'Rekha', 'Ashok',
  'Lakshmi', 'Nitin', 'Shweta', 'Kiran', 'Divya', 'Prakash', 'Anita', 'Ganesh', 'Smita', 'Rohan',
  'Jaya', 'Mahesh', 'Ritu', 'Dinesh', 'Nalini', 'Harish', 'Vani', 'Satish', 'Radha', 'Anil',
  'Usha', 'Venkat', 'Tara', 'Mohan', 'Kala', 'Sundar', 'Lata', 'Bala', 'Sita', 'Ramesh',
  'Geeta', 'Karthik', 'Shanti', 'Naveen', 'Mala', 'Raghav', 'Kamala', 'Sridhar', 'Vimala', 'Prasad',
  'Indira', 'Murugan', 'Saraswati', 'Kumar', 'Lalita', 'Selvan', 'Bhavani', 'Rangan', 'Kalyani', 'Durai',
  'Pushpa', 'Eswar', 'Mangala', 'Ilango', 'Nirmala', 'Jeeva', 'Revathi', 'Senthil', 'Alamelu', 'Gopal',
  'Shakila', 'Pandi', 'Vasanthi', 'Muthu', 'Parvati', 'Thangam', 'Sudha', 'Lingam', 'Bharati', 'Raja',
  'Chitra', 'Sekar', 'Nandini', 'Babu', 'Mohana', 'Vel', 'Shyamala', 'Siva', 'Amudha', 'Devan',
  'Jothi', 'Palani', 'Krishnaveni', 'Kathir', 'Pavithra', 'Guna', 'Mythili', 'Logesh', 'Tamilarasi', 'Anbu',
  'Selvi', 'Parthiban', 'Vijaya', 'Sankar', 'Maha', 'Balaji', 'Karpagam', 'Chandran', 'Vaidhegi', 'Naga',
  'Kokila', 'Jayaram', 'Sushila', 'Narayan', 'Suguna', 'Padmanabhan', 'Rohini', 'Viswanath', 'Uma', 'Ramachandran',
  'Sujatha', 'Gopalan', 'Shobha', 'Subramanian', 'Bhanumati', 'Ravichandran', 'Shyamala', 'Thirumalai', 'Jayanti', 'Ananthan',
  'Pankajam', 'Varadan', 'Vasanti', 'Murali', 'Kousalya', 'Thyagarajan', 'Lalitha', 'Srinivasan', 'Sarojini', 'Natarajan',
  'Devaki', 'Ishwar', 'Mridula', 'Baskar', 'Nirmala', 'Chakravarthi', 'Vatsala', 'Arvind', 'Shakuntala', 'Dilip',
  'Hemalatha', 'Prabhu', 'Indumati', 'Jaykumar', 'Rajalakshmi', 'Surya', 'Lakshmi', 'Deepak', 'Kamakshi', 'Rohit',
  'Mallika', 'Akash', 'Shivani', 'Abhishek', 'Tanvi', 'Harsh', 'Ankita', 'Siddharth', 'Isha', 'Karan',
  'Nitya', 'Vivek', 'Trisha', 'Aditya', 'Shruti', 'Yash', 'Bhavna', 'Rahul', 'Disha', 'Vishal',
  'Kriti', 'Amit', 'Avni', 'Dhruv', 'Garima', 'Tushar', 'Binal', 'Hitesh', 'Komal', 'Nilesh',
  'Pallavi', 'Samir', 'Rupal', 'Tejas', 'Urvi', 'Arpit', 'Madhavi', 'Chirag', 'Neelam', 'Faisal',
  'Rukhsana', 'Iqbal', 'Zareen', 'Akhtar', 'Shabnam', 'Imran', 'Naseem', 'Javed', 'Parveen', 'Asif',
]

const facilities = ['FAC-HYD-01', 'FAC-BLR-01', 'FAC-TRV-01']
const certsByCat: Record<string, string[]> = {
  'IPC-A-610': ['IPC-A-610 Rev G', 'IPC-A-610 Rev H'],
  'IPC-620': ['IPC-620 Rev A', 'IPC-620 Rev B'],
  'ECSS': ['ECSS-Q-ST-70-08', 'ECSS-Q-ST-70-38'],
  'J-STD': ['J-STD-001 Rev G', 'J-STD-001 Rev H'],
  'NASA': ['NASA STD 8739.1', 'NASA STD 8739.2'],
}

export const OPERATORS: Operator[] = Array.from({ length: 220 }, (_, i) => {
  const name = firstNames[i % firstNames.length]
  const badge = `EMP-${String(1000 + i).padStart(4, '0')}`
  const fac = facilities[i % facilities.length] || facilities[0]!
  const certCategories = Object.keys(certsByCat)
  const numCerts = 1 + (i % 4)
  const certs: string[] = []
  for (let c = 0; c < numCerts; c++) {
    const cat = certCategories[(i + c) % certCategories.length]!
    const opts = certsByCat[cat]!
    certs.push(opts[i % opts.length]!)
  }
  return {
    id: `OPR-${String(i + 1).padStart(4, '0')}`,
    name: `${name} [${badge}]`,
    badge,
    credentials: certs,
    facilityId: fac,
    status: (i % 10 === 0 ? 'training' : i % 7 === 0 ? 'offline' : 'active') as Operator['status'],
    certifications: certs,
  }
})
