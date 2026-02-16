document.addEventListener('DOMContentLoaded', () => {
    // Lazy Loader Logic
    const loader = document.querySelector('.lazy-loader');
    if (loader) {
        setTimeout(() => {
            loader.setAttribute('hidden', '');
        }, 500);
    }

    // Application Data
    const appData = {
        salaryHis: 0,
        salaryHer: 0,
        ratioHis: 0.5,
        ratioHer: 0.5,
        propertyPrice: 0,
        depositPercentage: 0,
        depositSplitProportional: true,
        totalEquity: 0,
        mortgageRequired: 0,
        equityHis: 0,
        equityHer: 0,
        waterBill: 0,
        broadbandCost: 0,
        groceriesCost: 0,
        childcareCost: 0,
        insuranceCost: 0,
        otherSharedCosts: 0,
        mortgageInterestRate: 0,
        mortgageTerm: 0,
        monthlyMortgagePayment: 0,
        postcode: '',
        isNorth: false,
        regionCode: 'EN', // EN, SC, WA, NI
        band: '',
        beds: 0,
        baths: 0,
        homeType: 'first',
        isFTB: false, // First Time Buyer
        // Individual split preferences
        splitTypes: {
            councilTax: 'yes',
            energy: 'yes',
            water: 'yes',
            broadband: 'yes',
            groceries: 'yes',
            childcare: 'yes',
            insurance: 'yes',
            otherShared: 'yes'
        }
    };

    // DOM Elements Cache
    const elements = {
        salaryHis: document.getElementById('salaryHis'),
        salaryHer: document.getElementById('salaryHer'),
        postcode: document.getElementById('postcode'),
        propertyPrice: document.getElementById('propertyPrice'),
        bedrooms: document.getElementById('bedrooms'),
        bathrooms: document.getElementById('bathrooms'),
        councilTaxCost: document.getElementById('councilTaxCost'),
        energyCost: document.getElementById('energyCost'),
        waterBill: document.getElementById('waterBill'),
        broadbandCost: document.getElementById('broadbandCost'),
        groceriesCost: document.getElementById('groceriesCost'),
        childcareCost: document.getElementById('childcareCost'),
        insuranceCost: document.getElementById('insuranceCost'),
        otherSharedCosts: document.getElementById('otherSharedCosts'),
        depositPercentage: document.getElementById('depositPercentage'),
        mortgageInterestRate: document.getElementById('mortgageInterestRate'),
        mortgageTerm: document.getElementById('mortgageTerm'),
        estimatePriceBtn: document.getElementById('estimatePriceBtn'),
        backButton: document.getElementById('back-button'),
        nextButton: document.getElementById('next-button'),
        progressBar: document.getElementById('app-progress'),
        progressLabel: document.getElementById('progress-text-alt'),
        propertyPriceDisplay: document.getElementById('propertyPrice-estimate-display'),
        estimatedPriceValue: document.getElementById('estimatedPriceValue'),
        postcodeError: document.getElementById('postcode-error'),
        regionAnnouncement: document.getElementById('region-announcement'),
        sdltEstimate: document.getElementById('sdlt-estimate'),
        legalFeesEstimate: document.getElementById('legal-fees-estimate'),
        totalEquityDisplay: document.getElementById('totalEquityDisplay'),
        mortgageRequiredDisplay: document.getElementById('mortgageRequiredDisplay'),
        equityHisDisplay: document.getElementById('equityHisDisplay'),
        equityHerDisplay: document.getElementById('equityHerDisplay'),
        bandPriceDisplay: document.getElementById('band-price-display'),
        barHis: document.getElementById('bar-his'),
        barHer: document.getElementById('bar-her'),
        ratioTextDesc: document.getElementById('ratio-text-desc'),
        resultsTable: document.getElementById('results-table'),
        displayPropertyPrice: document.getElementById('displayPropertyPrice'),
        
        // Errors
        salaryHisError: document.getElementById('salaryHis-error'),
        salaryHerError: document.getElementById('salaryHer-error'),
        taxBandError: document.getElementById('taxBand-error'),
        propertyPriceError: document.getElementById('propertyPrice-error'),
        bedroomsError: document.getElementById('bedrooms-error'),
        bathroomsError: document.getElementById('bathrooms-error'),
        depositPercentageError: document.getElementById('depositPercentage-error'),
        mortgageInterestRateError: document.getElementById('mortgageInterestRate-error'),
        mortgageTermError: document.getElementById('mortgageTerm-error'),
        councilTaxCostError: document.getElementById('councilTaxCost-error'),
        energyCostError: document.getElementById('energyCost-error'),
        waterBillError: document.getElementById('waterBill-error'),
        broadbandError: document.getElementById('broadband-error'),
        groceriesError: document.getElementById('groceries-error'),
        childcareError: document.getElementById('childcare-error'),
        insuranceError: document.getElementById('insurance-error'),
        otherError: document.getElementById('other-error'),

        // Results
        resultHis: document.getElementById('result-his'),
        resultHer: document.getElementById('result-her'),
        totalBillDisplay: document.getElementById('total-bill-display'),
        resultSummary: document.getElementById('result-summary'),
        calculationWorkings: document.getElementById('calculation-workings'),
        breakdownSummary: document.getElementById('breakdown-summary'),
        
        // Breakdown Table (Prefix: bd-)
        bdMortgageTotal: document.getElementById('bd-mortgage-total'),
        bdMortgageHis: document.getElementById('bd-mortgage-his'),
        bdMortgageHer: document.getElementById('bd-mortgage-her'),
        bdTaxTotal: document.getElementById('bd-tax-total'),
        bdTaxHis: document.getElementById('bd-tax-his'),
        bdTaxHer: document.getElementById('bd-tax-her'),
        bdEnergyTotal: document.getElementById('bd-energy-total'),
        bdEnergyHis: document.getElementById('bd-energy-his'),
        bdEnergyHer: document.getElementById('bd-energy-her'),
        bdWaterTotal: document.getElementById('bd-water-total'),
        bdWaterHis: document.getElementById('bd-water-his'),
        bdWaterHer: document.getElementById('bd-water-her'),
        bdBroadbandTotal: document.getElementById('bd-broadband-total'),
        bdBroadbandHis: document.getElementById('bd-broadband-his'),
        bdBroadbandHer: document.getElementById('bd-broadband-her'),
        bdGroceriesTotal: document.getElementById('bd-groceries-total'),
        bdGroceriesHis: document.getElementById('bd-groceries-his'),
        bdGroceriesHer: document.getElementById('bd-groceries-her'),
        bdCommittedTotal: document.getElementById('bd-committed-total'),
        bdCommittedHis: document.getElementById('bd-committed-his'),
        bdCommittedHer: document.getElementById('bd-committed-her'),
        bdTotalTotal: document.getElementById('bd-total-total'),
        bdTotalHis: document.getElementById('bd-total-his'),
        bdTotalHer: document.getElementById('bd-total-her')
    };

    const FORM_FIELDS = [
        { id: 'salaryHis', type: 'number' },
        { id: 'salaryHer', type: 'number' },
        { id: 'postcode', type: 'text' },
        { id: 'propertyPrice', type: 'number' },
        { id: 'bedrooms', type: 'number', key: 'beds' },
        { id: 'bathrooms', type: 'number', key: 'baths' },
        { id: 'councilTaxCost', type: 'number' },
        { id: 'energyCost', type: 'number' },
        { id: 'waterBill', type: 'number' },
        { id: 'broadbandCost', type: 'number' },
        { id: 'groceriesCost', type: 'number' },
        { id: 'childcareCost', type: 'number' },
        { id: 'insuranceCost', type: 'number' },
        { id: 'otherSharedCosts', type: 'number' },
        { id: 'depositPercentage', type: 'number' },
        { id: 'mortgageInterestRate', type: 'number' },
        { id: 'mortgageTerm', type: 'number' }
    ];

    const bandPrices = { 'A': 110, 'B': 128, 'C': 146, 'D': 165, 'E': 201, 'F': 238, 'G': 275, 'H': 330 };
    const CACHE_KEY = 'his_and_hers_cache';
    const SCREENS = {
        LANDING: 'screen-1',
        INCOME: 'screen-2',
        PROPERTY: 'screen-3',
        MORTGAGE: 'screen-4',
        UTILITIES: 'screen-5',
        COMMITTED: 'screen-6',
        RESULTS: 'screen-7'
    };

    // --- Core Functions ---

    const formatCurrency = (num, decimals = 0) => {
        return '£' + num.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    };

    function saveToCache() {
        const inputs = {};
        
        // Standard Fields
        FORM_FIELDS.forEach(field => {
            if (elements[field.id]) {
                inputs[field.id] = elements[field.id].value;
            }
        });

        // Radio Groups
        Object.keys(appData.splitTypes).forEach(key => {
            const radio = document.querySelector(`input[name="${key}SplitType"]:checked`);
            if (radio) inputs[`${key}SplitType`] = radio.value;
        });

        // Other Radios
        const taxBand = document.querySelector('input[name="taxBand"]:checked');
        if (taxBand) inputs.taxBand = taxBand.value;

        const homeType = document.querySelector('input[name="homeType"]:checked');
        if (homeType) inputs.homeType = homeType.value;

        const buyerStatus = document.querySelector('input[name="buyerStatus"]:checked');
        if (buyerStatus) inputs.buyerStatus = buyerStatus.value;

        const depositSplit = document.querySelector('input[name="depositSplitType"]:checked');
        if (depositSplit) inputs.depositSplitType = depositSplit.value;

        localStorage.setItem(CACHE_KEY, JSON.stringify(inputs));
    }

    function loadFromCache() {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) {
            // Initial visibility check if no cache
            const ftbContainer = document.getElementById('ftb-container');
            if (ftbContainer) {
                 if (appData.homeType === 'first') ftbContainer.removeAttribute('hidden');
                 else ftbContainer.setAttribute('hidden', '');
            }
            return;
        }

        const inputs = JSON.parse(cached);
        
        // Restore Standard Fields
        for (const [id, value] of Object.entries(inputs)) {
            if (elements[id]) {
                elements[id].value = value;
            } else {
                // Restore Radios
                if (id.endsWith('SplitType')) {
                    const radio = document.querySelector(`input[name="${id}"][value="${value}"]`);
                    if (radio) radio.checked = true;
                    
                    const dataKey = id.replace('SplitType', '');
                    if (appData.splitTypes.hasOwnProperty(dataKey)) {
                        appData.splitTypes[dataKey] = value;
                    }
                } else if (id === 'taxBand' || id === 'homeType' || id === 'depositSplitType' || id === 'buyerStatus') {
                    const radio = document.querySelector(`input[name="${id}"][value="${value}"]`);
                    if (radio) radio.checked = true;
                    if (id === 'taxBand') updatePricePreview(value);
                }
            }
        }
        
        // Sync App Data from restored fields
        FORM_FIELDS.forEach(field => {
            const val = elements[field.id].value;
            const key = field.key || field.id;
            
            if (appData.hasOwnProperty(key)) {
                if (field.type === 'number') {
                    appData[key] = parseFloat(val) || 0;
                } else {
                    appData[key] = val;
                }
            }
        });

        // Derived Data
        const total = appData.salaryHis + appData.salaryHer;
        if (total > 0) {
            appData.ratioHis = appData.salaryHis / total;
            appData.ratioHer = appData.salaryHer / total;
        }
        appData.band = inputs.taxBand || '';
        appData.depositSplitProportional = inputs.depositSplitType === 'yes';
        if (inputs.homeType) appData.homeType = inputs.homeType;
        if (inputs.buyerStatus) appData.isFTB = inputs.buyerStatus === 'ftb';
        
        if (appData.propertyPrice > 0) {
            updatePropertyPriceDisplay(appData.propertyPrice, false);
        }
        
        checkRegion(); 
        
        const ftbContainer = document.getElementById('ftb-container');
        if (ftbContainer) {
             if (appData.homeType === 'first') ftbContainer.removeAttribute('hidden');
             else ftbContainer.setAttribute('hidden', '');
        }
    }

    window.setAllSplitTypes = function(screen, type) {
        const groups = screen === 'utilities' 
            ? ['councilTax', 'energy', 'water', 'broadband'] 
            : ['groceries', 'childcare', 'insurance', 'otherShared'];
        
        groups.forEach(group => {
            const radio = document.querySelector(`input[name="${group}SplitType"][value="${type}"]`);
            if (radio) radio.checked = true;
            appData.splitTypes[group] = type;
        });
        saveToCache();
    };

    function formatPostcode(input) {
        let value = input.value.replace(/\s+/g, '').toUpperCase();
        if (value.length > 3) {
            const incode = value.slice(-3);
            const outcode = value.slice(0, -3);
            input.value = outcode + ' ' + incode;
        } else {
            input.value = value;
        }
    }

    function updatePropertyPriceDisplay(price, isEstimated) {
        const display = elements.propertyPriceDisplay;
        if (!display) return;

        if (price > 0) {
            const labelText = isEstimated ? 'Using estimated market price: ' : 'Using manual market price: ';
            display.innerHTML = `${labelText}<span id="estimatedPriceValue">${formatCurrency(price)}</span>`;
            display.removeAttribute('hidden');
        } else {
            display.setAttribute('hidden', '');
        }
    }

    function isValidPostcode(postcode) {
        const postcodeRegEx = /^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i;
        return postcodeRegEx.test(postcode);
    }

    const REGIONS = {
        NI: { name: 'Northern Ireland', prefixes: ['BT'], cost: 0, code: 'NI' },
        SCOTLAND: { name: 'Scotland', prefixes: ['AB', 'DD', 'DG', 'EH', 'FK', 'G', 'HS', 'IV', 'KA', 'KW', 'KY', 'ML', 'PA', 'PH', 'TD', 'ZE'], cost: 42, code: 'SC' },
        WALES: { name: 'Wales', prefixes: ['CF', 'LD', 'LL', 'NP', 'SA', 'SY'], cost: 55, code: 'WA' },
        SOUTH_WEST: { name: 'South West', prefixes: ['BA', 'BH', 'BS', 'DT', 'EX', 'PL', 'SN', 'SP', 'TA', 'TQ', 'TR'], cost: 62, code: 'EN' },
        SOUTH: { name: 'South', prefixes: ['BN', 'CT', 'GU', 'ME', 'OX', 'PO', 'RG', 'RH', 'SL', 'TN'], cost: 58, code: 'EN' },
        LONDON: { name: 'London', prefixes: ['E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC', 'BR', 'CR', 'DA', 'EN', 'HA', 'IG', 'KT', 'RM', 'SM', 'TW', 'UB', 'WD'], cost: 54, code: 'EN' },
        EAST: { name: 'East of England', prefixes: ['AL', 'CB', 'CM', 'CO', 'EN', 'HP', 'IP', 'LU', 'NR', 'RM', 'SG', 'SS'], cost: 52, code: 'EN' },
        MIDLANDS: { name: 'Midlands', prefixes: ['B', 'CV', 'DE', 'DY', 'HR', 'LE', 'LN', 'NG', 'NN', 'ST', 'SY', 'TF', 'WR', 'WS', 'WV'], cost: 48, code: 'EN' },
        NORTH: { name: 'North of England', prefixes: ['BB', 'BD', 'BL', 'CA', 'CH', 'CW', 'DH', 'DL', 'DN', 'FY', 'HD', 'HG', 'HU', 'HX', 'L', 'LA', 'LS', 'M', 'NE', 'OL', 'PR', 'S', 'SK', 'SR', 'TS', 'WA', 'WF', 'WN', 'YO'], cost: 45, code: 'EN' }
    };

    function getRegionFromPostcode(postcode) {
        const pc = postcode.trim().toUpperCase();
        if (!pc) return null;
        const prefix2 = pc.substring(0, 2);
        const prefix1 = pc.substring(0, 1);

        for (const regionKey in REGIONS) {
            if (REGIONS[regionKey].prefixes.some(p => prefix2.startsWith(p) || (p.length === 1 && prefix1 === p))) {
                return regionKey;
            }
        }
        return null;
    }

    function checkRegion() {
        const postcodeInput = elements.postcode;
        formatPostcode(postcodeInput);
        const pc = postcodeInput.value.trim().toUpperCase();

        if (pc.length > 0 && !isValidPostcode(pc)) {
            elements.postcodeError.removeAttribute('hidden');
            return;
        } else {
            elements.postcodeError.setAttribute('hidden', '');
        }

        appData.postcode = pc;
        const regionKey = getRegionFromPostcode(pc);
        const northernRegions = ['NORTH', 'MIDLANDS', 'WALES', 'SCOTLAND'];

        const announceDiv = elements.regionAnnouncement;
        if (regionKey) {
            const regionName = REGIONS[regionKey].name;
            appData.regionCode = REGIONS[regionKey].code;
            if (northernRegions.includes(regionKey)) {
                appData.isNorth = true;
                announceDiv.innerText = `${regionName} region detected. Heating estimates adjusted.`;
            } else {
                appData.isNorth = false;
                announceDiv.innerText = `${regionName} region detected.`;
            }
        } else if (pc.length > 0) {
            appData.isNorth = false;
            appData.regionCode = 'EN'; // Default
            announceDiv.innerText = "Region could not be determined.";
        } else {
            announceDiv.innerText = "";
        }
    }

    async function getEstimatedPropertyPrice(postcode) {
        const sparqlQuery = `
            PREFIX lrppi: <http://landregistry.data.gov.uk/def/ppi/>
            PREFIX lrcommon: <http://landregistry.data.gov.uk/def/common/>
            SELECT ?amount WHERE {
                ?addr lrcommon:postcode "${postcode}" .
                ?transx lrppi:propertyAddress ?addr ;
                        lrppi:pricePaid ?amount .
            } LIMIT 10
        `;
        const endpointUrl = 'https://landregistry.data.gov.uk/landregistry/query';
        const url = `${endpointUrl}?query=${encodeURIComponent(sparqlQuery)}`;

        hideWarning(3);

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Accept': 'application/sparql-results+json' }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            const bindings = data.results.bindings;
            if (bindings.length === 0) throw new Error("No data found");

            const total = bindings.reduce((acc, curr) => acc + parseInt(curr.amount.value), 0);
            const average = total / bindings.length;
            return Math.round(average / 1000) * 1000;
        } catch (error) {
            showWarning(3, "We couldn't fetch live market data, so we've provided a local estimate.");
            const postcodePrefix = postcode.charAt(0);
            const beds = parseInt(elements.bedrooms.value) || 2;
            let basePrice = 250000; 
            if (['L', 'M', 'B', 'S', 'N', 'G'].includes(postcodePrefix)) basePrice = 180000; 
            else if (['W', 'E'].includes(postcodePrefix) || postcode.startsWith('SW') || postcode.startsWith('SE')) basePrice = 450000; 
            basePrice += ((beds - 2) * 35000);
            return Math.max(50000, Math.round(basePrice / 1000) * 1000);
        }
    }

    function calculateStampDuty(price, region, homeType, isFTB) {
        if (price <= 0) return 0;
        let tax = 0;
        const isAdditional = homeType === 'second';

        if (region === 'SC') { // Scotland (LBTT)
            if (isAdditional) {
                // ADS 8% on total price if >= £40k
                if (price >= 40000) tax += price * 0.08;
                
                // Standard LBTT Rates
                if (price > 750000) tax += (145000 * 0) + (105000 * 0.02) + (75000 * 0.05) + (425000 * 0.10) + ((price - 750000) * 0.12);
                else if (price > 325000) tax += (145000 * 0) + (105000 * 0.02) + (75000 * 0.05) + ((price - 325000) * 0.10);
                else if (price > 250000) tax += (145000 * 0) + (105000 * 0.02) + ((price - 250000) * 0.05);
                else if (price > 145000) tax += (price - 145000) * 0.02;
            } else {
                // Standard Rates first
                if (price > 750000) tax += (145000 * 0) + (105000 * 0.02) + (75000 * 0.05) + (425000 * 0.10) + ((price - 750000) * 0.12);
                else if (price > 325000) tax += (145000 * 0) + (105000 * 0.02) + (75000 * 0.05) + ((price - 325000) * 0.10);
                else if (price > 250000) tax += (145000 * 0) + (105000 * 0.02) + ((price - 250000) * 0.05);
                else if (price > 145000) tax += (price - 145000) * 0.02;

                // FTB Relief: 0% up to £175k (Save up to £600)
                if (isFTB) {
                    const relief = 600;
                    if (tax < relief) tax = 0;
                    else tax -= relief;
                }
            }
        } else if (region === 'WA') { // Wales (LTT)
            const surcharge = isAdditional ? 0.05 : 0;
            // Bands: 0-225, 225-400, 400-750, 750-1.5m, 1.5m+
            if (price > 1500000) tax += (225000 * (0 + surcharge)) + (175000 * (0.06 + surcharge)) + (350000 * (0.075 + surcharge)) + (750000 * (0.10 + surcharge)) + ((price - 1500000) * (0.12 + surcharge));
            else if (price > 750000) tax += (225000 * (0 + surcharge)) + (175000 * (0.06 + surcharge)) + (350000 * (0.075 + surcharge)) + ((price - 750000) * (0.10 + surcharge));
            else if (price > 400000) tax += (225000 * (0 + surcharge)) + (175000 * (0.06 + surcharge)) + ((price - 400000) * (0.075 + surcharge));
            else if (price > 225000) tax += (225000 * (0 + surcharge)) + ((price - 225000) * (0.06 + surcharge));
            else tax += price * surcharge;

            if (isAdditional && price < 40000) tax = 0;
        } else { // England & NI (SDLT)
            const surcharge = isAdditional ? 0.05 : 0;
            
            if (isFTB && !isAdditional) {
                if (price <= 500000) {
                    if (price > 300000) tax = (price - 300000) * 0.05;
                    else tax = 0;
                    return tax;
                }
            }
            
            if (price > 1500000) tax += (125000 * (0 + surcharge)) + (125000 * (0.02 + surcharge)) + (675000 * (0.05 + surcharge)) + (575000 * (0.10 + surcharge)) + ((price - 1500000) * (0.12 + surcharge));
            else if (price > 925000) tax += (125000 * (0 + surcharge)) + (125000 * (0.02 + surcharge)) + (675000 * (0.05 + surcharge)) + ((price - 925000) * (0.10 + surcharge));
            else if (price > 250000) tax += (125000 * (0 + surcharge)) + (125000 * (0.02 + surcharge)) + ((price - 250000) * (0.05 + surcharge));
            else if (price > 125000) tax += (125000 * (0 + surcharge)) + ((price - 125000) * (0.02 + surcharge));
            else tax += price * surcharge;

            if (isAdditional && price < 40000) tax = 0;
        }
        return Math.floor(tax);
    }

    function calculateEquityDetails() {
        const propertyPrice = appData.propertyPrice;
        let depositPercentage = appData.depositPercentage;
        
        // Validation of appData state (clamping)
        if (depositPercentage > 100) {
            depositPercentage = 100;
            appData.depositPercentage = 100;
            elements.depositPercentage.value = 100;
        } else if (depositPercentage < 0) {
            depositPercentage = 0;
            appData.depositPercentage = 0;
            elements.depositPercentage.value = 0;
        }

        if (isNaN(propertyPrice) || propertyPrice <= 0) return;

        appData.totalEquity = propertyPrice * (depositPercentage / 100);
        appData.mortgageRequired = propertyPrice - appData.totalEquity;
        
        // SDLT Calculation (Region & FTB aware)
        const sdlt = calculateStampDuty(propertyPrice, appData.regionCode, appData.homeType, appData.isFTB);

        // Legal Fees Estimate
        let legalFees = 1200; // Base fee
        if (propertyPrice > 500000) legalFees = 1800;
        if (propertyPrice > 1000000) legalFees = 2500;

        const sdltEl = elements.sdltEstimate;
        const legalEl = elements.legalFeesEstimate;
        if (sdltEl) sdltEl.value = sdlt.toLocaleString();
        if (legalEl) legalEl.value = legalFees.toLocaleString();

        if (appData.depositSplitProportional) {
            appData.equityHis = appData.totalEquity * appData.ratioHis;
            appData.equityHer = appData.totalEquity * appData.ratioHer;
        } else {
            appData.equityHis = appData.totalEquity * 0.5;
            appData.equityHer = appData.totalEquity * 0.5;
        }

        elements.totalEquityDisplay.innerText = formatCurrency(appData.totalEquity);
        elements.mortgageRequiredDisplay.innerText = formatCurrency(appData.mortgageRequired);
        elements.equityHisDisplay.innerText = formatCurrency(appData.equityHis);
        elements.equityHerDisplay.innerText = formatCurrency(appData.equityHer);
    }

    function calculateMonthlyMortgage() {
        const principal = appData.mortgageRequired;
        const annualRate = appData.mortgageInterestRate;
        const termYears = appData.mortgageTerm;

        if (isNaN(principal) || principal <= 0 || isNaN(annualRate) || annualRate <= 0 || isNaN(termYears) || termYears <= 0) {
            appData.monthlyMortgagePayment = 0;
            return;
        }
        const monthlyRate = (annualRate / 100) / 12;
        const numberOfPayments = termYears * 12;
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        appData.monthlyMortgagePayment = monthlyPayment;
    }

    function updatePricePreview(band) {
        appData.band = band;
        const cost = bandPrices[band];
        const display = elements.bandPriceDisplay;
        const icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>`;
        display.innerHTML = `${icon} <span>Band ${band} selected. Estimated cost: ${formatCurrency(cost)} per month.</span>`;
    }

    function updateRatioBar() {
        const hP = Math.round(appData.ratioHis * 100);
        const sP = Math.round(appData.ratioHer * 100);
        elements.barHis.style.width = hP + '%';
        elements.barHis.innerText = hP + '%';
        elements.barHer.style.width = sP + '%';
        elements.barHer.innerText = sP + '%';
        elements.ratioTextDesc.innerText = `Income ratio is ${hP}% Person A and ${sP}% Person B.`;
    }

    function estimateWaterCost(postcode, bathrooms) {
        const regionKey = getRegionFromPostcode(postcode);
        let baseCost = 50; // Default cost
        if (regionKey && REGIONS[regionKey]) {
            baseCost = REGIONS[regionKey].cost;
        }
        return baseCost + (Math.max(0, bathrooms - 1) * 5);
    }

    function populateEstimates() {
        elements.councilTaxCost.value = bandPrices[appData.band];
        let energy = 40 + (appData.beds * 25) + (appData.baths * 15);
        if (appData.isNorth) energy *= 1.1;
        if (['E','F','G','H'].includes(appData.band)) energy *= 1.15;
        elements.energyCost.value = Math.round(energy);
        elements.waterBill.value = Math.round(estimateWaterCost(appData.postcode, appData.baths));
        appData.waterBill = parseFloat(elements.waterBill.value) || 0;
        appData.mortgageInterestRate = parseFloat(elements.mortgageInterestRate.value) || 0;
        appData.mortgageTerm = parseFloat(elements.mortgageTerm.value) || 0;
        calculateMonthlyMortgage();
    }

    function hideWarning(screenNum) {
        const warnDiv = document.getElementById(`warning-screen-${screenNum}`);
        if (warnDiv) warnDiv.setAttribute('hidden', '');
    }

    function showWarning(screenNum, msg) {
        const warnDiv = document.getElementById(`warning-screen-${screenNum}`);
        if (!warnDiv) return;
        const icon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>`;
        warnDiv.innerHTML = `${icon} <span>${msg}</span>`;
        warnDiv.removeAttribute('hidden');
    }

    // --- Window Exposed Functions ---

    window.downloadCSV = function() {
        const table = elements.resultsTable;
        let csv = [];
        const rows = table.querySelectorAll('tr');
        
        for (let i = 0; i < rows.length; i++) {
            const row = [], cols = rows[i].querySelectorAll('td, th');
            for (let j = 0; j < cols.length; j++) {
                // Clean currency symbols and commas for CSV
                let data = cols[j].innerText.replace(/£/g, '').replace(/,/g, '');
                row.push('"' + data + '"');
            }
            csv.push(row.join(','));
        }

        const csvContent = "data:text/csv;charset=utf-8," + csv.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "HisAndHers_FairShare_Breakdown.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function updatePagination(screenId) {
        const backButton = elements.backButton;
        const nextButton = elements.nextButton;
        
        const screenConfig = {
            [SCREENS.LANDING]: { back: null, next: () => switchScreen(SCREENS.INCOME), nextText: 'Get Started' },
            [SCREENS.INCOME]: { back: () => switchScreen(SCREENS.LANDING), next: validateAndNext1 },
            [SCREENS.PROPERTY]: { back: () => switchScreen(SCREENS.INCOME), next: validateAndNext2 },
            [SCREENS.MORTGAGE]: { back: () => switchScreen(SCREENS.PROPERTY), next: validateAndNextMortgage },
            [SCREENS.UTILITIES]: { back: () => switchScreen(SCREENS.MORTGAGE), next: validateAndNext3 },
            [SCREENS.COMMITTED]: { back: () => switchScreen(SCREENS.UTILITIES), next: validateAndNextCommitted, nextText: 'Calculate' },
            [SCREENS.RESULTS]: { back: () => switchScreen(SCREENS.COMMITTED), next: clearCacheAndReload, nextText: 'Start Over' }
        };

        const config = screenConfig[screenId];
        if (!config) return;

        if (config.back) {
            backButton.onclick = config.back;
            backButton.style.display = 'block';
        } else {
            backButton.style.display = 'none';
        }

        if (config.next) {
            nextButton.onclick = config.next;
            nextButton.innerText = config.nextText || 'Next';
            nextButton.style.display = 'block';
        } else {
            nextButton.style.display = 'none';
        }
    }

    window.switchScreen = function(id) {
        saveToCache();
        document.querySelectorAll('main section').forEach(el => el.setAttribute('hidden', ''));
        const target = document.getElementById(id);
        target.removeAttribute('hidden');
        
        // Scroll to the main heading of the new screen
        const heading = target.querySelector('h2');
        if (heading) {
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        target.focus();

        const progressMap = {
            [SCREENS.LANDING]: { p: 0, text: 'Step 1 of 7: Welcome' },
            [SCREENS.INCOME]: { p: 15, text: 'Step 2 of 7: Income' },
            [SCREENS.PROPERTY]: { p: 30, text: 'Step 3 of 7: Property' },
            [SCREENS.MORTGAGE]: { p: 45, text: 'Step 4 of 7: Mortgage & Equity' },
            [SCREENS.UTILITIES]: { p: 60, text: 'Step 5 of 7: Utilities' },
            [SCREENS.COMMITTED]: { p: 80, text: 'Step 6 of 7: Committed Spending' },
            [SCREENS.RESULTS]: { p: 100, text: 'Step 7 of 7: Results' }
        };
        const stepData = progressMap[id] || { p: 0, text: '' };
        const progressBar = elements.progressBar;
        const progressLabel = elements.progressLabel;
        
        if (progressBar) {
            progressBar.style.width = `${stepData.p}%`;
            progressBar.setAttribute('aria-valuenow', stepData.p);
            progressBar.setAttribute('aria-valuetext', stepData.text);
        }
        if (progressLabel) {
            progressLabel.innerText = stepData.text;
        }

        if (id === SCREENS.PROPERTY) hideWarning(3);
        if (id === SCREENS.UTILITIES || id === SCREENS.RESULTS) updateRatioBar();
        if (id === SCREENS.MORTGAGE) {
            const propPrice = parseFloat(elements.propertyPrice.value) || 0;
            appData.propertyPrice = propPrice;
            const displayField = elements.displayPropertyPrice;
            if (displayField) {
                displayField.value = propPrice.toLocaleString();
            }
            calculateEquityDetails();
        }
        updatePagination(id);
    };

    window.clearCacheAndReload = function() {
        localStorage.removeItem(CACHE_KEY);
        location.reload();
    };

    /**
     * Generic Validation Helper
     * @param {Array} fields - Array of objects defining field validation rules
     * @param {String} nextScreen - ID of the next screen to navigate to
     * @param {Object} options - Optional callbacks: preValidation (async), globalCheck, onSuccess
     */
    const validateAndNext = async function(fields, nextScreen, options = {}) {
        let isValid = true;

        // Custom pre-validation (e.g. async checks)
        if (options.preValidation) {
            const preValid = await options.preValidation();
            if (!preValid) isValid = false;
        }

        // Standard Field Validation
        fields.forEach(field => {
            const el = elements[field.id];
            const errorEl = elements[field.errorId];
            if (errorEl) errorEl.setAttribute('hidden', ''); // Reset error

            let val = el.value;
            let fieldValid = true;

            if (field.type === 'number') {
                val = parseFloat(val);
                if (field.allowEmpty && el.value === '') {
                    val = 0;
                } else if (isNaN(val) || (field.min !== undefined && val < field.min) || (field.max !== undefined && val > field.max)) {
                    fieldValid = false;
                }
            } else if (field.required && !val.trim()) {
                fieldValid = false;
            }

            if (!fieldValid) {
                if (errorEl) errorEl.removeAttribute('hidden');
                isValid = false;
            } else if (field.saveTo) {
                appData[field.saveTo] = val;
            }
        });

        // Global check (e.g. radio button selection)
        if (options.globalCheck) {
            if (!options.globalCheck()) isValid = false;
        }

        if (!isValid) return;

        if (options.onSuccess) options.onSuccess();
        switchScreen(nextScreen);
    };

    const validateAndNext1 = () => validateAndNext([
        { id: 'salaryHis', errorId: 'salaryHisError', type: 'number', min: 0.01, saveTo: 'salaryHis' },
        { id: 'salaryHer', errorId: 'salaryHerError', type: 'number', min: 0.01, saveTo: 'salaryHer' }
    ], 'screen-3', {
        onSuccess: () => {
            const total = appData.salaryHis + appData.salaryHer;
            appData.ratioHis = appData.salaryHis / total;
            appData.ratioHer = appData.salaryHer / total;
        }
    });

    window.checkRegion = checkRegion;
    window.updatePricePreview = updatePricePreview;

    const validateAndNext2 = () => validateAndNext([
        { id: 'bedrooms', errorId: 'bedroomsError', type: 'number', min: 1, saveTo: 'beds' },
        { id: 'bathrooms', errorId: 'bathroomsError', type: 'number', min: 1, saveTo: 'baths' }
    ], 'screen-4', {
        preValidation: async () => {
            const propPriceInput = elements.propertyPrice;
            const postcodeField = elements.postcode;
            const priceError = elements.propertyPriceError;
            const postcodeError = elements.postcodeError;
            
            // Reset errors handled here
            priceError.setAttribute('hidden', '');
            postcodeError.setAttribute('hidden', '');

            let propertyPrice = parseFloat(propPriceInput.value);
            if (isNaN(propertyPrice) || propertyPrice <= 0) {
                const postcode = postcodeField.value.trim().toUpperCase();
                if (!postcode || !isValidPostcode(postcode)) {
                    if (!postcode) postcodeError.removeAttribute('hidden');
                    priceError.removeAttribute('hidden');
                    return false;
                } else {
                    // Try to fetch estimate
                    propertyPrice = await getEstimatedPropertyPrice(postcode);
                    propPriceInput.value = propertyPrice;
                    updatePropertyPriceDisplay(propertyPrice, true);
                }
            } else {
                updatePropertyPriceDisplay(propertyPrice, false);
            }
            appData.propertyPrice = propertyPrice;
            return true;
        },
        globalCheck: () => {
            if (!appData.band) {
                elements.taxBandError.removeAttribute('hidden');
                return false;
            }
            return true;
        },
        onSuccess: () => {
            updateRatioBar();
            populateEstimates();
        }
    });

    const validateAndNextMortgage = () => validateAndNext([
        { id: 'depositPercentage', errorId: 'depositPercentageError', type: 'number', min: 0, max: 100 }, // No saveTo, handled by calc? No, saveTo should be used.
        // wait, original validteAndNextMortgage set appData.mortgageInterestRate/Term.
        // It did NOT set depositPercentage? 
        // Original: const deposit = ...; if invalid return; appData.mortgageInterestRate = rate; ...
        // It calculated calculateMonthlyMortgage() at the end.
        // depositPercentage is used in calculateEquityDetails called by event listener.
        // But appData.depositPercentage needs to be accurate?
        // Actually, calculateEquityDetails updates appData.depositPercentage. 
        // So validation just needs to ensure it's valid.
        { id: 'mortgageInterestRate', errorId: 'mortgageInterestRateError', type: 'number', min: 0, saveTo: 'mortgageInterestRate' },
        { id: 'mortgageTerm', errorId: 'mortgageTermError', type: 'number', min: 1, max: 50, saveTo: 'mortgageTerm' }
    ], 'screen-5', {
        onSuccess: () => {
            calculateMonthlyMortgage();
        }
    });

    const validateAndNext3 = () => validateAndNext([
        { id: 'councilTaxCost', errorId: 'councilTaxCostError', type: 'number', min: 0 }, // councilTax is NOT saved to appData in original?
        // Original validateAndNext3 checked inputs but only set appData.broadbandCost?
        // Wait, appData only stores broadbandCost, groceriesCost etc?
        // calculateFinalSplit reads VALUES from inputs directly.
        // So saving to appData here is actually Optional if calculateFinalSplit still reads DOM.
        // But better to be consistent.
        // The original logic ONLY updated appData.broadbandCost explicitly.
        // The others were just left in the inputs.
        // I will replicate original behavior or improve it?
        // Task 5 is "Refactor Final Split Calculation". I will likely make it read from appData.
        // So I should save to appData here.
        // appData has placeholders for these? Yes in init: waterBill: 0, broadbandCost: 0...
        // But not councilTaxCost or energyCost in appData init object?
        // "councilTaxCost: document.getElementById...value" in saveToCache.
        // appData init has: "waterBill: 0, broadbandCost: 0".
        // It DOES NOT have councilTaxCost or energyCost in appData.
        // I should probably add them to appData if I want to be clean, but for now I'll just validate.
        { id: 'energyCost', errorId: 'energyCostError', type: 'number', min: 0 },
        { id: 'waterBill', errorId: 'waterBillError', type: 'number', min: 0, saveTo: 'waterBill' }, // appData has waterBill
        { id: 'broadbandCost', errorId: 'broadbandError', type: 'number', min: 0, saveTo: 'broadbandCost' }
    ], 'screen-6');

    const validateAndNextCommitted = () => validateAndNext([
        { id: 'groceriesCost', errorId: 'groceriesError', type: 'number', min: 0, allowEmpty: true, saveTo: 'groceriesCost' },
        { id: 'childcareCost', errorId: 'childcareError', type: 'number', min: 0, allowEmpty: true, saveTo: 'childcareCost' },
        { id: 'insuranceCost', errorId: 'insuranceError', type: 'number', min: 0, allowEmpty: true, saveTo: 'insuranceCost' },
        { id: 'otherSharedCosts', errorId: 'otherError', type: 'number', min: 0, allowEmpty: true, saveTo: 'otherSharedCosts' }
    ], 'screen-7', {
        onSuccess: calculateFinalSplit
    });

    window.calculateFinalSplit = function() {
        const taxVal = parseFloat(elements.councilTaxCost.value) || 0;
        const enVal = parseFloat(elements.energyCost.value) || 0;
        const wtVal = parseFloat(elements.waterBill.value) || 0;
        const bbVal = parseFloat(elements.broadbandCost.value) || 0;
        const grVal = parseFloat(elements.groceriesCost.value) || 0;
        const ccVal = parseFloat(elements.childcareCost.value) || 0;
        const isVal = parseFloat(elements.insuranceCost.value) || 0;
        const osVal = parseFloat(elements.otherSharedCosts.value) || 0;
        const mortgage = appData.monthlyMortgagePayment;

        const getSplit = (key, val) => {
            const pref = document.querySelector(`input[name="${key}SplitType"]:checked`)?.value || 'yes';
            const r = pref === 'yes' ? appData.ratioHis : 0.5;
            return { h: val * r, s: val * (1 - r) };
        };

        const tax = getSplit('councilTax', taxVal);
        const energy = getSplit('energy', enVal);
        const water = getSplit('water', wtVal);
        const broadband = getSplit('broadband', bbVal);
        const groceries = getSplit('groceries', grVal);
        const childcare = getSplit('childcare', ccVal);
        const insurance = getSplit('insurance', isVal);
        const otherShared = getSplit('otherShared', osVal);
        
        const mort = { h: mortgage * appData.ratioHis, s: mortgage * appData.ratioHer };

        const committedTotal = ccVal + isVal + osVal;
        const committedH = childcare.h + insurance.h + otherShared.h;
        const committedS = childcare.s + insurance.s + otherShared.s;

        const totalH = tax.h + energy.h + water.h + broadband.h + groceries.h + committedH + mort.h;
        const totalS = tax.s + energy.s + water.s + broadband.s + groceries.s + committedS + mort.s;
        const total = totalH + totalS;

        elements.resultHis.innerText = formatCurrency(totalH, 2);
        elements.resultHer.innerText = formatCurrency(totalS, 2);
        elements.totalBillDisplay.innerText = formatCurrency(total, 2);

        elements.bdMortgageTotal.innerText = formatCurrency(mortgage, 2);
        elements.bdMortgageHis.innerText = formatCurrency(mort.h, 2);
        elements.bdMortgageHer.innerText = formatCurrency(mort.s, 2);
        elements.bdTaxTotal.innerText = formatCurrency(taxVal, 2);
        elements.bdTaxHis.innerText = formatCurrency(tax.h, 2);
        elements.bdTaxHer.innerText = formatCurrency(tax.s, 2);
        elements.bdEnergyTotal.innerText = formatCurrency(enVal, 2);
        elements.bdEnergyHis.innerText = formatCurrency(energy.h, 2);
        elements.bdEnergyHer.innerText = formatCurrency(energy.s, 2);
        elements.bdWaterTotal.innerText = formatCurrency(wtVal, 2);
        elements.bdWaterHis.innerText = formatCurrency(water.h, 2);
        elements.bdWaterHer.innerText = formatCurrency(water.s, 2);
        elements.bdBroadbandTotal.innerText = formatCurrency(bbVal, 2);
        elements.bdBroadbandHis.innerText = formatCurrency(broadband.h, 2);
        elements.bdBroadbandHer.innerText = formatCurrency(broadband.s, 2);
        elements.bdGroceriesTotal.innerText = formatCurrency(grVal, 2);
        elements.bdGroceriesHis.innerText = formatCurrency(groceries.h, 2);
        elements.bdGroceriesHer.innerText = formatCurrency(groceries.s, 2);
        elements.bdCommittedTotal.innerText = formatCurrency(committedTotal, 2);
        elements.bdCommittedHis.innerText = formatCurrency(committedH, 2);
        elements.bdCommittedHer.innerText = formatCurrency(committedS, 2);
        elements.bdTotalTotal.innerText = formatCurrency(total, 2);
        elements.bdTotalHis.innerText = formatCurrency(totalH, 2);
        elements.bdTotalHer.innerText = formatCurrency(totalS, 2);

        const summaryEl = elements.resultSummary;
        if (summaryEl) {
            const diff = Math.abs(totalH - totalS);
            const moreP = totalH > totalS ? 'Person A' : 'Person B';
            const lessP = totalH > totalS ? 'Person B' : 'Person A';
            if (diff < 0.01) summaryEl.innerText = "Both partners contribute equally based on your selected split rules.";
            else summaryEl.innerText = `${moreP} pays ${formatCurrency(diff, 2)} more than ${lessP} per month overall.`;
        }

        const workingsEl = elements.calculationWorkings;
        if (workingsEl) {
            const totalSalary = appData.salaryHis + appData.salaryHer;
            const hPerc = (appData.ratioHis * 100).toFixed(1);
            const sPerc = (appData.ratioHer * 100).toFixed(1);
            workingsEl.innerHTML = `
                <div>
                    <div><strong>1. Combined Annual Income:</strong> £${appData.salaryHis.toLocaleString()} + £${appData.salaryHer.toLocaleString()} = <strong>£${totalSalary.toLocaleString()}</strong></div>
                    <div><strong>2. Established Fair Share Ratio:</strong>
                        <ul>
                            <li>Person A: £${appData.salaryHis.toLocaleString()} / £${totalSalary.toLocaleString()} = <strong>${hPerc}%</strong></li>
                            <li>Person B: £${appData.salaryHer.toLocaleString()} / £${totalSalary.toLocaleString()} = <strong>${sPerc}%</strong></li>
                        </ul>
                    </div>
                    <div><strong>3. Calculation Application:</strong> Each line item was split using either the <strong>Ratio</strong> above or <strong>50/50</strong> based on your specific rule choices.</div>
                </div>
            `;
        }

        const breakdownSummaryEl = elements.breakdownSummary;
        if (breakdownSummaryEl) {
            const mainCosts = mort.h + mort.s + taxVal + enVal + wtVal;
            const lifestyleCosts = bbVal + grVal + committedTotal;
            breakdownSummaryEl.innerText = `Out of the £${total.toLocaleString(undefined, {minimumFractionDigits: 2})} total monthly spend, £${mainCosts.toLocaleString(undefined, {minimumFractionDigits: 2})} is dedicated to the property and utilities, while £${lifestyleCosts.toLocaleString(undefined, {minimumFractionDigits: 2})} covers shared lifestyle and committed costs. This report captures all your shared commitments in one place.`;
        }

        switchScreen('screen-7');
    };

    // --- Event Listeners ---

    // Consolidated Input Listeners
    FORM_FIELDS.forEach(field => {
        const el = elements[field.id];
        if (!el) return;

        el.addEventListener('input', () => {
            // Pre-processing
            if (field.id === 'postcode') formatPostcode(el);

            // Sync Data
            let val = el.value;
            if (field.type === 'number') val = parseFloat(val) || 0;
            appData[field.key || field.id] = val;

            // Specific Logic
            if (field.id === 'propertyPrice') updatePropertyPriceDisplay(val, false);
            if (field.id === 'depositPercentage') calculateEquityDetails();
            if (field.id === 'mortgageInterestRate' || field.id === 'mortgageTerm') calculateMonthlyMortgage();

            saveToCache();
        });
    });

    const estimatePriceBtn = elements.estimatePriceBtn;
    if (estimatePriceBtn) {
        estimatePriceBtn.addEventListener('click', async function() {
            const postcodeField = elements.postcode;
            const postcode = postcodeField.value.trim().toUpperCase();
            if (!postcode || !isValidPostcode(postcode)) { return; }
            const estimatedPrice = await getEstimatedPropertyPrice(postcode);
            elements.propertyPrice.value = estimatedPrice;
            appData.propertyPrice = estimatedPrice; // Ensure appData is updated
            updatePropertyPriceDisplay(estimatedPrice, true);
            saveToCache();
        });
    }

    document.querySelectorAll('input[name="depositSplitType"]').forEach(radio => {
        radio.addEventListener('change', () => {
            appData.depositSplitProportional = radio.value === 'yes';
            calculateEquityDetails();
            saveToCache();
        });
    });

    const ftbContainer = document.getElementById('ftb-container');

    function updateFTBVisibility() {
        if (!ftbContainer) return;
        if (appData.homeType === 'first') {
            ftbContainer.removeAttribute('hidden');
        } else {
            ftbContainer.setAttribute('hidden', '');
        }
    }

    document.querySelectorAll('input[name="homeType"]').forEach(radio => {
        radio.addEventListener('change', () => {
            appData.homeType = radio.value;
            updateFTBVisibility();
            calculateEquityDetails();
            saveToCache();
        });
    });

    document.querySelectorAll('input[name="buyerStatus"]').forEach(radio => {
        radio.addEventListener('change', () => {
            appData.isFTB = radio.value === 'ftb';
            calculateEquityDetails();
            saveToCache();
        });
    });

    // Initial load: Set hidden states for all sections except landing
    document.querySelectorAll('main section').forEach(el => el.setAttribute('hidden', ''));
    document.getElementById('screen-1').removeAttribute('hidden');
    const progressBar = elements.progressBar;
    if (progressBar) progressBar.style.width = '0%';
    loadFromCache();
    updatePagination('screen-1');

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        // Find visible screen by checking which section does NOT have the hidden attribute
        const visibleScreen = document.querySelector('main section:not([hidden])');
        if (!visibleScreen) return;

        // Ignore if user is typing in an input field (unless it's Enter to submit)
        if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
            return;
        }

        if (e.key === 'ArrowRight' || e.key === 'Enter') {
            elements.nextButton.click();
        } else if (e.key === 'ArrowLeft') {
            elements.backButton.click();
        }
    });
});
