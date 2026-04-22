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
        renderMarginAnalysis();
        renderRevenueModelingTiered();
        renderRevenueModelingConsumption();
        renderRevenueModelingCredits();
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

    // Add Intelligence Premium Pricing Section
    html += '<div class="intelligence-section">';
    html += '<h3>🤖 Intelligence Layer - Premium Pricing <span class="markup-badge">Enterprise Beta</span></h3>';
    html += '<p style="color: #78350f; margin-bottom: 1rem;">ML/AI features command premium pricing (5-10× markup over infrastructure costs)</p>';

    html += '<div class="intelligence-grid">';

    // CLV Prediction
    html += '<div class="intelligence-item">';
    html += '<strong>CLV Prediction API</strong>';
    html += '<div class="intelligence-price">$0.50 per prediction</div>';
    html += '<div class="intelligence-cost">Infrastructure cost: ~$0.05 (GPU) <span class="markup-badge">10× markup</span></div>';
    html += '</div>';

    // Churn Prediction
    html += '<div class="intelligence-item">';
    html += '<strong>Churn Prediction API</strong>';
    html += '<div class="intelligence-price">$0.50 per prediction</div>';
    html += '<div class="intelligence-cost">Infrastructure cost: ~$0.05 (GPU) <span class="markup-badge">10× markup</span></div>';
    html += '</div>';

    // Send Time Optimization
    html += '<div class="intelligence-item">';
    html += '<strong>Send Time Optimization</strong>';
    html += '<div class="intelligence-price">$0.10 per optimization</div>';
    html += '<div class="intelligence-cost">Infrastructure cost: ~$0.02 (GPU) <span class="markup-badge">5× markup</span></div>';
    html += '</div>';

    // Product Recommendations
    html += '<div class="intelligence-item">';
    html += '<strong>Product Recommendations</strong>';
    html += '<div class="intelligence-price">$0.25 per recommendation</div>';
    html += '<div class="intelligence-cost">Infrastructure cost: ~$0.03 (GPU) <span class="markup-badge">8× markup</span></div>';
    html += '</div>';

    // Predictive Segments
    html += '<div class="intelligence-item">';
    html += '<strong>Predictive Segments</strong>';
    html += '<div class="intelligence-price">$5.00 per segment/month</div>';
    html += '<div class="intelligence-cost">Infrastructure cost: ~$0.50 (GPU) <span class="markup-badge">10× markup</span></div>';
    html += '</div>';

    // Insights AI
    html += '<div class="intelligence-item">';
    html += '<strong>Insights AI (LLM)</strong>';
    html += '<div class="intelligence-price">$1.00 per insight</div>';
    html += '<div class="intelligence-cost">Infrastructure cost: ~$0.20 (LLM) <span class="markup-badge">5× markup</span></div>';
    html += '</div>';

    html += '</div>'; // intelligence-grid
    html += '</div>'; // intelligence-section

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
    html += '<h3 style="margin: 40px 0 20px 0; color: #2d3748; font-size: 1.2em;">Credit Costs by Feature</h3>';
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

