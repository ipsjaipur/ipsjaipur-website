import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FacultyPageContent from '@/models/FacultyPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/faculty-content/seed
 * Admin-protected. Inserts the current static faculty data as initial DB content.
 * Safe to re-run — uses upsert so it won't duplicate.
 * Pass ?force=true to overwrite existing docs with original defaults.
 */
export async function POST(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    await connectDB();

    const imgBase = process.env.NEXT_PUBLIC_IMG_PATH || '';

    const sections = [
      // ── Banner ────────────────────────────────────────────────────────────────
      {
        section:        'banner',
        bannerTitle:    'Faculty',
        bannerImageUrl: `${imgBase}images/about/faculty-img.webp`,
        bannerPosition: 'object-center',
      },

      // ── Core & Visiting Faculty ───────────────────────────────────────────────
      {
        section:             'faculty',
        facultySectionTitle: 'Core & Visiting Faculty',
        facultyColName:      'Faculty Name',
        facultyColExp:       'Experience',
        facultyMembers: [
          { name: 'Dr. Sudhir Agarwal',         qualification: 'Ph.D, MBA, Marketing & Certificate in IITH from IIM Bangalore', designation: 'Chairman',  experience: '25+ Years of Corporate Experience with HSBC Bank, IDBI Bank, Citi Bank, Unilever & Haldiram',                              order: 0  },
          { name: 'Dr. Deepti Agarwal',          qualification: 'Ph.D, MBA, Marketing & Certificate in IITH from IIM Bangalore', designation: 'Director',  experience: '22+ Years of Work Experience, Working as a Social Activist in the various NGOs & Corporate Sector',                   order: 1  },
          { name: 'Dr. Mridula Sharma',          qualification: 'Ph.D, MBA',                                                      designation: 'Dean',     experience: '18 Years of Academic Experience',                                                                                       order: 2  },
          { name: 'Dr. Deepak Gupta',            qualification: 'Ph.D, M.Com',                                                    designation: '',         experience: '25 Years of Work Experience.',                                                                                          order: 3  },
          { name: 'Dr. Ashish Sharma',           qualification: 'Ph.D, MBA, M.Phil',                                              designation: '',         experience: '25 Years of Work Experience in Corporate & Industry',                                                                     order: 4  },
          { name: 'Dr. Mukul Sharma',            qualification: 'Ph.D, MBA',                                                      designation: '',         experience: '20 Years of Work Experience in Corporate & Industry',                                                                     order: 5  },
          { name: 'Dr. CA Neha Gupta',           qualification: 'Ph.D, CA, MBA, M.Com, B.Com',                                    designation: '',         experience: '18 Years of Work Experience in Corporate & Industry',                                                                     order: 6  },
          { name: 'Prof. Bivash Mukherjee',      qualification: 'Master in Personnel Management & Industrial Relation',           designation: '',         experience: '25 Years of Work Experience in Academics, Corporate, Training & Industry',                                                order: 7  },
          { name: 'Dr. Parul Arora',             qualification: 'P.hD, MBA (Finance), M.Com (A.B.S.T), NET (Management)',        designation: '',         experience: '15 Years of Work Experience in Academics & Corporate',                                                                     order: 8  },
          { name: 'Dr. Brijesh Awasthi',         qualification: 'Ph.D',                                                           designation: '',         experience: '20 years of Teaching Exp with Top Mgmt',                                                                                   order: 9  },
          { name: 'Dr. Saumya Chobey',           qualification: 'Ph.D, MBA, M.Com',                                               designation: '',         experience: '15 Years of Work Experience',                                                                                              order: 10 },
          { name: 'Dr. Eti Patni',               qualification: 'Ph.D, MBA, M.Com',                                               designation: '',         experience: '12 Years of Work Experience',                                                                                              order: 11 },
          { name: 'Dr. Paramanand Sunda',        qualification: 'Ph.D, M.Com',                                                    designation: '',         experience: '10 Years of Work Experience',                                                                                              order: 12 },
          { name: 'Dr. Kailash Saini',           qualification: 'Ph.D, M.Com',                                                    designation: '',         experience: '8 Years of Work Experience',                                                                                               order: 13 },
          { name: 'Dr. Supriya Singhal',         qualification: 'Ph.D, M.Com, CFA',                                               designation: '',         experience: '10 Years of Work Experience',                                                                                              order: 14 },
          { name: 'Prof. CA Suvidha Chaplot',    qualification: 'CA (Chartered Accountant), CS (Company Secretary) & MBA from RTU', designation: '',       experience: '15 Years of Work Experience',                                                                                              order: 15 },
          { name: 'Prof. Nutan Mathur',          qualification: 'MTA (Master of Tourism Administration), M.Com Accounts, B.Com Hons.', designation: '',    experience: '15 Years of Work Experience',                                                                                              order: 16 },
          { name: 'Prof. Ankita Gaur',           qualification: 'MIB (Master of International Business), MHRM (Master in Human Resource Management), MBA in Marketing & Pursuing Ph.D in Human Resource Management', designation: '', experience: '14 Years of Corporate, Research & Academic Work Experience', order: 17 },
          { name: 'Prof. Pankaj Singh Rathore',  qualification: 'MCA from Bangalore University & BCA from Rajasthan University',  designation: '',         experience: '18 Years of Academic Experience',                                                                                          order: 18 },
          { name: 'Prof. Anupama Sharma',        qualification: 'B.Sc. & B.Ed.',                                                  designation: '',         experience: '16 Years of Academic Experience',                                                                                          order: 19 },
          { name: 'Mr. Saurabh Counsul',         qualification: 'M.Com & B.Com',                                                  designation: '',         experience: '23 Years of Work Experience',                                                                                              order: 20 },
          { name: 'Prof. Deepshika Bhatia',      qualification: 'Ph.D Pursuing, MBA (HRM), UGC Net Qualified, B.Com',            designation: '',         experience: '12 Years of Work Experience',                                                                                              order: 21 },
          { name: 'Prof. Saurav Nagi',           qualification: 'MBA from Rajasthan Technical University & BCOM from Rajasthan University', designation: '', experience: '12 Years of Work Experience',                                                                                           order: 22 },
          { name: 'Prof. Akash Juneja',          qualification: '',                                                               designation: '',         experience: '10 Years of Work Experience',                                                                                              order: 23 },
          { name: 'Prof. Disha Juneja',          qualification: '',                                                               designation: '',         experience: '10 Years of Work Experience',                                                                                              order: 24 },
          { name: 'Prof. Disha Sharma',          qualification: '',                                                               designation: '',         experience: '8 Years of Work Experience',                                                                                               order: 25 },
          { name: 'Prof. Divyansh Saini',        qualification: 'MCA from Rajasthan University & BCA from Rajasthan University',  designation: '',         experience: '6 Years of Work Experience',                                                                                               order: 26 },
          { name: 'Prof. Hemant Gautam',         qualification: 'MCA & BCA from Rajasthan University',                           designation: '',         experience: '6 Years of Work Experience',                                                                                               order: 27 },
          { name: 'Prof. Saurabh Bakhliwal',     qualification: '',                                                               designation: '',         experience: '7 Years of Work Experience',                                                                                               order: 28 },
          { name: 'Prof. Kuldeep Singh Shekhawat', qualification: 'MBA from Vivekananda Global University & BA from Rajasthan University', designation: '', experience: '5 Years of Work Experience',                                                                                             order: 29 },
          { name: 'Prof. Saurabh Goyal',         qualification: 'MCA from Jaipur National University & BCA from Rajasthan University', designation: '',    experience: '6 Years of Work Experience',                                                                                               order: 30 },
          { name: 'Mr. Jatin Jangid',            qualification: '',                                                               designation: '',         experience: 'IT 6 Years of Work Experience',                                                                                            order: 31 },
          { name: 'Mrs. Paramjeet Kaur',         qualification: '',                                                               designation: '',         experience: '5 Years of Work Experience',                                                                                               order: 32 },
          { name: 'Prof. Preeti Sharma',         qualification: '',                                                               designation: '',         experience: '10 Years of Work Experience',                                                                                              order: 33 },
          { name: 'Mr. Sanchita Ray',            qualification: 'MCA',                                                            designation: '',         experience: '5 Years Experience',                                                                                                       order: 34 },
          { name: 'Mr. Aashwin Vyas',            qualification: '',                                                               designation: '',         experience: '2 Years IT Experience',                                                                                                    order: 35 },
        ],
      },

      // ── Corporate Speakers / Mentors ──────────────────────────────────────────
      {
        section:             'mentors',
        mentorsSectionTitle: 'Corporate Speakers / Mentors',
        mentorsColName:      'Name & Designation',
        mentorsColQual:      'Qualification',
        mentors: [
          { name: 'Sh. Khemraj Ji',              qualification: 'Sr. IAS (1985 Batch), Additional Chief Secretary (Rtd.)',   experience: 'Govt. of Rajasthan',                              order: 0  },
          { name: 'Prof. Prabal K. Sen',          qualification: 'Ex. Professor Area of Economics & Ex. Founding Chairperson EDC', experience: 'XLRI Jamshedpur',                           order: 1  },
          { name: 'Prof. Sanjay Saraswat',        qualification: 'Managing Director',                                        experience: 'ACE Institute for Education & Languages Pvt. Ltd.', order: 2  },
          { name: 'Mr. Vachaspati Purohit',       qualification: 'Director - I.T.',                                          experience: 'HCL - America',                                   order: 3  },
          { name: 'Mr. Sudeep Sharma',            qualification: 'Principal Partner',                                        experience: 'BCG, Chicago - USA',                              order: 4  },
          { name: 'Mr. Gagan Mittal',             qualification: 'Executive Director',                                       experience: 'Standard Chartered Bank',                         order: 5  },
          { name: 'Mr. Bhupesh Ahuja',            qualification: 'Sr. Vice President',                                      experience: 'DSP BLACK ROCK (Mutual Fund)',                     order: 6  },
          { name: 'Mr. Paras M Das',              qualification: 'Regional Manager - North',                                 experience: 'Hughes Communication India Ltd.',                  order: 7  },
          { name: 'Mr. Ashish Jain',              qualification: 'Sr. Vice Presindent',                                      experience: 'AXIS Bank Ltd.',                                  order: 8  },
          { name: 'Mr. Jatin Govil',              qualification: 'Zonal Head (Rajasthan)',                                   experience: 'ICICI Bank Ltd.',                                 order: 9  },
          { name: 'Mr. Piyush Kumar Saxena',      qualification: 'Sr. Vice President',                                      experience: 'Religare Finvest Ltd.',                            order: 10 },
          { name: 'Mr. Paresh Nankany',           qualification: 'COO',                                                      experience: 'GIONEE Mobiles',                                  order: 11 },
          { name: 'Mr. Rohit Mathur',             qualification: 'Country Head - HR (INDIA)',                                experience: 'Shriram General Insurance Ltd.',                  order: 12 },
          { name: 'Mr. Anand Kushwaha',           qualification: 'Head - HR (Rajasthan)',                                    experience: 'Samasta Microfinance Ltd.',                        order: 13 },
          { name: 'Mr. Anil Sharma',              qualification: 'Manager - HR',                                             experience: 'AIRTEL',                                          order: 14 },
          { name: 'Mr. Ankit Gupta',              qualification: 'Manager - Operations',                                     experience: 'BOSCH',                                           order: 15 },
          { name: 'Mr. Kajal Verma',              qualification: 'Senior Manager',                                           experience: 'Samsung Mobiles',                                 order: 16 },
          { name: 'Mr. Prateek Mitra',            qualification: 'Area Manager',                                             experience: 'ITC Ltd.',                                        order: 17 },
          { name: 'Mr. Manish Pareek',            qualification: 'Regional Team Leader (North Head)',                        experience: 'Ashok Leyland Ltd.',                              order: 18 },
          { name: 'Mr. Saket Mishra',             qualification: 'Regional Sales Manager',                                   experience: 'Induslnd Bank Ltd.',                              order: 19 },
          { name: 'Mr. Rajkamal Tomar',           qualification: 'Deputy General Manager',                                   experience: 'Aditya Birla Ltd.',                               order: 20 },
          { name: 'Mr. Ashish Kumar',             qualification: 'Deputy Director',                                          experience: 'Amity University',                                order: 21 },
          { name: 'Mr. Paras Rastogi',            qualification: 'Area Sales Manager',                                       experience: 'Bajaj Finserv Ltd.',                              order: 22 },
          { name: 'Mr. Naveen Agrawal',           qualification: 'Program Manager Deployment',                               experience: 'Bharti Infratel Ltd.',                            order: 23 },
          { name: 'Mr. Rakesh Ranjan',            qualification: 'Head Supply Chain Management',                             experience: 'Bharti Infratel Ltd.',                            order: 24 },
          { name: 'Mr. Hitesh Desai',             qualification: 'Zonal Business Manager North Zone',                       experience: 'Novartis India Limited',                          order: 25 },
          { name: 'Mr. Abhishek Singh',           qualification: 'Program Manager',                                          experience: 'Il&fs Cluster Development Intiative Limited',     order: 26 },
          { name: 'Mr. Santosh Kumar Dhal',       qualification: 'Head - HR',                                                experience: 'Shaft Sinkers Mauritius India Project',           order: 27 },
          { name: 'Mr. Vikas Kumar',              qualification: 'Sr. Manager - Sales & Distribution',                       experience: 'Motilal Oswal',                                   order: 28 },
          { name: 'Mr. Aashish Dixit',            qualification: 'Project Manager',                                          experience: 'SASKEN',                                          order: 29 },
          { name: 'Mr. Sandeep Birani',           qualification: 'Vice President - Sales & Marketing',                       experience: 'SNG Group',                                       order: 30 },
          { name: 'Mr. Amit Kumar',               qualification: 'Senior Vice President- Projects',                          experience: 'Shristi Infrastructure Dev. Ltd.',                order: 31 },
          { name: 'Mr. Vikas Tandon',             qualification: 'Associate Franchise Manager',                              experience: 'PEPSICO',                                         order: 32 },
          { name: 'Mr. Nitesh Kumar',             qualification: 'Chief Manager- Alternate Channel',                         experience: 'Kotak Life Insurance',                            order: 33 },
          { name: 'Mr. Lalit Jain',               qualification: 'Business Head- West',                                      experience: 'Spencer\'s Retail Limited',                       order: 34 },
          { name: 'Mr. Aakash Modi',              qualification: 'Country Credit Manager',                                   experience: 'Shell India Markets Private Limited',             order: 35 },
          { name: 'Sonal Jayaswal',               qualification: 'Director',                                                 experience: 'Abhijeet Vision Unlimited',                       order: 36 },
          { name: 'Mr. Hitender Singh',           qualification: 'Account Manager',                                          experience: 'Hughes Communication India Ltd.',                  order: 37 },
          { name: 'Mr. Satish Sharma',            qualification: 'North Head - Infra Projects',                              experience: 'HDFC Bank Ltd.',                                  order: 38 },
          { name: 'Mr. Vikas Sudrania',           qualification: 'Wealth Manager',                                           experience: 'Citibank India Ltd.',                             order: 39 },
          { name: 'Mr. Varun Mahajan',            qualification: 'Senior Consultant',                                        experience: 'PWC House',                                       order: 40 },
          { name: 'Mr. Rajesh Pareek',            qualification: 'Senior Manager Trainer',                                   experience: 'Genpect',                                         order: 41 },
          { name: 'Mr. Shivaji Kumar Dey',        qualification: 'Zonal Head',                                               experience: 'Edelweiss Asset Management Ltd.',                 order: 42 },
          { name: 'Dr. Deepak Saxena',            qualification: 'Director Student Advisory Board',                          experience: 'University Of Rajasthan',                         order: 43 },
          { name: 'Mrs. Aradhana Juneja',         qualification: 'Head - HR',                                                experience: 'Nike Inc. (Toronto)',                             order: 44 },
          { name: 'Mr. Amit Vashisth',            qualification: 'Teritory Head',                                            experience: 'Tata Motors',                                     order: 45 },
          { name: 'Mr. Aman Bhatia',              qualification: 'Teritory Head',                                            experience: 'Tata Motors',                                     order: 46 },
          { name: 'Mr. Saket Mishra',             qualification: 'Regional Sales Manager',                                   experience: 'Indusind Bank Ltd.',                              order: 47 },
          { name: 'Mr. Ashish Tandon',            qualification: 'Head - HR (INDIA)',                                        experience: 'Finova Capital',                                  order: 48 },
          { name: 'Ms. Shruti Singh',             qualification: 'Head - HR',                                                experience: 'Unitech Wireless Pvt. Ltd.',                      order: 49 },
          { name: 'Mr. Sandeep Samsukha',         qualification: 'Head Marketing',                                           experience: 'Vatika Group',                                    order: 50 },
          { name: 'Mr. Nishant Shekhar',          qualification: 'Area Manager',                                             experience: 'HDFC Bank Ltd.',                                  order: 51 },
          { name: 'Mr. Rohit Mogra',              qualification: 'Head - HR (Rajasthan)',                                    experience: 'Deutsche Bank Ltd.',                              order: 52 },
          { name: 'Mr. Neil Judson',              qualification: 'Brand Manager',                                            experience: 'ICICI Bank Ltd',                                  order: 53 },
          { name: 'Mr. Dilip S Rathore',          qualification: 'National Product Head',                                    experience: 'CIPLA Ltd',                                       order: 54 },
          { name: 'Mr. Ashish Dhayal',            qualification: 'Brand Manager',                                            experience: 'Maruti Suzuki India Ltd.',                        order: 55 },
          { name: 'Mr. Abhishek Pathak',          qualification: 'Area Manager',                                             experience: 'Tafe Ltd',                                        order: 56 },
          { name: 'Mr. Raghuveer Rai',            qualification: 'Head Marketing',                                           experience: 'Indus Towers',                                    order: 57 },
          { name: 'Mr. Razib Khan',               qualification: 'Manager - HR',                                             experience: 'Deutsche Bank Ltd.',                              order: 58 },
          { name: 'Mr. Chandra Shekhar Sharma',   qualification: 'Physics Faculty',                                          experience: 'Resonance',                                       order: 59 },
          { name: 'Mr. Ashish Purohit',           qualification: 'Regional Head',                                            experience: 'Reliance Mutual Fund',                            order: 60 },
          { name: 'Mr. Gajraj Singh Purawat',     qualification: 'Area Manager',                                             experience: 'Anchor Health And Beauty Care Pvt. Ltd.',         order: 61 },
        ],
      },
    ];

    const results = [];
    for (const sectionData of sections) {
      const { section } = sectionData;

      if (!force) {
        const existing = await FacultyPageContent.findOne({ section });
        if (existing) {
          results.push({ section, status: 'skipped' });
          continue;
        }
      }

      await FacultyPageContent.findOneAndUpdate(
        { section },
        { $set: sectionData },
        { upsert: true, new: true, runValidators: true }
      );
      results.push({ section, status: force ? 'overwritten' : 'seeded' });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[FACULTY-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
