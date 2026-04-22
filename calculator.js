// Klaviyo Pricing Calculator - JavaScript Engine
// Reads from PRICING_DATA.md and renders interactive calculator

let pricingData = {};

// Initialize calculator on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadPricingData();
        renderTieredModel();
        renderConsumptionModel();
        renderCreditsModel();
        renderComparisonTable();
        renderRevenueModeling();
    } catch (error) {
        showError('Failed to load pricing data: ' + error.message);
    }
});

// Load and parse PRICING_DATA.md
async function loadPricingData() {
    try {
        const response = await fetch('PRICING_DATA.md');
        const markdown = await response.text();

        // Extract JSON blocks from markdown
        const jsonBlocks = markdown.match(/```json\n([\s\S]*?)\n```/g);

        if (!jsonBlocks || jsonBlocks.length === 0) {
            throw new Error('No JSON data found in PRICING_DATA.md');
        }

        // Parse each JSON block
        jsonBlocks.forEach(block => {
            const json = block.replace(/```json\n/, '').replace(/\n```/, '');
            const data = JSON.parse(json);

            // Merge into pricingData object
            Object.assign(pricingData, data);
        });

        console.log('Pricing data loaded:', pricingData);
    } catch (error) {
        console.error('Error loading pricing data:', error);
        throw error;
    }
}

// Render Tiered Bundles Model
function renderTieredModel() {
    const container = document.getElementById('tiered-table-container');

    // Gather all APIs
    const allAPIs = [
        ...(pricingData.coreDataInfrastructure || []),
        ...(pricingData.coreMessagingInfrastructure || []),
        ...(pricingData.addOnsComposableFeatures || []),
        ...(pricingData.intelligenceAIML || [])
    ];

    // Build table HTML
    let html = '<div class="pricing-table-wrapper"><table class="pricing-table">';

    // Header rows
    html += '<thead>';

    // Layer headers
    html += '<tr>';
    html += '<th rowspan="2">Tier</th>';
    html += '<th colspan="9" class="layer-header">Core Data Infrastructure</th>';
    html += '<th colspan="3" class="layer-header">Core Messaging Infrastructure</th>';
    html += '<th colspan="6" class="layer-header">Add-ons (Composable Features)</th>';
    html += '<th colspan="6" class="layer-header">Intelligence (AI/ML)</th>';
    html += '</tr>';

    // API headers
    html += '<tr>';
    allAPIs.forEach(api => {
        const badgeClass = api.status === 'available' ? 'badge-available' : 'badge-future';
        const badgeText = api.status === 'available' ? 'Available' : 'Future';
        html += `<th class="api-header">${api.name}<br><span class="status-badge ${badgeClass}">${badgeText}</span></th>`;
    });
    html += '</tr>';
    html += '</thead>';

    // Body rows - one for each tier
    html += '<tbody>';

    const tiers = pricingData.tiers || [];
    tiers.forEach(tier => {
        html += '<tr>';

        // Tier name and price
        html += `<td class="tier-name">
            <div>${tier.name}</div>
            <div class="tier-price">$${tier.basePrice.toLocaleString()}/mo</div>
        </td>`;

        // API availability for this tier
        allAPIs.forEach(api => {
            const tierAvail = api.tierAvailability[tier.id];

            if (!tierAvail) {
                html += '<td class="not-available">N/A</td>';
            } else if (tierAvail.included === false) {
                if (tierAvail.addonPrice) {
                    html += `<td class="addon-cell">Add-on<span class="limit">$${tierAvail.addonPrice}/mo</span>`;
                    if (tierAvail.addonLimit) {
                        html += `<span class="limit">${tierAvail.addonLimit}</span>`;
                    }
                    html += '</td>';
                } else {
                    html += '<td class="not-available">N/A</td>';
                }
            } else if (tierAvail.limit === 'Coming Soon') {
                html += '<td class="coming-soon">Coming Soon</td>';
            } else if (tierAvail.limit === 'Beta Access') {
                html += '<td class="coming-soon">Beta Access';
                if (tierAvail.tooltip) {
                    html += `<span class="limit tooltip" data-tooltip="${tierAvail.tooltip}"></span>`;
                }
                html += '</td>';
            } else {
                html += `<td class="included">✓ ${tierAvail.limit}`;
                if (tierAvail.tooltip) {
                    html += `<span class="limit tooltip" data-tooltip="${tierAvail.tooltip}"></span>`;
                }
                html += '</td>';
            }
        });

        html += '</tr>';
    });

    html += '</tbody></table></div>';

    container.innerHTML = html;
}