// Render Margin Analysis
function renderMarginAnalysis() {
    const container = document.getElementById('margins-container');
    const margins = pricingData.marginAnalysis;

    if (!margins) {
        container.innerHTML = '<p class="error">Margin analysis data not found</p>';
        return;
    }

    let html = '';

    // Base Margin Table
    html += '<div class="section">';
    html += '<h2>Tier Margin Analysis</h2>';
    html += '<table class="comparison-table">';
    html += '<thead><tr>';
    html += '<th>Tier</th>';
    html += '<th>Base Price</th>';
    html += '<th>Base Cost</th>';
    html += '<th>Base Margin</th>';
    html += '<th>With Typical Add-ons</th>';
    html += '<th>With All Add-ons</th>';
    html += '</tr></thead>';
    html += '<tbody>';

    margins.tiers.forEach(tier => {
        html += '<tr>';
        html += `<td class="dimension-name">${tier.tier}</td>`;
        html += `<td>$${tier.basePrice.toLocaleString()}</td>`;
        html += `<td>$${tier.baseCost.toLocaleString()}</td>`;
        html += `<td><strong>${tier.baseMargin}</strong></td>`;

        if (tier.withTypicalAddons) {
            html += `<td>Revenue: $${tier.withTypicalAddons.revenue.toLocaleString()}<br>Margin: <strong>${tier.withTypicalAddons.margin}</strong></td>`;
        } else {
            html += '<td>-</td>';
        }

        if (tier.withAllAddons) {
            html += `<td>Revenue: $${tier.withAllAddons.revenue.toLocaleString()}<br>Margin: <strong>${tier.withAllAddons.margin}</strong></td>`;
        } else {
            html += '<td>-</td>';
        }

        html += '</tr>';
    });

    html += '</tbody></table>';
    html += '</div>';

    // Unit Costs Table
    html += '<div class="section">';
    html += '<h2>Unit Cost Breakdown</h2>';

    html += '<h3>Core Data Infrastructure</h3>';
    html += '<table class="comparison-table">';
    html += '<thead><tr><th>API</th><th>Unit Cost</th><th>Cost Per</th></tr></thead>';
    html += '<tbody>';

    (pricingData.coreDataInfrastructure || []).forEach(api => {
        html += '<tr>';
        html += `<td class="dimension-name">${api.name}</td>`;
        html += `<td>$${api.unitCost.toFixed(6)}</td>`;
        html += `<td>${api.costPer}</td>`;
        html += '</tr>';
    });

    html += '</tbody></table>';

    html += '<h3>Core Messaging Infrastructure</h3>';
    html += '<table class="comparison-table">';
    html += '<thead><tr><th>API</th><th>Unit Cost</th><th>Cost Per</th></tr></thead>';
    html += '<tbody>';

    (pricingData.coreMessagingInfrastructure || []).forEach(api => {
        html += '<tr>';
        html += `<td class="dimension-name">${api.name}</td>`;
        html += `<td>$${api.unitCost.toFixed(6)}</td>`;
        html += `<td>${api.costPer}</td>`;
        html += '</tr>';
    });

    html += '</tbody></table>';
    html += '</div>';

    // Intelligence Premium Pricing
    html += '<div class="intelligence-section">';
    html += '<h3>🤖 Intelligence Layer - Premium Pricing</h3>';
    html += '<p style="color: #64748b; margin-bottom: 1.5rem;">ML/AI features with 5-10× markup over infrastructure costs</p>';

    html += '<table class="comparison-table" style="background: white;">';
    html += '<thead><tr><th>Intelligence API</th><th>Customer Price</th><th>Infrastructure Cost</th><th>Markup</th><th>Margin</th></tr></thead>';
    html += '<tbody>';

    const intelligencePricing = [
        { name: 'CLV Prediction', price: 0.50, cost: 0.05, markup: '10×' },
        { name: 'Churn Prediction', price: 0.50, cost: 0.05, markup: '10×' },
        { name: 'Send Time Optimization', price: 0.10, cost: 0.02, markup: '5×' },
        { name: 'Product Recommendations', price: 0.25, cost: 0.03, markup: '8×' },
        { name: 'Predictive Segments', price: 5.00, cost: 0.50, markup: '10×' },
        { name: 'Insights AI (LLM)', price: 1.00, cost: 0.20, markup: '5×' }
    ];

    intelligencePricing.forEach(item => {
        const margin = ((item.price - item.cost) / item.price * 100).toFixed(0);
        html += '<tr>';
        html += `<td class="dimension-name">${item.name}</td>`;
        html += `<td>$${item.price.toFixed(2)}</td>`;
        html += `<td>$${item.cost.toFixed(2)}</td>`;
        html += `<td><span class="markup-badge">${item.markup}</span></td>`;
        html += `<td><strong style="color: #10b981;">${margin}%</strong></td>`;
        html += '</tr>';
    });

    html += '</tbody></table>';
    html += '</div>';

    // Add Margin Analysis for All 3 Models
    html += '<div class="section" style="margin-top: 2rem;">';
    html += '<h2>Margin Comparison Across Models</h2>';

    html += '<h3 style="color: #065f46; margin-top: 1.5rem;">Model 1: Tiered Bundles</h3>';
    html += '<p style="color: #64748b; margin-bottom: 1rem;">Predictable monthly pricing with base tier + optional add-ons</p>';
    html += '<table class="margin-table">';
    html += '<thead><tr><th>Tier</th><th>Base Margin</th><th>With Typical Add-ons</th><th>With All Add-ons</th></tr></thead>';
    html += '<tbody>';

    const marginTiers = [
        { tier: 'Starter', base: '72%', typical: '87%', all: '89%' },
        { tier: 'Growth', base: '67%', typical: '72%', all: '75%' },
        { tier: 'Scale', base: '50%', typical: '58%', all: '65%' },
        { tier: 'Enterprise', base: '67%', typical: '67%', all: '67%' }
    ];

    marginTiers.forEach(tier => {
        html += '<tr>';
        html += `<td class="tier-name">${tier.tier}</td>`;
        html += `<td class="margin-good">${tier.base}</td>`;
        html += `<td class="margin-good">${tier.typical}</td>`;
        html += `<td class="margin-good">${tier.all}</td>`;
        html += '</tr>';
    });

    html += '</tbody></table>';

    html += '<h3 style="color: #065f46; margin-top: 1.5rem;">Model 2: Pure Consumption</h3>';
    html += '<p style="color: #64748b; margin-bottom: 1rem;">Pay-per-use with unit economics (Estimated 70-80% margins on usage)</p>';
    html += '<table class="margin-table">';
    html += '<thead><tr><th>Usage Category</th><th>Unit Price</th><th>Unit Cost</th><th>Unit Margin</th></tr></thead>';
    html += '<tbody>';

    const consumptionMargins = [
        { cat: 'Profiles', price: '$0.15/1K', cost: '$0.04/1K', margin: '73%' },
        { cat: 'Events', price: '$12.00/100K', cost: '$3.50/100K', margin: '71%' },
        { cat: 'Email Send', price: '$0.03/1K', cost: '$0.025/1K', margin: '17%' },
        { cat: 'SMS Send', price: '$8.50/1K', cost: '$8.50/1K', margin: '0%' },
        { cat: 'Segments', price: '$0.13/segment', cost: '$0.13/segment', margin: '0%' }
    ];

    consumptionMargins.forEach(item => {
        html += '<tr>';
        html += `<td class="tier-name">${item.cat}</td>`;
        html += `<td>${item.price}</td>`;
        html += `<td>${item.cost}</td>`;
        html += `<td class="${parseInt(item.margin) > 50 ? 'margin-good' : parseInt(item.margin) > 10 ? 'margin-fair' : 'margin-poor'}">${item.margin}</td>`;
        html += '</tr>';
    });

    html += '</tbody></table>';

    html += '<h3 style="color: #065f46; margin-top: 1.5rem;">Model 3: Credits System</h3>';
    html += '<p style="color: #64748b; margin-bottom: 1rem;">Prepaid credits with volume discounts (Margins improve with larger packages)</p>';
    html += '<table class="margin-table">';
    html += '<thead><tr><th>Package</th><th>Credits</th><th>Price</th><th>Discount</th><th>Effective Margin</th></tr></thead>';
    html += '<tbody>';

    const creditMargins = [
        { pkg: 'Starter', credits: '100K', price: '$100', discount: '0%', margin: '~70%' },
        { pkg: 'Growth', credits: '500K', price: '$400', discount: '20%', margin: '~75%' },
        { pkg: 'Scale', credits: '2M', price: '$1,400', discount: '30%', margin: '~77%' },
        { pkg: 'Enterprise', credits: '10M', price: '$6,000', discount: '40%', margin: '~80%' }
    ];

    creditMargins.forEach(item => {
        html += '<tr>';
        html += `<td class="tier-name">${item.pkg}</td>`;
        html += `<td>${item.credits}</td>`;
        html += `<td>${item.price}</td>`;
        html += `<td>${item.discount}</td>`;
        html += `<td class="margin-good">${item.margin}</td>`;
        html += '</tr>';
    });

    html += '</tbody></table>';

    html += '<div style="background: #fef9e7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px; margin-top: 1.5rem; font-size: 0.875rem;">';
    html += '<strong>Key Insight:</strong> All three models maintain healthy margins (65-80%), with Tiered Bundles offering the most predictability and Credits offering best margins at scale.';
    html += '</div>';

    html += '</div>';

    container.innerHTML = html;
}

