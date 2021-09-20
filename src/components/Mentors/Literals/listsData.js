const listsData = {
  states: [
	{
		code: "AF",
		stateName: "Afghanistan"
	},
	{
		code: "AL",
		stateName: "Albania"
	},
	{
		code: "DZ",
		stateName: "Algeria"
	},
	{
		code: "AS",
		stateName: "American Samoa"
	},
	{
		code: "AD",
		stateName: "Andorra"
	},
	{
		code: "AO",
		stateName: "Angola"
	},
	{
		code: "AI",
		stateName: "Anguilla"
	},
	{
		code: "AQ",
		stateName: "Antarctica"
	},
	{
		code: "AG",
		stateName: "Antigua and Barbuda"
	},
	{
		code: "AR",
		stateName: "Argentina"
	},
	{
		code: "AM",
		stateName: "Armenia"
	},
	{
		code: "AW",
		stateName: "Aruba"
	},
	{
		code: "AU",
		stateName: "Australia"
	},
	{
		code: "AT",
		stateName: "Austria"
	},
	{
		code: "AZ",
		stateName: "Azerbaijan"
	},
	{
		code: "BS",
		stateName: "Bahamas"
	},
	{
		code: "BH",
		stateName: "Bahrain"
	},
	{
		code: "BD",
		stateName: "Bangladesh"
	},
	{
		code: "BB",
		stateName: "Barbados"
	},
	{
		code: "BY",
		stateName: "Belarus"
	},
	{
		code: "BE",
		stateName: "Belgium"
	},
	{
		code: "BZ",
		stateName: "Belize"
	},
	{
		code: "BJ",
		stateName: "Benin"
	},
	{
		code: "BM",
		stateName: "Bermuda"
	},
	{
		code: "BT",
		stateName: "Bhutan"
	},
	{
		code: "BO",
		stateName: "Bolivia, Plurinational State of"
	},
	{
		code: "BQ",
		stateName: "Bonaire, Sint Eustatius and Saba"
	},
	{
		code: "BA",
		stateName: "Bosnia and Herzegovina"
	},
	{
		code: "BW",
		stateName: "Botswana"
	},
	{
		code: "BV",
		stateName: "Bouvet Island"
	},
	{
		code: "BR",
		stateName: "Brazil"
	},
	{
		code: "IO",
		stateName: "British Indian Ocean Territory"
	},
	{
		code: "BN",
		stateName: "Brunei Darussalam"
	},
	{
		code: "BG",
		stateName: "Bulgaria"
	},
	{
		code: "BF",
		stateName: "Burkina Faso"
	},
	{
		code: "BI",
		stateName: "Burundi"
	},
	{
		code: "CV",
		stateName: "Cabo Verde"
	},
	{
		code: "KH",
		stateName: "Cambodia"
	},
	{
		code: "CM",
		stateName: "Cameroon"
	},
	{
		code: "CA",
		stateName: "Canada"
	},
	{
		code: "KY",
		stateName: "Cayman Islands"
	},
	{
		code: "CF",
		stateName: "Central African Republic"
	},
	{
		code: "TD",
		stateName: "Chad"
	},
	{
		code: "CL",
		stateName: "Chile"
	},
	{
		code: "CN",
		stateName: "China"
	},
	{
		code: "CX",
		stateName: "Christmas Island"
	},
	{
		code: "CC",
		stateName: "Cocos (Keeling) Islands"
	},
	{
		code: "CO",
		stateName: "Colombia"
	},
	{
		code: "KM",
		stateName: "Comoros"
	},
	{
		code: "CG",
		stateName: "Congo"
	},
	{
		code: "CD",
		stateName: "Congo, Democratic Republic of the"
	},
	{
		code: "CK",
		stateName: "Cook Islands"
	},
	{
		code: "CR",
		stateName: "Costa Rica"
	},
	{
		code: "HR",
		stateName: "Croatia"
	},
	{
		code: "CU",
		stateName: "Cuba"
	},
	{
		code: "CW",
		stateName: "Curaçao"
	},
	{
		code: "CY",
		stateName: "Cyprus"
	},
	{
		code: "CZ",
		stateName: "Czechia"
	},
	{
		code: "CI",
		stateName: "Côte d'Ivoire"
	},
	{
		code: "DK",
		stateName: "Denmark"
	},
	{
		code: "DJ",
		stateName: "Djibouti"
	},
	{
		code: "DM",
		stateName: "Dominica"
	},
	{
		code: "DO",
		stateName: "Dominican Republic"
	},
	{
		code: "EC",
		stateName: "Ecuador"
	},
	{
		code: "EG",
		stateName: "Egypt"
	},
	{
		code: "SV",
		stateName: "El Salvador"
	},
	{
		code: "GQ",
		stateName: "Equatorial Guinea"
	},
	{
		code: "ER",
		stateName: "Eritrea"
	},
	{
		code: "EE",
		stateName: "Estonia"
	},
	{
		code: "SZ",
		stateName: "Eswatini"
	},
	{
		code: "ET",
		stateName: "Ethiopia"
	},
	{
		code: "FK",
		stateName: "Falkland Islands (Malvinas)"
	},
	{
		code: "FO",
		stateName: "Faroe Islands"
	},
	{
		code: "FJ",
		stateName: "Fiji"
	},
	{
		code: "FI",
		stateName: "Finland"
	},
	{
		code: "FR",
		stateName: "France"
	},
	{
		code: "GF",
		stateName: "French Guiana"
	},
	{
		code: "PF",
		stateName: "French Polynesia"
	},
	{
		code: "TF",
		stateName: "French Southern Territories"
	},
	{
		code: "GA",
		stateName: "Gabon"
	},
	{
		code: "GM",
		stateName: "Gambia"
	},
	{
		code: "GE",
		stateName: "Georgia"
	},
	{
		code: "DE",
		stateName: "Germany"
	},
	{
		code: "GH",
		stateName: "Ghana"
	},
	{
		code: "GI",
		stateName: "Gibraltar"
	},
	{
		code: "GR",
		stateName: "Greece"
	},
	{
		code: "GL",
		stateName: "Greenland"
	},
	{
		code: "GD",
		stateName: "Grenada"
	},
	{
		code: "GP",
		stateName: "Guadeloupe"
	},
	{
		code: "GU",
		stateName: "Guam"
	},
	{
		code: "GT",
		stateName: "Guatemala"
	},
	{
		code: "GG",
		stateName: "Guernsey"
	},
	{
		code: "GN",
		stateName: "Guinea"
	},
	{
		code: "GW",
		stateName: "Guinea-Bissau"
	},
	{
		code: "GY",
		stateName: "Guyana"
	},
	{
		code: "HT",
		stateName: "Haiti"
	},
	{
		code: "HM",
		stateName: "Heard Island and McDonald Islands"
	},
	{
		code: "VA",
		stateName: "Holy See"
	},
	{
		code: "HN",
		stateName: "Honduras"
	},
	{
		code: "HK",
		stateName: "Hong Kong"
	},
	{
		code: "HU",
		stateName: "Hungary"
	},
	{
		code: "IS",
		stateName: "Iceland"
	},
	{
		code: "IN",
		stateName: "India"
	},
	{
		code: "ID",
		stateName: "Indonesia"
	},
	{
		code: "IR",
		stateName: "Iran, Islamic Republic of"
	},
	{
		code: "IQ",
		stateName: "Iraq"
	},
	{
		code: "IE",
		stateName: "Ireland"
	},
	{
		code: "IM",
		stateName: "Isle of Man"
	},
	{
		code: "IL",
		stateName: "Israel"
	},
	{
		code: "IT",
		stateName: "Italy"
	},
	{
		code: "JM",
		stateName: "Jamaica"
	},
	{
		code: "JP",
		stateName: "Japan"
	},
	{
		code: "JE",
		stateName: "Jersey"
	},
	{
		code: "JO",
		stateName: "Jordan"
	},
	{
		code: "KZ",
		stateName: "Kazakhstan"
	},
	{
		code: "KE",
		stateName: "Kenya"
	},
	{
		code: "KI",
		stateName: "Kiribati"
	},
	{
		code: "KP",
		stateName: "Korea, Democratic People's Republic of"
	},
	{
		code: "KR",
		stateName: "Korea, Republic of"
	},
	{
		code: "KW",
		stateName: "Kuwait"
	},
	{
		code: "KG",
		stateName: "Kyrgyzstan"
	},
	{
		code: "LA",
		stateName: "Lao People's Democratic Republic"
	},
	{
		code: "LV",
		stateName: "Latvia"
	},
	{
		code: "LB",
		stateName: "Lebanon"
	},
	{
		code: "LS",
		stateName: "Lesotho"
	},
	{
		code: "LR",
		stateName: "Liberia"
	},
	{
		code: "LY",
		stateName: "Libya"
	},
	{
		code: "LI",
		stateName: "Liechtenstein"
	},
	{
		code: "LT",
		stateName: "Lithuania"
	},
	{
		code: "LU",
		stateName: "Luxembourg"
	},
	{
		code: "MO",
		stateName: "Macao"
	},
	{
		code: "MG",
		stateName: "Madagascar"
	},
	{
		code: "MW",
		stateName: "Malawi"
	},
	{
		code: "MY",
		stateName: "Malaysia"
	},
	{
		code: "MV",
		stateName: "Maldives"
	},
	{
		code: "ML",
		stateName: "Mali"
	},
	{
		code: "MT",
		stateName: "Malta"
	},
	{
		code: "MH",
		stateName: "Marshall Islands"
	},
	{
		code: "MQ",
		stateName: "Martinique"
	},
	{
		code: "MR",
		stateName: "Mauritania"
	},
	{
		code: "MU",
		stateName: "Mauritius"
	},
	{
		code: "YT",
		stateName: "Mayotte"
	},
	{
		code: "MX",
		stateName: "Mexico"
	},
	{
		code: "FM",
		stateName: "Micronesia, Federated States of"
	},
	{
		code: "MD",
		stateName: "Moldova, Republic of"
	},
	{
		code: "MC",
		stateName: "Monaco"
	},
	{
		code: "MN",
		stateName: "Mongolia"
	},
	{
		code: "ME",
		stateName: "Montenegro"
	},
	{
		code: "MS",
		stateName: "Montserrat"
	},
	{
		code: "MA",
		stateName: "Morocco"
	},
	{
		code: "MZ",
		stateName: "Mozambique"
	},
	{
		code: "MM",
		stateName: "Myanmar"
	},
	{
		code: "NA",
		stateName: "Namibia"
	},
	{
		code: "NR",
		stateName: "Nauru"
	},
	{
		code: "NP",
		stateName: "Nepal"
	},
	{
		code: "NL",
		stateName: "Netherlands"
	},
	{
		code: "NC",
		stateName: "New Caledonia"
	},
	{
		code: "NZ",
		stateName: "New Zealand"
	},
	{
		code: "NI",
		stateName: "Nicaragua"
	},
	{
		code: "NE",
		stateName: "Niger"
	},
	{
		code: "NG",
		stateName: "Nigeria"
	},
	{
		code: "NU",
		stateName: "Niue"
	},
	{
		code: "NF",
		stateName: "Norfolk Island"
	},
	{
		code: "MK",
		stateName: "North Macedonia"
	},
	{
		code: "MP",
		stateName: "Northern Mariana Islands"
	},
	{
		code: "NO",
		stateName: "Norway"
	},
	{
		code: "OM",
		stateName: "Oman"
	},
	{
		code: "PK",
		stateName: "Pakistan"
	},
	{
		code: "PW",
		stateName: "Palau"
	},
	{
		code: "PS",
		stateName: "Palestine, State of"
	},
	{
		code: "PA",
		stateName: "Panama"
	},
	{
		code: "PG",
		stateName: "Papua New Guinea"
	},
	{
		code: "PY",
		stateName: "Paraguay"
	},
	{
		code: "PE",
		stateName: "Peru"
	},
	{
		code: "PH",
		stateName: "Philippines"
	},
	{
		code: "PN",
		stateName: "Pitcairn"
	},
	{
		code: "PL",
		stateName: "Poland"
	},
	{
		code: "PT",
		stateName: "Portugal"
	},
	{
		code: "PR",
		stateName: "Puerto Rico"
	},
	{
		code: "QA",
		stateName: "Qatar"
	},
	{
		code: "RO",
		stateName: "Romania"
	},
	{
		code: "RU",
		stateName: "Russian Federation"
	},
	{
		code: "RW",
		stateName: "Rwanda"
	},
	{
		code: "RE",
		stateName: "Réunion"
	},
	{
		code: "BL",
		stateName: "Saint Barthélemy"
	},
	{
		code: "SH",
		stateName: "Saint Helena, Ascension and Tristan da Cunha"
	},
	{
		code: "KN",
		stateName: "Saint Kitts and Nevis"
	},
	{
		code: "LC",
		stateName: "Saint Lucia"
	},
	{
		code: "MF",
		stateName: "Saint Martin, (French part)"
	},
	{
		code: "PM",
		stateName: "Saint Pierre and Miquelon"
	},
	{
		code: "VC",
		stateName: "Saint Vincent and the Grenadines"
	},
	{
		code: "WS",
		stateName: "Samoa"
	},
	{
		code: "SM",
		stateName: "San Marino"
	},
	{
		code: "ST",
		stateName: "Sao Tome and Principe"
	},
	{
		code: "SA",
		stateName: "Saudi Arabia"
	},
	{
		code: "SN",
		stateName: "Senegal"
	},
	{
		code: "RS",
		stateName: "Serbia"
	},
	{
		code: "SC",
		stateName: "Seychelles"
	},
	{
		code: "SL",
		stateName: "Sierra Leone"
	},
	{
		code: "SG",
		stateName: "Singapore"
	},
	{
		code: "SX",
		stateName: "Sint Maarten, (Dutch part)"
	},
	{
		code: "SK",
		stateName: "Slovakia"
	},
	{
		code: "SI",
		stateName: "Slovenia"
	},
	{
		code: "SB",
		stateName: "Solomon Islands"
	},
	{
		code: "SO",
		stateName: "Somalia"
	},
	{
		code: "ZA",
		stateName: "South Africa"
	},
	{
		code: "GS",
		stateName: "South Georgia and the South Sandwich Islands"
	},
	{
		code: "SS",
		stateName: "South Sudan"
	},
	{
		code: "ES",
		stateName: "Spain"
	},
	{
		code: "LK",
		stateName: "Sri Lanka"
	},
	{
		code: "SD",
		stateName: "Sudan"
	},
	{
		code: "SR",
		stateName: "Suriname"
	},
	{
		code: "SJ",
		stateName: "Svalbard and Jan Mayen"
	},
	{
		code: "SE",
		stateName: "Sweden"
	},
	{
		code: "CH",
		stateName: "Switzerland"
	},
	{
		code: "SY",
		stateName: "Syrian Arab Republic"
	},
	{
		code: "TW",
		stateName: "Taiwan, Province of China"
	},
	{
		code: "TJ",
		stateName: "Tajikistan"
	},
	{
		code: "TZ",
		stateName: "Tanzania, United Republic of"
	},
	{
		code: "TH",
		stateName: "Thailand"
	},
	{
		code: "TL",
		stateName: "Timor-Leste"
	},
	{
		code: "TG",
		stateName: "Togo"
	},
	{
		code: "TK",
		stateName: "Tokelau"
	},
	{
		code: "TO",
		stateName: "Tonga"
	},
	{
		code: "TT",
		stateName: "Trinidad and Tobago"
	},
	{
		code: "TN",
		stateName: "Tunisia"
	},
	{
		code: "TR",
		stateName: "Turkey"
	},
	{
		code: "TM",
		stateName: "Turkmenistan"
	},
	{
		code: "TC",
		stateName: "Turks and Caicos Islands"
	},
	{
		code: "TV",
		stateName: "Tuvalu"
	},
	{
		code: "UG",
		stateName: "Uganda"
	},
	{
		code: "UA",
		stateName: "Ukraine"
	},
	{
		code: "AE",
		stateName: "United Arab Emirates"
	},
	{
		code: "GB",
		stateName: "United Kingdom of Great Britain and Northern Ireland"
	},
	{
		code: "UM",
		stateName: "United States Minor Outlying Islands"
	},
	{
		code: "US",
		stateName: "United States of America"
	},
	{
		code: "UY",
		stateName: "Uruguay"
	},
	{
		code: "UZ",
		stateName: "Uzbekistan"
	},
	{
		code: "VU",
		stateName: "Vanuatu"
	},
	{
		code: "VE",
		stateName: "Venezuela, Bolivarian Republic of"
	},
	{
		code: "VN",
		stateName: "Viet Nam"
	},
	{
		code: "VG",
		stateName: "Virgin Islands, British"
	},
	{
		code: "VI",
		stateName: "Virgin Islands, U.S."
	},
	{
		code: "WF",
		stateName: "Wallis and Futuna"
	},
	{
		code: "EH",
		stateName: "Western Sahara"
	},
	{
		code: "YE",
		stateName: "Yemen"
	},
	{
		code: "ZM",
		stateName: "Zambia"
	},
	{
		code: "ZW",
		stateName: "Zimbabwe"
	},
	{
		code: "AX",
		stateName: "Åland Islands"
	}
],

  specialties: [
    "Airlines/Aviation",
    "Alternative Dispute Resolution",
    "Alternative Medicine",
    "Animation",
    "Apparel & Fashion",
    "Architecture & Planning",
    "Arts and Crafts",
    "Automotive",
    "Aviation & Aerospace",
    "Banking",
    "Biotechnology",
    "Broadcast Media",
    "Building Materials",
    "Business",
    "Business Administration",
    "Business Supplies and Equipment",
    "Capital Markets",
    "Chemicals",
    "Civic & Social Organization",
    "Civil Engineering",
    "Commercial Real Estate",
    "Computer & Network Security",
    "Computer Science",
    "Computer Games",
    "Computer Hardware",
    "Computer Networking",
    "Computer Software",
    "Construction",
    "Consumer Electronics",
    "Consumer Goods",
    "Consumer Services",
    "Cosmetics",
    "Creative Director and Designer",
    "Dairy",
    "Defense & Space",
    "Design",
    "Education",
    "E-Learning",
    "Electrical/Electronic Manufacturing",
    "Entertainment",
    "Entrepreneur",
    "Environmental Services",
    "Events Services",
    "Executive Office",
    "Facilities Services",
    "Farming",
    "Finance",
    "Financial Services",
    "Fine Art",
    "Fishery",
    "Food & Beverages",
    "Food Production",
    "Fund-Raising",
    "Furniture",
    "Gambling & Casinos",
    "Glass, Ceramics & Concrete",
    "Government Administration",
    "Government Relations",
    "Graphic Design",
    "Health, Wellness and Fitness",
    "Higher Education",
    "Hospital & Health Care",
    "Hospitality",
    "Human Resources",
    "Import and Export",
    "Individual & Family Services",
    "Industrial Automation",
    "Information Services",
    "Information Technology and Services",
    "Insurance",
    "International Affairs",
    "International Trade and Development",
    "Internet",
    "Investment Banking",
    "Investment Management",
    "Judiciary",
    "Law Enforcement",
    "Law Practice",
    "Legal Services",
    "Legislative Office",
    "Leisure, Travel & Tourism",
    "Libraries",
    "Logistics and Supply Chain",
    "Jewelry",
    "Machinery",
    "Management Consulting",
    "Maritime",
    "Market Research",
    "Marketing and Advertising",
    "Mechanical or Industrial Engineering",
    "Media",
    "Media Production",
    "Medical Devices",
    "Medical Practice",
    "Mental Health Care",
    "Military",
    "Mining & Metals",
    "Motion Pictures and Film",
    "Museums and Institutions",
    "Music",
    "Nanotechnology",
    "Newspapers",
    "Non-Profit Organization Management",
    "Oil & Energy",
    "Online Media",
    "Outsourcing/Offshoring",
    "Package/Freight Delivery",
    "Packaging and Containers",
    "Paper & Forest Products",
    "Performing Arts",
    "Pharmaceuticals",
    "Philanthropy",
    "Photography",
    "Plastics",
    "Political Organization",
    "Portuguese Community",
    "Primary/Secondary Education",
    "Printing",
    "Professional Training & Coaching",
    "Professor",
    "Program Development",
    "Public Policy",
    "Public Relations and Communications",
    "Public Safety",
    "Publishing",
    "Railroad Manufacture",
    "Ranching",
    "Real Estate",
    "Recreational Facilities and Services",
    "Religious Institutions",
    "Renewables & Environment",
    "Research",
    "Restaurants",
    "Retail",
    "Security and Investigations",
    "Semiconductors",
    "Shipbuilding",
    "Social Media",
    "Speaker",
    "Sporting Goods",
    "Sports",
    "Staffing and Recruiting",
    "Supermarkets",
    "Telecommunications",
    "Textiles",
    "Think Tanks",
    "Tobacco",
    "Translation and Localization",
    "Transportation/Trucking/Railroad",
    "Utilities",
    "Venture Capital & Private Equity",
    "Veterinary",
    "Warehousing",
    "Wholesale",
    "Wine and Spirits",
    "Wireless",
    "Writing and Editing"
  ]
};

export default listsData;