// Render Pure Consumption Model
function renderConsumptionModel() {
    const container = document.getElementById('consumption-container');
    const model = pricingData.pureConsumptionModel;

    if (!model) {
        container.innerHTML = '<p class="error">Consumption model data not found</p>';
        return;
    }

    let html = '';

    // Free Tier Section
    html += '<div class="price-card">';
    html += '<h3>Free Tier (Always Free)</h3>';
    html += `<div class="price-item">
        <span>Profiles</span>
        <span class="price-value">${model.freeTier.profiles} free <span class="free-tag">FREE</span></span>
    </div>`;
    html += `<div class="price-item">
        <span>Events</span>
        <span class="price-value">${model.freeTier.events} free <span class="free-tag">FREE</span></span>
    </div>`;
    html += `<div class="price-item">
        <span>Emails</span>
        <span class="price-value">${model.freeTier.emails} free <span class="free-tag">FREE</span></span>
    </div>`;
    html += `<div class="price-item">
        <span>Monthly Usage Credit</span>
        <span class="price-value">$${model.freeTier.usageCredit} <span class="free-tag">FREE</span></span>
    </div>`;
    html += '</div>';

    // Unit Pricing Grid
    html += '<div class="pricing-grid">';

    // Core Data Infrastructure
    html += '<div class="price-card">';
    html += '<h3>Core Data Infrastructure</h3>';
    Object.entries(model.unitPricing.coreDataInfrastructure).forEach(([key, value]) => {
        const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        html += `<div class="price-item">
            <span>${name}</span>
            <span class="price-value">$${value.price.toFixed(2)} ${value.unit}</span>
        </div>`;
    });
    html += '</div>';

    // Core Messaging Infrastructure
    html += '<div class="price-card">';
    html += '<h3>Core Messaging Infrastructure</h3>';
    Object.entries(model.unitPricing.coreMessagingInfrastructure).forEach(([key, value]) => {
        const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        html += `<div class="price-item">
            <span>${name}</span>
            <span class="price-value">$${value.price.toFixed(2)} ${value.unit}</span>
        </div>`;
    });
    html += '</div>';

    // Add-ons
    html += '<div class="price-card">';
    html += '<h3>Add-ons (Composable Features)</h3>';
    Object.entries(model.unitPricing.addOnsComposableFeatures).forEach(([key, value]) => {
        const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        html += `<div class="price-item">
            <span>${name}</span>
            <span class="price-value">$${value.price.toFixed(2)} ${value.unit}</span>
        </div>`;
    });
    html += '</div>';

    // Intelligence
    html += '<div class="price-card">';
    html += '<h3>Intelligence (AI/ML)</h3>';
    Object.entries(model.unitPricing.intelligenceAIML).forEach(([key, value]) => {
        const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        html += `<div class="price-item">
            <span>${name}</span>
            <span class="price-value">$${value.price.toFixed(2)} ${value.unit}</span>
        </div>`;
    });
    html += '</div>';

    html += '</div>';

    container.innerHTML = html;
}