// Render Revenue Modeling Tool - Tiered Model
function renderRevenueModelingTiered() {
    const container = document.getElementById('revenue-tiered-container');
    const tiers = pricingData.tiers || [];
    const addons = pricingData.addOnsComposableFeatures || [];

    let html = '<div class="revenue-grid">';

    // LEFT PANEL: Customer Inputs
    html += '<div class="section">';
    html += '<h2>Customer Distribution by Tier</h2>';

    tiers.forEach(tier => {
        if (tier.id === 'free') return;

        html += '<div class="tier-card">';
        html += '<div class="tier-header">';
        html += `<span class="tier-name-card">${tier.name} Tier</span>`;
        html += `<span class="tier-price-card">$${tier.basePrice.toLocaleString()}/month</span>`;
        html += '</div>';

        html += '<div class="input-group">';
        html += '<label>Number of Customers</label>';
        html += `<input type="number" id="tiered-${tier.id}-customers" value="${tier.id === 'starter' ? 100 : tier.id === 'growth' ? 50 : tier.id === 'scale' ? 20 : 5}" min="0" oninput="calculateRevenueTiered()">`;
        html += '</div>';

        // Add-ons for this tier
        const tierAddons = addons.filter(addon => {
            const avail = addon.tierAvailability[tier.id];
            return avail && avail.addonPrice && addon.id !== 'reporting';
        });

        if (tierAddons.length > 0) {
            html += '<div class="addon-section">';
            html += '<h4>Available Add-ons</h4>';

            tierAddons.forEach(addon => {
                const avail = addon.tierAvailability[tier.id];
                html += '<div class="addon-item">';
                html += '<div class="addon-label">';
                html += `<input type="checkbox" id="tiered-${tier.id}-${addon.id}" ${tier.id === 'growth' && addon.id === 'segments' ? 'checked' : ''} onchange="calculateRevenueTiered()">`;
                html += `<label for="tiered-${tier.id}-${addon.id}">${addon.name}</label>`;
                html += '</div>';
                html += `<span class="addon-price">+$${avail.addonPrice}/mo</span>`;
                html += '</div>';

                html += '<div class="addon-adoption">';
                html += `<input type="number" id="tiered-${tier.id}-${addon.id}-adoption" value="${tier.id === 'growth' && addon.id === 'segments' ? 40 : 25}" min="0" max="100" oninput="calculateRevenueTiered()">`;
                html += '<span>% adoption</span>';
                html += '</div>';
            });

            html += '</div>';
        }

        html += '</div>'; // tier-card
    });

    html += '</div>'; // section (left panel)

    // RIGHT PANEL: Results (Sticky)
    html += '<div class="results-sticky">';
    html += '<div class="section">';
    html += '<h2>Revenue Summary</h2>';

    // Total Revenue Metric Card
    html += '<div class="metric-card">';
    html += '<div class="metric-label">Total Monthly Revenue</div>';
    html += '<div class="metric-value" id="tiered-total-revenue">$0</div>';
    html += '</div>';

    // Margin Indicator
    html += '<div class="margin-indicator">';
    html += '<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">';
    html += '<span style="font-weight: 600; color: #1e293b;">Blended Gross Margin</span>';
    html += '<span id="tiered-margin-percent" style="font-weight: 700; color: #10b981;">0%</span>';
    html += '</div>';
    html += '<div class="margin-bar">';
    html += '<div id="tiered-margin-fill" class="margin-fill" style="width: 0%;">0%</div>';
    html += '</div>';
    html += '</div>';

    // Revenue Breakdown
    html += '<div class="breakdown">';
    html += '<h3>Revenue Breakdown</h3>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Base Tier Revenue</span>';
    html += '<span class="breakdown-value" id="tiered-base-revenue">$0</span>';
    html += '</div>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Add-on Revenue</span>';
    html += '<span class="breakdown-value" id="tiered-addon-revenue">$0</span>';
    html += '</div>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Total Revenue</span>';
    html += '<span class="breakdown-value" id="tiered-total-revenue-breakdown">$0</span>';
    html += '</div>';
    html += '</div>';

    // Cost Breakdown
    html += '<div class="breakdown">';
    html += '<h3>Cost & Margin</h3>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Infrastructure Cost</span>';
    html += '<span class="breakdown-value" id="tiered-total-cost">$0</span>';
    html += '</div>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Gross Profit</span>';
    html += '<span class="breakdown-value" id="tiered-gross-profit" style="color: #10b981;">$0</span>';
    html += '</div>';
    html += '</div>';

    // Customer Distribution
    html += '<div class="breakdown">';
    html += '<h3>Customer Distribution</h3>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Starter</span>';
    html += '<span class="breakdown-value" id="tiered-starter-count">0</span>';
    html += '</div>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Growth</span>';
    html += '<span class="breakdown-value" id="tiered-growth-count">0</span>';
    html += '</div>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Scale</span>';
    html += '<span class="breakdown-value" id="tiered-scale-count">0</span>';
    html += '</div>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Enterprise</span>';
    html += '<span class="breakdown-value" id="tiered-enterprise-count">0</span>';
    html += '</div>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Total Customers</span>';
    html += '<span class="breakdown-value" id="tiered-total-customers">0</span>';
    html += '</div>';
    html += '</div>';

    html += '</div>'; // section
    html += '</div>'; // results-sticky

    html += '</div>'; // revenue-grid

    container.innerHTML = html;

    // Initial calculation
    setTimeout(() => calculateRevenueTiered(), 100);
}

