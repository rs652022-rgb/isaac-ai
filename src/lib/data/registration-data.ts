import { IncorporationOption } from "@/types";

export interface CountryIncorporation {
  countryCode: string;
  countryName: string;
  flag: string;
  currency: string;
  popularTypes: string[];
  options: IncorporationOption[];
  complianceCalendar: { event: string; frequency: string; dueMonth: string }[];
}

export const INCORPORATION_DATA: Record<string, CountryIncorporation> = {
  US: {
    countryCode: "US",
    countryName: "United States",
    flag: "🇺🇸",
    currency: "USD ($)",
    popularTypes: ["Delaware C-Corp", "Wyoming LLC", "Nevada LLC"],
    options: [
      {
        type: "DIY",
        name: "Direct State Portal Filing",
        costEstimate: "$90 - $300",
        timelineEstimate: "3 - 7 Days",
        complianceLevel: "Basic",
        advantages: ["Lowest direct cost", "Full control over documents"],
        disadvantages: ["Requires registered agent in state", "Need manual EIN filing with IRS"],
        officialLinks: [
          { label: "Delaware Division of Corporations", url: "https://corp.delaware.gov" },
          { label: "IRS EIN Direct Application", url: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online" }
        ],
        documentChecklist: ["Certificate of Incorporation", "Bylaws", "Initial Board Resolution", "SS-4 EIN Application"]
      },
      {
        type: "Online Service",
        name: "Stripe Atlas / Clerky / Firstbase",
        costEstimate: "$500 - $800",
        timelineEstimate: "5 - 10 Days",
        complianceLevel: "High",
        advantages: ["Turnkey C-Corp setup", "Includes US Bank Account & EIN", "Standard VC-ready stock issuance"],
        disadvantages: ["Higher upfront fee", "Annual registered agent recurring costs"],
        officialLinks: [
          { label: "Stripe Atlas", url: "https://stripe.com/atlas" },
          { label: "Clerky VC Setup", url: "https://www.clerky.com" }
        ],
        documentChecklist: ["Delaware Certificate of Formation", "83(b) Tax Election Forms", "Action by Sole Incorporator", "Stock Purchase Agreements"]
      },
      {
        type: "Law Firm",
        name: "US Startup Legal Counsel",
        costEstimate: "$2,500 - $6,000",
        timelineEstimate: "7 - 14 Days",
        complianceLevel: "High",
        advantages: ["Custom IP Assignment agreements", "Complex multi-founder equity vesting", "Direct legal representation"],
        disadvantages: ["Expensive for pre-revenue stage", "Slower turnaround"],
        officialLinks: [{ label: "American Bar Association Startup Directory", url: "https://www.americanbar.org" }],
        documentChecklist: ["Custom Stock Option Plan (ESOP)", "Proprietary Information Assignment (PIIA)", "Custom Founders Agreement"]
      }
    ],
    complianceCalendar: [
      { event: "Delaware Franchise Tax Report", frequency: "Annual", dueMonth: "March 1" },
      { event: "IRS Form 1120 / Federal Tax Return", frequency: "Annual", dueMonth: "April 15" },
      { event: "State Registered Agent Renewal", frequency: "Annual", dueMonth: "December" }
    ]
  },
  IN: {
    countryCode: "IN",
    countryName: "India",
    flag: "🇮🇳",
    currency: "INR (₹)",
    popularTypes: ["Private Limited (Pvt Ltd)", "LLP", "One Person Company (OPC)", "Sole Proprietorship"],
    options: [
      {
        type: "Chartered Accountant",
        name: "Practicing CA / CS Firm",
        costEstimate: "₹8,000 - ₹20,000",
        timelineEstimate: "7 - 12 Days",
        complianceLevel: "High",
        advantages: ["Handled by professional CS", "Direct MCA portal filing", "GST & MSME registration included"],
        disadvantages: ["Varying CA service fees"],
        officialLinks: [
          { label: "MCA SPICe+ Portal", url: "https://www.mca.gov.in" },
          { label: "Startup India Recognition Portal", url: "https://www.startupindia.gov.in" }
        ],
        documentChecklist: ["DSC & DIN", "SPICe+ Part A & B", "MOA & AOA", "PAN & TAN Application", "GST Certificate"]
      },
      {
        type: "Online Service",
        name: "Vakilsearch / IndiaFilings / Cleartax",
        costEstimate: "₹6,000 - ₹12,000",
        timelineEstimate: "10 - 15 Days",
        complianceLevel: "Medium",
        advantages: ["Fixed price package", "Digital dashboard tracking"],
        disadvantages: ["Customer support response delays"],
        officialLinks: [{ label: "Startup India Hub", url: "https://www.startupindia.gov.in" }],
        documentChecklist: ["Director KYC", "Registered Office Rent Agreement/NOC", "MOA/AOA Execution"]
      }
    ],
    complianceCalendar: [
      { event: "DPT-3 Return of Deposits", frequency: "Annual", dueMonth: "June 30" },
      { event: "MGT-7 Annual Return & AOC-4 Financial Statements", frequency: "Annual", dueMonth: "October 30" },
      { event: "DIR-3 KYC Directors Filing", frequency: "Annual", dueMonth: "September 30" },
      { event: "GST Monthly Return (GSTR-1 & 3B)", frequency: "Monthly", dueMonth: "20th of every month" }
    ]
  },
  UK: {
    countryCode: "UK",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP (£)",
    popularTypes: ["Private Limited Company (Ltd)", "LLP"],
    options: [
      {
        type: "Government Portal",
        name: "Companies House Online",
        costEstimate: "£50",
        timelineEstimate: "24 Hours",
        complianceLevel: "High",
        advantages: ["Fastest registration in the world", "Official Companies House direct setup", "Automatic Corporation Tax setup"],
        disadvantages: ["Requires UK registered address"],
        officialLinks: [{ label: "Gov.uk Register a Company", url: "https://www.gov.uk/limited-company-formation/register-your-company" }],
        documentChecklist: ["Articles of Association", "Memorandum of Association", "Persons with Significant Control (PSC) Register"]
      }
    ],
    complianceCalendar: [
      { event: "Confirmation Statement", frequency: "Annual", dueMonth: "12 months post-inc" },
      { event: "Annual Accounts to Companies House", frequency: "Annual", dueMonth: "9 months post fiscal end" },
      { event: "Corporation Tax Return (CT600)", frequency: "Annual", dueMonth: "12 months post accounting period" }
    ]
  },
  SG: {
    countryCode: "SG",
    countryName: "Singapore",
    flag: "🇸🇬",
    currency: "SGD (S$)",
    popularTypes: ["Pte Ltd (Private Limited)"],
    options: [
      {
        type: "Online Service",
        name: "Osome / Sleek / ACRA Portal",
        costEstimate: "S$600 - S$1,500",
        timelineEstimate: "2 - 3 Days",
        complianceLevel: "High",
        advantages: ["17% corporate tax cap", "0% tax on first S$100k capital gains", "Top Asian tech hub"],
        disadvantages: ["Requires local resident director (can use nominee service)"],
        officialLinks: [{ label: "ACRA BizFile Portal", url: "https://www.bizfile.gov.sg" }],
        documentChecklist: ["ACRA Name Approval", "Company Constitution", "Resident Director Consent", "Form 45"]
      }
    ],
    complianceCalendar: [
      { event: "Annual General Meeting (AGM)", frequency: "Annual", dueMonth: "Within 6 months of financial year end" },
      { event: "Annual Return Filing with ACRA", frequency: "Annual", dueMonth: "7 months post fiscal year end" }
    ]
  }
};