// Render Credits Model
function renderCreditsModel() {
    const container = document.getElementById('credits-container');
    const model = pricingData.creditsModel;

    if (!model) {
        container.innerHTML = '<p class="error">Credits model data not found</p>';
        return;
    }

    let html = '';

    // Free Credits
    html += '<div class="price-card">';
    html += '<h3>Free Credits (Monthly)</h3>';
    html += `<div class="price-item">
        <span>Monthly free credits</span>
        <span class="price-value">${model.freeCredits.monthly.toLocaleString()} credits <span class="free-tag">FREE</span></span>
    </div>`;
    html += `<p style="margin-top: 15px; color: #718096;">${model.freeCredits.description}</p>`;
    html += '</div>';

    // Credit Packages
    html += '<div class="pricing-grid">';
    model.creditPackages.forEach(pkg => {
        html += '<div class="price-card">';
        html += `<h3>${pkg.name}`;
        if (pkg.discount !== '0%') {
            html += `<span class="discount-badge">${pkg.discount} OFF</span>`;
        }
        html += '</h3>';
        html += `<div class="price-item">
            <span>Credits</span>
            <span class="price-value">${pkg.credits.toLocaleString()}</span>
        </div>`;
        html += `<div class="price-item">
            <span>Price</span>
            <span class="price-value">$${pkg.price.toLocaleString()}</span>
        </div>`;
        html += `<div class="price-item">
            <span>Price per credit</span>
            <span class="price-value">$${pkg.pricePerCredit.toFixed(4)}</span>
        </div>`;
        html += `<p style="margin-top: 15px; color: #718096;">${pkg.description}</p>`;
        html += '</div>';
    });
    html += '</div>';

    // Credit Costs
    html += '<h3 style="margin: 40px 0 20px 0; color: #2d3748; font-size: 1.6em;">Credit Costs by Feature</h3>';
    html += '<div class="pricing-grid">';

    // Core Data
    html += '<div class="price-card">';
    html += '<h3>Core Data Infrastructure</h3>';
    Object.entries(model.creditCosts.coreDataInfrastructure).forEach(([key, value]) => {
        const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        html += `<div class="price-item">
            <span>${name}</span>
            <span class="price-value">${value.credits.toLocaleString()} credits ${value.unit}</span>
        </div>`;
    });
    html += '</div>';

    // Messaging
    html += '<div class="price-card">';
    html += '<h3>Core Messaging Infrastructure</h3>';
    Object.entries(model.creditCosts.coreMessagingInfrastructure).forEach(([key, value]) => {
        const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        html += `<div class="price-item">
            <span>${name}</span>
            <span class="price-value">${value.credits.toLocaleString()} credits ${value.unit}</span>
        </div>`;
    });
    html += '</div>';

    // Add-ons
    html += '<div class="price-card">';
    html += '<h3>Add-ons (Composable Features)</h3>';
    Object.entries(model.creditCosts.addOnsComposableFeatures).forEach(([key, value]) => {
        const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        html += `<div class="price-item">
            <span>${name}</span>
            <span class="price-value">${value.credits.toLocaleString()} credits ${value.unit}</span>
        </div>`;
    });
    html += '</div>';

    // Intelligence
    html += '<div class="price-card">';
    html += '<h3>Intelligence (AI/ML)</h3>';
    Object.entries(model.creditCosts.intelligenceAIML).forEach(([key, value]) => {
        const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        html += `<div class="price-item">
            <span>${name}</span>
            <span class="price-value">${value.credits.toLocaleString()} credits ${value.unit}</span>
        </div>`;
    });
    html += '</div>';

    html += '</div>';

    container.innerHTML = html;
}

// Render Model Comparison Table
function renderComparisonTable() {
    const container = document.getElementById('comparison-container');
    const comparison = pricingData.modelComparison;

    if (!comparison) {
        container.innerHTML = '<p class="error">Comparison data not found</p>';
        return;
    }

    let html = '<table class="comparison-table">';

    // Header
    html += '<thead><tr>';
    html += '<th class="dimension-name">Dimension</th>';
    comparison.models.forEach(model => {
        html += `<th>${model}</th>`;
    });
    html += '</tr></thead>';

    // Body
    html += '<tbody>';
    comparison.dimensions.forEach(dim => {
        html += '<tr>';
        html += `<td class="dimension-name">${dim.dimension}</td>`;
        html += `<td>${dim.tiered}</td>`;
        html += `<td>${dim.consumption}</td>`;
        html += `<td>${dim.credits}</td>`;
        html += '</tr>';
    });
    html += '</tbody></table>';

    container.innerHTML = html;
}