// Render Revenue Modeling Tool - Consumption Model
function renderRevenueModelingConsumption() {
    const container = document.getElementById('revenue-consumption-container');
    const model = pricingData.pureConsumptionModel;

    if (!model) {
        container.innerHTML = '<p class="error">Consumption model data not found</p>';
        return;
    }

    let html = '<div class="revenue-grid">';

    // LEFT PANEL: Usage Inputs
    html += '<div class="section">';
    html += '<h2>Monthly Usage</h2>';

    // Core Data inputs
    html += '<div class="tier-card">';
    html += '<div class="tier-header"><div class="tier-name-card">Core Data Usage</div></div>';

    html += '<div class="input-group">';
    html += '<label for="cons-profiles">Profiles (in thousands)</label>';
    html += '<input type="number" id="cons-profiles" value="25" min="0" oninput="calculateConsumptionRevenue()">';
    html += '<small>$0.15 per 1K profiles/month</small>';
    html += '</div>';

    html += '<div class="input-group">';
    html += '<label for="cons-events">Events (in 100Ks)</label>';
    html += '<input type="number" id="cons-events" value="20" min="0" oninput="calculateConsumptionRevenue()">';
    html += '<small>$12.00 per 100K events</small>';
    html += '</div>';

    html += '<div class="input-group">';
    html += '<label for="cons-custom-objects">Custom Objects (in 10Ks)</label>';
    html += '<input type="number" id="cons-custom-objects" value="5" min="0" oninput="calculateConsumptionRevenue()">';
    html += '<small>$0.50 per 10K records/month</small>';
    html += '</div>';

    html += '</div>'; // tier-card

    // Messaging inputs
    html += '<div class="tier-card">';
    html += '<div class="tier-header"><div class="tier-name-card">Messaging Usage</div></div>';

    html += '<div class="input-group">';
    html += '<label for="cons-emails">Emails (in thousands)</label>';
    html += '<input type="number" id="cons-emails" value="150" min="0" oninput="calculateConsumptionRevenue()">';
    html += '<small>$0.03 per 1K emails</small>';
    html += '</div>';

    html += '<div class="input-group">';
    html += '<label for="cons-sms">SMS (in thousands)</label>';
    html += '<input type="number" id="cons-sms" value="5" min="0" oninput="calculateConsumptionRevenue()">';
    html += '<small>$8.50 per 1K SMS</small>';
    html += '</div>';

    html += '</div>'; // tier-card

    // Add-ons inputs
    html += '<div class="tier-card">';
    html += '<div class="tier-header"><div class="tier-name-card">Add-ons Usage</div></div>';

    html += '<div class="input-group">';
    html += '<label for="cons-segments">Segments</label>';
    html += '<input type="number" id="cons-segments" value="50" min="0" oninput="calculateConsumptionRevenue()">';
    html += '<small>$0.13 per segment/month</small>';
    html += '</div>';

    html += '<div class="input-group">';
    html += '<label for="cons-campaigns">Campaigns</label>';
    html += '<input type="number" id="cons-campaigns" value="10" min="0" oninput="calculateConsumptionRevenue()">';
    html += '<small>$0.05 per campaign</small>';
    html += '</div>';

    html += '</div>'; // tier-card

    html += '</div>'; // section (left panel)

    // RIGHT PANEL: Results (Sticky)
    html += '<div class="results-sticky">';
    html += '<div class="section">';
    html += '<h2>Cost Summary</h2>';

    // Total Cost Metric Card
    html += '<div class="metric-card">';
    html += '<div class="metric-label">Monthly Cost (after credit)</div>';
    html += '<div class="metric-value" id="cons-final-cost">$0</div>';
    html += '</div>';

    // Cost Breakdown
    html += '<div class="breakdown">';
    html += '<h3>Cost Breakdown</h3>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Core Data</span>';
    html += '<span class="breakdown-value" id="cons-data-cost">$0</span>';
    html += '</div>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Messaging</span>';
    html += '<span class="breakdown-value" id="cons-messaging-cost">$0</span>';
    html += '</div>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Add-ons</span>';
    html += '<span class="breakdown-value" id="cons-addons-cost">$0</span>';
    html += '</div>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Total Usage Cost</span>';
    html += '<span class="breakdown-value" id="cons-total-cost">$0</span>';
    html += '</div>';
    html += '</div>';

    // Free Credit
    html += '<div class="breakdown">';
    html += '<h3>Free Tier Credit</h3>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Monthly Credit</span>';
    html += '<span class="breakdown-value" style="color: #10b981;">-$50.00</span>';
    html += '</div>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Final Cost</span>';
    html += '<span class="breakdown-value" id="cons-final-cost-breakdown">$0</span>';
    html += '</div>';
    html += '</div>';

    // Annual
    html += '<div class="breakdown">';
    html += '<h3>Annual Projection</h3>';
    html += '<div class="breakdown-item">';
    html += '<span class="breakdown-label">Annual Cost (ARR)</span>';
    html += '<span class="breakdown-value" id="cons-annual-cost">$0</span>';
    html += '</div>';
    html += '</div>';

    html += '</div>'; // section
    html += '</div>'; // results-sticky

    html += '</div>'; // revenue-grid

    container.innerHTML = html;

    // Initial calculation
    setTimeout(() => calculateConsumptionRevenue(), 100);
}

// Render Revenue Modeling Tool - Credits Model
function renderRevenueModelingCredits() {
    const container = document.getElementById('revenue-credits-container');
    const model = pricingData.creditsModel;

    if (!model) {
        container.innerHTML = '<p class="error">Credits model data not found</p>';
        return;
    }

    let html = '<div class="revenue-grid">';

    // LEFT PANEL: Usage Inputs
    html += '<div class="section">';
    html += '<h2>Monthly Usage</h2>';
    html += '<p style="color: #64748b; margin-bottom: 1.5rem;">Calculate credit usage and find the best package</p>';

    // Core Data inputs
    html += '<div class="tier-card">';
    html += '<div class="tier-header"><div class="tier-name-card">Usage Inputs</div></div>';

    html += '<div class="input-group">';
    html += '<label for="cred-profiles">Profiles</label>';
    html += '<input type="number" id="cred-profiles" value="25000" min="0" placeholder="Number of profiles" oninput="calculateCreditsRevenue()">';
    html += '<small style="color: #64748b;">4 credits per profile/month</small>';
    html += '</div>';

    html += '<div class="input-group">';
    html += '<label for="cred-events">Events (per month)</label>';
    html += '<input type="number" id="cred-events" value="2000000" min="0" placeholder="e.g., 2000000" oninput="calculateCreditsRevenue()">';
    html += '<small style="color: #64748b;">3.5 credits per 100 events</small>';
    html += '</div>';

    html += '<div class="input-group">';
    html += '<label for="cred-emails">Emails (per month)</label>';
    html += '<input type="number" id="cred-emails" value="150000" min="0" placeholder="e.g., 150000" oninput="calculateCreditsRevenue()">';
    html += '<small style="color: #64748b;">25 credits per email</small>';
    html += '</div>';

    html += '<div class="input-group">';
    html += '<label for="cred-sms">SMS (per month)</label>';
    html += '<input type="number" id="cred-sms" value="5000" min="0" placeholder="e.g., 5000" oninput="calculateCreditsRevenue()">';
    html += '<small style="color: #64748b;">8,500 credits per SMS</small>';
    html += '</div>';

    html += '</div>'; // tier-card

    html += '</div>'; // section (left panel)

    // RIGHT PANEL: Results (Sticky)
    html += '<div class="results-sticky">';
    html += '<div class="section">';
    html += '<h2>Credits Summary</h2>';

    // Main metric card
    html += '<div class="metric-card">';
    html += '<div class="metric-label">Monthly Cost</div>';
    html += '<div class="metric-value" id="cred-monthly-cost">$0</div>';
    html += '<div class="metric-sublabel">Based on recommended package</div>';
    html += '</div>';

    // Breakdown
    html += '<div style="margin-top: 1.5rem;">';
    html += '<h3 style="font-size: 0.875rem; font-weight: 600; color: #64748b; margin-bottom: 0.75rem;">Credits Breakdown</h3>';

    html += '<div class="result-item">';
    html += '<span class="result-label">Total Credits Needed:</span>';
    html += '<span class="result-value" id="cred-total-credits">0</span>';
    html += '</div>';

    html += '<div class="result-item">';
    html += '<span class="result-label">Free Monthly Credits:</span>';
    html += '<span class="result-value success">50,000</span>';
    html += '</div>';

    html += '<div class="result-item">';
    html += '<span class="result-label">Credits After Free Tier:</span>';
    html += '<span class="result-value" id="cred-needed-credits">0</span>';
    html += '</div>';

    html += '<div class="result-item">';
    html += '<span class="result-label">Recommended Package:</span>';
    html += '<span class="result-value success" id="cred-package">-</span>';
    html += '</div>';

    html += '<div class="result-item" style="border-top: 2px solid #e2e8f0; padding-top: 0.75rem; margin-top: 0.75rem;">';
    html += '<span class="result-label" style="font-weight: 600;">Annual Cost (ARR):</span>';
    html += '<span class="result-value success" id="cred-annual-cost" style="font-weight: 700;">$0</span>';
    html += '</div>';

    html += '</div>'; // breakdown

    html += '</div>'; // section
    html += '</div>'; // results-sticky

    html += '</div>'; // revenue-grid

    container.innerHTML = html;

    // Trigger initial calculation
    setTimeout(() => calculateCreditsRevenue(), 100);
}