// Render Revenue Modeling Tool
function renderRevenueModeling() {
    const container = document.getElementById('revenue-container');
    const tiers = pricingData.tiers || [];
    const margins = pricingData.marginAnalysis;

    let html = '<div class="revenue-modeling">';

    // Customer count inputs
    html += '<h3>Customer Mix by Tier</h3>';
    html += '<div class="modeling-grid">';

    tiers.forEach(tier => {
        if (tier.id === 'free') return; // Skip free tier for revenue modeling

        html += '<div class="input-group">';
        html += `<label for="customers-${tier.id}">${tier.name} Tier ($${tier.basePrice.toLocaleString()}/mo)</label>`;
        html += `<input type="number" id="customers-${tier.id}" value="0" min="0" placeholder="Number of customers">`;
        html += '</div>';
    });

    html += '</div>';

    // Add-on selection
    html += '<h3 style="margin-top: 40px;">Add-on Adoption</h3>';
    html += '<div class="modeling-grid">';

    const addons = pricingData.addOnsComposableFeatures || [];
    addons.forEach(addon => {
        if (addon.id === 'reporting') return; // Skip reporting (included)

        html += '<div class="input-group">';
        html += `<div class="addon-checkbox">`;
        html += `<input type="checkbox" id="addon-${addon.id}" value="${addon.id}">`;
        html += `<label for="addon-${addon.id}">${addon.name}</label>`;
        html += `</div>`;
        html += `<label style="margin-top: 10px;">Adoption Rate (%)</label>`;
        html += `<input type="number" id="adoption-${addon.id}" value="25" min="0" max="100" placeholder="% of customers">`;
        html += '</div>';
    });

    html += '</div>';

    // Calculate button
    html += '<button class="calculate-btn" onclick="calculateRevenue()">Calculate Revenue & Margins</button>';

    // Results panel
    html += '<div id="revenue-results" style="display: none;" class="results-panel">';
    html += '<h4>Revenue Projection</h4>';
    html += '<div class="result-item">';
    html += '<span class="result-label">Total Customers:</span>';
    html += '<span class="result-value" id="total-customers">0</span>';
    html += '</div>';
    html += '<div class="result-item">';
    html += '<span class="result-label">Base Revenue (Monthly):</span>';
    html += '<span class="result-value" id="base-revenue">$0</span>';
    html += '</div>';
    html += '<div class="result-item">';
    html += '<span class="result-label">Add-on Revenue (Monthly):</span>';
    html += '<span class="result-value" id="addon-revenue">$0</span>';
    html += '</div>';
    html += '<div class="result-item">';
    html += '<span class="result-label">Total Monthly Revenue:</span>';
    html += '<span class="result-value success" id="total-revenue">$0</span>';
    html += '</div>';
    html += '<div class="result-item">';
    html += '<span class="result-label">Annual Revenue (ARR):</span>';
    html += '<span class="result-value success" id="annual-revenue">$0</span>';
    html += '</div>';
    html += '<div class="result-item">';
    html += '<span class="result-label">Estimated Total Cost:</span>';
    html += '<span class="result-value" id="total-cost">$0</span>';
    html += '</div>';
    html += '<div class="result-item">';
    html += '<span class="result-label">Gross Margin:</span>';
    html += '<span class="result-value success" id="gross-margin">0%</span>';
    html += '</div>';
    html += '</div>';

    html += '</div>';

    container.innerHTML = html;
}