// Calculate Revenue Model - Tiered (Live Updates)
function calculateRevenueTiered() {
    const tiers = pricingData.tiers || [];
    const margins = pricingData.marginAnalysis?.tiers || [];
    const addons = pricingData.addOnsComposableFeatures || [];

    let totalCustomers = 0;
    let baseRevenue = 0;
    let addonRevenue = 0;
    let totalCost = 0;

    const customerCounts = {};

    // Calculate base revenue from tiers
    tiers.forEach(tier => {
        if (tier.id === 'free') return;

        const input = document.getElementById(`tiered-${tier.id}-customers`);
        if (!input) return;

        const customers = parseInt(input.value) || 0;
        customerCounts[tier.id] = customers;
        totalCustomers += customers;
        baseRevenue += customers * tier.basePrice;

        // Find margin data for cost calculation
        const marginData = margins.find(m => m.tier === tier.name);
        if (marginData) {
            totalCost += customers * marginData.baseCost;
        }

        // Calculate add-on revenue for this tier
        addons.forEach(addon => {
            if (addon.id === 'reporting') return;

            const tierAvail = addon.tierAvailability[tier.id];
            if (!tierAvail || !tierAvail.addonPrice) return;

            const checkbox = document.getElementById(`tiered-${tier.id}-${addon.id}`);
            const adoptionInput = document.getElementById(`tiered-${tier.id}-${addon.id}-adoption`);

            if (checkbox && checkbox.checked && adoptionInput) {
                const adoptionRate = (parseInt(adoptionInput.value) || 0) / 100;
                const addonCustomers = Math.floor(customers * adoptionRate);
                addonRevenue += addonCustomers * tierAvail.addonPrice;

                // Estimate add-on costs (30% of add-on price)
                totalCost += addonCustomers * tierAvail.addonPrice * 0.3;
            }
        });
    });

    const totalRevenue = baseRevenue + addonRevenue;
    const grossMargin = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue * 100) : 0;
    const grossProfit = totalRevenue - totalCost;

    // Update results
    const updateElement = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    updateElement('tiered-total-revenue', '$' + totalRevenue.toLocaleString());
    updateElement('tiered-base-revenue', '$' + baseRevenue.toLocaleString());
    updateElement('tiered-addon-revenue', '$' + addonRevenue.toLocaleString());
    updateElement('tiered-total-revenue-breakdown', '$' + totalRevenue.toLocaleString());
    updateElement('tiered-total-cost', '$' + totalCost.toLocaleString());
    updateElement('tiered-gross-profit', '$' + grossProfit.toLocaleString());
    updateElement('tiered-margin-percent', grossMargin.toFixed(1) + '%');

    // Update margin bar
    const marginFill = document.getElementById('tiered-margin-fill');
    if (marginFill) {
        marginFill.style.width = Math.min(grossMargin, 100) + '%';
        marginFill.textContent = grossMargin.toFixed(1) + '%';
    }

    // Update customer counts
    updateElement('tiered-starter-count', customerCounts.starter || 0);
    updateElement('tiered-growth-count', customerCounts.growth || 0);
    updateElement('tiered-scale-count', customerCounts.scale || 0);
    updateElement('tiered-enterprise-count', customerCounts.enterprise || 0);
    updateElement('tiered-total-customers', totalCustomers.toLocaleString());
}

// Calculate Consumption Model Revenue (Live Updates)
function calculateConsumptionRevenue() {
    const model = pricingData.pureConsumptionModel;
    if (!model) return;

    // Get inputs
    const profiles = parseFloat(document.getElementById('cons-profiles')?.value) || 0;
    const events = parseFloat(document.getElementById('cons-events')?.value) || 0;
    const customObjects = parseFloat(document.getElementById('cons-custom-objects')?.value) || 0;
    const emails = parseFloat(document.getElementById('cons-emails')?.value) || 0;
    const sms = parseFloat(document.getElementById('cons-sms')?.value) || 0;
    const segments = parseFloat(document.getElementById('cons-segments')?.value) || 0;
    const campaigns = parseFloat(document.getElementById('cons-campaigns')?.value) || 0;

    // Calculate costs by category
    let dataCost = 0;
    dataCost += profiles * model.unitPricing.coreDataInfrastructure.profiles.price;
    dataCost += events * model.unitPricing.coreDataInfrastructure.events.price;
    dataCost += customObjects * model.unitPricing.coreDataInfrastructure.customObjects.price;

    let messagingCost = 0;
    messagingCost += emails * model.unitPricing.coreMessagingInfrastructure.emailSend.price;
    messagingCost += sms * model.unitPricing.coreMessagingInfrastructure.smsSend.price;

    let addonsCost = 0;
    addonsCost += segments * model.unitPricing.addOnsComposableFeatures.segments.price;
    addonsCost += campaigns * model.unitPricing.addOnsComposableFeatures.campaigns.price;

    const totalCost = dataCost + messagingCost + addonsCost;
    const freeCredit = model.freeTier.usageCredit;
    const finalCost = Math.max(0, totalCost - freeCredit);
    const annualCost = finalCost * 12;

    // Update display
    const updateElement = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    updateElement('cons-data-cost', '$' + dataCost.toFixed(2));
    updateElement('cons-messaging-cost', '$' + messagingCost.toFixed(2));
    updateElement('cons-addons-cost', '$' + addonsCost.toFixed(2));
    updateElement('cons-total-cost', '$' + totalCost.toFixed(2));
    updateElement('cons-final-cost', '$' + finalCost.toFixed(2));
    updateElement('cons-final-cost-breakdown', '$' + finalCost.toFixed(2));
    updateElement('cons-annual-cost', '$' + annualCost.toLocaleString());
}