// Calculate Revenue Model
function calculateRevenue() {
    const tiers = pricingData.tiers || [];
    const margins = pricingData.marginAnalysis?.tiers || [];
    const addons = pricingData.addOnsComposableFeatures || [];

    let totalCustomers = 0;
    let baseRevenue = 0;
    let addonRevenue = 0;
    let totalCost = 0;

    // Calculate base revenue from tiers
    tiers.forEach(tier => {
        if (tier.id === 'free') return;

        const input = document.getElementById(`customers-${tier.id}`);
        if (!input) return;

        const customers = parseInt(input.value) || 0;
        totalCustomers += customers;
        baseRevenue += customers * tier.basePrice;

        // Find margin data for cost calculation
        const marginData = margins.find(m => m.tier === tier.name);
        if (marginData) {
            totalCost += customers * marginData.baseCost;
        }
    });

    // Calculate add-on revenue
    addons.forEach(addon => {
        if (addon.id === 'reporting') return;

        const checkbox = document.getElementById(`addon-${addon.id}`);
        const adoptionInput = document.getElementById(`adoption-${addon.id}`);

        if (!checkbox || !checkbox.checked || !adoptionInput) return;

        const adoptionRate = (parseInt(adoptionInput.value) || 0) / 100;

        // Calculate add-on revenue per tier
        tiers.forEach(tier => {
            if (tier.id === 'free') return;

            const customerInput = document.getElementById(`customers-${tier.id}`);
            if (!customerInput) return;

            const customers = parseInt(customerInput.value) || 0;
            const tierAvail = addon.tierAvailability[tier.id];

            if (tierAvail && tierAvail.addonPrice) {
                const addonCustomers = Math.floor(customers * adoptionRate);
                addonRevenue += addonCustomers * tierAvail.addonPrice;

                // Estimate add-on costs (rough estimate: 30% of add-on price)
                totalCost += addonCustomers * tierAvail.addonPrice * 0.3;
            }
        });
    });

    const totalRevenue = baseRevenue + addonRevenue;
    const annualRevenue = totalRevenue * 12;
    const grossMargin = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue * 100) : 0;

    // Update results
    document.getElementById('total-customers').textContent = totalCustomers.toLocaleString();
    document.getElementById('base-revenue').textContent = '$' + baseRevenue.toLocaleString();
    document.getElementById('addon-revenue').textContent = '$' + addonRevenue.toLocaleString();
    document.getElementById('total-revenue').textContent = '$' + totalRevenue.toLocaleString();
    document.getElementById('annual-revenue').textContent = '$' + annualRevenue.toLocaleString();
    document.getElementById('total-cost').textContent = '$' + totalCost.toLocaleString();
    document.getElementById('gross-margin').textContent = grossMargin.toFixed(1) + '%';

    // Color-code margin
    const marginElement = document.getElementById('gross-margin');
    marginElement.classList.remove('success', 'warning');
    if (grossMargin >= 60) {
        marginElement.classList.add('success');
    } else if (grossMargin >= 40) {
        marginElement.classList.add('warning');
    }

    // Show results
    document.getElementById('revenue-results').style.display = 'block';

    // Scroll to results
    document.getElementById('revenue-results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Tab switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + '-content').classList.add('active');
}

// Error handling
function showError(message) {
    console.error(message);
    const containers = [
        'tiered-table-container',
        'consumption-container',
        'credits-container',
        'comparison-container',
        'revenue-container'
    ];

    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = `<p class="error">${message}</p>`;
        }
    });
}

// Comprehensive test function
function runComprehensiveTests() {
    console.log('=== Running Comprehensive Tests ===');

    // Test 1: Data loading
    console.log('Test 1: Pricing data loaded?', Object.keys(pricingData).length > 0);

    // Test 2: All tiers present
    const expectedTiers = ['free', 'starter', 'growth', 'scale', 'enterprise'];
    const actualTiers = (pricingData.tiers || []).map(t => t.id);
    console.log('Test 2: All tiers present?', expectedTiers.every(t => actualTiers.includes(t)));

    // Test 3: All API layers present
    console.log('Test 3: Core Data APIs?', (pricingData.coreDataInfrastructure || []).length === 9);
    console.log('Test 4: Messaging APIs?', (pricingData.coreMessagingInfrastructure || []).length === 3);
    console.log('Test 5: Add-on APIs?', (pricingData.addOnsComposableFeatures || []).length === 6);
    console.log('Test 6: Intelligence APIs?', (pricingData.intelligenceAIML || []).length === 6);

    // Test 7: Model 2 & 3 present
    console.log('Test 7: Consumption model?', pricingData.pureConsumptionModel !== undefined);
    console.log('Test 8: Credits model?', pricingData.creditsModel !== undefined);

    // Test 9: Comparison table
    console.log('Test 9: Model comparison?', pricingData.modelComparison !== undefined);

    // Test 10: Margin analysis
    console.log('Test 10: Margin analysis?', pricingData.marginAnalysis !== undefined);

    console.log('=== Tests Complete ===');
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadPricingData, calculateRevenue, runComprehensiveTests };
}