// Calculate Credits Model Revenue
function calculateCreditsRevenue() {
    const model = pricingData.creditsModel;

    // Get inputs
    const profiles = parseFloat(document.getElementById('cred-profiles').value) || 0;
    const events = parseFloat(document.getElementById('cred-events').value) || 0;
    const emails = parseFloat(document.getElementById('cred-emails').value) || 0;
    const sms = parseFloat(document.getElementById('cred-sms').value) || 0;

    // Calculate credits needed
    let totalCredits = 0;
    totalCredits += profiles * model.creditCosts.coreDataInfrastructure.profiles.credits;
    totalCredits += (events / 100) * model.creditCosts.coreDataInfrastructure.events.credits;
    totalCredits += emails * model.creditCosts.coreMessagingInfrastructure.emailSend.credits;
    totalCredits += sms * model.creditCosts.coreMessagingInfrastructure.smsSend.credits;

    const freeCredits = model.freeCredits.monthly;
    const neededCredits = Math.max(0, totalCredits - freeCredits);

    // Find recommended package
    let recommendedPackage = null;
    let monthlyCost = 0;

    for (const pkg of model.creditPackages) {
        if (pkg.credits >= neededCredits) {
            recommendedPackage = pkg;
            monthlyCost = pkg.price;
            break;
        }
    }

    if (!recommendedPackage && neededCredits > 0) {
        // Need multiple of largest package
        const largestPkg = model.creditPackages[model.creditPackages.length - 1];
        const multiplier = Math.ceil(neededCredits / largestPkg.credits);
        recommendedPackage = {
            name: `${multiplier}× ${largestPkg.name}`,
            credits: largestPkg.credits * multiplier,
            price: largestPkg.price * multiplier
        };
        monthlyCost = recommendedPackage.price;
    }

    const annualCost = monthlyCost * 12;

    // Update display
    const updateElement = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    updateElement('cred-total-credits', totalCredits.toLocaleString() + ' credits');
    updateElement('cred-needed-credits', neededCredits.toLocaleString() + ' credits');
    updateElement('cred-package', recommendedPackage ? recommendedPackage.name : 'None needed');
    updateElement('cred-monthly-cost', '$' + monthlyCost.toLocaleString());
    updateElement('cred-annual-cost', '$' + annualCost.toLocaleString());
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

// Revenue sub-tab switching
function switchRevenueTab(modelName) {
    // Update sub-tab buttons
    document.querySelectorAll('.sub-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update sub-tab content
    document.querySelectorAll('.sub-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById('revenue-' + modelName + '-content').classList.add('active');
}

// Error handling
function showError(message) {
    console.error(message);
    const containers = [
        'tiered-table-container',
        'consumption-container',
        'credits-container',
        'comparison-container',
        'margins-container',
        'revenue-tiered-container',
        'revenue-consumption-container',
        'revenue-credits-container'
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
